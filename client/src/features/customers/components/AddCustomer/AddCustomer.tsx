import React from "react";
import { useSelector, useDispatch } from "../../../../hooks/react-redux.hooks";
import { Formik, FormikActions } from "formik";
import wait from "waait";

import { customerOperations } from "../../";
import DialogBox from "../../../../components/DialogBox";
import { validate } from "../../../../utilities/utility";
import { FormValues, IFormProps } from "./types";

import { IDialogProps, BtnType } from "../../../../components/DialogBox/types";

import AddCustomerContent from "./AddCustomerContent";
import Styles from "./AddCustomer.module.scss";

const dialogProps: IDialogProps = {
  btn: {
    btnType: BtnType.BUTTON,
    btnProps: {
      className: "",
      icon: "add",
      text: "Add customer"
    }
  },
  dialog: {
    icon: "inbox",
    title: "Add Customer"
  },
  customOperationBtn: true
};

export function AddCustomer(props: IFormProps) {
  const dispatch = useDispatch();
  const loading = useSelector(({ app }: any) => app.loading);

  const addCustomerHandler = async (
    formValues: FormValues,
    actions: FormikActions<FormValues>
  ) => {
    const { first, last, gender, birthday, customerLifetimeValue } = formValues;
    dispatch(
      await customerOperations.addCustomer({
        first,
        last,
        gender,
        birthday,
        customerLifetimeValue
      })
    );

    await wait(500);

    actions.setSubmitting(false);
    await props.dialogCloseHandler();
  };

  const initialValues = {
    first: "",
    last: "",
    gender: "",
    birthday: new Date(),
    customerLifetimeValue: (Math.random() * 100 + 1).toFixed(2)
  };

  return (
    <div className={Styles.Customer}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={addCustomerHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <AddCustomerContent
            {...{
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }}
            {...props}
            loading={loading as boolean}
          />
        )}
      </Formik>
    </div>
  );
}

export default DialogBox(AddCustomer, dialogProps);
