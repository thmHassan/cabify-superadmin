import { CHANGE_PASSWORD, GET_USER_PROFILE, PAYMENT_REMINDER, UPDATE_PROFILE } from "../constants/api.route.constant";
import { METHOD_GET, METHOD_POST } from "../constants/method.constant";
import ApiService from "./ApiService";

export async function apiChangePassword(data) {
  return ApiService.fetchData({
    url: CHANGE_PASSWORD,
    method: METHOD_POST,
    data,
  });
}

export async function apiProfileUpdate(data) {
  return ApiService.fetchData({
    url: UPDATE_PROFILE,
    method: METHOD_POST,
    data,
  });
}

export async function apiGetProfile(id) {
  return ApiService.fetchData({
    url: `${GET_USER_PROFILE}?id=${id}`,
    method: METHOD_GET,
  });
}

export async function apiGetPymentReminder() {
  return ApiService.fetchData({
    url: `${PAYMENT_REMINDER}`,
    method: METHOD_GET,
  });
}