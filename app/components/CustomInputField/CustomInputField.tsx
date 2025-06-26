import * as React from "react";
import { Label } from "app/components/ui/label";
import { Input } from "app/components/ui/input";

type InputFieldProps = {
  label: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
};

export const CustomInputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  autoFocus = false,
  defaultValue,
  className,
}: InputFieldProps) => {
  const inputId = React.useId();

  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        className={className}
        defaultValue={defaultValue}
      />
    </div>
  );
};
