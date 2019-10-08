import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { customerOperations } from "../../../state/ducks/customer";
import CustomerDetails from "../CustomerDetails";
import DeleteCustomer from "../DeleteCustomer";
import EditCustomer from "../EditCustomer";
import CustomerTable from "./CustomerTable/CustomerTable";

function CustomerList({
  loading,
  customerRecords,
  searchedRecords,
  didSearch
}: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(customerOperations.fetchList());
  }, [dispatch]);

  const data: any = [];
  const customerStateRecords =
    customerRecords != null && !didSearch ? customerRecords : searchedRecords;

  if (customerStateRecords) {
    customerStateRecords.forEach((customerRecord: any) => {
      const {
        customerID,
        name: { first, last },
        gender,
        birthday,
        lastContact,
        customerLifetimeValue
      } = customerRecord;

      const operation = (
        <>
          <CustomerDetails data={customerRecord} />
          <EditCustomer
            data={customerRecord}
            initialValues={{
              customerID,
              firstName: first,
              lastName: last,
              gender,
              birthday: new Date(birthday),
              lastContact: new Date(lastContact),
              customerLifetimeValue
            }}
          />
          <DeleteCustomer data={customerRecord} />
        </>
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
