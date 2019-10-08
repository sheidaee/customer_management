import { action } from "typesafe-actions";
import { customerActionTypes } from "./types";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchInit = () =>
  action(customerActionTypes.FETCH_INIT, { loading: true });
// export const fetchInit = () => ({
//   type: types.FETCH_INIT,
//   payload: {
//     loading: true
//   }
// });

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchListComplete = (records: []) =>
  action(customerActionTypes.FETCH_LIST_COMPLETED, { records });

export const editCustomerComplete = (
  customerID: number,
  firstName: string,
  lastName: string,
  gender: string,
  birthday: string,
  lastContact: string,
  customerLifetimeValue: number
) =>
  action(customerActionTypes.EDIT_CUSTOMER_COMPLETED, {
    customer: {
      customerID,
      name: {
        first: firstName,
        last: lastName
      },
      birthday,
      gender,
      lastContact,
      customerLifetimeValue
    }
  });
// export const editCustomerComplete = (
//   customerID,
//   firstName,
//   lastName,
//   gender,
//   birthday,
//   lastContact,
//   customerLifetimeValue
// ) => ({
//   type: types.EDIT_CUSTOMER_COMPLETED,
//   payload: {
//     customer: {
//       customerID,
//       name: {
//         first: firstName,
//         last: lastName
//       },
//       birthday,
//       gender,
//       lastContact,
//       customerLifetimeValue
//     }
//   }
// });

export const addCustomerComplete = (customer: object) =>
  action(customerActionTypes.ADD_CUSTOMER_COMPLETED, { customer });

// export const addCustomerComplete = customer => ({
//   type: types.ADD_CUSTOMER_COMPLETED,
//   payload: {
//     customer
//   }
// });

export const deleteCustomerComplete = (customerID: number) =>
  action(customerActionTypes.DELETE_CUSTOMER_COMPLETED, customerID);

// export const deleteCustomerComplete = customerID => ({
//   type: types.DELETE_CUSTOMER_COMPLETED,
//   payload: {
//     customerID
//   }
// });

export const searchListComplete = (customers: []) =>
  action(customerActionTypes.SEARCH_LIST_COMPLETED, { customers });

// export const searchListComplete = customers => ({
//   type: types.SEARCH_LIST_COMPLETED,
//   payload: {
//     customers
//   }
// });
