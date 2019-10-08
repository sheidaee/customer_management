import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { customerOperations } from "../../../state/ducks/customer";
import CustomerDetails from "../CustomerDetails";
import DeleteCustomer from "../DeleteCustomer";
import EditCustomer from "../EditCustomer";
import CustomerTable from "./CustomerTable/CustomerTable";

function CustomerList() {
  const dispatch = useDispatch();

  const loading = useSelector(({ app }: any) => app.loading);
  const customerRecords = useSelector(({ app }: any) => app.customers);
  const searchedRecords = useSelector(({ app }: any) => app.searchedRecords);
  const didSearch = useSelector(({ app }: any) => app.didSearch);

  useEffect(() => {
    dispatch(customerOperations.fetchList());
  }, [dispatch]);

  const data: any = [];
  const customerStateRecords =
    customerRecords != null && !didSearch ? customerRecords : searchedRecords;

  if (customerStateRecords) {
    customerStateRecords.forEach((customerRecord: []) => {
      const operation = (
        <React.Fragment>
          <CustomerDetails data={customerRecord} />
          <EditCustomer data={customerRecord} />
          <DeleteCustomer data={customerRecord} />
        </React.Fragment>
      );

      data.push({
        ...customerRecord,
        operation
      });
    });
  }

  return <CustomerTable data={data} loading={loading} />;
}

export default CustomerList;
