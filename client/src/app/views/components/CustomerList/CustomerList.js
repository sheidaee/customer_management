import React, { Component } from "react";
import ReactTable, { ReactTableDefaults } from "react-table";
import { connect } from "react-redux";
import moment from 'moment';

import "react-table/react-table.css";
import { customerOperations } from "../../../state/ducks/customer";
import CustomerDetails from "../CustomerDetails";
import DeleteCustomer from "../DeleteCustomer";
import EditCustomer from "../EditCustomer";
 
const columns = [
  {
    Header: "First name",
    id: "firstName",
    accessor: d => d.name.first
  },
  {
    Header: "Last name",
    id: "lastName",
    accessor: d => d.name.last
  },
  {
    Header: "Gender",
    id: "gender",
    accessor: d => d.gender.toUpperCase(),
    sortable: false
  },
  {
    Header: "Birthday",
    id: "birthday",
    accessor: d => moment(d.birthday).format("YYYY/MM/DD")
  },
  {
    Header: "Last contact",
    id: "lastContact",
    accessor: d => moment(d.lastContact).format("YYYY/MM/DD HH:mm:ss")
  },
  {
    Header: "Operation",
    accessor: "operation",
    sortable: false
  }
];

export class CustomerList extends Component {
  static defaultProps = {
    customerRecords: null,
    loading: false
  };

  componentDidMount() {
    /* Fetching data from the server */
    this.props.onFetchList();
  }

  tdPropsHandler = (state, rowInfo, column, instance) => {
    return {
      style: {
        textAlign: column['id'] !== 'description' ? 'center' : null
      }      
    };
  }; 

  render() {    
    const data = [];
    const customerRecords = (this.props.customerRecords != null && !this.props.didSearch) 
      ? this.props.customerRecords
      : this.props.searchedRecords;    
    
    if (customerRecords) {
      customerRecords.forEach(customerRecord => {
        data.push({ 
          ...customerRecord, 
          operation: <React.Fragment>
              <CustomerDetails data={customerRecord} />
              <EditCustomer data={customerRecord} />
              <DeleteCustomer data={customerRecord} />
            </React.Fragment> });
      });
    }
 
    Object.assign(ReactTableDefaults, {
      data,
      columns,
      showPageSizeOptions: false,
      loading            : this.props.loading,
      className          : "-striped -highlight",
      getTdProps         : this.tdPropsHandler,
      pageSize           : 10,
    });

    return <ReactTable {...ReactTableDefaults} />;
  }
};

const mapStateToProps = state => ({
  customerRecords: state.app.customers,
  searchedRecords: state.app.searchedRecords,
  loading        : state.app.loading,
  didSearch      : state.app.didSearch,
});

const mapDispatchToProps = {
  onFetchList: customerOperations.fetchList
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
