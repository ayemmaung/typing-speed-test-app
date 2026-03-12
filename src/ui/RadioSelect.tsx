import { RadioSelectProps } from "@/types/ui";
import Button from "./Button";

const RadioSelect = ({
  options,
  selectedValue,
  onChange,
}: RadioSelectProps) => {
  return (
    <>
      {options.map((option) => (
        <Button
          key={option.value}
          type="custom"
          className={`stat-btn ${
            selectedValue === option.value ? "active" : ""
          }`}
          onClick={() => onChange(option)}
        >
          {option.label}
        </Button>
      ))}
    </>
  );
};

export default RadioSelect;
