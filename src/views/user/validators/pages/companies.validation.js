import * as Yup from "yup";

const OPTIONAL_BOOLEAN = Yup.boolean()
  .nullable()
  .transform((value, originalValue) => {
    if (originalValue === "" || originalValue === null || originalValue === undefined) {
      return null;
    }

    if (["true", "yes", "enable", "on"].includes(String(originalValue).toLowerCase())) return true;
    if (["false", "no", "disable", "off"].includes(String(originalValue).toLowerCase())) return false;
    return value;
  });

export const BASIC_INFORMATION_VALIDATION_SCHEMA = {
  company_name: Yup.string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  company_admin_name: Yup.string()
    .required("Company admin name is required")
    .min(2, "Admin name must be at least 2 characters"),
  user_name: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  company_id: Yup.string()
    .required("Company ID is required")
    .min(2, "Company ID must be at least 2 characters"),
  contact_person: Yup.string()
    .required("Contact person is required")
    .min(2, "Contact person name must be at least 2 characters"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  city: Yup.string()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),
  currency: Yup.string().required("Currency is required"),
};

export const SERVICE_INFORMATION_VALIDATION_SCHEMA = {
  maps_api: Yup.string().required("Maps API is required"),
  search_api: Yup.string().required("Search API is required"),
  passengers_allowed: Yup.number()
    .required("Passengers allowed is required")
    .min(1, "Must allow at least 1 passenger")
    .integer("Must be a whole number"),
  dispatchers_allowed: Yup.number()
    .required("Dispatchers allowed is required")
    .min(1, "Must allow at least 1 dispatcher")
    .integer("Must be a whole number"),
  drivers_allowed: Yup.number()
    .required("Drivers allowed is required")
    .min(1, "Must allow at least 1 driver")
    .integer("Must be a whole number"),
  subscription_type: Yup.string().required("Subscription type is required"),


  log_map_search_result: OPTIONAL_BOOLEAN,
  voip: OPTIONAL_BOOLEAN,
  sub_company: OPTIONAL_BOOLEAN,

  uber_plot_hybrid: Yup.string().required("System type is required"),
  fleet_management: Yup.string().required("Fleet management option is required"),
  sos_features: Yup.string().required("SOS features option is required"),
  notes: Yup.string().nullable(),
};


export const SYSTEM_INFORMATION_VALIDATION_SCHEMA = {
  units: Yup.string().required("Units are required"),
  country_of_use: Yup.string().required("Country is required"),
  time_zone: Yup.string().required("Time zone is required"),

  stripe_enable: Yup.boolean(),
  enable_smtp: Yup.boolean(),
};


export const ENABLEMENT_INFORMATION_VALIDATION_SCHEMA = {
  dispatcher: OPTIONAL_BOOLEAN,
  map: OPTIONAL_BOOLEAN,
  push_notification: OPTIONAL_BOOLEAN,
  usage_monitoring: OPTIONAL_BOOLEAN,
  revenue_statements: OPTIONAL_BOOLEAN,
  zone: OPTIONAL_BOOLEAN,
  manage_zones: OPTIONAL_BOOLEAN,
  cms: OPTIONAL_BOOLEAN,
  lost_found: OPTIONAL_BOOLEAN,
  accounts: OPTIONAL_BOOLEAN,
};

export const COMPANY_VALIDATION_SCHEMA = Yup.object().shape({
  ...BASIC_INFORMATION_VALIDATION_SCHEMA,
  ...SERVICE_INFORMATION_VALIDATION_SCHEMA,
  ...SYSTEM_INFORMATION_VALIDATION_SCHEMA,
  ...ENABLEMENT_INFORMATION_VALIDATION_SCHEMA,
});

export const COMPANY_SETTING_VALIDATION_SCHEMA = Yup.object().shape({
  mapApiProvider: Yup.string().trim().required("Map API provider is required"),
  callApiProvider: Yup.string().trim().required("Call API provider is required"),
  paymentMethod: Yup.string().trim().required("Payment method is required"),
  planType: Yup.string().trim().required("Plan type is required"),
  mapSearchApiProvider: Yup.string()
    .trim()
    .required("Map search API provider is required"),
});
