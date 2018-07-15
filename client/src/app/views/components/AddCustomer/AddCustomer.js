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
  <SelectField {...input} items={rest.items}/>
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
 * @class Add Customer
 * @extends {Component}
 */
export class AddCustomer extends Component {    
  /**
   * Sending customer info to the redux to save them on the server side
   *
   * @param closeDialogHandler {function} - this comes from DialogBox component
   *
   * @memberof Add Customer
   */
  addCustomerHandler = formValues => {
    return new Promise(async (resolve) => { 
      const [firstName, lastName, gender, birthday, customerLifetimeValue] = [        
        formValues.firstName,
        formValues.lastName,
        formValues.gender,
        formValues.birthday,        
        formValues.customerLifetimeValue
      ];      
      
      await this.props.onAddCustomer(firstName, lastName, gender, birthday, customerLifetimeValue)
      await this.props.dialogCloseHandler()
    })    
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    
    return (
      <form
        onSubmit={handleSubmit(this.addCustomerHandler)}>
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
          <Button 
            text="close" 
            onClick={this.props.dialogCloseHandler}  />
          <Button
            text="save"
            type="submit"
            intent={Intent.PRIMARY}              
            disabled={submitting === true || this.props.loading === true ? 'disabled' : ''}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({  
  loading: state.app.loading  
});

const mapDispatchToProps = dispatch => {
  return { onAddCustomer: (firstName, lastName, gender, birthday, customerLifetimeValue) => dispatch(customerOperations.addCustomer(firstName, lastName, gender, birthday, customerLifetimeValue)) };
};

AddCustomer = reduxForm({
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogBox(AddCustomer, dialogProps));