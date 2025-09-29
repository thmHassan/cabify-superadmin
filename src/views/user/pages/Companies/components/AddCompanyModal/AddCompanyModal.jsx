import Modal from "../../../../../../components/shared/Modal";
import TabView from "../../../../../../components/shared/TabView/TabView";
import ImageUploadIcon from "../../../../../../components/svg/ImageUploadIcon";
import Tag from "../../../../../../components/ui/Tag";
import BasicInformation from "../BasicInformation";
import EnablementInformation from "../EnablementInformation";
import ServicesInformation from "../ServicesInformation";
import SystemInformation from "../SystemInformation";

const AddCompanyModal = ({ isOpen, setIsOpen }) => {
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
  return (
    <Modal isOpen={isOpen} className="p-10">
      <div>
        <div className="w-[120px] h-[120px] rounded-full bg-[#EEEEEE] flex justify-center items-center mx-auto mb-5">
          <ImageUploadIcon />
        </div>
        <div className="text-[26px] leading-9 font-semibold text-[#252525] mb-7 text-center">
          <span>Add New Company</span>
        </div>
        <TabView tabs={TABS_CONFIGS} setIsOpen={setIsOpen} />
      </div>
    </Modal>
  );
};

export default AddCompanyModal;
