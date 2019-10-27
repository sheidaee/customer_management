import { IconName } from "@blueprintjs/core";

export enum BtnType {
  ICON = "icon",
  BUTTON = "button"
}

interface BtnProps {
  className: string;
  text?: string;
  icon: IconName;
  disabled?: boolean;
}

interface Btn {
  btnType: BtnType;
  btnProps: BtnProps;
}

interface Dialog {
  icon: IconName;
  title: string;
}

export interface IDialogProps {
  btn: Btn;
  dialog: Dialog;
  customOperationBtn: boolean;
  showDialogBtnHandler?: () => void;
  saveBtnHandler?: () => void;
  submitBtn?: object;
}
