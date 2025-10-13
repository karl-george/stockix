import { UseFormRegister } from 'react-hook-form';

declare global {
  type SignUpFormData = {
    name: string;
    email: string;
    password: string;
  };

  type SignInFormData = {
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

  type Quote = {
    c?: number | undefined;
    dp?: number | undefined;
  };

  type Profile = {
    name?: string | undefined;
    marketCapitalization?: number | undefined;
    logo?: string | undefined;
  };

  type Financials = {
    metric?:
      | {
          [key: string]: number;
        }
      | undefined;
  };

  type Stock = {
    company: string;
    logo: string;
    symbol: string;
    price: number;
    changePercent: number;
  };
}

export {};
