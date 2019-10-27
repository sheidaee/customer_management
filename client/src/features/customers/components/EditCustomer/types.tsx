import { ReactNode } from "react";

export interface FormValues {
  customerID: number;
  first: string;
  last: string;
  gender: string;
  birthday: string | Date;
  customerLifetimeValue: number;
}

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
  initialValues: any;
  dialogCloseHandler?: any;
  handleSubmit?: any;
  children?: ReactNode;
  isSubmitting?: boolean;
  loading?: boolean;
}

export type PropsWithFormik = IFormProps & IFormikProps;
