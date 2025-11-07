import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import VehicleInformationForm from "../VehicleInformationForm";
import BaseFareConfigurationForm from "../BaseFareConfigurationForm";
import MileageRateSettingsForm from "../MileageRateSettingsForm";
import Button from "../../../../../../components/ui/Button/Button";
import { DRIVER_VEHICLE_VALIDATION_SCHEMA } from "../../../../validators/pages/driverVehicle.validation";
import Attributes from "../Attributes";

const DriverVehicleForm = ({ onSubmit, initialValues }) => {
  return (
    <div className="flex flex-col gap-[30px]">
      <Formik
        initialValues={initialValues}
        validationSchema={DRIVER_VEHICLE_VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {(formEl) => (
          <Form>
            <CardContainer className="2xl:py-8 2xl:px-7 lg:py-5 lg:px-4 sm:px-4 px-3 sm:py-5 py-3 flex flex-col gap-[30px]">
              <VehicleInformationForm formEl={formEl} />
              <BaseFareConfigurationForm formEl={formEl} />
              <MileageRateSettingsForm formEl={formEl} />
              <Attributes formEl={formEl} />
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-5 sm:justify-start">
                <Button
                  btnSize="md"
                  type="filledGray"
                  className="w-full sm:w-auto !px-10 !pt-4 pb-[15px] leading-[25px]"
                  //   onClick={() => setIsOpen(false)}
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  btnType="submit"
                  btnSize="md"
                  type="filled"
                  className="w-full sm:w-auto !px-10 !pt-4 pb-[15px] leading-[25px]"
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
