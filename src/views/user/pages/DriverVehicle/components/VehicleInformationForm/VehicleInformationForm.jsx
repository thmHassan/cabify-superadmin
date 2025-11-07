import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import { ErrorMessage, Field } from "formik";
import FormSelection from "../../../../../../components/ui/FormSelection/FormSelection";
import Button from "../../../../../../components/ui/Button/Button";

const options = [{ value: "local", label: "Local" }];

const VehicleInformationForm = ({ formEl }) => {
  const { values, setFieldValue } = formEl;
  return (
    <CardContainer type={1} className="2xl:py-8 2xl:px-7 lg:py-5 lg:px-4 sm:px-4 px-3 sm:py-5 py-3">
      <div className="flex flex-wrap gap-4 sm:gap-5 mb-[25px]">
        <div className="w-full sm:w-[calc((100%-40px)/3)]">
          <label
            htmlFor="Map API Provider"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Vehicle Type Name *
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="vehicle_type_name"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter Vehicle Type Name"
            />
          </div>
          <ErrorMessage
            name="vehicle_type_name"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-40px)/3)]">
          <label
            htmlFor="Map API Provider"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Order No *
          </label>
          <div className="h-16">
            <FormSelection
              label="Select Bid Backup Vehicle type"
              name="order_no"
              value={values.order_no}
              onChange={(val) => setFieldValue("order_no", val)}
              placeholder="Select Order No"
              options={options}
            />
          </div>
          <ErrorMessage
            name="order_no"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-40px)/3)]">
          <label
            htmlFor="Map API Provider"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Vehicle Type Service *
          </label>
          <div className="h-16">
            <FormSelection
              label="Select Bid Backup Vehicle type"
              name="vehicle_type_service"
              value={values.vehicle_type_service}
              onChange={(val) => setFieldValue("vehicle_type_service", val)}
              placeholder="Select Vehicle Type Service "
              options={options}
            />
          </div>
          <ErrorMessage
            name="vehicle_type_service"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <label
            htmlFor="Map API Provider"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Minimum Price *
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="minimum_price"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter Minimum Price "
            />
          </div>
          <ErrorMessage
            name="minimum_price"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <label
            htmlFor="Map API Provider"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Minimum Distance (Miles)*
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="minimum_distance"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter Minimum Distance"
            />
          </div>
          <ErrorMessage
            name="minimum_distance"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((((100%-40px)/3)*2)+20px)]">
          <label
            htmlFor="Map API Provider"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Vehicle Type Image *
          </label>
          <div className="h-16">
            <Field name="file">
              {({ form }) => (
                <div className="relative px-5 flex items-center bg-[#ffffff] py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <Button className="text-[#1F41BB] !font-normal text-xl leading-[25px] px-4 py-2 rounded-[5px] border border-[#1F41BB]">
                        <span>Choose File</span>
                      </Button>
                      <div className="text-[18px] leading-[22px] text-[#000000] font-normal">
                        <span>No File Choosen</span>
                      </div>
                    </div>
                  <input
                    type="file"
                    onChange={(event) => {
                      form.setFieldValue(
                        "vehicle_image",
                        event.currentTarget.files[0]
                      );
                    }}
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                  />
                </div>
              )}
            </Field>
          </div>
          <ErrorMessage
            name="vehicle_image"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-40px)/3)]">
          <label
            htmlFor="Map API Provider"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Backup Bid Vehicle Type*
          </label>
          <div className="h-16">
            <FormSelection
              label="Select Bid Backup Vehicle type"
              name="backup_bid_vehicle_type"
              value={values.backup_bid_vehicle_type}
              onChange={(val) => setFieldValue("backup_bid_vehicle_type", val)}
              placeholder="Select Bid Backup Vehicle type"
              isMulti={true}
            />
          </div>
          <ErrorMessage
            name="backup_bid_vehicle_type"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </div>
    </CardContainer>
  );
};

export default VehicleInformationForm;
