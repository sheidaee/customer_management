import React, { Component } from "react";
import { Button, Dialog, Intent } from "@blueprintjs/core";
import { Subtract } from "utility-types";

import IconEl from "../IconEl";
import { DialogProps, BtnType } from "./types";

// These props will be subtracted from base component props
interface InjectedProps {}

const withDialogBox = <BaseProps extends InjectedProps>(
  _BaseComponent: React.ComponentType<BaseProps>,
  dialogProps: DialogProps
) => {
  // fix for TypeScript issues: https://github.com/piotrwitek/react-redux-typescript-guide/issues/111
  const BaseComponent = _BaseComponent as React.ComponentType<InjectedProps>;

  type HocProps = Subtract<BaseProps, InjectedProps> & {
    // here you can extend hoc with new props
    toggleDialog?: boolean;
    data?: any;
  };
  type HocState = {
    readonly isOpen: boolean;
  };

  return class HOC extends Component<HocProps, HocState> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withState(${BaseComponent.name})`;

    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent;

    readonly state: HocState = { isOpen: false };

    toggleDialog = (callback: any = null) => {
      this.setState({ isOpen: !this.state.isOpen });
      if (typeof callback === "function") callback();
    };

    handleToggle = () => {
      this.toggleDialog(dialogProps.showDialogBtnHandler);
    };

    submitHandler = (callback: any = null) => {
      if (typeof callback === "function") callback(this.toggleDialog);
    };

    handleSubmit = () => {
      this.submitHandler(dialogProps.saveBtnHandler);
    };

    render() {
      const {
        btnType,
        btnProps: { icon, ...restBtnProps }
      } = dialogProps.btn;

      let dialogToggleBtn = (
        <Button onClick={this.handleToggle} {...restBtnProps} />
      );
      if (btnType === BtnType.ICON) {
        dialogToggleBtn = (
          <IconEl onClick={this.handleToggle} icon={icon} {...restBtnProps} />
        );
      }
      return (
        <React.Fragment>
          {dialogToggleBtn}
          <Dialog
            isOpen={this.state.isOpen}
            onClose={this.toggleDialog}
            canOutsideClickClose={false}
            {...dialogProps.dialog}
          >
            <div className="pt-dialog-body">
              <BaseComponent
                {...this.props}
                dialogCloseHandler={this.toggleDialog}
                dialogSubmitHandler={this.submitHandler}
              />
            </div>
            {!dialogProps.customOperationBtn && (
              <div className="pt-dialog-footer">
                <div className="pt-dialog-footer-actions">
                  <Button text="close" onClick={this.toggleDialog} />
                  <Button
                    text="save"
                    intent={Intent.PRIMARY}
                    {...dialogProps.submitBtn}
                    onClick={this.handleSubmit}
                  />
                </div>
              </div>
            )}
          </Dialog>
        </React.Fragment>
      );
    }
  };
};

export default withDialogBox;
