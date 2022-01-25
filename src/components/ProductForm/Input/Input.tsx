import React from "react";

import styles from "./input.module.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface FormInputProps {
  register: any;
  type: string;
  name: string;
  errorType: string | undefined;
}

const Input = ({ type, name, errorType, register }: FormInputProps) => {
  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          {...register(name)}
          className={styles.input}
          type={type}
          name={name}
          autoComplete="off"
          required
        />
        <label className={styles.label}>{name}</label>
      </div>
      {errorType && <ErrorMessage errorText={errorType} />}
    </>
  );
};

export default Input;
