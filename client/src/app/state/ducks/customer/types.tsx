// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum customerActionTypes {
  ADD_CUSTOMER_COMPLETED = "@@customer/ADD_CUSTOMER_COMPLETED",
  EDIT_CUSTOMER_COMPLETED = "@@customer/EDIT_CUSTOMER_COMPLETED",
  DELETE_CUSTOMER_COMPLETED = "@@customer/DELETE_CUSTOMER_COMPLETED",
  FETCH_INIT = "@@customer/FETCH_LIST",
  FETCH_LIST_COMPLETED = "@@customer/FETCH_LIST_COMPLETED",
  SEARCH_LIST_COMPLETED = "@@customer/SEARCH_LIST_COMPLETED"
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface customerState {
  readonly customers: [] | null;
  readonly searchedRecords: [] | null;
  readonly loading: boolean;
  readonly didSearch: boolean;
}
