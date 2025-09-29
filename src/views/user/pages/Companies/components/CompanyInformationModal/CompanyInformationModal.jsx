import React from "react";
import Modal from "../../../../../../components/shared/Modal";
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

const CompanyInformationModal = ({ isOpen, setIsOpen }) => {
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
  return (
    <Modal isOpen={isOpen} size="2xl" className="p-10">
      <Button
        className="bg-[#F3F3F3] absolute top-5 right-10 w-[45px] h-[45px] rounded-full flex justify-center items-center"
        onClick={() => setIsOpen(false)}
      >
        <CloseIcon width={14} height={14} fill="#3D3D3D" />
      </Button>
      <div>
        <div className="flex justify-between items-end pb-5 border-b-[0.7px] border-[#6C6C6C] mb-5">
          <div className="flex gap-5 items-center">
            <div className="w-[100px] h-[100px] rounded-full bg-[#EEEEEE] flex justify-center items-center">
              <DriverVehicleIcon width={50} height={32.81} fill="#1F41BB" />
            </div>
            <div className="flex flex-col gap-5">
              <CardSubtitle type={1} subtitle="Company Name Will Be Here..." />
              <div className="flex gap-[15px]">
                <Tag size="md" variant="mediumGray">
                  <div className="flex gap-2.5 items-center">
                    <ZonesLocationIcon
                      width={14}
                      height={16.18}
                      fill="#EA5154"
                    />
                    <span>Location</span>
                  </div>
                </Tag>
                <Tag size="md" variant="mediumGray">
                  <div className="flex gap-2.5 items-center">
                    <PhoneIcon />
                    <span>+1000000</span>
                  </div>
                </Tag>
                <Tag size="md" variant="green">
                  <div className="flex gap-2.5 items-center">
                    <ActiveDoneIcon />
                    <span>Active</span>
                  </div>
                </Tag>
              </div>
            </div>
          </div>
          <div>
            <Button
              btnSize="md"
              type="filled"
              className="!px-[25px] !py-[11px]"
            >
              <div className="flex gap-[7.5px]">
                <EditPaperPencilIcon />
                <span>Edit</span>
              </div>
            </Button>
          </div>
        </div>
        <div>
          <TabView align="left" tabs={TABS_CONFIGS} setIsOpen={setIsOpen} />
        </div>
      </div>
    </Modal>
  );
};

export default CompanyInformationModal;
