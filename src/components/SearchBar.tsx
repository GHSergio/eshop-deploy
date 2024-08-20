import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/index";
import { setSearchQuery } from "../slice/productSlice";

interface SearchBarProps {
  height?: string | number;
  width?: string | number;
}

const SearchBar: React.FC<SearchBarProps> = ({ height, width }) => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.products);

  const handleClearSearch = () => {
    dispatch(setSearchQuery(""));
  };
  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery?.(e.target.value))}
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
