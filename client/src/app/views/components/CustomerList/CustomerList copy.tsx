import React from "react";
import ReactTable, { ReactTableDefaults } from "react-table";
import { connect } from "react-redux";
import moment from "moment";

import "react-table/react-table.css";
import { customerOperations } from "../../../state/ducks/customer";
import CustomerDetails from "../CustomerDetails";
import DeleteCustomer from "../DeleteCustomer";
import EditCustomer from "../EditCustomer";

const columns = [
  {
    Header: "First name",
    id: "firstName",
    accessor: (d: any) => d.name.first
  },
  {
    Header: "Last name",
    id: "lastName",
    accessor: (d: any) => d.name.last
  },
  {
    Header: "Gender",
    id: "gender",
    accessor: (d: any) => d.gender.toUpperCase(),
    sortable: false
  },
  {
    Header: "Birthday",
    id: "birthday",
    accessor: (d: any) => moment(d.birthday).format("YYYY/MM/DD")
  },
  {
    Header: "Last contact",
    id: "lastContact",
    accessor: (d: any) => moment(d.lastContact).format("YYYY/MM/DD HH:mm:ss")
  },
  {
    Header: "Operation",
    accessor: "operation",
    sortable: false
  }
];

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean;
  customerRecords: [];
  searchedRecords: [];
  didSearch: boolean;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  onFetchList: () => void;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch;

export class CustomerList extends React.PureComponent<AllProps> {
  componentDidMount() {
    /* Fetching data from the server */
    this.props.onFetchList();
  }

  tdPropsHandler = (state: any, rowInfo: any, column: any, instance: any) => {
    return {
      style: {
        textAlign: column["id"] !== "description" ? "center" : null
      }
    };
  };

  render() {
    const data: any = [];
    const customerRecords =
      this.props.customerRecords != null && !this.props.didSearch
        ? this.props.customerRecords
        : this.props.searchedRecords;

    if (customerRecords) {
      customerRecords.forEach((customerRecord: []) => {
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

    Object.assign(ReactTableDefaults, {
      data,
      columns,
      showPageSizeOptions: false,
      loading: this.props.loading,
      className: "-striped -highlight",
      getTdProps: this.tdPropsHandler,
      pageSize: 10
    });

    return <ReactTable {...ReactTableDefaults} />;
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ app }: any) => ({
  customerRecords: app.customers,
  searchedRecords: app.searchedRecords,
  loading: app.loading,
  didSearch: app.didSearch
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  onFetchList: customerOperations.fetchList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerList);
