import React from "react";
import { useDispatch } from "react-redux";
import { SelectOptions } from "../../../../models/selectOptions.interfaces";
import { cleanProducts } from "../../../../redux/actions/actionCreator";

import styles from "./perPageSelect.module.scss";

const SELECT_OPTIONS: SelectOptions = [
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
  { label: "30", value: 30 },
];

interface PerPageSelectProps {
  perPageState: number;
  setPerPageHandler: (value: number | ((prevState: number) => number)) => void;
}

const PerPageSelect = ({
  perPageState,
  setPerPageHandler,
}: PerPageSelectProps): JSX.Element => {
  const dispatch = useDispatch();
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPerPageHandler(parseInt(value));
    dispatch(cleanProducts());
  };
  return (
    <select
      className={styles.select}
      onChange={handleSelect}
      value={perPageState}
      name="products_per_page"
      id="products_per_page_select"
    >
      {SELECT_OPTIONS.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default PerPageSelect;
