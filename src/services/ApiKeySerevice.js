import { method } from "lodash";
import { CREATE_API_KEY, GET_API_KEY } from "../constants/api.route.constant";
import { METHOD_GET, METHOD_POST } from "../constants/method.constant";
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

export async function apiCreateApiKeys(data) {
  return ApiService.fetchData({
    url: CREATE_API_KEY,
    method: METHOD_POST,
    data,
  });
}