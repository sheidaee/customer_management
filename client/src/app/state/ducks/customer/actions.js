import * as types from './types';

export const fetchInit = () => ({
    type: types.FETCH_INIT,
    payload: {
        loading: true
    }
})

export const fetchListComplete = (records) => ({
    type: types.FETCH_LIST_COMPLETED,
    payload: {
        records
    }
});

export const editCustomerComplete = (customerID, firstName, lastName, gender, birthday, lastContact, customerLifetimeValue) => ({
    type: types.EDIT_CUSTOMER_COMPLETED,
    payload: {
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
    }    
});

export const addCustomerComplete = (customer) => ({
    type: types.ADD_CUSTOMER_COMPLETED,
    payload: {
        customer
    }
});

export const deleteCustomerComplete = customerID => ({
    type: types.DELETE_CUSTOMER_COMPLETED,
    payload: {
        customerID
    }
});

export const searchListComplete = (customers) => ({
    type: types.SEARCH_LIST_COMPLETED,
    payload: {
        customers
    }
});