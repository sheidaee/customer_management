import { InjectedFormProps } from "redux-form";
import { ReactNode } from "react";

export interface FormValues {
  customerID: number;
  first: string;
  last: string;
  gender: string;
  birthday: string | Date;
  customerLifetimeValue: number;
}

export type AddCustomerP = Omit<FormValues, "customerID">;

interface FormComponentProps {
  // interface FormComponentProps extends InjectedFormProps {
  dialogCloseHandler?: any;
  handleSubmit: any;
  children?: ReactNode;
  submitting: boolean;
}

export type FormProps = FormComponentProps;
