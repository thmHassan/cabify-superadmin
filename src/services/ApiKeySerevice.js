import { GET_API_KEY } from "../constants/api.route.constant";
import { METHOD_GET } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiGetApiKeys(params) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, GET_API_KEY) : GET_API_KEY,
    method: METHOD_GET,
  });
}
