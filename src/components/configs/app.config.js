import { SELECTION_PATH } from "../../constants/routes.path.constant/auth.route.path.constant";

const appConfig = {
  apiPrefix: "/api",
  authenticatedEntryPath: "/overview",
  unAuthenticatedEntryPath: SELECTION_PATH,
  locale: "en",
  enableMock: true,
};

export default appConfig;
