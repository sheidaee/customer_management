import React from "react";
import moment from "moment";

import AddCustomer from "../../components/AddCustomer";
import Styles from "./Panel.module.scss";

/**
 * Displays current date, total number of customers add customer button
 *
 */
function Panel({ customersCount = 0 }) {
  return (
    <div className={Styles.Panel}>
      <div className={Styles.date}>{moment().format("MMM Do YY")}</div>
      <div className={Styles.title}>Total: {customersCount}</div>

      <AddCustomer />
    </div>
  );
}

// const mapStateToProps = state => ({
//   customersCount: state.app.customers ? state.app.customers.length : 0
// });

// export default connect(
//   mapStateToProps
// )(Panel);

export default Panel;
