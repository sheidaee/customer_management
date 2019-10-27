import * as React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as ReactReduxHooks from "../../../../hooks/react-redux.hooks";
import { AddCustomer } from "./AddCustomer";
import { customerItem } from "../../../../utilities/test-utils/dummyData";

configure({ adapter: new Adapter() });

const PROPS = {};

describe("<AddCustomer />", () => {
  let store: any;
  let wrapper: any;

  beforeEach(() => {
    /* mocking store */
    store = configureStore([thunk])({
      customerRecords: [customerItem],
      isLoading: false
    });

    /* mocking useDispatch on our mock store  */
    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    /* mocking useSelector on our mock store */
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(state => store.getState());

    wrapper = shallow(<AddCustomer {...PROPS} />);
  });

  it("exists", () => {
    expect(wrapper.exists()).toEqual(true);
  });
});
