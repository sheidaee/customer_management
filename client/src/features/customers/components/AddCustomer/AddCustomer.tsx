import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Intent } from "@blueprintjs/core";

import { customerOperations } from "../../";
import DialogBox from "../../../../components/DialogBox";
import TextField from "../../../../components/TextField";
import DateInputField from "../../../../components/DateInputField";
import SelectField from "../../../../components/SelectField";
import { classNames, validate } from "../../../../utilities/utility";
import { FormValues, FormProps } from "./types";

import { DialogProps, BtnType } from "../../../../components/DialogBox/types";

import Styles from "./AddCustomer.module.scss";

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

function AddCustomer(props: FormProps) {
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
        first,
        last,
        gender,
        birthday,
        customerLifetimeValue
      } = formValues;

      dispatch(
        await customerOperations.addCustomer({
          first,
          last,
          gender,
          birthday,
          customerLifetimeValue
        })
      );

      await props.dialogCloseHandler();
    });
  };

  const { handleSubmit, submitting } = props;

  return (
    <div className={Styles.Customer}>
      <form onSubmit={handleSubmit(addCustomerHandler)}>
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
          <Button text="close" onClick={props.dialogCloseHandler} />
          <Button
            text="save"
            type="submit"
            intent={Intent.PRIMARY}
            disabled={submitting === true || loading === true}
          />
        </div>
      </form>
    </div>
  );
}

const AddCustomerC = reduxForm({
  form: "AddCustomer",
  initialValues: {
    first: "",
    last: "",
    gender: "",
    birthday: new Date(),
    customerLifetimeValue: (Math.random() * 100 + 1).toFixed(2)
  },
  validate
})(AddCustomer);

export default DialogBox(AddCustomerC, dialogProps);
