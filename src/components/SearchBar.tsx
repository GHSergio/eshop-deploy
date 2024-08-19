import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useProductContext } from "../contexts/ProductContext";

interface SearchBarProps {
  // onSearch: (query: string) => void;
  height?: string | number;
  width?: string | number;
}

const SearchBar: React.FC<SearchBarProps> = ({ height, width }) => {
  const { searchQuery, setSearchQuery } = useProductContext();
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      value={searchQuery}
      onChange={(e) => setSearchQuery?.(e.target.value)}
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
