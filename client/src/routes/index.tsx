import CustomersManagement from "../features/customers/components/CustomersManagement";
import { CustomerRoute } from "./types";

const routes: CustomerRoute[] = [
  {
    path: "/",
    component: CustomersManagement,
    exact: true
  }
];

export default routes;
