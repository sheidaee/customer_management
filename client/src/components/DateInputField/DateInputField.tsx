import React from "react";
import moment from "moment";
import { DateInput } from "@blueprintjs/datetime";

import { IProps } from "./types";
import { withMemo } from "../../utilities/utility";

function DateInputField({ placeholder, value, onChange }: IProps) {
  const FORMATS = [
    {
      formatDate: (date: any) => date.toLocaleString(),
      placeholder,
      parseDate: (str: string) => new Date(str)
    },
    momentFormatter("MM/DD/YYYY"),
    momentFormatter("YYYY-MM-DD"),
    momentFormatter("YYYY-MM-DD HH:mm:ss")
  ];

  return (
    <DateInput
      timePrecision={undefined}
      {...FORMATS[2]}
      minDate={
        new Date(
          moment()
            .subtract(90, "years")
            .format()
        )
      }
      {...{ value, onChange }}
    />
  );
}

const momentFormatter = (format: string) => {
  return {
    formatDate: (date: any) => moment(date).format(format),
    parseDate: (str: string) => moment(str, format).toDate(),
    placeholder: format
  };
};

export default withMemo(DateInputField, ["value"]);
