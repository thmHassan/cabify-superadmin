import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import Button from "../../../../../../components/ui/Button/Button";
import FormLabel from "../../../../../../components/ui/FormLabel";
import classNames from "classnames";

const MileageRateSettingsForm = ({ formEl }) => {
  const { values, setFieldValue, setTouched, validateField } = formEl;
  
  const handleAddRange = async () => {
    if (values.mileage_system !== "dynamic") return;
    
    const currentFromArray = values.from_array || [];
    const currentToArray = values.to_array || [];
    const currentPriceArray = values.price_array || [];
    
    // If arrays are empty, validate the input fields
    if (currentFromArray.length === 0) {
      // Mark fields as touched to show validation errors
      setTouched({
        from: true,
        to: true,
        price: true,
      });
      
      // Validate the fields and wait for results
      const fromError = await validateField("from");
      const toError = await validateField("to");
      const priceError = await validateField("price");
      
      // Check if there are any errors or empty values
      if (fromError || toError || priceError || !values.from || !values.to || !values.price) {
        return; // Don't add if validation fails
      }
    } else {
      // If arrays already have entries, only validate if fields have values
      if (values.from || values.to || values.price) {
        // Mark fields as touched to show validation errors
        setTouched({
          from: true,
          to: true,
          price: true,
        });
        
        // Validate the fields and wait for results
        const fromError = await validateField("from");
        const toError = await validateField("to");
        const priceError = await validateField("price");
        
        // Check if there are any errors
        if (fromError || toError || priceError) {
          return; // Don't add if validation fails
        }
        
        // If fields are empty, don't add (but don't show error)
        if (!values.from || !values.to || !values.price) {
          return;
        }
      } else {
        // If arrays have entries and fields are empty, just return (no validation needed)
        return;
      }
    }
    
    // Add to arrays
    setFieldValue("from_array", [...currentFromArray, Number(values.from)]);
    setFieldValue("to_array", [...currentToArray, Number(values.to)]);
    setFieldValue("price_array", [...currentPriceArray, Number(values.price)]);
    
    // Clear input fields
    setFieldValue("from", "");
    setFieldValue("to", "");
    setFieldValue("price", "");
    
    // Clear touched state
    setTouched({
      from: false,
      to: false,
      price: false,
    });
  };
  
  const handleRemoveRange = (index) => {
    const currentFromArray = values.from_array || [];
    const currentToArray = values.to_array || [];
    const currentPriceArray = values.price_array || [];
    
    setFieldValue(
      "from_array",
      currentFromArray.filter((_, i) => i !== index)
    );
    setFieldValue(
      "to_array",
      currentToArray.filter((_, i) => i !== index)
    );
    setFieldValue(
      "price_array",
      currentPriceArray.filter((_, i) => i !== index)
    );
  };
  return (
    <CardContainer
      type={1}
      className="2xl:py-8 2xl:px-7 lg:py-5 lg:px-4 sm:px-4 px-3 sm:py-5 py-3"
    >
      <div>
        <CardContainer
          type={1}
          className="2xl:px-6 2xl:py-7 lg:px-4 lg:py-5 sm:px-4 px-3 sm:py-5 py-3 mb-[25px]"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-16 sm:pr-[30px] mb-4 sm:mb-0">
              <div className="h-[94px] flex items-center">
                <div
                  className={classNames(
                    "min-w-[34px] h-[34px] rounded-full border border-[#1F41BB] p-1.5 cursor-pointer"
                  )}
                  onClick={() => {
                    setFieldValue("mileage_system", "fixed");
                    // Clear dynamic fields when switching to fixed
                    setFieldValue("from", "");
                    setFieldValue("to", "");
                    setFieldValue("price", "");
                    setFieldValue("from_array", []);
                    setFieldValue("to_array", []);
                    setFieldValue("price_array", []);
                  }}
                >
                  <div
                    className={classNames("w-full h-full rounded-full", {
                      "bg-[#1F41BB]": values.mileage_system === "fixed",
                    })}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-[calc(100%-64px)]">
              <div className="flex flex-wrap gap-3 sm:gap-5">
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <FormLabel htmlFor="first_mile_km" required>
                    First Mile / Km
                  </FormLabel>
                  <div className="sm:h-16 h-14">
                    <Field
                      type="text"
                      name="first_mile_km"
                      className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                      placeholder="0"
                    />
                  </div>
                  <ErrorMessage
                    name="first_mile_km"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <FormLabel htmlFor="second_mile_km" required>
                    Second Mile / Km
                  </FormLabel>
                  <div className="sm:h-16 h-14">
                    <Field
                      type="text"
                      name="second_mile_km"
                      className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                      placeholder="0"
                    />
                  </div>
                  <ErrorMessage
                    name="second_mile_km"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContainer>
        <CardContainer
          type={1}
          className="2xl:px-6 2xl:py-7 lg:px-4 lg:py-5 sm:px-4 px-3 sm:py-5 py-3 mb-[25px] flex flex-col sm:flex-row"
        >
          <div className="w-full sm:w-16 sm:pr-[30px] mb-4 sm:mb-0">
            <div className="h-[94px] flex items-center">
              <div
                className={classNames(
                  "min-w-[34px] h-[34px] rounded-full border border-[#1F41BB] p-1.5 cursor-pointer"
                )}
                onClick={() => {
                  setFieldValue("mileage_system", "dynamic");
                  // Clear fixed fields when switching to dynamic
                  setFieldValue("first_mile_km", "");
                  setFieldValue("second_mile_km", "");
                }}
              >
                <div
                  className={classNames("w-full h-full rounded-full", {
                    "bg-[#1F41BB]": values.mileage_system === "dynamic",
                  })}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[calc(100%-64px)] flex flex-col gap-[30px]">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
              <div className="w-full sm:w-[calc(100%-157px)] flex flex-col sm:flex-row gap-4 sm:gap-5">
                <div className="w-full sm:w-[calc((100%-40px)/3)]">
                  <FormLabel 
                    htmlFor="from" 
                    required={values.mileage_system === "dynamic" && (!values.from_array || values.from_array.length === 0)}
                  >
                    From
                  </FormLabel>
                  <div className="sm:h-16 h-14">
                    <Field
                      type="text"
                      name="from"
                      className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                      placeholder="Enter From Mile / Km*"
                    />
                  </div>
                  {values.mileage_system === "dynamic" && (!values.from_array || values.from_array.length === 0) && (
                    <ErrorMessage
                      name="from"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  )}
                </div>
                <div className="w-full sm:w-[calc((100%-40px)/3)]">
                  <FormLabel 
                    htmlFor="to" 
                    required={values.mileage_system === "dynamic" && (!values.from_array || values.from_array.length === 0)}
                  >
                    To
                  </FormLabel>
                  <div className="sm:h-16 h-14">
                    <Field
                      type="text"
                      name="to"
                      className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                      placeholder="Enter To Mile / Km*"
                    />
                  </div>
                  {values.mileage_system === "dynamic" && (!values.from_array || values.from_array.length === 0) && (
                    <ErrorMessage
                      name="to"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  )}
                </div>
                <div className="w-full sm:w-[calc((100%-40px)/3)]">
                  <FormLabel 
                    htmlFor="price" 
                    required={values.mileage_system === "dynamic" && (!values.from_array || values.from_array.length === 0)}
                  >
                    Fare
                  </FormLabel>
                  <div className="sm:h-16 h-14">
                    <Field
                      type="text"
                      name="price"
                      className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                      placeholder="Enter Fare*"
                    />
                  </div>
                  {values.mileage_system === "dynamic" && (!values.from_array || values.from_array.length === 0) && (
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  )}
                </div>
              </div>
              <div className="w-full sm:w-[157px] sm:pl-5 pt-4 sm:pt-[30px]">
                <Button
                  type="button"
                  onClick={handleAddRange}
                  className="text-[#1F41BB] border border-[#1F41BB] h-16 w-full rounded-lg"
                >
                  <PageSubTitle title="Add Range" className="!text-[#1F41BB]" />
                </Button>
              </div>
            </div>
            {(values.from_array || []).length > 0 &&
              values.from_array.map((__, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                  <div className="w-full sm:w-[calc(100%-157px)] flex flex-col sm:flex-row gap-4 sm:gap-5">
                    <div className="w-full sm:w-[calc((100%-40px)/3)]">
                      <FormLabel htmlFor={`from_array_${index}`} required>
                        From
                      </FormLabel>
                      <div className="sm:h-16 h-14">
                        <Field
                          type="text"
                          name={`from_array.${index}`}
                          className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                          placeholder="Enter From Mile / Km*"
                        />
                      </div>
                      {values.mileage_system === "dynamic" && (
                        <ErrorMessage
                          name={`from_array.${index}`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      )}
                    </div>
                    <div className="w-full sm:w-[calc((100%-40px)/3)]">
                      <FormLabel htmlFor={`to_array_${index}`} required>
                        To
                      </FormLabel>
                      <div className="sm:h-16 h-14">
                        <Field
                          type="text"
                          name={`to_array.${index}`}
                          className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                          placeholder="Enter To Mile / Km*"
                        />
                      </div>
                      {values.mileage_system === "dynamic" && (
                        <ErrorMessage
                          name={`to_array.${index}`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      )}
                    </div>
                    <div className="w-full sm:w-[calc((100%-40px)/3)]">
                      <FormLabel htmlFor={`price_array_${index}`} required>
                        Fare
                      </FormLabel>
                      <div className="sm:h-16 h-14">
                        <Field
                          type="text"
                          name={`price_array.${index}`}
                          className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                          placeholder="Enter Fare*"
                        />
                      </div>
                      {values.mileage_system === "dynamic" && (
                        <ErrorMessage
                          name={`price_array.${index}`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-full sm:w-[157px] sm:pl-5 pt-4 sm:pt-[30px]">
                    <Button
                      type="button"
                      onClick={() => handleRemoveRange(index)}
                      className="text-[#FF4747] border border-[#FF4747] h-16 w-full rounded-lg"
                    >
                      <PageSubTitle
                        title="Remove"
                        className="!text-[#FF4747]"
                      />
                    </Button>
                  </div>
                </div>
              ))}
            {values.mileage_system === "dynamic" && (!values.from_array || values.from_array.length === 0) && (
              <ErrorMessage
                name="from_array"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            )}
          </div>
        </CardContainer>
      </div>
    </CardContainer>
  );
};

export default MileageRateSettingsForm;
