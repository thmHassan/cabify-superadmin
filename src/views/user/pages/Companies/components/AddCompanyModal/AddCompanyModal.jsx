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
import { COMPANY_VALIDATION_SCHEMA } from "../../../../validators/pages/companies.validation";

const defaultFormValue = import.meta.env.VITE_IS_DEFAULT_VALUES || false;

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
  const [createdCompanyId, setCreatedCompanyId] = useState(null);
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [initialValues, setInitialValues] = useState({
    company_name: formData.company_name || defaultFormValue ? "jiya123" : "",
    company_admin_name:
      formData.company_admin_name || defaultFormValue ? "Jiya Admin" : "",
    user_name: formData.user_name || defaultFormValue ? "jiyauser" : "",
    password: formData.password || defaultFormValue ? "123456" : "",
    company_id: formData.company_id || defaultFormValue ? "jiyaId" : "",
    contact_person:
      formData.contact_person || defaultFormValue ? "Test123" : "",
    email: formData.email || defaultFormValue ? "jiya@mailinator.com" : "",
    phone: formData.phone || defaultFormValue ? "9876543210" : "",
    address: formData.address || defaultFormValue ? "Surat" : "",
    city: formData.city || defaultFormValue ? "Surat" : "",
    currency: formData.currency || defaultFormValue ? "USD" : "",
    maps_api: formData.maps_api || defaultFormValue ? "barikoi" : "",
    search_api: formData.search_api || defaultFormValue ? "barikoi" : "",
    passengers_allowed:
      formData.passengers_allowed || defaultFormValue ? "20" : "",
    dispatchers_allowed:
      formData.dispatchers_allowed || defaultFormValue ? "20" : "",
    drivers_allowed: formData.drivers_allowed || defaultFormValue ? "10" : "",
    subscription_type:
      formData.subscription_type || defaultFormValue ? "test" : "",
    log_map_search_result:
      formData.log_map_search_result || defaultFormValue ? true : false,
    voip: formData.voip || defaultFormValue ? true : false,
    sub_company: formData.sub_company || defaultFormValue ? true : false,
    uber_plot_hybrid:
      formData.uber_plot_hybrid || defaultFormValue ? "uber" : "",
    fleet_management:
      formData.fleet_management || defaultFormValue ? "yes" : "",
    sos_features: formData.sos_features || defaultFormValue ? "yes" : "",
    notes: formData.notes || defaultFormValue ? "test notes" : "",
    units: formData.units || defaultFormValue ? "test" : "",
    country_of_use: formData.country_of_use || defaultFormValue ? "test" : "",
    time_zone: formData.time_zone || defaultFormValue ? "test" : "",
    stripe_enable: formData.stripe_enable || defaultFormValue ? true : false,
    enable_smtp: formData.enable_smtp || defaultFormValue ? true : false,
    stripe_enablement:
      formData.stripe_enablement || defaultFormValue ? "tets" : "",
    dispatcher: formData.dispatcher || (defaultFormValue ?? false),
    map: formData.map || (defaultFormValue ?? false),
    push_notification:
      formData.push_notification || (defaultFormValue ?? false),
    usage_monitoring: formData.usage_monitoring || (defaultFormValue ?? false),
    revenue_statements:
      formData.revenue_statements || (defaultFormValue ?? false),
    zone: formData.zone || (defaultFormValue ?? false),
    manage_zones: formData.manage_zones || (defaultFormValue ?? false),
    cms: formData.cms || (defaultFormValue ?? false),
    lost_found: formData.lost_found || (defaultFormValue ?? false),
    accounts: formData.accounts || (defaultFormValue ?? false),
  });
  const fileInputRef = useRef(null);

  console.log(type, "type=======");

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Optionally, validate file type/size here
    setFormData((prev) => ({ ...prev, picture: file }));
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return objectUrl;
    });
  };
  const TABS_CONFIGS = [
    {
      title: "Basic Info",
      component: BasicInformation,
    },
    {
      title: "Services",
      component: ServicesInformation,
    },
    {
      title: "System",
      component: SystemInformation,
    },
    {
      title: "Enablement",
      component: EnablementInformation,
    },
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
      console.log(formValues, "formValues====");
      const latestFormData =
        type === "edit"
          ? { id, ..._.omit(formValues, ["password"]) }
          : formValues;

      console.log(latestFormData, "latestFormData=======");

      const formDataToSend = convertToFormData(latestFormData);
      const payload = modalType === "company" ? formDataToSend : latestFormData;
      console.log(payload, "payload===");
      const response =
        type === "edit"
          ? await MODAL_CONFIG[modalType][type].api({}, payload)
          : await MODAL_CONFIG[modalType][type].api(payload);

      if (response.status === 200 || response.status === 201) {
        if (modalType === "company") {
          setCompanyCreated(true);
          const companyId =
            response.data.tenant.id ||
            response.data.company_id ||
            response.data.data?.id;
          setCreatedCompanyId(companyId);
        } else {
          setFormData({});
          unlockBodyScroll();
          onRefresh();
          setIsOpen({ type: "new", isOpen: false });
        }
        console.log(
          MODAL_CONFIG[modalType][type].successMessage,
          response.data
        );
      }
    } catch (error) {
      console.error("Error creating company:", error);
      if (error.name === "ValidationError" && Array.isArray(error.errors)) {
        setSubmitError(error.errors.join(", "));
      } else {
        setSubmitError(
          error.response?.data?.message || "Failed to create company21251514"
        );
        console.log(error, "er====");
      }
    } finally {
      setIsCreatingCompany(false);
      setSubmitting(false);
    }
  };

  const getCompanyDetailsById = async () => {
    try {
      // setIsSubAdminDetailsLoading(true);
      console.log("object");
      const result = await apiGetCompanyDetailsById({ id });
      if (result?.status === 200) {
        console.log(result, "res-company");
        const {
          company_name,
          company_admin_name,
          user_name,
          password,
          company_id,
          contact_person,
          email,
          phone,
          address,
          city,
          currency,
          maps_api,
          search_api,
          drivers_allowed,
          voip,
          sub_company,
          sos_features,
          notes,
          passengers_allowed,
          dispatchers_allowed,
          subscription_type,
          log_map_search_result,
          uber_plot_hybrid,
          fleet_management,
          units,
          country_of_use,
          time_zone,
          stripe_enable,
          enable_smtp,
          stripe_enablement,
          dispatcher,
          map,
          zone,
          manage_zones,
          cms,
          lost_found,
          accounts,
          push_notification,
          usage_monitoring,
          revenue_statements,
        } = result?.data?.company || {};
        setInitialValues({
          company_name,
          company_admin_name,
          user_name,
          password,
          company_id,
          contact_person,
          email,
          phone,
          address,
          city,
          currency,
          maps_api,
          search_api,
          drivers_allowed,
          voip: toBoolean(voip, 2),
          sub_company: toBoolean(sub_company),
          sos_features,
          notes,
          passengers_allowed,
          dispatchers_allowed,
          subscription_type,
          log_map_search_result: toBoolean(log_map_search_result, 3),
          uber_plot_hybrid,
          fleet_management,
          units,
          country_of_use,
          time_zone,
          stripe_enable: toBoolean(stripe_enable),
          enable_smtp: toBoolean(enable_smtp),
          stripe_enablement,
          dispatcher: toBoolean(dispatcher, 2),
          map: toBoolean(map, 2),
          zone: toBoolean(zone, 2),
          manage_zones: toBoolean(manage_zones, 2),
          cms: toBoolean(cms, 2),
          lost_found: toBoolean(lost_found, 2),
          accounts: toBoolean(accounts, 2),
          push_notification: toBoolean(push_notification, 2),
          usage_monitoring: toBoolean(usage_monitoring, 2),
          revenue_statements: toBoolean(revenue_statements, 2),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsSubAdminDetailsLoading(false);
    }
  };

  useEffect(() => {
    console.log(type, id, "tttttttttttt");
    if (type === "edit" && id) {
      getCompanyDetailsById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={COMPANY_VALIDATION_SCHEMA}
        onSubmit={onSubmit}
        validateOnChange={true}
        validateOnBlur={true}
        enableReinitialize={true}
      >
        {({ values, ...formEl }) => {
          console.log(values, "values=====");
          return (
            <Form>
              <div
                className="w-[120px] h-[120px] rounded-full bg-[#EEEEEE] flex justify-center items-center mx-auto mb-5 overflow-hidden cursor-pointer"
                onClick={handlePickImage}
                title="Click to upload"
              >
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Company"
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
              <div className="text-[26px] leading-9 font-semibold text-[#252525] mb-7 text-center mx-auto max-w-[75%] w-full">
                <span className="w-full text-center block truncate">
                  {!_.isEmpty(values.company_name)
                    ? values.company_name
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
                companyCreated={companyCreated}
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
