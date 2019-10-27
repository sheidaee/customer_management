import { ReactNode } from "react";

export interface FormValues {
  customerID?: number;
  first: string;
  last: string;
  gender: string;
  birthday: string | Date;
  customerLifetimeValue: number | string;
  loading?: boolean;
}

export type AddCustomerP = Omit<FormValues, "customerID">;

export interface IFormikProps {
  handleChange?: (e: React.ChangeEvent) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  setFieldValue?: (field: string, value: string) => void;
  values?: FormValues;
  options?: Array<{
    code: string;
    country: string;
  }>;
}

export interface IFormProps {
  dialogCloseHandler?: any;
  handleSubmitHandler?: any;
  children?: ReactNode;
  isSubmitting?: boolean;
  loading?: boolean;
}

export type PropsWithFormik = IFormProps & IFormikProps;
