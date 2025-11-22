import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import FormikCheckbox from "../../../../../../components/ui/FormikCheckbox";
import { NAV_ELEMENTS } from "../../../../../../constants/nav.route.constant/nav.route.constant";
import { useAppSelector } from "../../../../../../store";

const PERMISSION_CONFIG = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Companies", value: "compaines" },
  { label: "Onboarding", value: "onBoarding" },
  { label: "Subscription", value: "subscription" },
  { label: "Usage Monitoring", value: "usag_monitoring" },
  { label: "Maps Configuration", value: "maps_configuration" },
  { label: "VoIP Settings", value: "voIp_settings" },
  { label: "Payments", value: "payments" }
];

const PERMISSIONS = [
  { label: "View", value: "view" },
  { label: "Add", value: "add" },
  { label: "Edit", value: "edit" },
  { label: "Delete", value: "delete" },
  { label: "Extra", value: "extra" },
];

const ViewPermissions = ({ values, setFieldValue, readonly = false }) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
      {PERMISSION_CONFIG.map(({ label, value }, index) => (
        <div key={index}>
          <CardContainer
            type={1}
            className="p-3 sm:p-4 lg:p-5 !rounded-[15px] flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0"
          >
            <PageSubTitle textColor={2} title={label} className="text-sm sm:text-base" />
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-5">
              {PERMISSIONS.map(
                ({ label: permissionName, value: permissionValue }, iIndex) => {
                  return (
                    <div key={iIndex}>
                      <FormikCheckbox
                        name={`${index}_${value}_${permissionValue}`}
                        label={permissionName}
                        labelClassNames="!text-[#6C6C6C] text-xs sm:text-sm"
                        checked={values?.permissions[value]?.includes(
                          permissionValue
                        )}
                        readonly={readonly}
                        onChange={() => {
                          console.log(value);
                          setFieldValue("permissions", {
                            ...values.permissions,
                            [value]: [
                              ...values.permissions[value],
                              permissionValue,
                            ],
                          });
                        }}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </CardContainer>
        </div>
      ))}
    </div>
  );
};

export default ViewPermissions;
