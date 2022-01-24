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
    if (event.target.value.length === 0) {
      dispatch(cleanProducts());
      dispatch(fetchProductsAsync(perPageState, 0));

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
