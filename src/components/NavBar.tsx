import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Grid,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavLinks from "./NavLinks";
import CartDropdown from "./CartDropdown";
// import SearchBar from "./SearchBar";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const {
    categories,
    cartItemCount,
    showCart,
    handleMouseEnter,
    handleMouseLeave,
  } = useProductContext();
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container alignItems="center" spacing={4}>
          {/* Logo */}
          <Grid
            item
            xs={12}
            sm={2}
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", textAlign: { xs: "center", sm: "start" } }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: { xs: "1.2rem", sm: "1rem" } }}
            >
              E-Shop
            </Typography>
          </Grid>
          {/* NavLinks */}
          <Grid
            item
            sm={8}
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NavLinks links={categories} />
          </Grid>
          {/* SearchBar */}
          {/* <Grid item xs={7} sx={{ display: { xs: "block", sm: "none" } }}>
            <SearchBar onSearch={setSearchQuery} height={30} width="100%" />
          </Grid> */}

          {/* Cart and User Icons */}
          <Grid
            item
            xs={1}
            sm={2}
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              onClick={() => navigate("/cart")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {cartItemCount > 0 ? (
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              ) : (
                <ShoppingCartIcon />
              )}
            </IconButton>

            <IconButton color="inherit" sx={{ marginLeft: 1 }}>
              <AccountCircleIcon />
            </IconButton>
          </Grid>
          {/* Cart Dropdown */}
          {showCart && <CartDropdown />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
