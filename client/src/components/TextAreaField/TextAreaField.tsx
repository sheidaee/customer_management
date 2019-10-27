import React from "react";
import { TextArea } from "@blueprintjs/core";

import { IProps } from "./types";

function TextAreaField(props: IProps) {
  return <TextArea {...props} />;
}

export default TextAreaField;
