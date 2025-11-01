import { SELECTION_PATH } from "../../constants/routes.path.constant/auth.route.path.constant";

const appConfig = {
  apiPrefix: import.meta.env.VITE_API_BASE_URL || "https://backend.cabifyit.com/api",
  authenticatedEntryPath: "/overview",
  unAuthenticatedEntryPath: SELECTION_PATH,
  locale: "en",
  enableMock: false,
};

export default appConfig;
