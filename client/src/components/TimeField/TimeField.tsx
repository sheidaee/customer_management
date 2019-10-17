import React from "react";
import { TimePicker, TimePrecision } from "@blueprintjs/datetime";

import { Props } from "./types";

import Styles from "./TimeField.module.scss";

function TimeField(props: Props) {
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
