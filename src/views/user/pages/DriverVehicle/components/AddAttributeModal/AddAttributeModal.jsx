import React from "react";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import Modal from "../../../../../../components/shared/Modal";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import { ErrorMessage, Field } from "formik";
import Button from "../../../../../../components/ui/Button/Button";
import FormLabel from "../../../../../../components/ui/FormLabel";

const AddAttributeModal = ({
  isAddAttributeModalOpen,
  setIsAddAttributeModalOpen,
  formEl,
}) => {
  const { values, setFieldValue } = formEl;
  const onSubmit = () => {
    try {
      setFieldValue("attribute_array", {
        ...values.attribute_array,
        [values.atrText]: "yes",
      });
      setFieldValue("atrText", "");
      setIsAddAttributeModalOpen(false);
      unlockBodyScroll();
    } catch (error) {
      console.log(error, "error=====");
    }
  };
  return (
    <Modal size="sm" isOpen={isAddAttributeModalOpen} className="p-4 sm:p-6 lg:p-10">
      <CardSubtitle
        subtitle="Add Attributes"
        className="!text-[#252525] !text-center"
      />
      <div className="pt-6 sm:pt-8 lg:pt-[35px]">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <FormLabel htmlFor="atrText">
            Attributes Name
          </FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="atrText"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
              placeholder="Enter Name"
            />
          </div>
          <ErrorMessage
            name="atrText"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-end">
          <Button
            btnSize="md"
            type="filledGray"
            className="!px-10 !pt-4 pb-[15px] leading-[25px] w-full sm:w-auto"
            onClick={() => {
              unlockBodyScroll();
              setIsAddAttributeModalOpen(false);
            }}
          >
            <span>Cancel</span>
          </Button>
          <Button
            btnSize="md"
            type="filled"
            className="!px-10 !pt-4 pb-[15px] leading-[25px] w-full sm:w-auto"
            onClick={onSubmit}
          >
            <span>Create</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddAttributeModal;
