import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import moment from "moment";

import { Panel } from "./Panel";

configure({ adapter: new Adapter() });

describe("<Panel />", () => {
  let wrapper;
  const currentDate = moment().format("MMM Do YY");

  beforeEach(() => {
    wrapper = shallow(<Panel />);    
  });

  it(`Should display current date ${currentDate}`, () => {
    expect(wrapper.contains(currentDate)).toEqual(true);
  });

  it('Should display number of total customers', () => {    
    expect(wrapper.text()).toContain("Total:");
  })

  it("Should display Add button", () => {
    expect(wrapper.find('[btnClassName="pt-intent-primary pt-large pt-icon-add"]')).toHaveLength(1);
  });
});
