import { FieldValues } from "react-hook-form";
import ReactSelect, { MultiValue } from "react-select";

interface Props<T extends FieldValues> {
  label: string;
  value?: MultiValue<T>;
  onChange: (value: MultiValue<T>) => void;
  options: T[];
  disabled?: boolean;
}

function Select<T extends FieldValues>({
  label,
  value,
  onChange,
  options,
  disabled,
}: Props<T>) {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            })
          }}
          classNames={{
            control: () => "text-sm"
          }}
        />
      </div>
    </div>
  );
}

export default Select;
