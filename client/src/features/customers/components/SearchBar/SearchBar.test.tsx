import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import { Button } from "@blueprintjs/core";
import toJSON from "enzyme-to-json";
import thunk from "redux-thunk";
import wait from "waait";

import * as ReactReduxHooks from "../../../../hooks/react-redux.hooks";
import { SearchBar } from "./SearchBar";
import { customerItem } from "../../../../utilities/test-utils/dummyData";
import { customerActionNameTypes } from "../../types";

configure({ adapter: new Adapter() });

const props = {
  loading: false,
  customerRecords: [customerItem]
};

describe("<SearchBar />", () => {
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

    wrapper = shallow(<SearchBar {...props} />);
  });

  // it("renders and matches snapshot", async () => {
  //   const wrapper = mount(<SearchBar {...props} />);

  //   expect(toJSON(wrapper)).toMatchSnapshot();
  // });

  it("dispatch search action to store", async () => {
    wrapper.find(Button).simulate("click");

    const actions = store.getActions();
    await wait(1000);

    expect(actions).toEqual([
      {
        type: customerActionNameTypes.FETCH_INIT,
        error: undefined,
        meta: undefined,
        payload: {
          loading: true
        }
      },
      {
        type: customerActionNameTypes.SEARCH_LIST_COMPLETED,
        error: undefined,
        meta: undefined,
        payload: {
          customers: [customerItem]
        }
      }
    ]);
  });

  it("should disable submit button if data is loading", () => {
    wrapper = shallow(<SearchBar {...props} loading={true} />);
    expect(wrapper.find(Button).prop("disabled")).toBeTruthy();
  });
});
