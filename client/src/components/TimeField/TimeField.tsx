import React from "react";
import { TimePicker, TimePrecision } from "@blueprintjs/datetime";

import { IProps } from "./types";

import Styles from "./TimeField.module.scss";

function TimeField(props: IProps) {
  return (
    <TimePicker
      showArrowButtons="true"
      selectAllOnFocus="true"
      precision={TimePrecision.SECOND}
      className={Styles.TimeField}
      {...props}
    />
  );
}

export default TimeField;
