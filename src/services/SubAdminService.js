import {
  CREATE_SUB_ADMIN,
  EDIT_SUB_ADMIN,
  GET_SUB_ADMIN_BY_ID,
  GET_SUB_ADMINS,
} from "../constants/api.route.constant";
import { METHOD_GET, METHOD_POST } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiGetSubAdmins(params) {
  const url = typeof params === 'string' ? replaceSlash(params, GET_SUB_ADMINS) : GET_SUB_ADMINS;
  return ApiService.fetchData({
    url,
    method: METHOD_GET,
    params: typeof params === 'object' ? params : undefined,
  });
}

export async function apiGetSubAdminById(params) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, GET_SUB_ADMIN_BY_ID) : GET_SUB_ADMIN_BY_ID,
    method: METHOD_GET,
  });
}

export async function apiCreateSubAdmin(data) {
  return ApiService.fetchData({
    url: CREATE_SUB_ADMIN,
    method: METHOD_POST,
    data,
  });
}

export async function apiEditSubAdmin(params, data) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, EDIT_SUB_ADMIN) : EDIT_SUB_ADMIN,
    method: METHOD_POST,
    data,
  });
}
