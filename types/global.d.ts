import { UseFormRegister } from 'react-hook-form';

declare global {
  type SignUpFormData = {
    name: string;
    email: string;
    password: string;
  };

  type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string | undefined;
    register: UseFormRegister;
    error?: any;
    validation?: any;
    disabled?: boolean | undefined;
    value?: string | undefined;
  };
}

export {};
