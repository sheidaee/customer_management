import React from "react";
import { useSelector } from "react-redux";

import Panel from "../Panel";
import SearchBar from "../../containers/SearchBar";
import CustomerList from "../CustomerList";

const CustomersManagement = () => {
  const loading = useSelector(({ app }: any) => app.loading);
  const customerRecords = useSelector(({ app }: any) => app.customers);
  const searchedRecords = useSelector(({ app }: any) => app.searchedRecords);
  const didSearch = useSelector(({ app }: any) => app.didSearch);

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
