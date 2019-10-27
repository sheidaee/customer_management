import { IconName } from "@blueprintjs/core";

export interface IProps {
  icon: IconName;
  title?: string;
  onClick: () => void;
}
