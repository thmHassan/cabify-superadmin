import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import appConfig from "../configs/app.config";
import ProtectedRoute from "./ProtectedRoute";
import {
  protectedRoutes,
  publicRoutes,
} from "../configs/routes.config/routes.config";
import UserPageContainer from "../templates/UserPageContainer";
import AppRoute from "./AppRoute";
import PublicRoute from "./PublicRoute";
import { useAppSelector } from "../../store";
import { useEffect, useState, useRef } from "react";
import useAuth from "../../utils/hooks/useAuth";
import { apiGetSubAdminPermission } from "../../services/SubAdminService";

const { authenticatedEntryPath } = appConfig;

const AllRoutes = () => {
  const { role } = useAppSelector((state) => state.auth.user);
  const userRole = role;

  const { authenticated } = useAuth();
  const baseRole = userRole === "subadmin" ? "superadmin" : (userRole || (authenticated ? "superadmin" : userRole));
  const currentRoutes = protectedRoutes[baseRole] || [];
  const [permissions, setPermissions] = useState(null);

  const parsePermissions = (raw) => {
    if (!raw) return null;
    try {
      let val = raw;
      if (typeof val !== "string") return val;
      for (let i = 0; i < 3; i++) {
        try {
          const parsed = JSON.parse(val);
          if (typeof parsed === "string") {
            val = parsed;
            continue;
          }
          return parsed;
        } catch (e) {
          break;
        }
      }

      return val;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchPermissions = async () => {
      if (userRole !== "subadmin") return;
      try {
        const res = await apiGetSubAdminPermission();
        const raw = res?.data?.permissions ?? res?.permissions;
        const parsed = parsePermissions(raw);
        if (mounted) setPermissions(parsed);
        try {
          if (parsed) {
            localStorage.setItem("subadmin_permissions", JSON.stringify(parsed));
          } else {
            localStorage.removeItem("subadmin_permissions");
          }
        } catch (e) {
          console.log("error", e);

        }
      } catch (err) {
        console.error("Failed to fetch subadmin permissions", err);
      }
    };

    fetchPermissions();

    return () => {
      mounted = false;
    };
  }, [userRole]);

  const PERMISSION_ROUTE_MAP = {
    dashboard: "overview",
    compaines: "companies",
    onBoarding: "onboarding",
    subscription: "subscription",
    usag_monitoring: "usage-monitoring",
    maps_configuration: "maps-configuration",
    voIp_settings: "voip-settings",
    payments: "payments",
  };

  const visibleRoutes = (() => {
    if (userRole !== "subadmin") return currentRoutes;
    if (!permissions || typeof permissions !== "object") return [];

    return currentRoutes.filter((route) => {
      const matchedPermissionKey = Object.keys(PERMISSION_ROUTE_MAP).find(
        (permKey) => PERMISSION_ROUTE_MAP[permKey] === route.key
      );
      if (!matchedPermissionKey) return true;

      const permValues = permissions[matchedPermissionKey] || [];
      return Array.isArray(permValues) && permValues.includes("view");
    });
  })();

  const IndexLoader = () => {
    const navigate = useNavigate();
    const navigatedRef = useRef(false);

    useEffect(() => {
      if (!authenticated) return;

      if (userRole === undefined || userRole === null) return;
      if (userRole === "subadmin" && permissions === null) return;

      if (navigatedRef.current) return;

      const target = userRole !== "subadmin" ? authenticatedEntryPath : (visibleRoutes[0]?.path || authenticatedEntryPath);
      navigatedRef.current = true;
      console.log("IndexLoader navigating to:", target, { authenticated, userRole, permissions });
      navigate(target, { replace: true });
    }, [authenticated, userRole, permissions, visibleRoutes, navigate]);

    return null;
  };

  return (
    console.log("AllRoutes state:", { authenticated, userRole, permissions, baseRole, visibleRoutesCount: visibleRoutes.length }),
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          index
          element={
            <IndexLoader />
          }
        />
        {visibleRoutes.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              <UserPageContainer permissions={permissions}>
                <AppRoute routeKey={route.key} component={route.component} {...route.meta} />
              </UserPageContainer>
            }
          />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<AppRoute routeKey={route.key} component={route.component} {...route.meta} />}
          />
        ))}
      </Route>
    </Routes>
  );
};
export default AllRoutes;
