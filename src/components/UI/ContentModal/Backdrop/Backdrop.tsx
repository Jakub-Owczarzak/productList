import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";

import classNames from "classnames";
import styles from "./backDrop.module.scss";
import { closeDeleteItemModal } from "../../../../redux/actions/modalActionCreator";

interface BackdropProps {
  children: React.ReactNode;
}

const Backdrop = ({ children }: BackdropProps) => {
  const dispatch = useDispatch();

  const { contentModalIsOpen } = useSelector((state: RootState) => state.modal);

  return (
    <div
      onClick={() => dispatch(closeDeleteItemModal())}
      className={classNames(styles.backDropWrapper, {
        [styles.isOpen]: contentModalIsOpen,
      })}
    >
      {children}
    </div>
  );
};

export default Backdrop;
