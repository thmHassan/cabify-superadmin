import ApiService from "./ApiService";

export async function apiSignIn(data) {
  return ApiService.fetchData({
    url: "/sign-in",
    method: "post",
    data,
  });
}

export async function apiSignOut() {
  return ApiService.fetchData({
    url: "/sign-out",
    method: "post",
  });
}
