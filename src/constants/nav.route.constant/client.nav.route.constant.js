import AccountActiveIcon from "../../components/svg/AccountActiveIcon";
import AccountIcon from "../../components/svg/AccountIcon";
import BiddingIcon from "../../components/svg/BiddingIcon";
import BinIcon from "../../components/svg/BinIcon";
import DashboardActiveIcon from "../../components/svg/DashboardActiveIcon";
import DashboardIcon from "../../components/svg/DashboardIcon";
import DispatcherIcon from "../../components/svg/DispatcherIcon";
import LostFoundIcon from "../../components/svg/LostFoundIcon";
import MapsConfigurationActiveIcon from "../../components/svg/MapsConfigurationActiveIcon";
import MapsConfigurationIcon from "../../components/svg/MapsConfigurationIcon";
import PushNotificationIcon from "../../components/svg/PushNotificationIcon";
import ReviewsIcon from "../../components/svg/ReviewsIcon";
import RidesIcon from "../../components/svg/RidesIcon";
import ServicesIcon from "../../components/svg/ServicesIcon";
import SettingIcon from "../../components/svg/SettingIcon";
import SosIcon from "../../components/svg/SosIcon";
import StatementsIcon from "../../components/svg/StatementsIcon";
import SupportTicketsIcon from "../../components/svg/SupportTicketsIcon";
import UsageMonitoringActiveIcon from "../../components/svg/UsageMonitoringActiveIcon";
import UsageMonitoringIcon from "../../components/svg/UsageMonitoringIcon";
import UsersIcon from "../../components/svg/UsersIcon";
import * as KEY from "../routes.key.constant/client.route.key.constant";
import * as PATH from "../routes.path.constant/client.route.path.constant";

const clientNavRoutes = [
  {
    title: "Main Menu",
    routes: [
      {
        key: KEY.CLIENT_OVERVIEW_KEY,
        title: "Dashboard",
        icon: {
          active: DashboardActiveIcon,
          component: DashboardIcon,
          size: 20,
        },
        route: PATH.CLIENT_OVERVIEW_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_DISPATCHER_KEY,
        title: "Dispatcher",
        icon: {
          active: DispatcherIcon,
          component: DispatcherIcon,
          size: 20,
        },
        route: PATH.CLIENT_DISPATCHER_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_MAP_KEY,
        title: "Map",
        icon: {
          active: MapsConfigurationIcon,
          component: MapsConfigurationIcon,
          size: 20,
        },
        route: PATH.CLIENT_MAP_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_PUSH_NOTIFICATION_KEY,
        title: "Push Notification",
        icon: {
          active: PushNotificationIcon,
          component: PushNotificationIcon,
          size: 20,
        },
        route: PATH.CLIENT_PUSH_NOTIFICATION_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_USAGE_MONITORING_KEY,
        title: "Usage Monitoring",
        icon: {
          active: UsageMonitoringActiveIcon,
          component: UsageMonitoringIcon,
          size: 20,
        },
        route: PATH.CLIENT_USAGE_MONITORING_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_REVIEWS_KEY,
        title: "Reviews",
        icon: {
          active: ReviewsIcon,
          component: ReviewsIcon,
          size: 20,
        },
        route: PATH.CLIENT_REVIEWS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_CANCELLATIONS_KEY,
        title: "Cancellations",
        icon: {
          active: BinIcon,
          component: BinIcon,
          size: 20,
        },
        route: PATH.CLIENT_CANCELLATIONS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_BIDDING_KEY,
        title: "Bidding",
        icon: {
          active: BiddingIcon,
          component: BiddingIcon,
          size: 20,
        },
        route: PATH.CLIENT_BIDDING_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_USERS_KEY,
        title: "Users",
        icon: {
          active: UsersIcon,
          component: UsersIcon,
          size: 20,
        },
        route: PATH.CLIENT_USERS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_DRIVERS_KEY,
        title: "Drivers",
        icon: {
          active: AccountActiveIcon,
          component: AccountIcon,
          size: 20,
        },
        route: PATH.CLIENT_DRIVERS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_RIDES_KEY,
        title: "Rides",
        icon: {
          active: RidesIcon,
          component: RidesIcon,
          size: 20,
        },
        route: PATH.CLIENT_RIDES_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_SERVICES_KEY,
        title: "Services",
        icon: {
          active: ServicesIcon,
          component: ServicesIcon,
          size: 20,
        },
        route: PATH.CLIENT_SERVICES_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_REVENUE_STATEMENTS_KEY,
        title: "Revenue & Statements",
        icon: {
          active: StatementsIcon,
          component: StatementsIcon,
          size: 20,
        },
        route: PATH.CLIENT_REVENUE_STATEMENTS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_FLEET_MANAGEMENT_KEY,
        title: "Fleet Management",
        icon: {
          active: RidesIcon,
          component: RidesIcon,
          size: 20,
        },
        route: PATH.CLIENT_FLEET_MANAGEMENT_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_ZONE_BUILDER_KEY,
        title: "Zone Builder",
        icon: {
          active: RidesIcon,
          component: RidesIcon,
          size: 20,
        },
        route: PATH.CLIENT_ZONE_BUILDER_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_MANAGE_ZONES_KEY,
        title: "Manage Zones",
        icon: {
          active: RidesIcon,
          component: RidesIcon,
          size: 20,
        },
        route: PATH.CLIENT_MANAGE_ZONES_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_SETTINGS_KEY,
        title: "Settings",
        icon: {
          active: SettingIcon,
          component: SettingIcon,
          size: 20,
        },
        route: PATH.CLIENT_SETTINGS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_CMS_KEY,
        title: "CMS",
        icon: {
          active: SupportTicketsIcon,
          component: SupportTicketsIcon,
          size: 20,
        },
        route: PATH.CLIENT_CMS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_ADMINISTRATIONS_KEY,
        title: "Administrations",
        icon: {
          active: SupportTicketsIcon,
          component: SupportTicketsIcon,
          size: 20,
        },
        route: PATH.CLIENT_ADMINISTRATIONS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_SUPPORT_TICKETS_KEY,
        title: "Support & Tickets",
        icon: {
          active: SupportTicketsIcon,
          component: SupportTicketsIcon,
          size: 20,
        },
        route: PATH.CLIENT_SUPPORT_TICKETS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_SOS_KEY,
        title: "SOS",
        icon: {
          active: SosIcon,
          component: SosIcon,
          size: 20,
        },
        route: PATH.CLIENT_SOS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_LOST_FOUND_KEY,
        title: "Lost & Found",
        icon: {
          active: LostFoundIcon,
          component: LostFoundIcon,
          size: 20,
        },
        route: PATH.CLIENT_LOST_FOUND_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.CLIENT_ACCOUNTS_KEY,
        title: "Accounts",
        icon: {
          active: SupportTicketsIcon,
          component: SupportTicketsIcon,
          size: 20,
        },
        route: PATH.CLIENT_ACCOUNTS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
    ],
  },
];

export default clientNavRoutes;
