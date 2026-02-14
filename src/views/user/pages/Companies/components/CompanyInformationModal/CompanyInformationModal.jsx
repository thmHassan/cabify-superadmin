import React, { useEffect, useState } from "react";
import CloseIcon from "../../../../../../components/svg/CloseIcon";
import DriverVehicleIcon from "../../../../../../components/svg/DriverVehicleIcon";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import Tag from "../../../../../../components/ui/Tag";
import ZonesLocationIcon from "../../../../../../components/svg/ZonesLocationIcon";
import PhoneIcon from "../../../../../../components/svg/PhoneIcon";
import ActiveDoneIcon from "../../../../../../components/svg/ActiveDoneIcon";
import Button from "../../../../../../components/ui/Button/Button";
import EditPaperPencilIcon from "../../../../../../components/svg/EditPaperPencilIcon";
import CompanyOverview from "../CompanyOverview";
import CompanyPaymentHistory from "../CompanyPaymentHistory";
import CompanySetting from "../CompanySetting";
import TabView from "../../../../../../components/shared/TabView/TabView";
import {
  unlockBodyScroll,
  convertToFormData,
  toYesNo,
} from "../../../../../../utils/functions/common.function";
import {
  apiGetCompanyDetailsById,
  apiEditCompanyDetails,
} from "../../../../../../services/CompanyService";
import toast from "react-hot-toast";
import _ from "lodash";

