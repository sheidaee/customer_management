export interface Validate {
  customerID?: number;
  first?: string;
  last?: string;
  gender?: string;
  birthday?: string | Date;
  customerLifetimeValue?: number | string;
  lastContact?: Date;
}
