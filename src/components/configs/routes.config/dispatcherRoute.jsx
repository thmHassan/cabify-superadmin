import { lazy } from "react";
import * as KEY from "../../../constants/routes.key.constant/dispatcher.route.key.constant";
import * as PATH from "../../../constants/routes.path.constant/dispatcher.route.path.constant";

const dispatcherRoute = [
  {
    key: KEY.DISPATCHER_OVERVIEW_KEY,
    path: PATH.DISPATCHER_OVERVIEW_PATH,
    component: lazy(() => import("../../../views/dispatcher/pages/Overview")),
    authority: [],
  },
  {
    key: KEY.DISPATCHER_MAP_KEY,
    path: PATH.DISPATCHER_MAP_PATH,
    component: lazy(() => import("../../../views/dispatcher/pages/Map")),
    authority: [],
  },
  {
    key: KEY.DISPATCHER_PUSH_NOTIFICATION_KEY,
    path: PATH.DISPATCHER_PUSH_NOTIFICATION_PATH,
    component: lazy(() =>
      import("../../../views/dispatcher/pages/PushNotification")
    ),
    authority: [],
  },
  {
    key: KEY.DISPATCHER_CANCELLATIONS_KEY,
    path: PATH.DISPATCHER_CANCELLATIONS_PATH,
    component: lazy(() =>
      import("../../../views/dispatcher/pages/Cancellations")
    ),
    authority: [],
  },
  {
    key: KEY.DISPATCHER_USERS_KEY,
    path: PATH.DISPATCHER_USERS_PATH,
    component: lazy(() => import("../../../views/dispatcher/pages/Users")),
    authority: [],
  },
  {
    key: KEY.DISPATCHER_DRIVERS_KEY,
    path: PATH.DISPATCHER_DRIVERS_PATH,
    component: lazy(() => import("../../../views/dispatcher/pages/Drivers")),
    authority: [],
  },
  {
    key: KEY.DISPATCHER_RIDES_KEY,
    path: PATH.DISPATCHER_RIDES_PATH,
    component: lazy(() => import("../../../views/dispatcher/pages/Rides")),
    authority: [],
  },
  {
    key: KEY.DISPATCHER_SUPPORT_TICKETS_KEY,
    path: PATH.DISPATCHER_SUPPORT_TICKETS_PATH,
    component: lazy(() =>
      import("../../../views/dispatcher/pages/SupportTickets")
    ),
    authority: [],
  },
  {
    key: KEY.DISPATCHER_SOS_KEY,
    path: PATH.DISPATCHER_SOS_PATH,
    component: lazy(() => import("../../../views/dispatcher/pages/SOS")),
    authority: [],
  },
  {
    key: KEY.DISPATCHER_LOST_FOUND_KEY,
    path: PATH.DISPATCHER_LOST_FOUND_PATH,
    component: lazy(() => import("../../../views/dispatcher/pages/LostFound")),
    authority: [],
  },
];

export default dispatcherRoute;
