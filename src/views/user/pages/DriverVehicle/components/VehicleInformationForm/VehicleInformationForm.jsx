import React, { useState } from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import { ErrorMessage, Field } from "formik";
import FormSelection from "../../../../../../components/ui/FormSelection/FormSelection";
import Button from "../../../../../../components/ui/Button/Button";
import FormLabel from "../../../../../../components/ui/FormLabel";
import classNames from "classnames";

const options = [{ value: "local", label: "Local" }];

const VehicleInformationForm = ({ formEl }) => {
  const { values, setFieldValue } = formEl;
  const [fileName, setFileName] = useState("");
  return (
    <CardContainer
      type={1}
      className="2xl:py-8 2xl:px-7 lg:py-5 lg:px-4 sm:px-4 px-3 sm:py-5 py-3"
    >
      <div className="flex flex-wrap gap-3 sm:gap-5 mb-[25px]">
        <div className="w-full sm:w-[calc((100%-40px)/3)]">
          <FormLabel htmlFor="vehicle_type_name" required>
            Vehicle Type Name
          </FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="vehicle_type_name"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
          <FormLabel htmlFor="order_no" required>
            Order No
          </FormLabel>
          <div className="sm:h-16 h-14">
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
          <FormLabel htmlFor="vehicle_type_service" required>
            Vehicle Type Service
          </FormLabel>
          <div className="sm:h-16 h-14">
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
          <FormLabel htmlFor="minimum_price" required>
            Minimum Price
          </FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="minimum_price"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
          <FormLabel htmlFor="minimum_distance" required>
            Minimum Distance (Miles)
          </FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="minimum_distance"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
              placeholder="Enter Minimum Distance"
            />
          </div>
          <ErrorMessage
            name="minimum_distance"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full lg:w-[calc((((100%-40px)/3)*2)+20px)] sm:w-[calc((100%-20px)/2)]">
          <FormLabel htmlFor="vehicle_image" required>
            Vehicle Type Image
          </FormLabel>
          <div className="sm:h-16 h-14">
            <Field name="file">
              {({ form }) => (
                <div className="relative sm:px-5 px-4 flex items-center bg-[#ffffff] sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold">
                  <div className="flex items-center sm:items-center gap-2">
                    <Button className="text-[#1F41BB] whitespace-nowrap !font-normal lg:text-xl sm:text-base text-sm leading-[25px] sm:leading-6 sm:px-4 px-2 py-1 rounded-[5px] border border-[#1F41BB]">
                      <span>{fileName ? "Change File" : "Choose File"}</span>
                    </Button>
                    <div className="lg:text-[18px] sm:text-base text-sm leading-[22px] sm:leading-6 text-[#000000] font-normal w-[calc(100%-136px)]">
                      <span
                        className={
                          classNames("block truncate w-full", fileName ? "text-[#252525]" : "text-[#6C6C6C]")
                        }
                      >
                        {fileName || "No File Chosen"}
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        setFileName(file.name);
                        form.setFieldValue("vehicle_image", file);
                      } else {
                        setFileName("");
                        form.setFieldValue("vehicle_image", null);
                      }
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
        <div className="w-full lg:w-[calc((100%-40px)/3)] sm:w-[calc((100%-20px)/2)]">
          <FormLabel htmlFor="backup_bid_vehicle_type" required>
            Backup Bid Vehicle Type
          </FormLabel>
          <div className="sm:h-16 h-14">
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
