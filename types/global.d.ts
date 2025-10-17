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
    symbol: string;
    name: string;
    exchange: string;
    type: string;
  };

  type StockData = {
    symbol: string;
    company: string;
    logo?: string | undefined;
    price?: number;
    changePercent?: number;
    marketCap?: number;
    peRatio?: number;
  };

  type User = {
    id: string;
    name: string;
    email: string;
  };

  type StockWatchlist = Stock & {
    isWatched: boolean;
  };

  type FinnhubResult = {
    symbol: string;
    description: string;
    displaySymbol?: string;
    type: string;
  };

  type FinnhubResponse = {
    count: number;
    result: FinnhubResult[];
  };
}

export {};
