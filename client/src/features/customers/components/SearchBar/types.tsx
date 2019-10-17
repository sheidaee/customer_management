import { CustomerObject } from "../../types";

export type Props = {
  loading: boolean;
  customerRecords: CustomerObject[] | null;
};

export type UseSearch = [
  string,
  string,
  string | null,
  (value: any, fieldName: string) => void
];
