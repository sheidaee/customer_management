import { action } from "typesafe-actions";
import {
  customerActionNameTypes,
  CustomerShape,
  CustomerActionTypes,
  CustomerObject
} from "./types";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchInit = () =>
  action(customerActionNameTypes.FETCH_INIT, { loading: true });

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchListComplete = (
  records: CustomerShape[]
): CustomerActionTypes =>
  action(customerActionNameTypes.FETCH_LIST_COMPLETED, { records });

export const editCustomerComplete = ({
  customerID,
  name,
  gender,
  birthday,
  lastContact,
  customerLifetimeValue
}: CustomerObject): CustomerActionTypes =>
  action(customerActionNameTypes.EDIT_CUSTOMER_COMPLETED, {
    customer: {
      customerID,
      name,
      birthday,
      gender,
      lastContact,
      customerLifetimeValue
    }
  });

export const addCustomerComplete = (
  customer: CustomerShape
): CustomerActionTypes =>
  action(customerActionNameTypes.ADD_CUSTOMER_COMPLETED, { customer });

export const deleteCustomerComplete = (
  customerID: number
): CustomerActionTypes =>
  action(customerActionNameTypes.DELETE_CUSTOMER_COMPLETED, { customerID });

export const searchListComplete = (
  customers: CustomerObject[]
): CustomerActionTypes =>
  action(customerActionNameTypes.SEARCH_LIST_COMPLETED, { customers });
