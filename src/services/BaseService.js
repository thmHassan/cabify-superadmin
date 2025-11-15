import axios from "axios";
import toast from "react-hot-toast";
import appConfig from "../components/configs/app.config";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "../constants/api.constant";
import store, { setUser, signOutSuccess } from "../store";
import {
  clearAllAuthData,
  getDecryptedToken,
} from "../utils/functions/tokenEncryption";

const unauthorizedCode = [401, 403, 419];

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiPrefix,
});

BaseService.interceptors.request.use(
  (config) => {
    // Get decrypted token from localStorage
    const accessToken = getDecryptedToken();

    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => {
    // Show success toast for POST, PUT, DELETE operations
    const method = response.config?.method?.toLowerCase();
    const isMutationMethod = ["post", "put", "patch", "delete"].includes(method);
    const url = response.config?.url || "";
    const isLoginRequest = url.includes("/login") || url.includes("/sign-in");
    
    if (isMutationMethod && (response.status === 200 || response.status === 201)) {
      let message = "Operation completed successfully";
      
      if (method === "post") {
        if (isLoginRequest) {
          message = response.data?.message || "Logged in successfully";
        } else {
          message = response.data?.message || "Created successfully";
        }
      } else if (method === "put" || method === "patch") {
        message = response.data?.message || "Updated successfully";
      } else if (method === "delete") {
        message = response.data?.message || "Deleted successfully";
      }
      
      toast.success(message);
    }
    
    return response;
  },
  (error) => {
    const { response, config } = error;

    console.log(response, "response========");

    // Show error toast for POST, PUT, DELETE operations
    const method = config?.method?.toLowerCase();
    const isMutationMethod = ["post", "put", "patch", "delete"].includes(method);
    
    if (isMutationMethod && response) {
      const errorMessage = 
        response.data?.message || 
        response.data?.error || 
        error.message || 
        "Operation failed";
      
      toast.error(errorMessage);
    }

    if (response && unauthorizedCode.includes(response.status)) {
      store.dispatch(signOutSuccess());
      store.dispatch(
        setUser({
          avatar: "",
          name: "",
          email: "",
          role: "client",
        })
      );
      clearAllAuthData();

      if (window.location.pathname !== appConfig.unAuthenticatedEntryPath) {
        window.location.href = appConfig.unAuthenticatedEntryPath;
      }
    }

    return Promise.reject(error);
  }
);

export default BaseService;
