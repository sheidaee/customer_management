import React from "react";
import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Intent } from "@blueprintjs/core";

import { customerOperations } from "../../../state/ducks/customer";
import DialogBox from "../UI/DialogBox";
import TextField from "../UI/TextField";
import DateInputField from "../UI/DateInputField";
import SelectField from "../UI/SelectField";
import { classNames } from "../../../utilities";

import Styles from "./EditCustomer.module.scss";

const dialogProps = {
  btn: {
    type: "icon",
    icon: "edit",
    className: Styles.EditBtn,
    text: "Edit customer"
  },
  dialog: {
    icon: "inbox",
    title: "Edit Customer"
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
 * Edit customer form
 *
 */
function EditCustomer({
  data,
  handleSubmit,
  submitting,
  dialogCloseHandler
}: any) {
  const dispatch = useDispatch();

  const editCustomerHandler = (formValues: any) => {
    return new Promise(async resolve => {
      const {
        customerID,
        firstName,
        lastName,
        gender,
        birthday,
        customerLifetimeValue
      } = formValues;

      dispatch(
        await customerOperations.editCustomer(
          customerID,
          firstName,
          lastName,
          gender,
          birthday,
          customerLifetimeValue
        )
      );
      await dialogCloseHandler();
    });
  };

  return (
    <div className={Styles.EditCustomer}>
      <form onSubmit={handleSubmit(editCustomerHandler)}>
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
        <div className={`pt-dialog-footer-actions ${Styles.actionBar}`}>
          <Button text="close" onClick={dialogCloseHandler} />
          <Button
            text="save"
            type="submit"
            intent={Intent.PRIMARY}
            disabled={submitting === true}
          />
        </div>
      </form>
    </div>
  );
}

const EditCustomerC = reduxForm({
  form: "EditCustomer",
  validate
})(EditCustomer);

export default DialogBox(EditCustomerC, dialogProps) as any;
