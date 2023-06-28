import { FocusEventHandler, forwardRef } from "react";
import CreatableSelect from "react-select/creatable";

export interface SelectOption {
  readonly label: string;
  readonly value: string;
}

interface SelectProps {
  onChange: (value: SelectOption) => void;
  options: SelectOption[];
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?: SelectOption; // No siempre se tiene un valor
}

const Select = forwardRef<any, SelectProps>(
  ({ onChange, options, value, onBlur }, ref) => {
    const handleCreate = () => {
      console.log("Debería crearse");
    };

    return (
      <CreatableSelect
        ref={ref}
        onBlur={onBlur}
        isDisabled={false}
        isLoading={false}
        value={value}
        onChange={(value: SelectOption | null) => {
          if (value) {
            onChange(value);
          }
        }}
        onCreateOption={handleCreate}
        options={options}
      />
    );
  }
);

export default Select;
