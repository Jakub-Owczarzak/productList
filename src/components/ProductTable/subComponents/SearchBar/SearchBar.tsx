import React from "react";
import { useDispatch } from "react-redux";
import {
  cleanProducts,
  fetchProductsAsync,
  searchProductAsync,
} from "../../../../redux/actions/actionCreator";

import styles from "./searchBar.module.scss";

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
      <div className={styles.wrapper}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
      </div>
    </>
  );
};

export default SearchBar;
