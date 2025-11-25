import {
  GET_PAYMENT_LIST,
} from "../constants/api.route.constant";
import { METHOD_GET, METHOD_POST } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiGetAllPaymentsList(params) {
  return ApiService.fetchData({
    url: params
      ? replaceSlash(params, GET_PAYMENT_LIST)
      : GET_PAYMENT_LIST,
    method: METHOD_GET,
  });
}