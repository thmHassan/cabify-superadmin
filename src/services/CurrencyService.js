import BaseService from "./BaseService";

export const apiGetCurrencies = (search = "") =>
  BaseService({ method: "GET", url: "/super-admin/currencies", params: search ? { search } : {} });

export const apiGetActiveCurrencies = () =>
  BaseService({ method: "GET", url: "/super-admin/currencies/active" });

export const apiCreateCurrency = (data) =>
  BaseService({ method: "POST", url: "/super-admin/currencies", data });

export const apiUpdateCurrency = (id, data) =>
  BaseService({ method: "PUT", url: `/super-admin/currencies/${id}`, data });

export const apiUpdateCurrencyStatus = (id, isActive) =>
  BaseService({ method: "PATCH", url: `/super-admin/currencies/${id}/status`, data: { is_active: isActive } });
