import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../models/product.interface";
import Button from "../../../UI/Button/Button";

const TableRow: React.FC<{ product: Product }> = ({ product }): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (id?: number): void => {
    if (!id) {
      navigate("/create");
    } else {
      navigate(`/edit/${id}`);
    }
  };

  const handleNavigateEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleOpenDeleteModal = (id: number) => {
    console.log("MODAL");
  };
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{new Date(product.date).toLocaleDateString()}</td>
      <td>{product.description}</td>
      <td>{product.email}</td>
      <td>
        <Button
          title={"Edit"}
          actionHandler={() => handleNavigateEdit(product.id)}
        />
        <Button
          title="Delete"
          actionHandler={() => handleOpenDeleteModal(product.id)}
        />
      </td>
    </tr>
  );
};

export default TableRow;
