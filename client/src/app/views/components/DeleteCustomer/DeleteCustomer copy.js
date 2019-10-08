import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Intent } from "@blueprintjs/core";

import DialogBox from "../../components/UI/DialogBox";
import { customerOperations } from "../../../state/ducks/customer";
import Styles from "./DeleteCustomer.module.scss";

const dialogProps = {
  btn: {
    type: "icon",
    className: `pt-icon-standard pt-icon-cross ${Styles.DeleteBtn}`
  },
  dialog: {
    icon: "inbox",
    title: "Delete Customer"
  },
  customOperationBtn: true
};
  
class DeleteCustomer extends Component {
  state = {
    submitting: false
  }

  DeleteCustomerHandler = () => {
    this.setState({ submitting: true })
    this.props.onDeleteCustomer(this.props.data.customerID);    
    
    this.props.dialogCloseHandler();
  }
  render() {
    return (
      <div className={Styles.DeleteCustomer}>
        <div className={Styles.row}>
          <div>
            <p>Are you sure about deleting this record?</p>            
          </div>
        </div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <Button text="No" onClick={this.props.dialogCloseHandler} />
            <Button
              text="Yes"
              intent={Intent.PRIMARY}
              onClick={this.DeleteCustomerHandler} 
              disabled={this.state.submitting === true ? 'disabled' : ''} />
          </div>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return { onDeleteCustomer: customerID => dispatch(customerOperations.deleteCustomer(customerID)) };
};

export default connect(null, mapDispatchToProps)(DialogBox(DeleteCustomer, dialogProps));
