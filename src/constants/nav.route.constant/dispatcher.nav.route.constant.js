import AccountActiveIcon from "../../components/svg/AccountActiveIcon";
import AccountIcon from "../../components/svg/AccountIcon";
import BinIcon from "../../components/svg/BinIcon";
import DashboardActiveIcon from "../../components/svg/DashboardActiveIcon";
import DashboardIcon from "../../components/svg/DashboardIcon";
import LostFoundIcon from "../../components/svg/LostFoundIcon";
import MapsConfigurationIcon from "../../components/svg/MapsConfigurationIcon";
import PushNotificationIcon from "../../components/svg/PushNotificationIcon";
import RidesIcon from "../../components/svg/RidesIcon";
import SosIcon from "../../components/svg/SosIcon";
import SupportTicketsIcon from "../../components/svg/SupportTicketsIcon";
import UsersIcon from "../../components/svg/UsersIcon";
import * as KEY from "../routes.key.constant/dispatcher.route.key.constant";
import * as PATH from "../routes.path.constant/dispatcher.route.path.constant";

const dispatcherNavRoutes = [
  {
    title: "Main Menu",
    routes: [
      {
        key: KEY.DISPATCHER_OVERVIEW_KEY,
        title: "Dispatcher Dashboard",
        icon: {
          active: DashboardActiveIcon,
          component: DashboardIcon,
          size: 20,
        },
        route: PATH.DISPATCHER_OVERVIEW_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.DISPATCHER_MAP_KEY,
        title: "Map",
        icon: {
          active: MapsConfigurationIcon,
          component: MapsConfigurationIcon,
          size: 20,
        },
        route: PATH.DISPATCHER_MAP_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.DISPATCHER_PUSH_NOTIFICATION_KEY,
        title: "Push Notification",
        icon: {
          active: PushNotificationIcon,
          component: PushNotificationIcon,
          size: 20,
        },
        route: PATH.DISPATCHER_PUSH_NOTIFICATION_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.DISPATCHER_CANCELLATIONS_KEY,
        title: "Cancellations",
        icon: {
          active: BinIcon,
          component: BinIcon,
          size: 20,
        },
        route: PATH.DISPATCHER_CANCELLATIONS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.DISPATCHER_USERS_KEY,
        title: "Users",
        icon: {
          active: UsersIcon,
          component: UsersIcon,
          size: 20,
        },
        route: PATH.DISPATCHER_USERS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.DISPATCHER_DRIVERS_KEY,
        title: "Drivers",
        icon: {
          active: AccountActiveIcon,
          component: AccountIcon,
          size: 20,
        },
        route: PATH.DISPATCHER_DRIVERS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.DISPATCHER_RIDES_KEY,
        title: "Rides",
        icon: {
          active: RidesIcon,
          component: RidesIcon,
          size: 20,
        },
        route: PATH.DISPATCHER_RIDES_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.DISPATCHER_SUPPORT_TICKETS_KEY,
        title: "Support & Tickets",
        icon: {
          active: SupportTicketsIcon,
          component: SupportTicketsIcon,
          size: 20,
        },
        route: PATH.DISPATCHER_SUPPORT_TICKETS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.DISPATCHER_SOS_KEY,
        title: "SOS",
        icon: {
          active: SosIcon,
          component: SosIcon,
          size: 20,
        },
        route: PATH.DISPATCHER_SOS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.DISPATCHER_LOST_FOUND_KEY,
        title: "Lost & Found",
        icon: {
          active: LostFoundIcon,
          component: LostFoundIcon,
          size: 20,
        },
        route: PATH.DISPATCHER_LOST_FOUND_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
    ],
  },
];

export default dispatcherNavRoutes;
