import { method } from "lodash";
import {
  CREATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTIONS,
  EDIT_SUBSCRIPTION,
  GET_STRIPE_KEYS,
  GET_SUBSCRIPTION_BY_ID,
  GET_SUBSCRIPTION_CARDS,
  GET_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_MANAGEMENT,
} from "../constants/api.route.constant";
import { METHOD_GET, METHOD_POST } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiGetSubscriptionCardDetails(params) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, GET_SUBSCRIPTION_CARDS) : GET_SUBSCRIPTION_CARDS,
    method: METHOD_GET,
  });
}

export async function apiGetSubscriptions(params) {
  const url = typeof params === 'string' ? replaceSlash(params, GET_SUBSCRIPTIONS) : GET_SUBSCRIPTIONS;
  return ApiService.fetchData({
    url,
    method: METHOD_GET,
    params: typeof params === 'object' ? params : undefined,
  });
}

export async function apiGetSubscriptionManagement(params) {
  const url = typeof params === 'string' ? replaceSlash(params, GET_SUBSCRIPTIONS_MANAGEMENT) : GET_SUBSCRIPTIONS_MANAGEMENT;
  return ApiService.fetchData({
    url,
    method: METHOD_GET,
    params: typeof params === 'object' ? params : undefined,
  });
}

export async function apiCreateSubscription(data) {
  return ApiService.fetchData({
    url: CREATE_SUBSCRIPTION,
    method: METHOD_POST,
    data,
  });
}

export async function apiGetSubscriptionById(params, data) {
  return ApiService.fetchData({
    url: params
      ? replaceSlash(params, GET_SUBSCRIPTION_BY_ID)
      : GET_SUBSCRIPTION_BY_ID,
    method: METHOD_GET,
    data,
  });
}

export async function apiEditSubscription(params, data) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, EDIT_SUBSCRIPTION) : EDIT_SUBSCRIPTION,
    method: METHOD_POST,
    data,
  });
}

export async function apiDeleteSubscription(params) {
  return ApiService.fetchData({
    url: `${DELETE_SUBSCRIPTIONS}?id=${params.id}`,
    method: METHOD_GET,
  });
}

export async function apiGetStripeKeys() {
  return ApiService.fetchData({
    url: GET_STRIPE_KEYS,
    method: METHOD_GET,
  });
}