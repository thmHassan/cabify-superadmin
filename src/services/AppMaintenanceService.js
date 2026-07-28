import ApiService from "./ApiService";
import { APP_MAINTENANCE } from "../constants/api.route.constant";
import { METHOD_GET, METHOD_POST } from "../constants/method.constant";

export const apiGetAppMaintenance = () =>
  ApiService.fetchData({
    url: APP_MAINTENANCE,
    method: METHOD_GET,
  });

export const apiUpdateAppMaintenance = (data) =>
  ApiService.fetchData({
    url: APP_MAINTENANCE,
    method: METHOD_POST,
    data,
  });
