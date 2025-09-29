import AccountActiveIcon from "../../components/svg/AccountActiveIcon";
import AccountIcon from "../../components/svg/AccountIcon";
import APIKeysActiveIcon from "../../components/svg/APIKeysActiveIcon";
import APIKeysIcon from "../../components/svg/APIKeysIcon";
import CompaniesActiveIcon from "../../components/svg/CompaniesActiveIcon";
import CompaniesIcon from "../../components/svg/CompaniesIcon";
// import ControllerIcon from "../../components/svg/ControllerIcon";
// import CustomerUserIcon from "../../components/svg/CustomerUserIcon";
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
// import TarrifIcon from "../../components/svg/TarrifIcon";
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
      },
      {
        key: KEY.SYSTEM_ANALYTICS_KEY,
        title: "System Analytics",
        icon: {
          active: SystemAnalyticsActiveIcon,
          component: SystemAnalyticsIcon,
          size: 20,
        },
        route: PATH.SYSTEM_ANALYTICS_PATH,
        active: [],
        isSubMenu: false,
        subMenu: [],
      },
      {
        key: KEY.DRIVER_VEHICLE_KEY,
        title: "Vehicle",
        icon: {
          active: DriverVehicleIcon,
          component: DriverVehicleIcon,
          size: 20,
        },
        route: PATH.DRIVER_VEHICLE_PATH,
        active: [],
        isSubMenu: true,
        subMenu: [],
      },
      {
        key: KEY.DRIVER_KEY,
        title: "Driver",
        icon: {
          active: DriverIcon,
          component: DriverIcon,
          size: 20,
        },
        route: PATH.DRIVER_PATH,
        active: [],
        isSubMenu: true,
        subMenu: [],
      },
      // {
      //   key: KEY.TARRIF_KEY,
      //   title: "Tarrif",
      //   icon: {
      //     active: TarrifIcon,
      //     component: TarrifIcon,
      //     size: 20,
      //   },
      //   route: PATH.TARRIF_PATH,
      //   active: [],
      //   isSubMenu: true,
      //   subMenu: [],
      // },
      {
        key: KEY.ZONES_LOCATION_KEY,
        title: "Zones / Location",
        icon: {
          active: ZonesLocationIcon,
          component: ZonesLocationIcon,
          size: 20,
        },
        route: PATH.ZONES_LOCATION_PATH,
        active: [],
        isSubMenu: true,
        subMenu: [],
      },
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
        isSubMenu: true,
        subMenu: [],
      },
      // {
      //   key: KEY.CUSTOMER_USER_KEY,
      //   title: "Customer / User",
      //   icon: {
      //     active: CustomerUserIcon,
      //     component: CustomerUserIcon,
      //     size: 20,
      //   },
      //   route: PATH.CUSTOMER_USER_PATH,
      //   active: [],
      //   isSubMenu: true,
      //   subMenu: [],
      // },
      // {
      //   key: KEY.CONTROLLER_KEY,
      //   title: "Controller",
      //   icon: {
      //     active: ControllerIcon,
      //     component: ControllerIcon,
      //     size: 20,
      //   },
      //   route: PATH.CONTROLLER_PATH,
      //   active: [],
      //   isSubMenu: true,
      //   subMenu: [],
      // },
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
      },
    ],
  },
];

export default userNavRoutes;
