import React from "react";

import styles from "./errorMessage.module.scss";

type InputProps = {
  errorText: string;
};

const ErrorMessage = ({ errorText }: InputProps) => {
  return <p className={styles.error}>{errorText}</p>;
};

export default ErrorMessage;
