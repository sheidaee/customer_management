import React from "react";
import { Classes } from "@blueprintjs/core";

import { Props } from "./types";

function TextField(props: Props) {
  return <input className={Classes.INPUT} type="text" dir="auto" {...props} />;
}

export default TextField;
