import { GET_API_KEY } from "../constants/api.route.constant";
import { METHOD_GET } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiGetApiKeys(params) {

  const url = typeof params === 'string' 
    ? replaceSlash(params, GET_API_KEY)
    : GET_API_KEY;
  return ApiService.fetchData({
    url,
    method: METHOD_GET,
    params: typeof params === 'object' ? params : undefined,
  });
}
