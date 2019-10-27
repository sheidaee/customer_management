import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import moment from "moment";
import toJSON from "enzyme-to-json";
import { Button } from "@blueprintjs/core";

import { Panel } from "./Panel";

configure({ adapter: new Adapter() });

const props = {
  customersCount: 1
};

describe("<Panel />", () => {
  let wrapper: any;
  const currentDate = moment().format("MMM Do YY");

  beforeEach(() => {
    wrapper = shallow(<Panel />);
  });

  it("renders and matches snapshot", async () => {
    const wrapper = mount(<Panel {...props} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it(`Should display current date ${currentDate}`, () => {
    expect(wrapper.contains(currentDate)).toEqual(true);
  });

  it("Should display number of total customers", () => {
    expect(wrapper.find(".title").text()).toEqual("Total: 0");
  });

  // fit("Should display Add button", () => {
  //   expect(
  //     wrapper.find('[btnClassName="pt-intent-primary pt-large pt-icon-add"]')
  //   ).toHaveLength(1);
  // });
});
