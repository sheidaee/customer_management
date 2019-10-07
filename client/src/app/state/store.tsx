import { Store, createStore, applyMiddleware } from "redux";
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import throttle from "lodash/throttle";

import { createLogger } from "./middleware";
import { loadState, saveState } from "./utils/localStorage";
// Import the state interface and our combined reducers.
import { createRootReducer, ApplicationState } from "./ducks";

export default function configureStore(): Store<ApplicationState> {
  let middleware = applyMiddleware(thunkMiddleware, createLogger(false));

  // create the composing function for our middlewares
  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware);
  }

  const prevState = loadState();

  const persistedState = {
    app: {
      customers: prevState ? prevState.customers : null,
      counter: 0,
      loading: false,
      didSearch: false
    }
  };

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(createRootReducer(), persistedState, middleware);

  store.subscribe(
    throttle(() => {
      saveState({ customers: store.getState().app.customers });
    }, 1000)
  );

  return store;
}
