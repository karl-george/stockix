import { Input } from './ui/input';
import { Label } from './ui/label';

const InputField = ({
  name,
  label,
  placeholder,
  type = 'text',
  register,
  error,
  validation,
  disabled,
  value,
}: FormInputProps) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        {...register(name, validation)}
      />
      {error && <p className='text-red-500'>{error.message}</p>}
    </div>
  );
};

export default InputField;
