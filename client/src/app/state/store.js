import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { reducer as form } from "redux-form";
import throttle from "lodash/throttle";

import { createLogger } from "./middleware";
import app from "./ducks";
import { loadState, saveState } from "./utils/localStorage";

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  
  
  const prevState = loadState();

  const persistedState = {
    app: {
      customers: prevState ? prevState.customers : null, 
      counter: 0,
      loading: false,
      didSearch: false 
    }
  };
  
  const rootReducer = combineReducers({ app, form });

  const store = createStore(
    rootReducer,  
    persistedState,  
    composeEnhancers(
      applyMiddleware(    
        thunkMiddleware,    
        createLogger(false),
      ),
    )
  );

  store.subscribe(throttle(() => {      
    saveState({ customers: store.getState().app.customers})
  }, 1000))

  return store
}

