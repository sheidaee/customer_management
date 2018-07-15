import React, { Component } from 'react';
import moment from "moment";
import { connect } from "react-redux";

import AddCustomer from "../../components/AddCustomer";
import Styles from "./Panel.module.scss";

/**
 * Displays current date, total number of customers add customer button
 * 
 * @class Panel
 * @extends {Component}
 */
export class Panel extends Component {    
  render() {    
    return <div className={Styles.Panel}>
        <div className={Styles.date}>{moment().format("MMM Do YY")}</div>
        <div className={Styles.title}>
          Total: {this.props.customersCount}
        </div>

        <AddCustomer />
      </div>;
  }
}

const mapStateToProps = state => ({
  customersCount: state.app.customers ? state.app.customers.length : 0
});

export default connect(
  mapStateToProps
)(Panel);
