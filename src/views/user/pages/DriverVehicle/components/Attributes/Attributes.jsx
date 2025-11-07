import React, { useState } from "react";
import { ErrorMessage } from "formik";
import PageTitle from "../../../../../../components/ui/PageTitle";
import Button from "../../../../../../components/ui/Button/Button";
import PlusIcon from "../../../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../../../components/shared/CardContainer";
import RadioButton from "../../../../../../components/ui/RadioButton";
import AddAttributeModal from "../AddAttributeModal";
import EmptyState from "../../../../../../components/shared/EmptyState";
import { lockBodyScroll } from "../../../../../../utils/functions/common.function";

// const ATTRIBUTES = [
//   "No Smoking*",
//   "Child Seat*",
//   "Pets",
//   "Wheel Chair*",
//   "Lady Driver*",
// ];

const Attributes = ({ formEl }) => {
  const { values } = formEl;
  const [isAddAttributeModalOpen, setIsAddAttributeModalOpen] = useState(false);
  
  const attributes = values?.attribute_array || {};
  const hasAttributes = Object.keys(attributes).length > 0;
  
  const handleAddAttribute = () => {
    lockBodyScroll();
    setIsAddAttributeModalOpen(true);
  };

  return (
    <>
      <div className="pt-5 sm:pt-10 border-t border-[#E9E9E9]">
        <div className="flex flex-col gap-2.5 mb-6 sm:mb-[30px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <PageTitle title="Attributes" />
            <Button
              type="filled"
              btnSize="2xl"
              onClick={handleAddAttribute}
              className="w-full sm:w-auto"
            >
              <div className="flex gap-2 sm:gap-[15px] items-center justify-center">
                <PlusIcon />
                <span>Add New Attributes</span>
              </div>
            </Button>
          </div>
          <div>
            <PageSubTitle title="Manage vehicle related documents across all panels" />
          </div>
        </div>
        <CardContainer className="2xl:p-[30px] lg:p-5 sm:p-4 p-3">
          {hasAttributes ? (
            <>
              <div className="flex flex-wrap gap-4 sm:gap-5">
                {Object.keys(attributes).map((atr, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] p-4 sm:p-5 bg-[#ffffff] rounded-[20px] sm:rounded-[25px]"
                  >
                    <div className="text-lg sm:text-xl lg:text-[26px] leading-7 sm:leading-8 lg:leading-9 font-semibold text-[#252525] mb-4 sm:mb-5 text-center flex justify-between">
                      <PageSubTitle
                        title={atr}
                        textColor={2}
                        className="!text-left capitalize"
                      />
                      {/* <div className="w-10 h-10 flex justify-center items-center bg-[#EFEFEF] rounded-full">
                          <BinIcon fill="#FF4747" width={25} height={28} />
                        </div> */}
                    </div>
                    <div className="flex gap-3 sm:gap-5">
                      <RadioButton
                        name={`attribute_array.${atr}`}
                        value="yes"
                        label="Yes"
                      />
                      <RadioButton
                        name={`attribute_array.${atr}`}
                        value="no"
                        label="No"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <ErrorMessage
                name="attribute_array"
                component="div"
                className="text-red-500 text-sm mt-3"
              />
            </>
          ) : (
            <>
              <EmptyState
                title="No Attributes Found"
                description="Add your first attribute to get started"
                actionLabel="Add New Attribute"
                onAction={handleAddAttribute}
                className="min-h-[30vh]"
              />
              <ErrorMessage
                name="attribute_array"
                component="div"
                className="text-red-500 text-sm mt-3 text-center"
              />
            </>
          )}
        </CardContainer>
      </div>

      <AddAttributeModal
        {...{ isAddAttributeModalOpen, setIsAddAttributeModalOpen, formEl }}
      />
    </>
  );
};

export default Attributes;
