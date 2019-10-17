import { CustomerObject } from "../../types";

export type Props = {
  loading: boolean;
  didSearch: boolean;
  customerRecords: CustomerObject[] | null;
  searchedRecords: CustomerObject[] | null;
};
