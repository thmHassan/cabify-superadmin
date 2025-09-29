import { lazy } from "react";
import * as KEY from "../../../constants/routes.key.constant/client.route.key.constant";
import * as PATH from "../../../constants/routes.path.constant/client.route.path.constant";

const clientRoute = [
  {
    key: KEY.CLIENT_OVERVIEW_KEY,
    path: PATH.CLIENT_OVERVIEW_PATH,
    component: lazy(() => import("../../../views/client/pages/Overview")),
    authority: [],
  },
  {
    key: KEY.CLIENT_DISPATCHER_KEY,
    path: PATH.CLIENT_DISPATCHER_PATH,
    component: lazy(() => import("../../../views/client/pages/Dispatcher")),
    authority: [],
  },
  {
    key: KEY.CLIENT_MAP_KEY,
    path: PATH.CLIENT_MAP_PATH,
    component: lazy(() => import("../../../views/client/pages/Map")),
    authority: [],
  },
  {
    key: KEY.CLIENT_PUSH_NOTIFICATION_KEY,
    path: PATH.CLIENT_PUSH_NOTIFICATION_PATH,
    component: lazy(() =>
      import("../../../views/client/pages/PushNotification")
    ),
    authority: [],
  },
  {
    key: KEY.CLIENT_USAGE_MONITORING_KEY,
    path: PATH.CLIENT_USAGE_MONITORING_PATH,
    component: lazy(() =>
      import("../../../views/client/pages/UsageMonitoring")
    ),
    authority: [],
  },
  {
    key: KEY.CLIENT_REVIEWS_KEY,
    path: PATH.CLIENT_REVIEWS_PATH,
    component: lazy(() => import("../../../views/client/pages/Reviews")),
    authority: [],
  },
  {
    key: KEY.CLIENT_CANCELLATIONS_KEY,
    path: PATH.CLIENT_CANCELLATIONS_PATH,
    component: lazy(() => import("../../../views/client/pages/Cancellations")),
    authority: [],
  },
  {
    key: KEY.CLIENT_BIDDING_KEY,
    path: PATH.CLIENT_BIDDING_PATH,
    component: lazy(() => import("../../../views/client/pages/Bidding")),
    authority: [],
  },
  {
    key: KEY.CLIENT_USERS_KEY,
    path: PATH.CLIENT_USERS_PATH,
    component: lazy(() => import("../../../views/client/pages/Users")),
    authority: [],
  },
  {
    key: KEY.CLIENT_DRIVERS_KEY,
    path: PATH.CLIENT_DRIVERS_PATH,
    component: lazy(() => import("../../../views/client/pages/Drivers")),
    authority: [],
  },
  {
    key: KEY.CLIENT_RIDES_KEY,
    path: PATH.CLIENT_RIDES_PATH,
    component: lazy(() => import("../../../views/client/pages/Rides")),
    authority: [],
  },
  {
    key: KEY.CLIENT_SERVICES_KEY,
    path: PATH.CLIENT_SERVICES_PATH,
    component: lazy(() => import("../../../views/client/pages/Services")),
    authority: [],
  },
  {
    key: KEY.CLIENT_REVENUE_STATEMENTS_KEY,
    path: PATH.CLIENT_REVENUE_STATEMENTS_PATH,
    component: lazy(() =>
      import("../../../views/client/pages/RevenueStatements")
    ),
    authority: [],
  },
  {
    key: KEY.CLIENT_FLEET_MANAGEMENT_KEY,
    path: PATH.CLIENT_FLEET_MANAGEMENT_PATH,
    component: lazy(() =>
      import("../../../views/client/pages/FleetManagement")
    ),
    authority: [],
  },
  {
    key: KEY.CLIENT_ZONE_BUILDER_KEY,
    path: PATH.CLIENT_ZONE_BUILDER_PATH,
    component: lazy(() => import("../../../views/client/pages/Zones")),
    authority: [],
  },
  {
    key: KEY.CLIENT_MANAGE_ZONES_KEY,
    path: PATH.CLIENT_MANAGE_ZONES_PATH,
    component: lazy(() => import("../../../views/client/pages/ManageZones")),
    authority: [],
  },
  {
    key: KEY.CLIENT_SETTINGS_KEY,
    path: PATH.CLIENT_SETTINGS_PATH,
    component: lazy(() => import("../../../views/client/pages/Settings")),
    authority: [],
  },
  {
    key: KEY.CLIENT_CMS_KEY,
    path: PATH.CLIENT_CMS_PATH,
    component: lazy(() => import("../../../views/client/pages/CMS")),
    authority: [],
  },
  {
    key: KEY.CLIENT_ADMINISTRATIONS_KEY,
    path: PATH.CLIENT_ADMINISTRATIONS_PATH,
    component: lazy(() =>
      import("../../../views/client/pages/Administrations")
    ),
    authority: [],
  },
  {
    key: KEY.CLIENT_SUPPORT_TICKETS_KEY,
    path: PATH.CLIENT_SUPPORT_TICKETS_PATH,
    component: lazy(() => import("../../../views/client/pages/SupportTickets")),
    authority: [],
  },
  {
    key: KEY.CLIENT_SOS_KEY,
    path: PATH.CLIENT_SOS_PATH,
    component: lazy(() => import("../../../views/client/pages/SOS")),
    authority: [],
  },
  {
    key: KEY.CLIENT_LOST_FOUND_KEY,
    path: PATH.CLIENT_LOST_FOUND_PATH,
    component: lazy(() => import("../../../views/client/pages/LostFound")),
    authority: [],
  },
  {
    key: KEY.CLIENT_DISPATCHER_KEY,
    path: PATH.CLIENT_DISPATCHER_PATH,
    component: lazy(() =>
      import("../../../views/client/pages/DispatcherSetting")
    ),
    authority: [],
  },
  {
    key: KEY.CLIENT_ACCOUNTS_KEY,
    path: PATH.CLIENT_ACCOUNTS_PATH,
    component: lazy(() => import("../../../views/client/pages/Accounts")),
    authority: [],
  },
];

export default clientRoute;
