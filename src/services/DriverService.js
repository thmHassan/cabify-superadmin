import {
  CREATE_DRIVERS_DOCUMENT,
  DELETE_DRIVERS_DOCUMENT,
  EDIT_DRIVERS_DOCUMENT,
  GET_DRIVERS_DOCUMENT,
  GET_DRIVERS_DOCUMENT_BY_ID,
} from "../constants/api.route.constant";
import { METHOD_GET, METHOD_POST } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiGetDriversDocuments(params) {
  const url = params
    ? replaceSlash(params, GET_DRIVERS_DOCUMENT)
    : GET_DRIVERS_DOCUMENT;
  return ApiService.fetchData({
    url,
    method: METHOD_GET,
    params: typeof params === 'object' ? params : undefined,
  });
}

export async function apiCreateDriversDocument(data) {
  return ApiService.fetchData({
    url: CREATE_DRIVERS_DOCUMENT,
    method: METHOD_POST,
    data,
  });
}

export async function apiDeleteDriversDocument(data) {
  return ApiService.fetchData({
    url: DELETE_DRIVERS_DOCUMENT,
    method: METHOD_POST,
    data,
  });
}

export async function apiEditDriversDocument(params, data) {
  return ApiService.fetchData({
    url: params
      ? replaceSlash(params, EDIT_DRIVERS_DOCUMENT)
      : EDIT_DRIVERS_DOCUMENT,
    method: METHOD_POST,
    data,
  });
}

export async function apiGetDriversDocumentById(params) {
  return ApiService.fetchData({
    url: params
      ? replaceSlash(params, GET_DRIVERS_DOCUMENT_BY_ID)
      : GET_DRIVERS_DOCUMENT_BY_ID,
    method: METHOD_GET,
  });
}
