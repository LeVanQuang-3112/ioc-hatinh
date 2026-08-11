import type { SelectHTMLAttributes } from "react";

type SelectOption<Value extends string> = {
  label: string;
  value: Value;
};

type Props<Value extends string> = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "onChange" | "value"
> & {
  options: Array<SelectOption<Value>>;
  value: Value;
  onValueChange: (value: Value) => void;
};

export function SelectField<Value extends string>({
  options,
  onValueChange,
  ...props
}: Props<Value>) {
  return (
    <select
      {...props}
      onChange={(event) => onValueChange(event.target.value as Value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
