import { Reducer } from "redux";
import { customerActionTypes, customerState } from "./types"; // * as types,

import { createReducer } from "../../utils";
import { updateObject } from "../../../utilities";

/* customer record
{
    "customerID": 1,
    "name": {
        "first": "Peter",
        "last": "Smith"
    },
    "birthday": "1996-10-12",
    "gender": "m",
    "lastContact": "2017-06-01T23:28:56.782Z",
    "customerLifetimeValue": 191.12
},
*/

// Type-safe initialState!
const initialState: customerState = {
  customers: null,
  searchedRecords: null,
  loading: false,
  didSearch: false
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const addCustomerCompleted = (state: any, action: any) => {
  return state.customers
    ? updateObject(state, {
        customers: [action.payload.customer].concat(state.customers),
        error: false,
        loading: false,
        didSearch: false
      })
    : updateObject(state, {
        customers: [action.payload.customer],
        error: false,
        loading: false,
        didSearch: false
      });
};

const editCustomerCompleted = (state: any, action: any) => {
  if (state.customers) {
    const updatedCustomers = state.customers.filter(
      (customer: any) =>
        customer.customerID !== action.payload.customer.customerID
    );

    return updateObject(state, {
      customers: [action.payload.customer].concat(updatedCustomers),
      error: false,
      loading: false,
      didSearch: false
    });
  }

  return updateObject(state, {
    customers: [action.payload.customer],
    error: false,
    loading: false,
    didSearch: false
  });
};

const deleteCustomerCompleted = (state: any, action: any) => {
  if (state.customers) {
    const updatedCustomers = state.customers.filter(
      (customer: any) => customer.customerID !== action.payload.customerID
    );

    return updateObject(state, {
      customers: updatedCustomers,
      error: false,
      loading: false,
      didSearch: false
    });
  }

  return updateObject(state, {
    customers: [],
    error: false,
    loading: false,
    didSearch: false
  });
};

const reducer: Reducer<customerState> = createReducer(initialState)({
  [customerActionTypes.FETCH_INIT]: (state: customerState, action: any) =>
    updateObject(state, { loading: action.payload.loading }),
  [customerActionTypes.FETCH_LIST_COMPLETED]: (
    state: customerState,
    action: any
  ) => {
    return updateObject(state, {
      customers: action.payload.records,
      error: false,
      loading: false,
      didSearch: false
    });
  },

  [customerActionTypes.ADD_CUSTOMER_COMPLETED]: (
    state: customerState,
    action: any
  ) => addCustomerCompleted(state, action),

  [customerActionTypes.EDIT_CUSTOMER_COMPLETED]: (
    state: customerState,
    action: any
  ) => editCustomerCompleted(state, action),

  [customerActionTypes.DELETE_CUSTOMER_COMPLETED]: (
    state: customerState,
    action: any
  ) => deleteCustomerCompleted(state, action),

  [customerActionTypes.SEARCH_LIST_COMPLETED]: (
    state: customerState,
    action: any
  ) =>
    updateObject(state, {
      searchedRecords: action.payload.customers,
      error: false,
      loading: false,
      didSearch: true
    })
});

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
// export default customerReducer;
export { reducer as customerReducer };
