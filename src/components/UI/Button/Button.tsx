import React from "react";

import classNames from "classnames";
import styles from "./Button.module.scss";

type ButtonProps = {
  title: string;
  actionHandler?: (value: any | ((prevState: any) => any)) => void;
  type?: "delete" | "create" | "edit" | "next" | "previous" | "submit";
};

const Button: React.FC<ButtonProps> = ({
  actionHandler,
  title,
  type,
}): JSX.Element => {
  return (
    <>
      <button
        className={classNames(styles.buttonDelete, {
          [styles.buttonDelete]: type === "delete",
          [styles.buttonCreate]: type === "create",
          [styles.buttonEdit]: type === "edit",
          [styles.buttonNext]: type === "next",
          [styles.buttonPrevious]: type === "previous",
          [styles.buttonSubmit]: type === "submit",
        })}
        onClick={actionHandler}
      >
        {title}
      </button>
    </>
  );
};

export default Button;
