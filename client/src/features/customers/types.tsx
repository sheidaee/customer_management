// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum customerActionNameTypes {
  ADD_CUSTOMER_COMPLETED = "@@customer/ADD_CUSTOMER_COMPLETED",
  EDIT_CUSTOMER_COMPLETED = "@@customer/EDIT_CUSTOMER_COMPLETED",
  DELETE_CUSTOMER_COMPLETED = "@@customer/DELETE_CUSTOMER_COMPLETED",
  FETCH_INIT = "@@customer/FETCH_LIST",
  FETCH_LIST_COMPLETED = "@@customer/FETCH_LIST_COMPLETED",
  SEARCH_LIST_COMPLETED = "@@customer/SEARCH_LIST_COMPLETED"
}

interface AddCustomerCompletedAction {
  type: typeof customerActionNameTypes.ADD_CUSTOMER_COMPLETED;
  payload: { customer: CustomerShape };
}

interface DeleteCustomerCompletedAction {
  type: typeof customerActionNameTypes.DELETE_CUSTOMER_COMPLETED;
  payload: { customerID: number };
}

interface SearchListCompletedAction {
  type: typeof customerActionNameTypes.SEARCH_LIST_COMPLETED;
  payload: { customers: CustomerObject[] };
}

interface EditCustomerCompletedAction {
  type: typeof customerActionNameTypes.EDIT_CUSTOMER_COMPLETED;
  payload: { customer: CustomerObject };
}

interface FetchListCompletedAction {
  type: typeof customerActionNameTypes.FETCH_LIST_COMPLETED;
  payload: { records: CustomerShape[] };
}

export type CustomerShape = {
  customerID: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  lastContact: string;
  customerLifetimeValue: number;
};

type NameP = {
  first: string;
  last: string;
};

export type CustomerObject = {
  customerID: number;
  name: NameP;
  gender: string;
  birthday: string;
  lastContact: string;
  customerLifetimeValue: number;
};

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
// export type CustomerState = Readonly<{
//   // customers: ReadonlyArray<CustomerObject> | null;
//   customers: CustomerObject[] | null;
//   searchedRecords: [] | null;
//   loading: boolean;
//   didSearch: boolean;
// }>;
export interface CustomerState {
  readonly customers: CustomerObject[] | null;
  readonly searchedRecords: [] | null;
  readonly loading: boolean;
  readonly didSearch: boolean;
}

export type CustomerActionTypes =
  | AddCustomerCompletedAction
  | DeleteCustomerCompletedAction
  | SearchListCompletedAction
  | EditCustomerCompletedAction
  | FetchListCompletedAction;
