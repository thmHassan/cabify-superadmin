import {
  CREATE_VEHICLE_TYPE,
  DELETE_VEHICLE_TYPE,
  EDIT_VEHICLE_TYPE,
  GET_VEHICLE_TYPE_BY_ID,
  GET_VEHICLE_TYPES,
} from "../constants/api.route.constant";
import { METHOD_GET, METHOD_POST } from "../constants/method.constant";
import { replaceSlash } from "../utils/functions/common.function";
import ApiService from "./ApiService";

export async function apiGetVehicleTypes(params) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, GET_VEHICLE_TYPES) : GET_VEHICLE_TYPES,
    method: METHOD_GET,
  });
}

export async function apiGetVehicleTypeById(params) {
  return ApiService.fetchData({
    url: params
      ? replaceSlash(params, GET_VEHICLE_TYPE_BY_ID)
      : GET_VEHICLE_TYPE_BY_ID,
    method: METHOD_GET,
  });
}

export async function apiCreateVehicleType(data) {
  return ApiService.fetchData({
    url: CREATE_VEHICLE_TYPE,
    method: METHOD_POST,
    data,
  });
}

export async function apiEditVehicleType(params, data) {
  return ApiService.fetchData({
    url: params ? replaceSlash(params, EDIT_VEHICLE_TYPE) : EDIT_VEHICLE_TYPE,
    method: METHOD_POST,
    data,
  });
}

export async function apiDeleteVehicleType(data) {
  return ApiService.fetchData({
    url: DELETE_VEHICLE_TYPE,
    method: METHOD_POST,
    data,
  });
}
