import { Navigate, Route, Routes } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { apiGetSubAdminPermission } from "../../services/SubAdminService";

const { authenticatedEntryPath } = appConfig;

const AllRoutes = () => {
  const { role } = useAppSelector((state) => state.auth.user);
  const userRole = role;

  const baseRole = userRole === "subadmin" ? "superadmin" : userRole;
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

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            (userRole === undefined || userRole === null) || (userRole === "subadmin" && permissions === null)
            && (
              <Navigate replace to={
                (() => {
                  if (userRole !== "subadmin") return authenticatedEntryPath;
                  const first = visibleRoutes[0];
                  return first ? first.path : authenticatedEntryPath;
                })()
              } />
            )
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

        <Route
          path="*"
          element={
            <div style={{ padding: "20px", textAlign: "center" }}>
              {userRole === "subadmin" ? (
                <p>Loading</p>
              ) : (
                <>
                  <p>Loading routes...</p>
                  <p>User Role: {userRole}</p>
                  <p>Available routes: {currentRoutes.length}</p>
                  <p>Route paths: {currentRoutes.map((r) => r.path).join(", ")}</p>
                </>
              )}
            </div>
          }
        />
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