const CompanyInformationModal = ({
  setIsOpen,
  companyId,
  onEdit,
  onRefresh,
}) => {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const TABS_CONFIGS = [
    {
      title: "Overview",
      component: CompanyOverview,
    },
    {
      title: "Payment History",
      component: CompanyPaymentHistory,
    },
    {
      title: "Settings",
      component: CompanySetting,
    },
  ];
  const getCompanyDetailsById = async () => {
    try {
      const result = await apiGetCompanyDetailsById({ id: companyId });
      if (result?.status === 200) {
        setCompanyDetails(result?.data?.company || {});
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch company details");
    }
  };

  const handleStatusToggle = async () => {
    if (!companyDetails || isUpdatingStatus) return;

    try {
      setIsUpdatingStatus(true);
      const newStatus =
        companyDetails?.status?.toLowerCase() === "active"
          ? "inactive"
          : "active";

      // Prepare all company fields with updated status
      // Format boolean fields using toYesNo, keeping original values if not boolean
      const formattedValues = {
        ...companyDetails,
        status: newStatus,
        ...(companyDetails.stripe_enable !== undefined && {
          stripe_enable:
            typeof companyDetails.stripe_enable === "boolean"
              ? toYesNo(companyDetails.stripe_enable)
              : companyDetails.stripe_enable,
        }),
        ...(companyDetails.log_map_search_result !== undefined && {
          log_map_search_result:
            typeof companyDetails.log_map_search_result === "boolean"
              ? toYesNo(companyDetails.log_map_search_result, 3)
              : companyDetails.log_map_search_result,
        }),
        ...(companyDetails.accounts !== undefined && {
          accounts:
            typeof companyDetails.accounts === "boolean"
              ? toYesNo(companyDetails.accounts, 2)
              : companyDetails.accounts,
        }),
        ...(companyDetails.enable_smtp !== undefined && {
          enable_smtp:
            typeof companyDetails.enable_smtp === "boolean"
              ? toYesNo(companyDetails.enable_smtp)
              : companyDetails.enable_smtp,
        }),
        ...(companyDetails.sub_company !== undefined && {
          sub_company:
            typeof companyDetails.sub_company === "boolean"
              ? toYesNo(companyDetails.sub_company)
              : companyDetails.sub_company,
        }),
        ...(companyDetails.dispatcher !== undefined && {
          dispatcher:
            typeof companyDetails.dispatcher === "boolean"
              ? toYesNo(companyDetails.dispatcher, 2)
              : companyDetails.dispatcher,
        }),
        ...(companyDetails.map !== undefined && {
          map:
            typeof companyDetails.map === "boolean"
              ? toYesNo(companyDetails.map, 2)
              : companyDetails.map,
        }),
        ...(companyDetails.push_notification !== undefined && {
          push_notification:
            typeof companyDetails.push_notification === "boolean"
              ? toYesNo(companyDetails.push_notification, 2)
              : companyDetails.push_notification,
        }),
        ...(companyDetails.usage_monitoring !== undefined && {
          usage_monitoring:
            typeof companyDetails.usage_monitoring === "boolean"
              ? toYesNo(companyDetails.usage_monitoring, 2)
              : companyDetails.usage_monitoring,
        }),
        ...(companyDetails.revenue_statements !== undefined && {
          revenue_statements:
            typeof companyDetails.revenue_statements === "boolean"
              ? toYesNo(companyDetails.revenue_statements, 2)
              : companyDetails.revenue_statements,
        }),
        ...(companyDetails.zone !== undefined && {
          zone:
            typeof companyDetails.zone === "boolean"
              ? toYesNo(companyDetails.zone, 2)
              : companyDetails.zone,
        }),
        ...(companyDetails.manage_zones !== undefined && {
          manage_zones:
            typeof companyDetails.manage_zones === "boolean"
              ? toYesNo(companyDetails.manage_zones, 2)
              : companyDetails.manage_zones,
        }),
        ...(companyDetails.cms !== undefined && {
          cms:
            typeof companyDetails.cms === "boolean"
              ? toYesNo(companyDetails.cms, 2)
              : companyDetails.cms,
        }),
        ...(companyDetails.lost_found !== undefined && {
          lost_found:
            typeof companyDetails.lost_found === "boolean"
              ? toYesNo(companyDetails.lost_found, 2)
              : companyDetails.lost_found,
        }),
        ...(companyDetails.voip !== undefined && {
          voip:
            typeof companyDetails.voip === "boolean"
              ? toYesNo(companyDetails.voip, 2)
              : companyDetails.voip,
        }),
      };

      // Remove password, picture, and other file-related fields that shouldn't be sent
      // Ensure required fields are present (use empty string if missing)
      const latestFormData = {
        id: companyId,
        ..._.omit(formattedValues, [
          "password",
          "picture",
          "picture_url",
          "image",
          "logo",
        ]),
        // Ensure address field is present (required by API)
        address: formattedValues.address || formattedValues.city || "",
      };

      // Convert to FormData as required by the API
      const formDataToSend = convertToFormData(latestFormData);

      const result = await apiEditCompanyDetails(
        { id: companyId },
        formDataToSend
      );

      if (result?.status === 200 || result?.status === 201) {
        // BaseService interceptor will show the success toast automatically
        // Refresh company details from server to get the latest data
        await getCompanyDetailsById();
        // Refresh parent list if callback provided
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to update company status";
      toast.error(errorMessage);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  useEffect(() => {
    if (companyId) {
      getCompanyDetailsById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  return (
    <>
      <Button
        className="bg-[#F3F3F3] !absolute top-3 right-3 sm:top-5 sm:right-10 w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] rounded-full flex justify-center items-center z-10"
        onClick={() => {
          unlockBodyScroll();
          setIsOpen(false);
        }}
      >
        <CloseIcon width={12} height={12} fill="#3D3D3D" />
      </Button>
      <div className="2xl:p-10 lg:p-8 sm:p-6 p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 pb-4 sm:pb-5 border-b-[0.7px] border-[#6C6C6C] mb-4 sm:mb-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">
            <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] rounded-full bg-[#EEEEEE] flex justify-center items-center flex-shrink-0">
              <div className="w-[35px] h-[23px] sm:w-[40px] sm:h-[26px] lg:w-[50px] lg:h-[32.81px]">
                <DriverVehicleIcon
                  width={50}
                  height={32.81}
                  fill="#1F41BB"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:gap-5 flex-1 min-w-0">
              <CardSubtitle type={1} subtitle={companyDetails?.company_name} />
              <div className="flex flex-wrap gap-2 sm:gap-[15px]">
                <Tag
                  size="md"
                  variant="mediumGray"
                  className="text-xs sm:text-base"
                >
                  <div className="flex gap-1.5 sm:gap-2.5 items-center">
                    <div className="w-3 h-3.5 sm:w-[14px] sm:h-[16.18px] flex-shrink-0">
                      <ZonesLocationIcon
                        width={14}
                        height={16.18}
                        fill="#EA5154"
                        className="w-full h-full"
                      />
                    </div>
                    <span>
                      {companyDetails?.city || companyDetails?.address || "N/A"}
                    </span>
                  </div>
                </Tag>
                <Tag
                  size="md"
                  variant="mediumGray"
                  className="text-xs sm:text-base"
                >
                  <div className="flex gap-1.5 sm:gap-2.5 items-center">
                    <div className="w-3 h-3 sm:w-[14px] sm:h-[14px] flex-shrink-0 flex items-center justify-center">
                      <PhoneIcon />
                    </div>
                    <span className="text-xs sm:text-base">
                      {companyDetails?.phone || "N/A"}
                    </span>
                  </div>
                </Tag>
                <Tag
                  size="md"
                  variant={
                    companyDetails?.status?.toLowerCase() === "active"
                      ? "green"
                      : "red"
                  }
                  className={`text-xs sm:text-base ${!isUpdatingStatus ? "cursor-pointer hover:opacity-80 transition-opacity" : "opacity-60 cursor-not-allowed"}`}
                  onClick={handleStatusToggle}
                  role="button"
                  tabIndex={!isUpdatingStatus ? 0 : -1}
                  onKeyDown={(e) => {
                    if (
                      !isUpdatingStatus &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      handleStatusToggle();
                    }
                  }}
                >
                  <div className="flex gap-1.5 sm:gap-2.5 items-center">
                    {companyDetails?.status?.toLowerCase() === "active" && (
                      <div className="w-3 h-3 sm:w-[18px] sm:h-[18px] flex-shrink-0">
                        <ActiveDoneIcon
                          width={18}
                          height={18}
                          fill="#ffffff"
                          className="w-full h-full"
                        />
                      </div>
                    )}
                    <span>
                      {companyDetails?.status
                        ? companyDetails.status.charAt(0).toUpperCase() +
                        companyDetails.status.slice(1).toLowerCase()
                        : "N/A"}
                    </span>
                  </div>
                </Tag>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              btnSize="md"
              type="filled"
              className="w-full sm:w-auto !px-4 sm:!px-[25px] !py-2 sm:!py-[11px]"
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
            >
              <div className="flex gap-1.5 sm:gap-[7.5px] items-center justify-center">
                <div className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0">
                  <EditPaperPencilIcon
                    width={18}
                    height={18}
                    fill="#ffffff"
                    className="w-full h-full"
                  />
                </div>
                <span className="text-sm sm:text-base">Edit</span>
              </div>
            </Button>
          </div>
        </div>
        <div>
          <TabView
            align="left"
            tabs={TABS_CONFIGS}
            setIsOpen={setIsOpen}
            companyId={companyId}
            companyDetails={companyDetails}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyInformationModal;
