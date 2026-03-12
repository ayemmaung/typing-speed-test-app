import type { ButtonProps } from "../types/ui";

const Button = ({
  type,
  bgColor,
  className,
  placeholder,
  onClick,
  children,
}: ButtonProps) => {
  if (type === "custom") {
    return (
      <button className={`btn ${className || ""}`} onClick={onClick}>
        {children}
      </button>
    );
  }

  className =
    bgColor === "white"
      ? `${className || ""} bg-white hover:bg-slate-200 text-black`
      : bgColor
        ? `${className || ""} bg-${bgColor}-500 hover:bg-${bgColor}-600`
        : `${className || ""} bg-blue-500 hover:bg-blue-600`;

  return (
    <button className={`btn ${className || ""}`} onClick={onClick}>
      {placeholder || "Click Here!"}
    </button>
  );
};

export default Button;
