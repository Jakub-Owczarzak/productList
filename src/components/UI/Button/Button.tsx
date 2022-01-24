import React from "react";

type ButtonProps = {
  title: string;
  actionHandler?: (value: any | ((prevState: any) => any)) => void;
};

const Button: React.FC<ButtonProps> = ({
  actionHandler,
  title,
}): JSX.Element => {
  return (
    <>
      <button onClick={actionHandler}>{title}</button>
    </>
  );
};

export default Button;
