import {
  EDIT_COMPANY,
  GET_COMPANY_BY_ID,
  GET_COMPANY_CARD_DETAILS,
  GET_COMPANY_PAYMENT_HISTORY,
} from "../constants/api.route.constant";
import { METHOD_GET, METHOD_POST } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiGetCompanyCardDetails(params) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, GET_COMPANY_CARD_DETAILS) : GET_COMPANY_CARD_DETAILS,
    method: METHOD_GET,
  });
}

export async function apiGetCompanyDetailsById(params) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, GET_COMPANY_BY_ID) : GET_COMPANY_BY_ID,
    method: METHOD_GET,
  });
}

export async function apiGetCompanyPaymentHistoryById(params) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, GET_COMPANY_PAYMENT_HISTORY) : GET_COMPANY_PAYMENT_HISTORY,
    method: METHOD_GET,
  });
}

export async function apiEditCompanyDetails(params, data) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, EDIT_COMPANY) : EDIT_COMPANY,
    method: METHOD_POST,
    data,
  });
}
