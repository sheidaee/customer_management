import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactTable from "react-table";

import { CustomerList } from "./CustomerList";

configure({ adapter: new Adapter() });

describe('<CustomerList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CustomerList onFetchList={() => {}} />);
  })

  it('should render <ReactTable /> component', () => {
    expect(wrapper.contains(<ReactTable/>)).toEqual(true);
  })
})
