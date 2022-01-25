import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../models/product.interface";
import Button from "../../../UI/Button/Button";

import classNames from "classnames";
import styles from "./tableRow.module.scss";
import { useDispatch } from "react-redux";
import { openDeleteItemModal } from "../../../../redux/actions/modalActionCreator";

type TableRowProps = {
  index: number;
  product: Product;
};

const TableRow = ({ product, index }: TableRowProps): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleOpenDeleteModal = (id: number, name: string) => {
    dispatch(openDeleteItemModal(id, name));
  };
  return (
    <tr
      className={classNames(styles.tableRowData, {
        [styles.tableRowDataEven]: index % 2 === 0,
        [styles.tableRowDataOdd]: index % 2 !== 0,
      })}
    >
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{new Date(product.date).toLocaleDateString()}</td>
      <td>{product.description}</td>
      <td>{product.quantity}</td>
      <td>{product.email}</td>
      <td className={styles.rowButtonsWrapper}>
        <Button
          title={"Edit"}
          actionHandler={() => handleNavigateEdit(product.id)}
          type="edit"
        />
        <Button
          title="Delete"
          actionHandler={() => handleOpenDeleteModal(product.id, product.name)}
          type="delete"
        />
      </td>
    </tr>
  );
};

export default TableRow;
