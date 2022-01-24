import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanProducts } from "../../../../redux/actions/actionCreator";
import Button from "../../../UI/Button/Button";

interface Option {
  label: string;
  value: number;
}

type SelectOptions = Option[];

interface ControllerProps {
  perPageState: number;
  productCountState: number;
  currentPageState: number;
  setCurrentPageHandler: (
    value: number | ((prevState: number) => number)
  ) => void;
  setPerPageHandler: (value: number | ((prevState: number) => number)) => void;
}

const SELECT_OPTIONS: SelectOptions = [
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
  { label: "30", value: 30 },
];

const TablePanelController = ({
  perPageState,
  productCountState,
  currentPageState,
  setCurrentPageHandler,
  setPerPageHandler,
}: ControllerProps): JSX.Element => {
  const dispatch = useDispatch();
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
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPerPageHandler(parseInt(value));
    dispatch(cleanProducts());
  };

  return (
    <div>
      {currentPageState != 1 && (
        <Button actionHandler={handlePrevPage} title={"Previous"} />
      )}
      {currentPageState * perPageState <= productCountState && (
        <Button actionHandler={handleNextPage} title={"Next"} />
      )}

      <select
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
    </div>
  );
};

export default TablePanelController;
