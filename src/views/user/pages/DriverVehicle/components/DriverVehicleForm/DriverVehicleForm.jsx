import { Form, Formik } from "formik";
import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import VehicleInformationForm from "../VehicleInformationForm";
import BaseFareConfigurationForm from "../BaseFareConfigurationForm";
import MileageRateSettingsForm from "../MileageRateSettingsForm";
import Button from "../../../../../../components/ui/Button/Button";

const DriverVehicleForm = ({ onSubmit, initialValues }) => {
  return (
    <div className="flex flex-col gap-[30px]">
      <Formik
        initialValues={initialValues}
        //   validationSchema={SIGNIN_VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {(formEl) => (
          <Form>
            <CardContainer className="py-8 px-7 flex flex-col gap-[30px]">
              <VehicleInformationForm formEl={formEl} />
              <BaseFareConfigurationForm formEl={formEl} />
              <MileageRateSettingsForm formEl={formEl} />
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
                  btnType="submit"
                  btnSize="md"
                  type="filled"
                  className="!px-10 !pt-4 pb-[15px] leading-[25px]"
                >
                  <span>Save</span>
                </Button>
              </div>
            </CardContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DriverVehicleForm;
