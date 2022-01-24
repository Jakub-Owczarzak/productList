import React from "react";
import { useDispatch } from "react-redux";
import {
  cleanProducts,
  fetchProductsAsync,
  searchProductAsync,
} from "../../../redux/actions/actionCreator";

interface SearchBarProps {
  perPageState: number;
}

const SearchBar = ({ perPageState }: SearchBarProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 1) {
      dispatch(cleanProducts());
      dispatch(fetchProductsAsync(perPageState, 0));
      console.log("fraza za krótka");
      return;
    }
    dispatch(searchProductAsync(event.target.value));
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
      />
    </>
  );
};

export default SearchBar;
