import { ReactNode } from "react";

export interface FormValues {
  customerID: number;
  first: string;
  last: string;
  gender: string;
  birthday: string;
  customerLifetimeValue: number;
}

export interface FormProps {
  initialValues: any;
  dialogCloseHandler?: any;
  handleSubmit?: any;
  children?: ReactNode;
}
