import React from "react";
import { Route } from "react-router-dom";

import { Props } from "./types";
import { CustomerRoute } from "../types";

const RouteList = ({ routes }: Props) => (
  <React.Fragment>
    {routes.map((route: CustomerRoute) => (
      <Route key={route.path} {...route} />
    ))}
  </React.Fragment>
);

export default RouteList;
