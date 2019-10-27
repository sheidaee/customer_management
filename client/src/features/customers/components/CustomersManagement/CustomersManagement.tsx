import React from "react";
import { useSelector } from "react-redux";

import Panel from "../Panel";
import SearchBar from "../SearchBar";
import CustomerList from "../CustomerList";
import { ICustomerP } from "./types";

const CustomersManagement = () => {
  const loading = useSelector(({ app }: ICustomerP) => app.loading);
  const customerRecords = useSelector(({ app }: ICustomerP) => app.customers);
  const searchedRecords = useSelector(
    ({ app }: ICustomerP) => app.searchedRecords
  );
  const didSearch = useSelector(({ app }: ICustomerP) => app.didSearch);

  return (
    <>
      <Panel customersCount={customerRecords ? customerRecords.length : 0} />
      <SearchBar loading={loading} customerRecords={customerRecords} />
      <CustomerList
        loading={loading}
        customerRecords={customerRecords}
        searchedRecords={searchedRecords}
        didSearch={didSearch}
      />
    </>
  );
};

export default CustomersManagement;
