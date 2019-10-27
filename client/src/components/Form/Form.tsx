import React from "react";
import TextField from "../TextField";
import DateInputField from "../DateInputField";
import SelectField from "../SelectField";

import { classNames } from "../../utilities/utility";

export const CustomInputComponent = (render: any) => ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: any) => {
  return (
    <React.Fragment>
      <div className={props.captionClassName}>{props.label}</div>
      <div
        className={classNames(
          [props.dataClassName],
          "pt-form-group",
          "pt-intent-danger"
        )}
      >
        {render(field, props, touched[field.name], errors[field.name])}
        <div className="error pt-form-helper-text">
          {touched[field.name] ? errors[field.name] : ""}
        </div>
      </div>
    </React.Fragment>
  );
};

export const RenderText = CustomInputComponent((input: any, rest: any) => (
  <TextField {...input} />
));

export const RenderSelect = CustomInputComponent((input: any, rest: any) => (
  <SelectField {...input} items={rest.items} />
));

export const RenderDate = CustomInputComponent((input: any, rest: any) => (
  <DateInputField {...input} {...rest} />
));

export const genderOptions = [
  { caption: "Male", value: "m" },
  { caption: "Female", value: "f" }
];
