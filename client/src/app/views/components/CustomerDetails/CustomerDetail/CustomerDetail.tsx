import React from "react";

import Styles from "./CustomerDetail.module.scss";

const CustomerDetail = ({ caption, value }: any) => {
  return (
    <div>
      <div className={Styles.formCaption}>{caption}:</div>
      <div className={Styles.data}>{value}</div>
    </div>
  );
};

export default CustomerDetail;
