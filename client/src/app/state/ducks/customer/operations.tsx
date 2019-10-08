import _ from "lodash";
import matchSorter from "match-sorter";
import moment from "moment";
import { Dispatch } from "redux";

import {
  addCustomerComplete,
  fetchListComplete,
  fetchInit,
  deleteCustomerComplete,
  searchListComplete,
  editCustomerComplete
} from "./actions";

import { default as axios } from "../../../utilities/axios-customer";

const fetchList = () => (dispatch: Dispatch) => {
  dispatch(fetchInit());
  axios
    .get("/customers")
    .then(response => {
      dispatch(fetchListComplete(response.data));
    })
    .catch(error => {
      console.log("error");
    });
};

const addCustomer = (
  first: string,
  last: string,
  gender: string,
  birthday: string,
  customerLifetimeValue: number
) => (dispatch: Dispatch) => {
  return Promise.resolve(
    axios
      .post("/customers", {
        first,
        last,
        gender,
        birthday,
        customerLifetimeValue
      })
      .then(response => {
        dispatch(addCustomerComplete(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  );
};

const editCustomer = (
  customerID: number,
  first: string,
  last: string,
  gender: string,
  birthday: string,
  customerLifetimeValue: number
) => (dispatch: Dispatch) => {
  return Promise.resolve(
    axios
      .put(`/customers/${customerID}`, {
        first,
        last,
        gender,
        birthday,
        customerLifetimeValue
      })
      .then(response => {
        const customer = response.data;
        dispatch(
          editCustomerComplete(
            customer.customerID,
            customer.name.first,
            customer.name.last,
            customer.gender,
            customer.birthday,
            customer.lastContact,
            customer.customerLifetimeValue
          )
        );
      })
      .catch(error => {
        console.log(error);
      })
  );
};

const deleteCustomer = (customerID: number) => (dispatch: Dispatch) => {
  return Promise.resolve(
    axios
      .delete(`/customers/${customerID}`)
      .then(response => {
        dispatch(deleteCustomerComplete(customerID));
      })
      .catch(error => {
        console.log(error);
      })
  );
};

const searchCustomer = (
  customerRecords: [],
  firstName: string,
  lastName: string,
  birthday: string
) => (dispatch: Dispatch) => {
  let filteredRecords: any[] = _.cloneDeep(customerRecords);

  if (!_.isNull(firstName)) {
    filteredRecords = matchSorter(filteredRecords, firstName, {
      keys: ["name.first"],
      threshold: matchSorter.rankings.CONTAINS
    });
  }

  if (!_.isNull(lastName)) {
    filteredRecords = matchSorter(filteredRecords, lastName, {
      keys: ["name.last"],
      threshold: matchSorter.rankings.CONTAINS
    });
  }

  if (birthday) {
    filteredRecords = matchSorter(
      filteredRecords,
      moment(birthday).format("YYYY-MM-DD"),
      {
        keys: ["birthday"],
        threshold: matchSorter.rankings.CONTAINS
      }
    );
  }

  dispatch(searchListComplete(filteredRecords));
};

export { fetchList, deleteCustomer, editCustomer, addCustomer, searchCustomer };
