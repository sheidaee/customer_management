import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Card, Elevation } from "@blueprintjs/core";

import DateInputField from "../../components/UI/DateInputField";
import TextField from "../../components/UI/TextField";
import { customerOperations } from "../../../state/ducks/customer";

import Styles from './SearchBar.module.scss';

export class SearchBar extends Component {

  state = {      
    firstName: "",
    lastName: "",
    birthday: null,
  };

  searchHandler = () => {
    const { firstName, lastName, birthday } = this.state;
    
    this.props.onSearchCustomer(this.props.customerRecords, firstName, lastName, birthday);
  }

  /**
   * This gets called whenever form fields are changed
   *
   * @param value {any} - field value
   * @param fieldName {string} - field name
   *
   * @memberof SearchBar
   */
  fieldChangeHandler = (value, fieldName) => {        
    this.setState({ [fieldName]: value });
  };

  render() {
    return <Card elevation={Elevation.ONE} className={Styles.SearchBar}>
        <h5>Advanced Search</h5>
        <div className={Styles.formRow}>
          <div>
            <div className={Styles.formCaption}>First name:</div>
            <div className={Styles.data}>
              <TextField value={this.state.firstName} onChange={e => this.fieldChangeHandler(e.target.value, "firstName")} />
            </div>
          </div>
          <div>
            <div className={Styles.formCaption}>Last name:</div>
            <div className={Styles.data}>
              <TextField value={this.state.lastName} onChange={e => this.fieldChangeHandler(e.target.value, "lastName")} />
            </div>
          </div>
          <div>
            <div className={Styles.formCaption}>Birthday:</div>
            <div className={Styles.data}>
              <DateInputField value={this.state.birthday} onChange={v => this.fieldChangeHandler(v, "birthday")} />
            </div>
          </div>
        </div>
        <div className={Styles.actionBar}>          
          <Button onClick={this.searchHandler} disabled={this.props.loading}>
            Search
          </Button>          
        </div>
      </Card>;
  }
}

const mapStateToProps = state => ({
  customerRecords: state.app.customers,
  loading: state.app.loading
});

const mapDispatchToProps = dispatch => {
  return { onSearchCustomer: (customerRecords, firstName, lastName, createDate) => dispatch(customerOperations.searchCustomer(customerRecords, firstName, lastName, createDate)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);