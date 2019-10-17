import { CustomerActionTypes } from "../../features/customers/types";

export default (initialState: object) => (reducerMap: any) => (
  state = initialState,
  action: CustomerActionTypes
) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};
