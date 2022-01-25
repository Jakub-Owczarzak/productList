import React, { useEffect } from "react";

import styles from "./input.module.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { UseFormRegister, FieldValues } from "react-hook-form";

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
          autoComplete="off"
          name={name}
        />
        <label className={styles.label}>{name}</label>
      </div>
      {errorType && <ErrorMessage errorText={errorType} />}
    </>
  );
};

export default Input;
