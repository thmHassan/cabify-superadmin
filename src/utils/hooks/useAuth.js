import React from "react";
import { useNavigate } from "react-router-dom";
import {
  apiSignIn,
  apiAdminSignIn,
  apiSignOut,
} from "../../services/AuthService";
import {
  setUser,
  signInSuccess,
  signOutSuccess,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import appConfig from "../../components/configs/app.config";
import { REDIRECT_URL_KEY } from "../../constants/app.constant";
import useQuery from "./useQuery";
import {
  storeEncryptedToken,
  removeEncryptedToken,
  clearAllAuthData,
  isAuthenticated,
  getUserDataFromToken,
} from "../functions/tokenEncryption";

function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const { token, signedIn } = useAppSelector((state) => state.auth.session);

  const signIn = async (values) => {
    try {
      const resp = await apiSignIn(values);
      if (resp.data) {
        const { token } = resp.data;
        console.log(resp.data.user, "resp.data.user====");
        dispatch(signInSuccess(token));
        if (resp.data.user) {
          dispatch(
            setUser(
              resp.data.user || {
                avatar: "",
                name: "Anonymous",
                role: "client",
                email: "",
              }
            )
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const adminSignIn = async (values) => {
    try {
      const resp = await apiAdminSignIn(values);
      if (resp.data && resp.data.success === 1) {
        const { access_token, user } = resp.data;
        console.log(user, "admin resp.data.user====");

        // Store encrypted token in localStorage
        storeEncryptedToken(access_token);

        // Dispatch to Redux store
        dispatch(signInSuccess(access_token));

        if (user) {
          dispatch(
            setUser({
              avatar: user.avatar || "",
              name: user.name || "Anonymous",
              role: user.role || values.role || "superadmin",
              email: user.email || values.email,
            })
          );
        }

        // Redirect to home page on success
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);

        return {
          status: "success",
          message: "Login successful",
        };
      } else {
        return {
          status: "failed",
          message: resp.data?.message || "Login failed",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const handleSignOut = () => {
    // Clear all authentication data from localStorage
    clearAllAuthData();

    // Clear Redux state
    dispatch(signOutSuccess());
    dispatch(
      setUser({
        avatar: "",
        name: "",
        email: "",
        role: "client",
      })
    );

    // Redirect to login page
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut = () => {
    // Simple logout - just remove token and redirect
    handleSignOut();
  };

  // Clear any legacy admin key and restore auth state on app start
  React.useEffect(() => {
    const legacyAdminData = localStorage.getItem("admin");
    if (legacyAdminData) {
      console.log("Clearing legacy admin data from localStorage");
      localStorage.removeItem("admin");
    }

    // Restore authentication state from encrypted token
    if (isAuthenticated() && !signedIn) {
      console.log("Restoring authentication state from encrypted token");
      dispatch(signInSuccess("restored")); // We don't need the actual token in Redux

      // Restore user data from token
      const userData = getUserDataFromToken();
      if (userData) {
        dispatch(setUser(userData));
      }
    }
  }, [dispatch, signedIn]);

  return {
    authenticated: isAuthenticated() || (token && signedIn),
    signIn,
    adminSignIn,
    signOut,
  };
}

export default useAuth;
