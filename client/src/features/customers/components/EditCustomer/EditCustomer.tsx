import React from "react";
import { useDispatch } from "react-redux";
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
  Field,
  FieldProps
} from "formik";
import { Button, Intent } from "@blueprintjs/core";

import { customerOperations } from "../../";
import DialogBox from "../../../../components/DialogBox";
import TextField from "../../../../components/TextField";
import DateInputField from "../../../../components/DateInputField";
import SelectField from "../../../../components/SelectField";
import { classNames, validate } from "../../../../utilities/utility";
import { DialogProps, BtnType } from "../../../../components/DialogBox/types";

import Styles from "./EditCustomer.module.scss";
import { FormValues, FormProps } from "./types";
import {
  RenderText,
  RenderSelect,
  RenderDate,
  genderOptions
} from "../../../../components/Form";
import Fieldset from "../../../../components/Fieldset";

const dialogProps: DialogProps = {
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
function EditCustomer(props: FormProps) {
  const dispatch = useDispatch();

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
          <form onSubmit={handleSubmit}>
            <Fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
              <div className={Styles.row}>
                <div>
                  <Field
                    name="first"
                    label="First name"
                    component={RenderText}
                    captionClassName={Styles.formCaption}
                    dataClassName={Styles.formData}
                  />
                </div>
                <div>
                  <Field
                    name="last"
                    label="Last name"
                    component={RenderText}
                    captionClassName={Styles.formCaption}
                    dataClassName={Styles.formData}
                  />
                </div>
              </div>
              <div className={Styles.row}>
                <div>
                  <Field
                    name="gender"
                    label="Gender"
                    component={RenderSelect}
                    captionClassName={Styles.formCaption}
                    dataClassName={Styles.formData}
                    items={genderOptions}
                  />
                </div>
                <div>
                  <Field
                    name="birthday"
                    label="Birthday"
                    component={RenderDate}
                    captionClassName={Styles.formCaption}
                    dataClassName={Styles.formData}
                  />
                </div>
              </div>
              <div className={`pt-dialog-footer-actions ${Styles.actionBar}`}>
                <Button text="close" onClick={dialogCloseHandler} />
                <Button
                  text="save"
                  type="submit"
                  intent={Intent.PRIMARY}
                  disabled={isSubmitting === true}
                />
              </div>
            </Fieldset>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default DialogBox(EditCustomer, dialogProps);
