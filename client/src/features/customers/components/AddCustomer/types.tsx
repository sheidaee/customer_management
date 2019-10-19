import { ReactNode } from "react";

export interface FormValues {
  customerID?: number;
  first: string;
  last: string;
  gender: string;
  birthday: string | Date;
  customerLifetimeValue: number | string;
}

export type AddCustomerP = Omit<FormValues, "customerID">;

export interface FormProps {
  dialogCloseHandler?: any;
  handleSubmitHandler?: any;
  children?: ReactNode;
}
