import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { apiExtendSubscription } from "../../../../../../../../services/SubscriptionService";
import Button from "../../../../../../../../components/ui/Button/Button";

const EXTEND_SUBSCRIPTION_VALIDATION_SCHEMA = Yup.object().shape({
  tenant_id: Yup.string().required("Company ID is required"),
  expiry_date: Yup.date()
    .required("Expiry date is required")
    .min(new Date(), "Expiry date must be in the future"),
});

const AddExtendSubscription = ({ initialValue = {}, setIsOpen, onSuccess }) => {
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append("tenant_id", values.tenant_id); // <-- correct id from your list
      formData.append("expiry_date", values.expiry_date);

      const response = await apiExtendSubscription(formData);

      if (response?.status === 200 || response?.data?.success === 1) {
        if (onSuccess) onSuccess();
        setIsOpen(false);
      } else {
        setSubmitError(response?.data?.message || "Failed to extend subscription");
      }
    } catch (error) {
      console.error("Error extending subscription:", error);
      setSubmitError(error?.response?.data?.message || "Error extending subscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 mx-auto w-full">
      <Formik
        initialValues={{
          tenant_id: initialValue?.id || "", // <-- correct company id
          expiry_date: initialValue?.expiry_date || "",
        }}
        validationSchema={EXTEND_SUBSCRIPTION_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {() => {
          return (
            <Form>
              <div className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#252525] mb-6 text-center">
                Extend Subscription
              </div>

              {submitError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {submitError}
                </div>
              )}

              {/* Expiry date input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  New Expiry Date
                </label>
                <Field
                  type="date"
                  name="expiry_date"
                  className="border rounded p-2 w-full"
                />
                <ErrorMessage
                  name="expiry_date"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  btnSize="md"
                  type="filledGray"
                  className="!px-10 pt-4 pb-[15px] w-full sm:w-auto"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  btnType="submit"
                  btnSize="md"
                  type="filled"
                  className="!px-10 pt-4 pb-[15px] w-full sm:w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? "Extending..." : "Extend Subscription"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddExtendSubscription;
