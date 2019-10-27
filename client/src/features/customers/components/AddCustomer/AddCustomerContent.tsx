import React, { useState } from "react";
import { Field } from "formik";
import { Button, Intent } from "@blueprintjs/core";

import {
  RenderText,
  RenderSelect,
  RenderDate,
  genderOptions
} from "../../../../components/Form";
import Fieldset from "../../../../components/Fieldset/Fieldset";

import { PropsWithFormik, FormValues } from "./types";
import Styles from "./AddCustomer.module.scss";

const AddCustomerContent: React.FC<PropsWithFormik> = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  loading,
  dialogCloseHandler
}) => {
  const [birthday, setBirthday] = useState((values as FormValues).birthday);

  return (
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
              captionClassName={Styles.formCaption}
              dataClassName={Styles.formData}
              component={RenderSelect}
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
              onChange={setBirthday}
              value={birthday}
            />
          </div>
        </div>
        <div className={`pt-dialog-footer-actions ${Styles.actionBar}`}>
          <Button text="close" onClick={dialogCloseHandler} />
          <Button
            text="save"
            type="submit"
            intent={Intent.PRIMARY}
            disabled={isSubmitting || loading}
          />
        </div>
      </Fieldset>
    </form>
  );
};

export default AddCustomerContent;
