import type { DropdownItemProps } from "../types/ui";

const DropdownItem = ({
  title,
  type,
  groupKey,
  options,
  children,
  selectedValue,
  onChange,
}: DropdownItemProps) => {
  const isSelected = (value: string) => {
    return selectedValue && value === selectedValue;
  };

  if (type === "toggle") {
    const selectedOption = selectedValue[groupKey];
    options = options.filter((opt) => opt.value !== selectedOption);
    return (
      <>
        <div className="dropdown-toggle">
          {options.map((option, index) => {
            const { label, value } = option;
            return (
              <li
                key={index}
                className={`dropdown-option ${isSelected(value) ? "selected" : ""}`}
                onClick={() => onChange({ ...option, groupKey })}
              >
                {label}
              </li>
            );
          })}
        </div>
        {children &&
          children.map((child, index) => {
            const selectedChild =
              selectedValue[child.groupKey] || selectedOption;
            return (
              <DropdownItem
                key={index.toString()}
                {...child}
                selectedValue={selectedChild}
                onChange={onChange}
              />
            );
          })}
      </>
    );
  }

  if (type === "radio-select") {
    return (
      <div className="dropdown-item radio-select">
        {options.map((option, index) => {
          const { label, value } = option;
          return (
            <div
              key={index}
              className="dropdown-option radio-select-option"
              onClick={() => onChange({ ...option, groupKey })}
            >
              <input
                type="radio"
                key={index}
                checked={isSelected(value)}
                className={`dropdown-option-radio-input ${isSelected(value) ? "selected" : ""}`}
                onChange={() => onChange({ ...option, groupKey })}
              />
              {label}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={type ? `dropdown-item ${type}` : "dropdown-item"}>
      {title && <label className="dropdown-option-label">{title}</label>}
      {options.map((option, index) => {
        const { label, value } = option;
        return (
          <li
            key={index}
            className={`dropdown-option ${isSelected(value) ? "selected" : ""}`}
            onClick={() => onChange({ ...option, groupKey })}
          >
            <span>{label}</span>
          </li>
        );
      })}
    </div>
  );
};

export default DropdownItem;
