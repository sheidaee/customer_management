import * as React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { Provider } from "react-redux";

import * as ReactReduxHooks from "../../../../hooks/react-redux.hooks";
import { EditCustomer } from "./EditCustomer";
import { customerItem } from "../../../../utilities/test-utils/dummyData";

configure({ adapter: new Adapter() });

describe("<EditCustomer />", () => {
  let store: any;
  let onEditCustomer;
  let dialogCloseHandler;
  let subject: any;
  let data;

  beforeEach(() => {
    /* mocking store */
    store = configureStore([thunk])({
      customerRecords: [customerItem],
      app: {
        loading: false
      }
    });

    /* mocking useDispatch on our mock store  */
    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    /* mocking useSelector on our mock store */
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(state => store.getState());

    onEditCustomer = sinon.stub().returns(Promise.resolve());
    dialogCloseHandler = () => {};
    data = {
      customerID: 1,
      name: {
        first: "Peter",
        last: "Smith"
      },
      birthday: "1996-10-12",
      gender: "m",
      lastContact: "2017-06-01T23:28:56.782Z",
      customerLifetimeValue: 191.12
    };

    const props = {
      initialValues: {},
      onEditCustomer,
      dialogCloseHandler,
      data
    };

    subject = mount(
      <Provider store={store}>
        <EditCustomer {...props} />
      </Provider>
    );
  });

  it("exists", () => {
    expect(subject.exists()).toEqual(true);
  });

  // it("It should edit customer after submitting the form", () => {
  //   const form           = subject.find("form");
  //   console.log(form.debug());

  //   const inputFirstName = subject.find('input[name="firstName"]');
  //   const inputLastName  = subject.find('input[name="lastName"]');
  //   const inputGender    = subject.find('select[name="gender"]');
  //   const inputBirthday  = subject.find('input[placeholder="YYYY-MM-DD"]');

  //   // inputFirstName.simulate("change", { target: { value: "John" } });
  //   // inputLastName.simulate("change", { target : { value: "Do" } });
  //   // inputGender.simulate("change", { target   : { value: "m" } });
  //   // inputBirthday.simulate("change", { target : { value: "2000-01-01" } });

  //   form.simulate("submit");
  //   expect(onEditCustomer.callCount).toEqual(1);
  // });
});
