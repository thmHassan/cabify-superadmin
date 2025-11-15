import AccountActiveIcon from "../../components/svg/AccountActiveIcon";
import AccountIcon from "../../components/svg/AccountIcon";
import APIKeysActiveIcon from "../../components/svg/APIKeysActiveIcon";
import APIKeysIcon from "../../components/svg/APIKeysIcon";
import CompaniesActiveIcon from "../../components/svg/CompaniesActiveIcon";
import CompaniesIcon from "../../components/svg/CompaniesIcon";
import DashboardActiveIcon from "../../components/svg/DashboardActiveIcon";
import DashboardIcon from "../../components/svg/DashboardIcon";
import DriverIcon from "../../components/svg/DriverIcon";
import DriverVehicleIcon from "../../components/svg/DriverVehicleIcon";
import MapsConfigurationIcon from "../../components/svg/MapsConfigurationIcon";
import OnboardingActiveIcon from "../../components/svg/OnboardingActiveIcon";
import OnboardingIcon from "../../components/svg/OnboardingIcon";
import PaymentsIcon from "../../components/svg/PaymentsIcon";
import SettingIcon from "../../components/svg/SettingIcon";
import SubscriptionActiveIcon from "../../components/svg/SubscriptionActiveIcon";
import SubscriptionIcon from "../../components/svg/SubscriptionIcon";
import SystemAnalyticsActiveIcon from "../../components/svg/SystemAnalyticsActiveIcon";
import SystemAnalyticsIcon from "../../components/svg/SystemAnalyticsIcon";
import UsageMonitoringActiveIcon from "../../components/svg/UsageMonitoringActiveIcon";
import UsageMonitoringIcon from "../../components/svg/UsageMonitoringIcon";
import VoIPSettingsIcon from "../../components/svg/VoIPSettingsIcon";
import ZonesLocationIcon from "../../components/svg/ZonesLocationIcon";
import * as KEY from "../routes.key.constant/user.route.key.constant";
import * as PATH from "../routes.path.constant/user.route.path.constant";

const userNavRoutes = [
  {
    title: "Main Menu",
    routes: [
      {
        key: KEY.OVERVIEW_KEY,
        title: "Dashboard",
        icon: {
          active: DashboardActiveIcon,
          component: DashboardIcon,
          size: 20,
        },
        route: PATH.OVERVIEW_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: false,
      },
      {
        key: KEY.COMPANIES_KEY,
        title: "Companies",
        icon: {
          active: CompaniesActiveIcon,
          component: CompaniesIcon,
          size: 20,
        },
        route: PATH.COMPANIES_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: false,
      },
      {
        key: KEY.ONBOARDING_KEY,
        title: "Onboarding",
        icon: {
          active: OnboardingActiveIcon,
          component: OnboardingIcon,
          size: 20,
        },
        route: PATH.ONBOARDING_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: false,
      },
      {
        key: KEY.SUBSCRIPTION_KEY,
        title: "Subscription",
        icon: {
          active: SubscriptionActiveIcon,
          component: SubscriptionIcon,
          size: 20,
        },
        route: PATH.SUBSCRIPTION_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: false,
      },
      {
        key: KEY.USAGE_MONITORING_KEY,
        title: "Usage monitoring",
        icon: {
          active: UsageMonitoringActiveIcon,
          component: UsageMonitoringIcon,
          size: 20,
        },
        route: PATH.USAGE_MONITORING_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: false,
      },
      // {
      //   key: KEY.SYSTEM_ANALYTICS_KEY,
      //   title: "System Analytics",
      //   icon: {
      //     active: SystemAnalyticsActiveIcon,
      //     component: SystemAnalyticsIcon,
      //     size: 20,
      //   },
      //   route: PATH.SYSTEM_ANALYTICS_PATH,
      //   active: [],
      //   isSubMenu: false,
      //   subMenu: [],
      //   isStatic: true,
      // },
      // {
      //   key: KEY.DRIVER_VEHICLE_KEY,
      //   title: "Vehicle",
      //   icon: {
      //     active: DriverVehicleIcon,
      //     component: DriverVehicleIcon,
      //     size: 20,
      //   },
      //   route: PATH.DRIVER_VEHICLE_PATH,
      //   active: [PATH.DRIVER_VEHICLE_NEW_PATH],
      //   isSubMenu: false,
      //   subMenu: [],
      //   isStatic: false,
      // },
      // {
      //   key: KEY.DRIVER_KEY,
      //   title: "Driver’s Documents",
      //   icon: {
      //     active: DriverIcon,
      //     component: DriverIcon,
      //     size: 20,
      //   },
      //   route: PATH.DRIVER_PATH,
      //   active: [],
      //   isSubMenu: false,
      //   subMenu: [],
      //   isStatic: false,
      // },
      // {
      //   key: KEY.ZONES_LOCATION_KEY,
      //   title: "Zones / Location",
      //   icon: {
      //     active: ZonesLocationIcon,
      //     component: ZonesLocationIcon,
      //     size: 20,
      //   },
      //   route: PATH.ZONES_LOCATION_PATH,
      //   active: [],
      //   isSubMenu: false,
      //   subMenu: [],
      //   isStatic: false,
      // },
      {
        key: KEY.ACCOUNT_KEY,
        title: "Account",
        icon: {
          active: AccountActiveIcon,
          component: AccountIcon,
          size: 20,
        },
        route: PATH.ACCOUNT_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: false,
      },
      {
        key: KEY.SUB_ADMIN_MANAGEMENT_KEY,
        title: "Sub Admin Management",
        icon: {
          active: AccountActiveIcon,
          component: AccountIcon,
          size: 20,
        },
        route: PATH.SUB_ADMIN_MANAGEMENT_PATH,
        active: [],
        subMenu: [],
        isStatic: false,
      },
    ],
  },
  {
    title: "Configuration",
    routes: [
      {
        key: KEY.API_KEYS_KEY,
        title: "API Keys",
        icon: {
          active: APIKeysActiveIcon,
          component: APIKeysIcon,
          size: 20,
        },
        route: PATH.API_KEYS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: false,
      },
      {
        key: KEY.MAPS_CONFIGURATION_KEY,
        title: "Maps Configuration",
        icon: {
          active: MapsConfigurationIcon,
          component: MapsConfigurationIcon,
          size: 20,
        },
        route: PATH.MAPS_CONFIGURATION_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: true,
      },
      {
        key: KEY.VOIP_SETTINGS_KEY,
        title: "VoIP Settings",
        icon: {
          active: VoIPSettingsIcon,
          component: VoIPSettingsIcon,
          size: 20,
        },
        route: PATH.VOIP_SETTINGS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: true,
      },
      {
        key: KEY.PAYMENTS_KEY,
        title: "Payments",
        icon: {
          active: PaymentsIcon,
          component: PaymentsIcon,
          size: 20,
        },
        route: PATH.PAYMENTS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: true,
      },
      {
        key: KEY.SYSTEM_SETTINGS_KEY,
        title: "System Settings",
        icon: {
          active: SettingIcon,
          component: SettingIcon,
          size: 20,
        },
        route: PATH.SYSTEM_SETTINGS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
        isStatic: true,
      },
    ],
  },
];

export default userNavRoutes;
