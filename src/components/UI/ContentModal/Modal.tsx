import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "./Card/Card";
import Backdrop from "./Backdrop/Backdrop";
import Button from "../Button/Button";
import { closeDeleteItemModal } from "../../../redux/actions/modalActionCreator";
import { RootState } from "../../../redux/reducers";
import { deleteProductAsync } from "../../../redux/actions/actionCreator";

const Modal = () => {
  const dispatch = useDispatch();
  const { message, id } = useSelector((state: RootState) => state.modal);

  const closeModalHandler = () => {
    dispatch(closeDeleteItemModal());
  };

  const deleteItem = (id: number | null) => {
    if (!id) {
      return;
    }
    dispatch(deleteProductAsync(id));
    dispatch(closeDeleteItemModal());
  };

  return (
    <>
      <Backdrop>
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Card>
            <h2> Delete this item? </h2>
            <h3>{message?.toUpperCase()}</h3>
            <div>
              <Button
                title="Back"
                actionHandler={closeModalHandler}
                type="previous"
              />
              <Button title="Yes" actionHandler={() => deleteItem(id)} />
            </div>
          </Card>
        </div>
      </Backdrop>
    </>
  );
};

export default Modal;
