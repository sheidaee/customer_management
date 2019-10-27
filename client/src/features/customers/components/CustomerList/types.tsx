import { CustomerObject } from "../../types";

export interface IProps {
  loading: boolean;
  didSearch: boolean;
  customerRecords: CustomerObject[] | null;
  searchedRecords: CustomerObject[] | null;
}
