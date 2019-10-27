import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { customerOperations } from "../../";
import CustomerDetails from "../CustomerDetails";
import DeleteCustomer from "../DeleteCustomer";
import EditCustomer from "../EditCustomer";
import CustomerTable from "./CustomerTable/CustomerTable";
import { CustomerObject } from "../../types";
import { IProps } from "./types";

export function CustomerList({
  loading,
  didSearch,
  customerRecords,
  searchedRecords
}: IProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(customerOperations.fetchList());
  }, [dispatch]);

  const data: any = [];
  const customerStateRecords: CustomerObject[] | null =
    customerRecords && !didSearch ? customerRecords : searchedRecords;

  if (
    customerStateRecords === null ||
    !Object.keys(customerStateRecords).length
  ) {
    return <></>;
  }

  customerStateRecords.forEach((customerRecord: CustomerObject) => {
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
          initialValues={{
            customerID,
            first,
            last,
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

  return <CustomerTable data={data} loading={loading} />;
}

export default CustomerList;
