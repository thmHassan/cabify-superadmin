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
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import { apiGetCompanyDetailsById } from "../../../../../../services/CompanyService";

const CompanyInformationModal = ({ setIsOpen, companyId, onEdit }) => {
  const [companyDetails, setCompanyDetails] = useState(null);
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
      // setIsSubAdminDetailsLoading(true);
      console.log("object");
      const result = await apiGetCompanyDetailsById({ id: companyId });
      console.log(result, "result========");
      if (result?.status === 200) {
        setCompanyDetails(result?.data?.company || {});
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsSubAdminDetailsLoading(false);
    }
  };

  useEffect(() => {
    console.log(companyId, "companyId========");
    if (companyId) {
      getCompanyDetailsById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <Tag size="md" variant="mediumGray" className="text-xs sm:text-base">
                  <div className="flex gap-1.5 sm:gap-2.5 items-center">
                    <div className="w-3 h-3.5 sm:w-[14px] sm:h-[16.18px] flex-shrink-0">
                      <ZonesLocationIcon
                        width={14}
                        height={16.18}
                        fill="#EA5154"
                        className="w-full h-full"
                      />
                    </div>
                    <span>Location</span>
                  </div>
                </Tag>
                <Tag size="md" variant="mediumGray" className="text-xs sm:text-base">
                  <div className="flex gap-1.5 sm:gap-2.5 items-center">
                    <div className="w-3 h-3 sm:w-[14px] sm:h-[14px] flex-shrink-0 flex items-center justify-center">
                      <PhoneIcon />
                    </div>
                    <span className="text-xs sm:text-base">+1000000</span>
                  </div>
                </Tag>
                <Tag size="md" variant="green" className="text-xs sm:text-base">
                  <div className="flex gap-1.5 sm:gap-2.5 items-center">
                    <div className="w-3 h-3 sm:w-[18px] sm:h-[18px] flex-shrink-0">
                      <ActiveDoneIcon width={18} height={18} fill="#ffffff" className="w-full h-full" />
                    </div>
                    <span>Active</span>
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
                  <EditPaperPencilIcon width={18} height={18} fill="#ffffff" className="w-full h-full" />
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
          />
        </div>
      </div>
    </>
  );
};

export default CompanyInformationModal;
