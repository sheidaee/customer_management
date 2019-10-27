import React from "react";

import { IProps } from "./types";

const Fieldset = ({ className, children, ...otherProps }: IProps) => (
  <fieldset {...otherProps} className={`fieldset ${className}`}>
    {children}
  </fieldset>
);

export default Fieldset;
