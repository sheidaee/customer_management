import * as React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";

import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { AddCustomer } from "./AddCustomer";

configure({ adapter: new Adapter() });

describe("<AddCustomer />", () => {
  let store
  let onAddCustomer
  let dialogCloseHandler
  let subject

  beforeEach(() => {
    store              = createStore(combineReducers({ form: formReducer }))
    onAddCustomer      = sinon.stub().returns(Promise.resolve())
    dialogCloseHandler = () => { }
    const props        = { onAddCustomer, dialogCloseHandler };

    subject = mount(
      <Provider store={store}>
        <AddCustomer {...props} />
      </Provider>
    )
  })

  it("It should add customer after submitting the form", () => {
    const form           = subject.find("form");
    
    const inputFirstName = subject.find('input[name="firstName"]');
    const inputLastName  = subject.find('input[name="lastName"]');
    const inputGender    = subject.find('select[name="gender"]');
    const inputBirthday  = subject.find('input[placeholder="YYYY-MM-DD"]');    

    inputFirstName.simulate("change", { target: { value: "John" } });
    inputLastName.simulate("change", { target : { value: "Do" } });
    inputGender.simulate("change", { target   : { value: "m" } });
    inputBirthday.simulate("change", { target : { value: "2000-01-01" } });

    form.simulate("submit");
    expect(onAddCustomer.callCount).toEqual(1);
  });
  
});
