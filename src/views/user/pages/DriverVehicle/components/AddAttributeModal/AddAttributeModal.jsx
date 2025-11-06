import React from "react";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import Modal from "../../../../../../components/shared/Modal";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import { ErrorMessage, Field } from "formik";
import Button from "../../../../../../components/ui/Button/Button";

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
    <Modal size="sm" isOpen={isAddAttributeModalOpen} className="p-10">
      <CardSubtitle
        subtitle="Add Attributes"
        className="!text-[#252525] !text-center"
      />
      <div className="pt-[35px]">
        <div className="mb-10">
          <label
            htmlFor="username"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Attributes Name
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="atrText"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter Name"
            />
          </div>
          <ErrorMessage
            name="atrText"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="flex gap-5 justify-end">
          <Button
            btnSize="md"
            type="filledGray"
            className="!px-10 !pt-4 pb-[15px] leading-[25px]"
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
            className="!px-10 !pt-4 pb-[15px] leading-[25px]"
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
