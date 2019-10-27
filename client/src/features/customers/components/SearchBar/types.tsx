import { CustomerObject } from "../../types";

export interface IProps {
  loading: boolean;
  customerRecords: CustomerObject[] | null;
}

export type UseSearch = [
  string,
  string,
  string | null,
  (value: any, fieldName: string) => void
];
