import React from 'react';
import moment from 'moment';

import DialogBox from "../../components/UI/DialogBox";

import Styles from "./CustomerDetails.module.scss";

const dialogProps = {
  btn: {
    type: "icon",
    className: `pt-icon-standard pt-icon-eye-open ${Styles.ViewBtn}`
  },
  dialog: {
    icon: "inbox",
    title: "Customer details"
  },
  customOperationBtn: true
};
  
const CustomerDetails = (props) => {
  const { data } = props;
  
  return <div className={Styles.Customer}>
          <div className={Styles.row}>
            <div>
              <div className={Styles.formCaption}>Name:</div>
              <div className={Styles.data}>{`${data["name"]["first"]} ${data["name"]["last"]}`}</div>
            </div>
            <div>
              <div className={Styles.formCaption}>Gender:</div>
              <div className={Styles.data}>{data["gender"] === 'm' ? 'Male' : 'Female'}</div>
            </div>
          </div>
          <div className={Styles.row}>
            <div>
              <div className={Styles.formCaption}>Birthday:</div>
              <div className={Styles.data}>{moment(data["birthday"]).format("YYYY/MM/DD")}</div>
            </div>
            <div>
              <div className={Styles.formCaption}>last Contact:</div>
              <div className={Styles.data}>{moment(data["lastContact"]).format("YYYY/MM/DD HH:mm:ss")}</div>
            </div>
          </div>
          <div className={Styles.singleRow}>
            <div className={Styles.formCaption}>Customer life time:</div>
            <div className={Styles.data}>{data["customerLifetimeValue"]}</div>
          </div>
        </div>;

};

export default DialogBox(CustomerDetails, dialogProps);
