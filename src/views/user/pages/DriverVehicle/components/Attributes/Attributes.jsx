import React, { useState } from "react";
import PageTitle from "../../../../../../components/ui/PageTitle";
import Button from "../../../../../../components/ui/Button/Button";
import PlusIcon from "../../../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../../../components/shared/CardContainer";
import { Form, Formik } from "formik";
// import BinIcon from "../../../../../../components/svg/BinIcon";
import RadioButton from "../../../../../../components/ui/RadioButton";
import AddAttributeModal from "../AddAttributeModal";
import { lockBodyScroll } from "../../../../../../utils/functions/common.function";

const ATTRIBUTES = [
  "No Smoking*",
  "Child Seat*",
  "Pets",
  "Wheel Chair*",
  "Lady Driver*",
];

const Attributes = () => {
  const [isAddAttributeModalOpen, setIsAddAttributeModalOpen] = useState(false);
  return (
    <>
      <div className="pt-10 border-t border-[#E9E9E9]">
        <div className="flex flex-col gap-2.5 mb-[30px]">
          <div className="flex justify-between">
            <PageTitle title="Attributes" />
            <Button
              type="filled"
              btnSize="2xl"
              onClick={() => {
                lockBodyScroll();
                setIsAddAttributeModalOpen(true);
              }}
            >
              <div className="flex gap-[15px] items-center">
                <PlusIcon />
                <span>Add New Attributes</span>
              </div>
            </Button>
          </div>
          <div>
            <PageSubTitle title="Manage vehicle related documents across all panels" />
          </div>
        </div>
        <CardContainer className="p-[30px]">
          <Formik
            initialValues={{}}
            //   validationSchema={SIGNIN_VALIDATION_SCHEMA}
            // onSubmit={(values, { setSubmitting }) => {
            //   if (!disableSubmit) {
            //     onSignIn(values, setSubmitting);
            //   } else {
            //     setSubmitting(false);
            //   }
            // }}
          >
            {() => (
              <Form>
                <div className="flex flex-wrap gap-5 mb-[25px]">
                  {ATTRIBUTES.map((atr, index) => (
                    <div
                      key={index}
                      className="w-[calc((100%-40px)/3)] p-5 bg-[#ffffff] rounded-[25px]"
                    >
                      <div className="text-[26px] leading-9 font-semibold text-[#252525] mb-5 text-center flex justify-between">
                        <PageSubTitle
                          title={atr}
                          textColor={2}
                          className="!text-left"
                        />
                        {/* <div className="w-10 h-10 flex justify-center items-center bg-[#EFEFEF] rounded-full">
                          <BinIcon fill="#FF4747" width={25} height={28} />
                        </div> */}
                      </div>
                      <div className="flex gap-5">
                        <RadioButton
                          name="systemType"
                          value="dispatch"
                          label="Yes"
                        />
                        <RadioButton
                          name="systemType"
                          value="dispatch"
                          label="No"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-5 justify-start">
                  <Button
                    btnSize="md"
                    type="filledGray"
                    className="!px-10 !pt-4 pb-[15px] leading-[25px]"
                    //   onClick={() => setIsOpen(false)}
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    btnSize="md"
                    type="filled"
                    className="!px-10 !pt-4 pb-[15px] leading-[25px]"
                  >
                    <span>Save</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContainer>
      </div>

      <AddAttributeModal
        {...{ isAddAttributeModalOpen, setIsAddAttributeModalOpen }}
      />
    </>
  );
};

export default Attributes;
