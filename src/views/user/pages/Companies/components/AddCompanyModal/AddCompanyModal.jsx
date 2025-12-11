import { useEffect, useRef, useState } from "react";
import TabView from "../../../../../../components/shared/TabView/TabView";
import ImageUploadIcon from "../../../../../../components/svg/ImageUploadIcon";
import BasicInformation from "../BasicInformation";
import EnablementInformation from "../EnablementInformation";
import ServicesInformation from "../ServicesInformation";
import SystemInformation from "../SystemInformation";
import {
  convertToFormData,
  toBoolean,
  toYesNo,
  unlockBodyScroll,
} from "../../../../../../utils/functions/common.function";
import { apiGetCompanyDetailsById } from "../../../../../../services/CompanyService";
import _ from "lodash";
import { MODAL_CONFIG } from "../../configs/ModalConfigs";
import { Form, Formik } from "formik";
import {
  COMPANY_VALIDATION_SCHEMA,
  BASIC_INFORMATION_VALIDATION_SCHEMA,
  SERVICE_INFORMATION_VALIDATION_SCHEMA,
  SYSTEM_INFORMATION_VALIDATION_SCHEMA,
  ENABLEMENT_INFORMATION_VALIDATION_SCHEMA,
} from "../../../../validators/pages/companies.validation";
import * as Yup from "yup";

