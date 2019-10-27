import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikActions } from "formik";

import { customerOperations } from "../../";
import DialogBox from "../../../../components/DialogBox";
import { validate } from "../../../../utilities/utility";
import { IDialogProps, BtnType } from "../../../../components/DialogBox/types";

import Styles from "./EditCustomer.module.scss";
import { FormValues, IFormProps } from "./types";
import EditCustomerContent from "./EditCustomerContent";

const dialogProps: IDialogProps = {
  btn: {
    btnType: BtnType.ICON,
    btnProps: {
      icon: "edit",
      className: Styles.EditBtn,
      text: "Edit customer"
    }
  },
  dialog: {
    icon: "inbox",
    title: "Edit Customer"
  },
  customOperationBtn: true
};

/**
 * Edit customer form
 *
 */
export function EditCustomer(props: IFormProps) {
  const dispatch = useDispatch();
  const loading = useSelector(({ app }: any) => app.loading);

  const { dialogCloseHandler, initialValues } = props;

  const editCustomerHandler = async (
    formValues: FormValues,
    actions: FormikActions<FormValues>
  ) => {
    const {
      customerID,
      first,
      last,
      gender,
      birthday,
      customerLifetimeValue
    } = formValues;

    dispatch(
      await customerOperations.editCustomer({
        customerID,
        first,
        last,
        gender,
        birthday,
        customerLifetimeValue
      })
    );

    setTimeout(async () => {
      actions.setSubmitting(false);
      await dialogCloseHandler();
    }, 500);
  };

  return (
    <div className={Styles.EditCustomer}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={editCustomerHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <EditCustomerContent
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

export default DialogBox(EditCustomer, dialogProps);
