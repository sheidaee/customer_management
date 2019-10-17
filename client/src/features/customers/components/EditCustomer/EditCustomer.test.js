import * as React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";

import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { EditCustomer } from "./EditCustomer";

configure({ adapter: new Adapter() });

describe("<EditCustomer />", () => {
  let store
  let onEditCustomer
  let dialogCloseHandler
  let subject
  let data

  beforeEach(() => {
    store              = createStore(combineReducers({ form: formReducer }))
    onEditCustomer     = sinon.stub().returns(Promise.resolve())
    dialogCloseHandler = () => { }
    data               = {
      customerID: 1,
      name: {
        first: "Peter",
        last: "Smith"
      },
      birthday: "1996-10-12",
      gender: "m",
      lastContact: "2017-06-01T23:28:56.782Z",
      customerLifetimeValue: 191.12
    }

    const props        = { onEditCustomer, dialogCloseHandler, data };

    subject = mount(
      <Provider store={store}>
        <EditCustomer {...props} />
      </Provider>
    )
  })

  it("It should edit customer after submitting the form", () => {
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
    expect(onEditCustomer.callCount).toEqual(1);
  });
  
});
