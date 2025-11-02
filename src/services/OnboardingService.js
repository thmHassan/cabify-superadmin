import {
  CREATE_ONBOARDING_REQUEST,
  EDIT_ONBOARDING,
  GET_ONBOARDING_BY_ID,
  GET_ONBOARDING_REQUEST,
  POST_EDIT_ONBOARDING_STATUS,
} from "../constants/api.route.constant";
import { METHOD_GET, METHOD_POST } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiCreateOnboarding(data) {
  return ApiService.fetchData({
    url: CREATE_ONBOARDING_REQUEST,
    method: METHOD_POST,
    data,
  });
}

export async function apiGetOnboarding(params) {
  return ApiService.fetchData({
    url: params
      ? replaceSlash(params, GET_ONBOARDING_REQUEST)
      : GET_ONBOARDING_REQUEST,
    method: METHOD_GET,
  });
}

export async function apiGetOnboardingById(params) {
  return ApiService.fetchData({
    url: params
      ? replaceSlash(params, GET_ONBOARDING_BY_ID)
      : GET_ONBOARDING_BY_ID,
    method: METHOD_GET,
  });
}

export async function apiEditOnboardingStatus(data) {
  return ApiService.fetchData({
    url: POST_EDIT_ONBOARDING_STATUS,
    method: METHOD_POST,
    data,
  });
}

export async function apiEditOnboarding(params, data) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, EDIT_ONBOARDING) : EDIT_ONBOARDING,
    method: METHOD_POST,
    data,
  });
}
