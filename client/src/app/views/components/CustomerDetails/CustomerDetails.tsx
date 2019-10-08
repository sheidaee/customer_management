import React from "react";
import moment from "moment";

import DialogBox from "../../components/UI/DialogBox";
import CustomerDetail from "./CustomerDetail/CustomerDetail";
import Styles from "./CustomerDetails.module.scss";

const dialogProps = {
  btn: {
    type: "icon",
    icon: "eye-open",
    className: Styles.ViewBtn
  },
  dialog: {
    icon: "inbox",
    title: "Customer details"
  },
  customOperationBtn: true
};

const CustomerDetails = (props: any) => {
  const { data } = props;

  return (
    <div className={Styles.Customer}>
      <div className={Styles.row}>
        <CustomerDetail
          caption="Name"
          value={`${data["name"]["first"]} ${data["name"]["last"]}`}
        />
        <CustomerDetail
          caption="Gender"
          value={data["gender"] === "m" ? "Male" : "Female"}
        />
      </div>
      <div className={Styles.row}>
        <CustomerDetail
          caption="Birthday"
          value={moment(data["birthday"]).format("YYYY/MM/DD")}
        />
        <CustomerDetail
          caption="last Contact"
          value={moment(data["lastContact"]).format("YYYY/MM/DD HH:mm:ss")}
        />
      </div>
      <div className={Styles.singleRow}>
        <CustomerDetail
          caption="Customer life time"
          value={data["customerLifetimeValue"]}
        />
      </div>
    </div>
  );
};

export default DialogBox(CustomerDetails, dialogProps) as any;
