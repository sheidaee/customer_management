import { combineReducers } from "redux";
import { customerReducer } from "./customer/reducers";
import { reducer as form } from "redux-form";

// The top-level state object
export interface ApplicationState {
  app: any;
  form: any;
}

const rootReducer = combineReducers<ApplicationState>({
  app: customerReducer,
  form
});

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = () => rootReducer;
