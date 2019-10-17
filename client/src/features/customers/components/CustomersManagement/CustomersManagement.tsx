import React from "react";
import { useSelector } from "react-redux";

import Panel from "../Panel";
import SearchBar from "../SearchBar";
import CustomerList from "../CustomerList";
import { CustomerP } from "./types";

const CustomersManagement = () => {
  const loading = useSelector(({ app }: CustomerP) => app.loading);
  const customerRecords = useSelector(({ app }: CustomerP) => app.customers);
  const searchedRecords = useSelector(
    ({ app }: CustomerP) => app.searchedRecords
  );
  const didSearch = useSelector(({ app }: CustomerP) => app.didSearch);

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
