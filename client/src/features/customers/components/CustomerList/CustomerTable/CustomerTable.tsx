import React from "react";
import ReactTable, { ReactTableDefaults } from "react-table";
import moment from "moment";
import { tableProps } from "./types";

import "react-table/react-table.css";

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

const tdPropsHandler = (
  state: any,
  rowInfo: any,
  column: any,
  instance: any
) => {
  return {
    style: {
      textAlign: column["id"] !== "description" ? "center" : null
    }
  };
};

const CustomerTable = ({ data, loading }: tableProps) => {
  Object.assign(ReactTableDefaults, {
    data,
    columns,
    showPageSizeOptions: false,
    loading: loading,
    className: "-striped -highlight",
    getTdProps: tdPropsHandler,
    pageSize: 10
  });

  return <ReactTable {...ReactTableDefaults} />;
};

export default CustomerTable;
