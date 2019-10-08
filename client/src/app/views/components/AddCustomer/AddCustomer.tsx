import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Intent } from "@blueprintjs/core";

import { customerOperations } from "../../../state/ducks/customer";
import DialogBox from "../UI/DialogBox";
import TextField from "../UI/TextField";
import DateInputField from "../UI/DateInputField";
import SelectField from "../UI/SelectField";
import { classNames } from "../../../utilities";
import { FormValues } from "./types";

import Styles from "./AddCustomer.module.scss";

const dialogProps = {
  btn: {
    type: "button",
    className: "pt-intent-primary pt-large pt-icon-add",
    text: "Add customer",
    disabled: ""
  },
  dialog: {
    icon: "inbox",
    title: "Add Customer"
  },
  customOperationBtn: true
};

const validate = (values: any) => {
  const errors: any = {};

  if (!values.firstName) errors.firstName = "Please enter you first name";

  if (!values.lastName) errors.lastName = "Please enter you last name";

  if (!values.gender || values.gender === "...")
    errors.gender = "Please select your gender";

  if (!values.birthday) errors.birthday = "Please enter your birthday";

  return errors;
};

const createRenderer = (render: any) => ({
  input,
  meta,
  label,
  ...rest
}: any) => (
  <React.Fragment>
    <div className={rest.captionClassName}>{label}</div>
    <div
      className={classNames(
        rest.dataClassName,
        "pt-form-group",
        "pt-intent-danger"
      )}
    >
      {render(input, label, meta.touched, meta.error, rest)}
      <div className="pt-form-helper-text">
        {meta.touched ? meta.error : ""}
      </div>
    </div>
  </React.Fragment>
);

const RenderText = createRenderer(
  (input: any, label: string, touched: boolean, error: any) => (
    <TextField {...input} />
  )
);

const RenderSelect = createRenderer(
  (input: any, label: string, touched: boolean, error: any, rest: any) => (
    <SelectField {...input} items={rest.items} />
  )
);

const RenderDate = createRenderer(
  (input: any, label: string, touched: boolean, error: any) => (
    <DateInputField {...input} />
  )
);

const options = [
  { caption: "Male", value: "m" },
  { caption: "Female", value: "f" }
];

/**
 * Add customer form
 *
 */
function AddCustomer(props: any) {
  const dispatch = useDispatch();

  const loading = useSelector(({ app }: any) => app.loading);

  /**
   * Sending customer info to the redux to save them on the server side
   *
   * @param closeDialogHandler {function} - this comes from DialogBox component
   *
   * @memberof Add Customer
   */
  const addCustomerHandler = (formValues: FormValues) => {
    return new Promise(async resolve => {
      const {
        firstName,
        lastName,
        gender,
        birthday,
        customerLifetimeValue
      } = formValues;

      dispatch(
        await customerOperations.addCustomer(
          firstName,
          lastName,
          gender,
          birthday,
          customerLifetimeValue
        )
      );

      await props.dialogCloseHandler();
    });
  };

  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit(addCustomerHandler)}>
      <div className={Styles.row}>
        <div>
          <Field
            name="firstName"
            label="First name"
            component={RenderText}
            captionClassName={Styles.formCaption}
            dataClassName={Styles.formData}
          />
        </div>
        <div>
          <Field
            name="lastName"
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
            items={options}
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
      <div className="pt-dialog-footer-actions">
        <Button text="close" onClick={props.dialogCloseHandler} />
        <Button
          text="save"
          type="submit"
          intent={Intent.PRIMARY}
          disabled={submitting === true || loading === true}
        />
      </div>
    </form>
  );
}

const AddCustomerC = reduxForm({
  form: "AddCustomer",
  initialValues: {
    firstName: "",
    lastName: "",
    gender: "",
    birthday: new Date(),
    customerLifetimeValue: (Math.random() * 100 + 1).toFixed(2)
  },
  validate
})(AddCustomer);

export default DialogBox(AddCustomerC, dialogProps);
