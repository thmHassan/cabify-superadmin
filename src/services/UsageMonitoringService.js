import { GET_USAGE_MONITORING } from "../constants/api.route.constant";
import { METHOD_GET } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiGetUsageMonitoringDetails(params) {
  return ApiService.fetchData({
    url: params
      ? replaceSlash(params, GET_USAGE_MONITORING)
      : GET_USAGE_MONITORING,
    method: METHOD_GET,
  });
}
