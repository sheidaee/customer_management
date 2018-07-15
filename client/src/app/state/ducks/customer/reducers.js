import * as types from './types';
import { createReducer } from '../../utils';
import { updateObject } from '../../../utilities';


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

const initialState = {
    customers: null,
    loading: false,
    didSearch: false
}

const addCustomerCompleted = (state, action) => {
  return state.customers ? updateObject(state, {
        customers: [action.payload.customer].concat(state.customers),
        error: false,
        loading: false,
        didSearch: false,
      }) : updateObject(state, {
        customers: [action.payload.customer],
        error: false,
        loading: false,
        didSearch: false,
      });
}

const editCustomerCompleted = (state, action) => {
  if (state.customers) {
    const updatedCustomers = state.customers.filter(customer => customer.customerID !== action.payload.customer.customerID);

    return updateObject(state, {
      customers: [action.payload.customer].concat(updatedCustomers),
        error: false,
        loading: false,
        didSearch: false        
    })
  }

  return updateObject(state, {
    customers: [action.payload.customer],
    error: false,
    loading: false,
    didSearch: false    
  });
}

const deleteCustomerCompleted = (state, action) => {
  if (state.customers) {
    const updatedCustomers = state.customers.filter(customer => customer.customerID !== action.payload.customerID);

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
}

const customerReducer = createReducer(initialState)({
  [types.FETCH_INIT]: (state, action) =>
    updateObject(state, { loading: action.payload.loading }),
  [types.FETCH_LIST_COMPLETED]: (state, action) =>
    updateObject(state, {
      customers: action.payload.records,
      error: false,
      loading: false,
      didSearch: false
    }),

  [types.ADD_CUSTOMER_COMPLETED]: (state, action) =>
    addCustomerCompleted(state, action),

  [types.EDIT_CUSTOMER_COMPLETED]: (state, action) =>
    editCustomerCompleted(state, action),

  [types.DELETE_CUSTOMER_COMPLETED]: (state, action) =>
    deleteCustomerCompleted(state, action),

  [types.SEARCH_LIST_COMPLETED]: (state, action) =>
    updateObject(state, {
      searchedRecords: action.payload.customers,
      error: false,
      loading: false,
      didSearch: true
    })
});

export default customerReducer;