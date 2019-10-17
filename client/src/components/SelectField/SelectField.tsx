import React from "react";
import { Classes } from "@blueprintjs/core";

import { classNames } from "../../utilities";
import { SelectItem, Props } from "./types";

import Styles from "./SelectField.module.scss";

function SelectField(props: Props) {
  const { name, items, ...rest } = props;

  return (
    <div className={classNames(Classes.INPUT, Styles.fillSelect)}>
      <select name={name} {...rest}>
        <option>...</option>
        {items.map((item: SelectItem) => (
          <option value={item.value} key={item.value}>
            {item.caption}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
