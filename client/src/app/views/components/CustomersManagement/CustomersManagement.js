import React from 'react';

import Panel from '../Panel';
import SearchBar from '../../containers/SearchBar';
import CustomerList from "../CustomerList";

const CustomersManagement = () => (
  <React.Fragment>
    <Panel />
    <SearchBar />
    <CustomerList />
  </React.Fragment> 
)

export default CustomersManagement;