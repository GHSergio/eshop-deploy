import React, { useCallback } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/index";
import { setSearchQuery } from "../slice/productSlice";
import debounce from "lodash/debounce";

interface SearchBarProps {
  height?: string | number;
  width?: string | number;
}

const SearchBar: React.FC<SearchBarProps> = ({ height, width }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.products.searchQuery
  );

  const handleClearSearch = useCallback(() => {
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  // 使用lodash的debounce來延遲搜尋操作
  const debounceSearch = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query));
    }, 100),
    [dispatch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      value={searchQuery}
      onChange={handleChange}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon onClick={handleClearSearch} />
          </InputAdornment>
        ),
        sx: {
          height: height || "auto",
        },
      }}
      sx={{
        width: width || "100%",
        bgcolor: "white",
        borderRadius: "5px",
        marginTop: { xs: "40px", sm: "0px" },
      }}
    />
  );
};

export default SearchBar;