const AddCompanyModal = ({
  modalType = "company",
  isCompanyModalOpen,
  setIsOpen,
  id,
  onRefresh,
  initialValue = {},
}) => {
  const { type } = isCompanyModalOpen;
  const [formData, setFormData] = useState(initialValue);
  const [companyCreated, setCompanyCreated] = useState(false);
  const [createdCompany, setCreatedCompany] = useState(null);
  const [createdCompanyId, setCreatedCompanyId] = useState(null);
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // Initialize initialValues to handle undefined or missing values
  const [initialValues, setInitialValues] = useState({
    company_name: formData.company_name || "",
    company_admin_name: formData.company_admin_name || "",
    user_name: formData.user_name || "",
    password: "",
    company_id: formData.company_id || "",
    contact_person: formData.contact_person || "",
    email: formData.email || "",
    phone: formData.phone || "",
    address: formData.address || "",
    city: formData.city || "",
    currency: formData.currency || "INR",
    maps_api: formData.maps_api || "barikoi",
    search_api: formData.search_api || "barikoi",
    passengers_allowed: formData.passengers_allowed || 0,
    dispatchers_allowed: formData.dispatchers_allowed || 0,
    drivers_allowed: formData.drivers_allowed || 0,
    subscription_type: formData.subscription_type || 1,
    log_map_search_result: formData.log_map_search_result ?? false,
    voip: formData.voip ?? false,
    sub_company: formData.sub_company ?? false,
    uber_plot_hybrid: formData.uber_plot_hybrid || "both",
    fleet_management: formData.fleet_management ?? false,
    sos_features: formData.sos_features ?? false,
    notes: formData.notes || "",
    units: formData.units || "miles",
    country_of_use: formData.country_of_use || "",
    time_zone: formData.time_zone || "America/New_York",
    stripe_enable: formData.stripe_enable ?? false,
    enable_smtp: formData.enable_smtp ?? false,
    stripe_enablement: formData.stripe_enablement || "",
    dispatcher: formData.dispatcher ?? false,
    map: formData.map ?? false,
    push_notification: formData.push_notification ?? false,
    usage_monitoring: formData.usage_monitoring ?? false,
    revenue_statements: formData.revenue_statements ?? false,
    zone: formData.zone ?? false,
    manage_zones: formData.manage_zones ?? false,
    cms: formData.cms ?? false,
    lost_found: formData.lost_found ?? false,
    accounts: formData.accounts ?? false,
    subscription: {},
    picture: formData.picture || null,
  });

  const fileInputRef = useRef(null);
  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, picture: file }));
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return objectUrl;
    });
  };

  const TABS_CONFIGS = [
    { title: "Basic Info", component: BasicInformation },
    { title: "Services", component: ServicesInformation },
    { title: "System", component: SystemInformation },
    { title: "Enablement", component: EnablementInformation },
  ];

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setIsCreatingCompany(true);
      setSubmitError(null);

      const {
        log_map_search_result,
        accounts,
        dispatcher,
        password,
        map,
        push_notification,
        usage_monitoring,
        revenue_statements,
        zone,
        manage_zones,
        cms,
        lost_found,
        voip,
        enable_smtp,
        sub_company,
        stripe_enable,
      } = values;

      const formattedValues = {
        ...values,
        stripe_enable: toYesNo(stripe_enable),
        log_map_search_result: toYesNo(log_map_search_result, 3),
        accounts: toYesNo(accounts, 2),
        enable_smtp: toYesNo(enable_smtp),
        sub_company: toYesNo(sub_company),
        dispatcher: toYesNo(dispatcher, 2),
        map: toYesNo(map, 2),
        push_notification: toYesNo(push_notification, 2),
        usage_monitoring: toYesNo(usage_monitoring, 2),
        revenue_statements: toYesNo(revenue_statements, 2),
        zone: toYesNo(zone, 2),
        manage_zones: toYesNo(manage_zones, 2),
        cms: toYesNo(cms, 2),
        lost_found: toYesNo(lost_found, 2),
        voip: toYesNo(voip, 2),
      };

      const formValues = { ...formattedValues, ...formData };

      let latestFormData =
        type === "edit" ? { id, ...formValues, password } : formValues;

      delete latestFormData.subscription;
      if (type === "edit" && !(latestFormData.picture instanceof File)) {
        delete latestFormData.picture;
      }

      const formDataToSend = convertToFormData(latestFormData);

      const payload =
        modalType === "company"
          ? formDataToSend
          : convertToFormData(latestFormData);

      const response =
        type === "edit"
          ? await MODAL_CONFIG[modalType][type].api(id, payload)
          : await MODAL_CONFIG[modalType][type].api(payload);

      if (response.status === 200 || response.status === 201) {
        if (modalType === "company") {
          setCompanyCreated(true);
          const companyObj = response.data.company || response.data.tenant || {};
          setCreatedCompany(companyObj);

          const companyId =
            companyObj.id ||
            response.data.company_id ||
            response.data.data?.id;
          setCreatedCompanyId(companyId);
        }
      } else {
        setFormData({});
        unlockBodyScroll();
        onRefresh();
        setIsOpen({ type: "new", isOpen: false });
      }
    } catch (error) {
      if (error.name === "ValidationError" && Array.isArray(error.errors)) {
        setSubmitError(error.errors.join(", "));
      } else {
        setSubmitError(
          error.response?.data?.message || "Failed to create company"
        );
      }
    } finally {
      setIsCreatingCompany(false);
      setSubmitting(false);
    }
  };

  const getCompanyDetailsById = async () => {
    try {
      const result = await apiGetCompanyDetailsById({ id });

      if (result?.status === 200) {
        const company = result?.data?.company || {};
        company.password = "";
        setInitialValues({
          ...company,
          voip: toBoolean(company.voip, 2),
          sub_company: toBoolean(company.sub_company),
          log_map_search_result: toBoolean(company.log_map_search_result, 3),
          stripe_enable: toBoolean(company.stripe_enable),
          enable_smtp: toBoolean(company.enable_smtp),
          dispatcher: toBoolean(company.dispatcher, 2),
          map: toBoolean(company.map, 2),
          zone: toBoolean(company.zone, 2),
          manage_zones: toBoolean(company.manage_zones, 2),
          cms: toBoolean(company.cms, 2),
          lost_found: toBoolean(company.lost_found, 2),
          accounts: toBoolean(company.accounts, 2),
          push_notification: toBoolean(company.push_notification, 2),
          usage_monitoring: toBoolean(company.usage_monitoring, 2),
          revenue_statements: toBoolean(company.revenue_statements, 2),
          subscription: result?.data?.subscription,
        });
      }
    } catch (error) { }
  };

  useEffect(() => {
    if (type === "edit" && id) {
      getCompanyDetailsById();
    }
  }, []);

  const getValidationSchema = () => {
    if (type === "edit") {
      return Yup.object().shape({
        ...BASIC_INFORMATION_VALIDATION_SCHEMA,
        password: Yup.string().nullable(),
        ...SERVICE_INFORMATION_VALIDATION_SCHEMA,
        ...SYSTEM_INFORMATION_VALIDATION_SCHEMA,
        ...ENABLEMENT_INFORMATION_VALIDATION_SCHEMA,
      });
    }
    return COMPANY_VALIDATION_SCHEMA;
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema()}
        onSubmit={onSubmit}
        validateOnChange={true}
        validateOnBlur={true}
        enableReinitialize={true}
      >
        {({ values, ...formEl }) => {
          return (
            <Form>
              <div
                className="w-20 h-20 sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#EEEEEE] flex justify-center items-center mx-auto mb-4 sm:mb-5 overflow-hidden cursor-pointer"
                onClick={handlePickImage}
              >
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    className="w-full h-full object-cover"
                  />
                ) : values.picture ? (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${values.picture}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageUploadIcon />
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div className="text-xl sm:text-2xl lg:text-[26px] leading-7 sm:leading-8 lg:leading-9 font-semibold text-[#252525] mb-4 sm:mb-6 lg:mb-7 text-center mx-auto max-w-full sm:max-w-[85%] lg:max-w-[75%] w-full px-2">
                <span className="w-full text-center block truncate">
                  {!_.isEmpty(values.company_name)
                    ? values.company_name
                    : modalType === "onboarding"
                      ? "Add Onboarding"
                      : "Add New Company"}
                </span>
              </div>
              {submitError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {submitError}
                </div>
              )}
              <TabView
                tabs={TABS_CONFIGS}
                setIsOpen={setIsOpen}
                type={type}
                modalType={modalType}
                companyCreated={createdCompany}
                createdCompanyId={createdCompanyId}
                isCreatingCompany={isCreatingCompany}
                formEl={{ ...formEl, values }}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddCompanyModal;