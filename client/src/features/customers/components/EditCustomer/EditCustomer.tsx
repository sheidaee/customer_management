import React from "react";
import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
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
  handleSubmit,
  submitting,
  dialogCloseHandler
}: FormProps) {
  const dispatch = useDispatch();

  const editCustomerHandler = (formValues: FormValues) => {
    return new Promise(async resolve => {
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
      await dialogCloseHandler();
    });
  };

  return (
    <div className={Styles.EditCustomer}>
      <form onSubmit={handleSubmit(editCustomerHandler)}>
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

export default DialogBox(EditCustomerC, dialogProps);
