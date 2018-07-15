import React, { Component } from 'react';
import { connect } from "react-redux";
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
    className: `pt-icon-standard pt-icon-edit ${Styles.EditBtn}`,
    text: "Edit customer"
  },
  dialog: {
    icon: "inbox",
    title: "Edit Customer"
  },
  customOperationBtn: true
};

const validate = values => {
  const errors = {};

  if (!values.firstName) errors.firstName = "Please enter you first name";

  if (!values.lastName) errors.lastName = "Please enter you last name";

  if (!values.gender || values.gender === "...")
    errors.gender = "Please select your gender";

  if (!values.birthday) errors.birthday = "Please enter your birthday";

  return errors;
};

const createRenderer = render => ({ input, meta, label, ...rest }) => (
  <React.Fragment>
    <div className={rest.captionClassName}>{label}</div>
    <div className={classNames(rest.dataClassName, 'pt-form-group', 'pt-intent-danger')}>
      {render(input, label, meta.touched, meta.error, rest)}
      <div className="pt-form-helper-text">
        {meta.touched ? meta.error : ""}
      </div>
    </div>
  </React.Fragment>
)

const RenderText = createRenderer((input, label, touched, error) => (
  <TextField {...input}
  />
));

const RenderSelect = createRenderer((input, label, touched, error, rest) => (
  <SelectField {...input} items={rest.items} />
));

const RenderDate = createRenderer((input, label, touched, error) => (
  <DateInputField
    {...input}
  />
));

const options = [
  { caption: "Male", value: "m" },
  { caption: "Female", value: "f" }
];

/**
 * Add customer form
 * 
 * @class EditCustomer
 * @extends {Component}
 */
export class EditCustomer extends Component {
  constructor(props) {
    super(props);
    
    this.props.initialize({
      customerID           : this.props.data.customerID,
      firstName            : this.props.data.name.first,
      lastName             : this.props.data.name.last,
      gender               : this.props.data.gender,
      birthday             : new Date(this.props.data.birthday),
      lastContact          : new Date(this.props.data.lastContact),
      customerLifetimeValue: this.props.data.customerLifetimeValue      
    });
  }

  /**
  * Sending customer info to the redux to save them on the server side
  *
  * @param closeDialogHandler {function} - this comes from DialogBox component
  *
  * @memberof Add Customer
  */
  addCustomerHandler = formValues => {
    return new Promise(async resolve => {
      const [customerID, firstName, lastName, gender, birthday, customerLifetimeValue] = [formValues.customerID, formValues.firstName, formValues.lastName, formValues.gender, formValues.birthday, formValues.customerLifetimeValue];

      await this.props.onEditCustomer(customerID, firstName, lastName, gender, birthday, customerLifetimeValue);
      await this.props.dialogCloseHandler();
    });
  };

  /**
   * Sending customer info to the redux to save them on the server side
   *
   * @param closeDialogHandler {function} - this comes from DialogBox component
   *
   * @memberof EditCustomer
   */
  EditCustomerHandler = formValues => {
    return new Promise(async (resolve) => {
      const [firstName, lastName, gender, birthday, customerLifetimeValue] = [
        formValues.customerID, 
        formValues.firstName, 
        formValues.lastName, 
        formValues.gender, 
        formValues.birthday,        
        formValues.customerLifetimeValue
      ];

      await this.props.onEditCustomer(this.props.data.customerID, firstName, lastName, gender, birthday, customerLifetimeValue)
      await this.props.dialogCloseHandler()
    })
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return <form onSubmit={handleSubmit(this.addCustomerHandler)}>
        <div className={Styles.row}>
          <div>
            <Field 
              name="firstName" 
              label="First name" 
              component={RenderText} 
              captionClassName={Styles.formCaption} 
              dataClassName={Styles.formData} />
          </div>
          <div>
            <Field 
              name="lastName" 
              label="Last name" 
              component={RenderText} 
              captionClassName={Styles.formCaption} 
              dataClassName={Styles.formData} />
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
              items={options} />
          </div>
          <div>
            <Field 
              name="birthday" 
              label="Birthday" 
              component={RenderDate} 
              captionClassName={Styles.formCaption} 
              dataClassName={Styles.formData} />
          </div>
        </div>
        <div className="pt-dialog-footer-actions">
          <Button 
            text="close" 
            onClick={this.props.dialogCloseHandler} />
          <Button 
            text="save" 
            type="submit" 
            intent={Intent.PRIMARY} 
            disabled={submitting === true ? "disabled" : ""} />
        </div>
      </form>;
  }
}

const mapDispatchToProps = dispatch => {
  return { onEditCustomer: (customerID, firstName, lastName, gender, birthday, customerLifetimeValue) => dispatch(customerOperations.editCustomer(customerID, firstName, lastName, gender, birthday, customerLifetimeValue)) };
};

EditCustomer = reduxForm({
  form: "EditCustomer",
  validate
})(EditCustomer);

export default connect(null, mapDispatchToProps)(DialogBox(EditCustomer, dialogProps));