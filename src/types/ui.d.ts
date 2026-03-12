import { ReactNode } from "react";

export type ButtonProps = {
  type?: string;
  bgColor?: string;
  placeholder?: string;
  className?: string;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
};

export type Option = { label: string; value: string };

export type Options = {
  title?: string;
  type?: string;
  groupKey?: string;
  options: Option[];
  children?: Options[];
};

export type DropdownProps = {
  title?: string;
  placeholder?: string;
  icon?: string;
  options: Options[];
  selectedValue?: string | object;
  onChange?: (value: string | object) => void;
  className?: string;
};

export type DropdownItemProps = {
  title?: string;
  type?: string;
  groupKey?: string;
  options: Option[];
  children?: Options[];
  selectedValue?: string | object;
  onChange?: (value: string | object) => void;
};

export type StatDisplayTypes = "best-score" | "radio-select" | "card" | "";

export type StatDisplayProps = {
  name: string;
  value?: number | string | ReactNode;
  type?: StatDisplayTypes;
  children?: React.ReactNode;
};

export type RadioSelectProps = {
  options: Option[];
  selectedValue?: string | object;
  onChange: (value: string | object) => void;
};
