import { FC, useEffect, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { Error, Input, Label } from "../styles";

export const FormInput: FC<{
  label: string;
  placeholder: string;
  err: FieldError | undefined;
  register: UseFormRegister<any>;
  name: string;
  isSecure?: boolean;
}> = ({ label, placeholder, err, register, name, isSecure = false }) => {
  return (
    <>
      <Label>{label}</Label>
      <Input
        type={isSecure ? "password" : "text"}
        placeholder={placeholder}
        isValid={!!!err}
        {...register(name)}
      />
      {err && <Error>{err.message}</Error>}
    </>
  );
};

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      isValid={true}
      isFilter={true}
    />
  );
};
