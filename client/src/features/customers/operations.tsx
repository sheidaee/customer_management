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

import { default as axios } from "../../utilities/axios-customer";
import {
  FormValues as CustomerP,
  AddCustomerP
} from "./components/AddCustomer/types";
import { CustomerObject } from "./types";

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

const addCustomer = ({
  first,
  last,
  gender,
  birthday,
  customerLifetimeValue
}: AddCustomerP) => (dispatch: Dispatch) => {
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

const editCustomer = ({
  customerID,
  first,
  last,
  gender,
  birthday,
  customerLifetimeValue
}: CustomerP) => (dispatch: Dispatch) => {
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
        dispatch(editCustomerComplete({ ...customer }));
      })
      .catch(error => {
        console.log(error);
      })
  );
};

const deleteCustomer = (customerID: number) => (dispatch: Dispatch) =>
  axios
    .delete(`/customers/${customerID}`)
    .then(response => {
      dispatch(deleteCustomerComplete(customerID));
    })
    .catch(error => {
      console.log(error);
    });

interface SearchCustomer {
  customerRecords: CustomerObject[] | null;
  first: string;
  last: string;
  birthday: string | null;
}

const searchCustomer = ({
  customerRecords,
  first,
  last,
  birthday
}: SearchCustomer) => (dispatch: Dispatch) => {
  if (!customerRecords) {
    return;
  }

  dispatch(fetchInit());

  let filteredRecords: CustomerObject[] = _.cloneDeep(customerRecords);

  if (!_.isNull(first)) {
    filteredRecords = matchSorter(filteredRecords, first, {
      keys: ["name.first"],
      threshold: matchSorter.rankings.CONTAINS
    });
  }

  if (!_.isNull(last)) {
    filteredRecords = matchSorter(filteredRecords, last, {
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

  setTimeout(() => {
    dispatch(searchListComplete(filteredRecords));
  }, 500);
};

export { fetchList, deleteCustomer, editCustomer, addCustomer, searchCustomer };
