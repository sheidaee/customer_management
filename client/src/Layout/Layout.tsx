import React from "react";
import { Props } from "./types";

/**
 * Layout for components
 *
 */
function Layout({ children }: Props) {
  return <main>{children}</main>;
}

export default Layout;
