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
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={authenticatedEntryPath} />}
        />
        {protectedRoutes[role]?.map((route, index) => (
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
