import React, { Component } from 'react';
import { classNames } from "../../../../utilities";


import Styles from "./SelectField.module.scss";

class SelectField extends Component {
  render() {
    const { name, items, ...rest } = this.props;
    return <div className={classNames("pt-select", Styles.fillSelect)}>
        <select name={name} {...rest}>
          <option>...</option>
          {items.map(item => <option value={item.value} key={item.value}>
              {item.caption}
            </option>)}
        </select>
      </div>;
  }
}

export default SelectField;