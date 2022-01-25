import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";
import { ColumnNames } from "../../../../models/product.interface";
import { sort } from "../../../../redux/actions/actionCreator";

import styles from "./tableHead.module.scss";

const TableHead: React.FC<{ name: ColumnNames }> = ({ name }): JSX.Element => {
  const sortingOptions = useSelector(
    (state: RootState) => state.products.sortingOptions
  );
  const dispatch = useDispatch();

  return (
    <th
      className={styles.tableHead}
      onClick={() =>
        dispatch(
          sort(name, `${sortingOptions[name] === "desc" ? "asc" : "desc"}`)
        )
      }
    >
      {name}
    </th>
  );
};

export default TableHead;
