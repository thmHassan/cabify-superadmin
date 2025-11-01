import { SELECTION_PATH } from "../../constants/routes.path.constant/auth.route.path.constant";

const appConfig = {
  apiPrefix: "https://backend.cabifyit.com/api",
  authenticatedEntryPath: "/overview",
  unAuthenticatedEntryPath: SELECTION_PATH,
  locale: "en",
  enableMock: true,
};

export default appConfig;
