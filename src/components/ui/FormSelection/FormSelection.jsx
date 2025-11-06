import React from "react";
import Select from "react-select";
import DropdownIndicator from "../DropdownIndicator";

const defaultOptions = [
  { value: "value1", label: "label 1" },
  { value: "value2", label: "label 2" },
  { value: "value3", label: "label 3" },
  { value: "value4", label: "label 4" },
];

const FormSelection = ({
  options = defaultOptions,
  value,
  onChange,
  placeholder = "Select option",
  isMulti = false,
  isDisabled = false,
  name,
  menuPlacement = "auto",
}) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      // placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold
      borderRadius: "8px",
      height: isMulti ? "auto" : "64px",
      minHeight: "64px",
      width: "100%",
      borderColor: state.isFocused ? "#1f41bb" : "#8D8D8D",
      boxShadow: state.isFocused
        ? "0 0 0 2px #1f41bb inset, -4px 4px 6px 0px #0000001F"
        : "-4px 4px 6px 0px #0000001F",
      transition: "none",
      fontSize: "16px",
      lineHeight: "22px",
      fontWeight: "600",
      alignItems: isMulti ? "flex-start" : base.alignItems,
      "&:hover": { borderColor: "#1f41bb" },
      "&placeholder": { color: "#6C6C6C" },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 12px",
      gap: "8px",
      alignItems: "center",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      borderRadius: "12px",
      overflow: "hidden",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#e0e7ff"
        : state.isFocused
        ? "#f3f4f6"
        : "white",
      color: state.isSelected ? "#1d4ed8" : "#111827",
      cursor: "pointer",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#6b7280",
      margin: 0,
    }),
    singleValue: (base) => ({
      ...base,
      color: "#111827",
    }),
  };

  return (
    <Select
      name={name}
      options={options}
      className="form-selection"
      value={
        isMulti
          ? options.filter((opt) => value?.includes(opt.value))
          : options.find((opt) => opt.value === value) || null
      }
      onChange={(selectedOption) => {
        if (isMulti) {
          onChange(
            selectedOption ? selectedOption.map((opt) => opt.value) : []
          );
        } else {
          onChange(selectedOption ? selectedOption.value : "");
        }
      }}
      placeholder={placeholder}
      isMulti={isMulti}
      isDisabled={isDisabled}
      styles={customStyles}
      components={{
        DropdownIndicator: (props) => (
          <div className="py-3 pr-3 pl-1">
            <DropdownIndicator size="sm" {...props} />
          </div>
        ),
        IndicatorSeparator: () => null,
      }}
      menuPlacement={menuPlacement}
    />
  );
};

export default FormSelection;
