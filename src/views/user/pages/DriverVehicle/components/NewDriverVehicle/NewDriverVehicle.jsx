import React from "react";
import PageTitle from "../../../../../../components/ui/PageTitle";
import Button from "../../../../../../components/ui/Button/Button";
import PlusIcon from "../../../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../../../components/shared/CardContainer";
import { ErrorMessage, Field, Form, Formik } from "formik";

const ATTRIBUTES = [
  "No Smoking*",
  "Child Seat*",
  "Pets",
  "Wheel Chair*",
  "Lady Driver*",
];

const NewDriverVehicle = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-2.5 mb-[30px] px-4 pt-2">
        <div className="flex justify-between">
          <PageTitle title="Vehicle Types " />
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => navigate(DRIVER_VEHICLE_NEW_PATH)}
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add New Vehicle</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Manage vehicle related documents across all panels" />
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <CardContainer className="py-8 px-7">
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
                <div className="flex flex-wrap gap-5 mb-[60px]">
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Vehicle Type Name *
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Order No *
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Vehicle Type Service *
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Recommended Price (Miles)*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Minimum Price *
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Minimum Distance (Miles)*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Base Fare Less Than (x) Miles*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Base Fare Less Than (x) Miles Price*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Base Fare From (x) Miles to (x) Miles*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Base Fare From (x) Miles to (x) Miles Price*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Base Fare Greater Than (x) Miles*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Base Fare Greater Than (x) Miles Price*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Base Fare Greater Than (x) Miles*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Base Fare Greater Than (x) Miles*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      First Mile / Km*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Map API Provider"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Second Mile / Km*
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Google Maps"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    btnSize="md"
                    type="filledGray"
                    className="px-12 pt-4 pb-[15px] leading-[25px]"
                    //   onClick={() => setIsOpen(false)}
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    btnSize="md"
                    type="filled"
                    className="px-12 pt-4 pb-[15px] leading-[25px]"
                  >
                    <span>Submit</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContainer>
        <div className="pt-10 border-t border-[#E9E9E9]">
          <div className="flex flex-col gap-2.5 mb-[30px] px-4 pt-2">
            <div className="flex justify-between">
              <PageTitle title="Attributes" />
              <Button
                type="filled"
                btnSize="2xl"
                // onClick={() => navigate(DRIVER_VEHICLE_NEW_PATH)}
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
          <CardContainer className="px-10 py-7">
            <div className="flex flex-wrap gap-5">
              {ATTRIBUTES.map((atr, index) => (
                <div key={index} className="w-[calc((100%-60px)/4)]">
                  <CardContainer type={1} className="px-5 py-7">
                    <div className="text-[26px] leading-9 font-semibold text-[#252525] mb-7 text-center">
                      <span>{atr}</span>
                    </div>
                  </CardContainer>
                </div>
              ))}
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
  );
};

export default NewDriverVehicle;
