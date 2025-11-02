import { GET_DASHBOARD_DETAILS } from "../constants/api.route.constant";
import { METHOD_GET } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiGetDashboardDetails(params) {
  return ApiService.fetchData({
    url: params
      ? replaceSlash(params, GET_DASHBOARD_DETAILS)
      : GET_DASHBOARD_DETAILS,
    method: METHOD_GET,
  });
}
