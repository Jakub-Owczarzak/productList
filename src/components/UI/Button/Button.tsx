import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProductAsync } from "../../../redux/actions/actionCreator";

type ButtonProps = {
  id?: number;
  type: "create" | "edit" | "delete";
};

const Button: React.FC<ButtonProps> = ({ id, type }): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (id?: number): void => {
    if (!id) {
      navigate("/create");
    } else {
      navigate(`/edit/${id}`);
    }
  };

  let button;

  if (id && type === "edit") {
    return (button = <button onClick={() => handleNavigate(id)}>Edit</button>);
  } else if (!id && type === "create") {
    return (button = <button onClick={() => handleNavigate()}>Create</button>);
  } else if (id && type === "delete") {
    return (button = (
      <button onClick={() => dispatch(deleteProductAsync(id))}>Delete</button>
    ));
  }

  return <>{button}</>;
};

export default Button;
