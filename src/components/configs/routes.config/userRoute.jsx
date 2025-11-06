import { lazy } from "react";
import * as KEY from "../../../constants/routes.key.constant/user.route.key.constant";
import * as PATH from "../../../constants/routes.path.constant/user.route.path.constant";

const userRoute = [
  {
    key: KEY.OVERVIEW_KEY,
    path: PATH.OVERVIEW_PATH,
    component: lazy(() => import("../../../views/user/pages/Overview")),
    authority: [],
  },
  {
    key: KEY.COMPANIES_KEY,
    path: PATH.COMPANIES_PATH,
    component: lazy(() => import("../../../views/user/pages/Companies")),
    authority: [],
  },
  {
    key: KEY.ONBOARDING_KEY,
    path: PATH.ONBOARDING_PATH,
    component: lazy(() => import("../../../views/user/pages/Onboarding")),
    authority: [],
  },
  {
    key: KEY.SUBSCRIPTION_KEY,
    path: PATH.SUBSCRIPTION_PATH,
    component: lazy(() => import("../../../views/user/pages/Subscription")),
    authority: [],
  },
  {
    key: KEY.USAGE_MONITORING_KEY,
    path: PATH.USAGE_MONITORING_PATH,
    component: lazy(() => import("../../../views/user/pages/UsageMonitoring")),
    authority: [],
  },
  {
    key: KEY.SYSTEM_ANALYTICS_KEY,
    path: PATH.SYSTEM_ANALYTICS_PATH,
    component: lazy(() => import("../../../views/user/pages/SystemAnalytics")),
    authority: [],
  },
  {
    key: KEY.DRIVER_VEHICLE_KEY,
    path: PATH.DRIVER_VEHICLE_PATH,
    component: lazy(() => import("../../../views/user/pages/DriverVehicle")),
    authority: [],
  },
  {
    key: KEY.DRIVER_VEHICLE_NEW_KEY,
    path: PATH.DRIVER_VEHICLE_NEW_PATH,
    component: lazy(() =>
      import(
        "../../../views/user/pages/DriverVehicle/components/NewDriverVehicle"
      )
    ),
    authority: [],
  },
  {
    key: KEY.DRIVER_VEHICLE_EDIT_KEY,
    path: PATH.DRIVER_VEHICLE_EDIT_PATH,
    component: lazy(() =>
      import(
        "../../../views/user/pages/DriverVehicle/components/EditDriverVehicle"
      )
    ),
    authority: [],
  },
  // {
  //   key: KEY.TARRIF_KEY,
  //   path: PATH.TARRIF_PATH,
  //   component: lazy(() => import("../../../views/user/pages/Tarrif")),
  //   authority: [],
  // },
  {
    key: KEY.ZONES_LOCATION_KEY,
    path: PATH.ZONES_LOCATION_PATH,
    component: lazy(() => import("../../../views/user/pages/ZonesLocation")),
    authority: [],
  },
  {
    key: KEY.ACCOUNT_KEY,
    path: PATH.ACCOUNT_PATH,
    component: lazy(() => import("../../../views/user/pages/Account")),
    authority: [],
  },
  {
    key: KEY.CUSTOMER_USER_KEY,
    path: PATH.CUSTOMER_USER_PATH,
    component: lazy(() => import("../../../views/user/pages/CustomerUser")),
    authority: [],
  },
  {
    key: KEY.DRIVER_KEY,
    path: PATH.DRIVER_PATH,
    component: lazy(() => import("../../../views/user/pages/Driver")),
    authority: [],
  },
  {
    key: KEY.CONTROLLER_KEY,
    path: PATH.CONTROLLER_PATH,
    component: lazy(() => import("../../../views/user/pages/Controller")),
    authority: [],
  },
  {
    key: KEY.API_KEYS_KEY,
    path: PATH.API_KEYS_PATH,
    component: lazy(() => import("../../../views/user/pages/ApiKeys")),
    authority: [],
  },
  {
    key: KEY.MAPS_CONFIGURATION_KEY,
    path: PATH.MAPS_CONFIGURATION_PATH,
    component: lazy(() =>
      import("../../../views/user/pages/MapsConfiguration")
    ),
    authority: [],
  },
  {
    key: KEY.VOIP_SETTINGS_KEY,
    path: PATH.VOIP_SETTINGS_PATH,
    component: lazy(() => import("../../../views/user/pages/VoIPSettings")),
    authority: [],
  },
  {
    key: KEY.PAYMENTS_KEY,
    path: PATH.PAYMENTS_PATH,
    component: lazy(() => import("../../../views/user/pages/Payments")),
    authority: [],
  },
  {
    key: KEY.SYSTEM_SETTINGS_KEY,
    path: PATH.SYSTEM_SETTINGS_PATH,
    component: lazy(() => import("../../../views/user/pages/SystemSettings")),
    authority: [],
  },
  {
    key: KEY.SUB_ADMIN_MANAGEMENT_KEY,
    path: PATH.SUB_ADMIN_MANAGEMENT_PATH,
    component: lazy(() =>
      import("../../../views/user/pages/SubAdminManagement")
    ),
    authority: [],
  },
  {
    key: KEY.SUBSCRIPTION_SUCCESS_KEY,
    path: PATH.SUBSCRIPTION_SUCCESS_PATH,
    component: lazy(() => import("../../../views/auth/pages/SubscriptionSuccess/SubscriptionSuccess")),
    authority: [],
  },
  {
    key: KEY.PAYMENT_FAILED_KEY,
    path: PATH.PAYMENT_FAILED_PATH,
    component: lazy(() => import("../../../views/auth/pages/PaymentFailed/PaymentFailed")),
    authority: [],
  },
];

export default userRoute;
