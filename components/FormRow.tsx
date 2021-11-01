import Input from './Input';

type FormRowProps = {
  value: any;
  name: string;
  onInputChange: any;
  unit?: string;
  wide?: boolean;
  disabled?: boolean;
};

const FormRow = ({
  value,
  name,
  unit,
  onInputChange,
  wide,
  disabled,
}: FormRowProps) => (
  <div className="grid sm:grid-cols-3 sm:gap-4 items-start sm:border-t sm:border-gray-100 py-5">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
      {name}
    </label>
    <div className={`mt-1 sm:mt-0 ${wide ? 'col-span-2' : 'col-span-1'}`}>
      <Input
        value={value}
        onChange={onInputChange}
        readOnly={disabled}
        disabled={disabled}
      />
    </div>
    {unit && (
      <span className="text-xs font-medium text-gray-500 pt-2">{unit}</span>
    )}
  </div>
);

export default FormRow;
