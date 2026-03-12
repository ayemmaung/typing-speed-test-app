import { useState } from "react";
import DropdownIcon from "../assets/images/icon-down-arrow.svg";
import Button from "./Button";
import DropdownItem from "./DropdownItem";
import type { DropdownProps } from "../types/ui";

const Dropdown = ({
  title,
  placeholder,
  icon,
  options = [],
  selectedValue,
  className = "",
  onChange,
}: DropdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded((prev) => !prev);
  };

  const dropdownItemOnChange = (value: object) => {
    onChange(value);
    setIsExpanded(false);
  };

  return (
    <div className={`dropdown-container ${className}`}>
      <Button type="custom" className="dropdown-btn" onClick={toggleDropdown}>
        {icon && (
          <img
            width={15}
            src={icon}
            alt="dropdown icon"
            className="dropdown-icon"
          />
        )}
        <span>{placeholder}</span>
        <img
          width={15}
          src={DropdownIcon}
          alt="Dropdown Icon"
          className={`dropdown-icon ${isExpanded ? "rotated" : ""}`}
        />
      </Button>
      {isExpanded && (
        <ul className="dropdown-select-options">
          {title && <div className="dropdown-title">{title}</div>}
          {options.map((option, index) => {
            return (
              <DropdownItem
                key={index}
                {...option}
                selectedValue={selectedValue}
                onChange={dropdownItemOnChange}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
