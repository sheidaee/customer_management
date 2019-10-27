import React from "react";
import moment from "moment";

import DialogBox from "../../../../components/DialogBox";
import CustomerDetail from "./CustomerDetail/CustomerDetail";
import { IDialogProps, BtnType } from "../../../../components/DialogBox/types";

import Styles from "./CustomerDetails.module.scss";
import { IProps } from "./types";

const dialogProps: IDialogProps = {
  btn: {
    btnType: BtnType.ICON,
    btnProps: {
      icon: "eye-open",
      className: Styles.ViewBtn
    }
  },
  dialog: {
    icon: "inbox",
    title: "Customer details"
  },
  customOperationBtn: true
};

const CustomerDetails = (props: IProps) => {
  const {
    name: { first, last },
    gender,
    birthday,
    lastContact,
    customerLifetimeValue
  } = props.data;

  return (
    <div className={Styles.Customer}>
      <div className={Styles.row}>
        <CustomerDetail caption="Name" value={`${first} ${last}`} />
        <CustomerDetail
          caption="Gender"
          value={gender === "m" ? "Male" : "Female"}
        />
      </div>
      <div className={Styles.row}>
        <CustomerDetail
          caption="Birthday"
          value={moment(birthday).format("YYYY/MM/DD")}
        />
        <CustomerDetail
          caption="last Contact"
          value={moment(lastContact).format("YYYY/MM/DD HH:mm:ss")}
        />
      </div>
      <div className={Styles.singleRow}>
        <CustomerDetail
          caption="Customer life time"
          value={customerLifetimeValue}
        />
      </div>
    </div>
  );
};

export default DialogBox(CustomerDetails, dialogProps);
