import React from "react";

import { ISearchField } from "./types";
import Styles from "./SearchField.module.scss";

const SearchFieldC = ({
  caption,
  Field,
  value,
  handleChange,
  ...props
}: ISearchField) => {
  return (
    <div>
      <div className={Styles.formCaption}>{caption}</div>
      <div className={Styles.data}>
        <Field value={value} onChange={handleChange} {...props} />
      </div>
    </div>
  );
};

export default SearchFieldC;
