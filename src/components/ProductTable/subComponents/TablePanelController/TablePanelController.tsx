import React from "react";
import Button from "../../../UI/Button/Button";

interface ControllerProps {
  perPageState: number;
  productCountState: number;
  currentPageState: number;
  setCurrentPageHandler: (
    value: number | ((prevState: number) => number)
  ) => void;
}

const TablePanelController = ({
  perPageState,
  productCountState,
  currentPageState,
  setCurrentPageHandler,
}: ControllerProps): JSX.Element => {
  const handleNextPage = () => {
    if (currentPageState >= Math.ceil(productCountState / perPageState)) {
      return;
    }
    setCurrentPageHandler((prevState) => prevState + 1);
  };

  const handlePrevPage = () => {
    if (currentPageState === 1) {
      return;
    }
    setCurrentPageHandler((prevState) => prevState - 1);
  };

  return (
    <div>
      {currentPageState != 1 && (
        <Button
          actionHandler={handlePrevPage}
          title={"Previous"}
          type="previous"
        />
      )}
      {currentPageState * perPageState <= productCountState && (
        <Button actionHandler={handleNextPage} title={"Next"} type="next" />
      )}
    </div>
  );
};

export default TablePanelController;
