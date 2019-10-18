import * as React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers } from "redux";

import * as ReactReduxHooks from "../../../../hooks/react-redux.hooks";
import { AddCustomerF } from "./AddCustomer";
import { customerItem } from "../../../../utilities/test-utils/dummyData";

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

describe("<AddCustomer />", () => {
  let store;
  let addCustomerHandler;
  let dialogCloseHandler;
  let subject;

  beforeEach(() => {
    /* mocking store */
    // store = configureStore([thunk])({
    //   customerRecords: [customerItem],
    //   isLoading: false
    // });
    // store = createStore(combineReducers({ form: formReducer }));

    store = mockStore({
      app: { loading: false }
    });

    /* mocking useDispatch on our mock store  */
    // jest
    //   .spyOn(ReactReduxHooks, "useDispatch")
    //   .mockImplementation(() => store.dispatch);

    /* mocking useSelector on our mock store */
    // jest
    //   .spyOn(ReactReduxHooks, "useSelector")
    //   .mockImplementation(state => store.getState());

    addCustomerHandler = sinon.stub().returns(Promise.resolve());
    dialogCloseHandler = () => {};
    const props = {      
      dialogCloseHandler,
      handleSubmit: () => addCustomerHandler,
      submitting: false
    };

    subject = mount(
      <Provider store={store}>
        <AddCustomerF {...props} />
      </Provider>
    );
  });

  fit("It should add customer after submitting the form", () => {
    const form = subject.find("form");    
    
    const inputFirstName = subject.find('input[name="first"]');
    const inputLastName = subject.find('input[name="last"]');
    const inputGender = subject.find('select[name="gender"]');
    const inputBirthday = subject.find('input[placeholder="YYYY-MM-DD"]');

    inputFirstName.simulate("change", { target: { value: "John" } });
    inputLastName.simulate("change", { target: { value: "Do" } });
    inputGender.simulate("change", { target: { value: "m" } });
    inputBirthday.simulate("change", { target: { value: "2000-01-01" } });
    // console.log(store);
    
    console.log(inputFirstName.debug());
    
    // form.simulate("submit");

    expect(addCustomerHandler.callCount).toEqual(1);
  });
});
