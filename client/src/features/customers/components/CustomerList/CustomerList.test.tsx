import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactTable from "react-table";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import wait from "waait";

import { CustomerList } from "./CustomerList";
import { customerItem } from "../../../../utilities/test-utils/dummyData";
import * as ReactReduxHooks from "../../../../hooks/react-redux.hooks";
import { IProps } from "./types";

configure({ adapter: new Adapter() });

const PROPS: IProps = {
  customerRecords: [customerItem],
  loading: false,
  didSearch: false,
  searchedRecords: null
};

describe("<CustomerList />", () => {
  let wrapper: any;
  let store: any;

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

    wrapper = mount(
      <Provider store={store}>
        <CustomerList {...PROPS} />
      </Provider>
    );
  });

  it("should render <ReactTable /> component", async () => {
    await wait(100);
    expect(wrapper.contains(<ReactTable />)).toEqual(true);
  });
});
