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

const { authenticatedEntryPath } = appConfig;

const AllRoutes = () => {
  const { role } = useAppSelector((state) => state.auth.user);

  // Fallback to superadmin role if no role is set (for encrypted token users)
  const userRole = role || "superadmin" ;



  // Get routes for the current user role
  const currentRoutes = protectedRoutes[userRole] || [];

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={authenticatedEntryPath} />}
        />
        {currentRoutes.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              <UserPageContainer>
                <AppRoute
                  routeKey={route.key}
                  component={route.component}
                  {...route.meta}
                />
              </UserPageContainer>
            }
          />
        ))}
        {/* Fallback route for when routes are not loaded yet */}
        <Route
          path="*"
          element={
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p>Loading routes...</p>
              <p>User Role: {userRole}</p>
              <p>Available routes: {currentRoutes.length}</p>
              <p>Route paths: {currentRoutes.map((r) => r.path).join(", ")}</p>
            </div>
          }
        />
      </Route>
      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
                {...route.meta}
              />
            }
          />
        ))}
      </Route>
    </Routes>
  );
};
export default AllRoutes;
