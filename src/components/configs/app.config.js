import { SELECTION_PATH } from "../../constants/routes.path.constant/auth.route.path.constant";

const isDevelopment = import.meta.env.VITE_NODE_ENV === "development";
const configuredApiPrefix = import.meta.env.VITE_API_URL?.trim();

const appConfig = {
  apiPrefix:
    configuredApiPrefix ||
    (isDevelopment
      ? "http://127.0.0.1:8001/api"
      : "https://backend.cabifyit.com/api"),
  authenticatedEntryPath: "/overview",
  unAuthenticatedEntryPath: SELECTION_PATH,
  locale: "en",
  enableMock: false,
};

export default appConfig;
