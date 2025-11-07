import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import FormikCheckbox from "../../../../../../components/ui/FormikCheckbox";

const PERMISSION_CONFIG = [
  { label: "Users", value: "users" },
  { label: "Drivers", value: "drivers" },
  { label: "Packages", value: "packages" },
  { label: "Rides", value: "rides" },
  { label: "Users1", value: "users1" },
  { label: "Drivers1", value: "drivers1" },
  { label: "Packages1", value: "packages1" },
  { label: "Rides1", value: "rides1" },
  { label: "Packages2", value: "packages2" },
  { label: "Rides2", value: "rides2" },
];

const PERMISSIONS = [
  { label: "View", value: "view" },
  { label: "Add", value: "add" },
  { label: "Edit", value: "edit" },
  { label: "Delete", value: "delete" },
  { label: "Extra", value: "extra" },
];

const ViewPermissions = ({ values, setFieldValue, readonly = false }) => {
  console.log(values, "inner-value");
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
