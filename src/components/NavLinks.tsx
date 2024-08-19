import React from "react";
import { Box, Typography } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLinksProps {
  links: string[];
}
//目前links是由父層傳入的categories
const NavLinks: React.FC<NavLinksProps> = ({ links }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {links.map((link, index) => (
        <React.Fragment key={link}>
          {/* 當用戶點擊 RouterNavLink 時，react-router-dom */}
          {/* 會自動處理這個導航請求並更新 URL */}
          <RouterNavLink
            to={`/category/${link.toLowerCase()}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              padding: "0 0.3rem",
            }}
            className="active"
          >
            <Typography
              variant="button"
              sx={{
                fontSize: {
                  xs: "0.3rem",
                  sm: "0.5rem",
                  md: "0.7rem",
                  lg: "0.8rem",
                },
                fontWeight: "bold",
              }}
            >
              {link}
            </Typography>
          </RouterNavLink>
          {index < links.length - 1 && (
            <Typography variant="body1" sx={{ mx: 1 }}>
              |
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default NavLinks;
