import React from "react";

import { Props } from "./types";

import Styles from "./CustomerDetail.module.scss";

const CustomerDetail = ({ caption, value }: Props) => {
  return (
    <div>
      <div className={Styles.formCaption}>{caption}:</div>
      <div className={Styles.data}>{value}</div>
    </div>
  );
};

export default CustomerDetail;
