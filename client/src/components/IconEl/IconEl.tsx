import React from "react";
import { Icon } from "@blueprintjs/core";

import { IProps } from "./types";

const IconEl = (props: IProps) => (
  <Icon icon="globe" iconSize={20} {...props} />
);

export default IconEl;
