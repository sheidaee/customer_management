import React from "react";
import { Classes } from "@blueprintjs/core";

import { IProps } from "./types";
import { withMemo } from "../../utilities/utility";

function TextField({ name, value, onChange }: IProps) {
  return (
    <input
      className={Classes.INPUT}
      type="text"
      dir="auto"
      {...{ name, value, onChange }}
    />
  );
}

export default withMemo(TextField, ["value"]);
