import { SELECTION_PATH } from "../../constants/routes.path.constant/auth.route.path.constant";

const isDevelopment = import.meta.env.VITE_NODE_ENV === "development";

const appConfig = {
  apiPrefix: isDevelopment
    ? "http://127.0.0.1:8000/api"
    : "https://backend.cabifyit.com/api",
  authenticatedEntryPath: "/overview",
  unAuthenticatedEntryPath: SELECTION_PATH,
  locale: "en",
  enableMock: false,
};

export default appConfig;
