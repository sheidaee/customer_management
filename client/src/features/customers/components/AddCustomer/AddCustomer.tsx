import React from "react";
import { useSelector, useDispatch } from "../../../../hooks/react-redux.hooks";
import { Button, Intent } from "@blueprintjs/core";
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
  Field,
  FieldProps
} from "formik";

import { customerOperations } from "../../";
import DialogBox from "../../../../components/DialogBox";
import { validate } from "../../../../utilities/utility";
import { FormValues, FormProps } from "./types";

import { DialogProps, BtnType } from "../../../../components/DialogBox/types";

import Styles from "./AddCustomer.module.scss";
import {
  RenderText,
  RenderSelect,
  RenderDate,
  genderOptions
} from "../../../../components/Form";
import Fieldset from "../../../../components/Fieldset/Fieldset";

const dialogProps: DialogProps = {
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

export function AddCustomer(props: FormProps) {
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

    setTimeout(async () => {
      actions.setSubmitting(false);
      await props.dialogCloseHandler();
    }, 500);
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
              <div className={Styles.row}>
                <div>
                  <Field
                    name="first"
                    label="First name"
                    component={RenderText}
                  />
                </div>
                <div>
                  <Field name="last" label="Last name" component={RenderText} />
                </div>
              </div>
              <div className={Styles.row}>
                <div>
                  <Field
                    name="gender"
                    label="Gender"
                    component={RenderSelect}
                    items={genderOptions}
                  />
                </div>
                <div>
                  <Field
                    name="birthday"
                    label="Birthday"
                    component={RenderDate}
                  />
                </div>
              </div>
              <div className={`pt-dialog-footer-actions ${Styles.actionBar}`}>
                <Button text="close" onClick={props.dialogCloseHandler} />
                <Button
                  text="save"
                  type="submit"
                  intent={Intent.PRIMARY}
                  disabled={isSubmitting === true || loading === true}
                />
              </div>
            </Fieldset>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default DialogBox(AddCustomer, dialogProps);
