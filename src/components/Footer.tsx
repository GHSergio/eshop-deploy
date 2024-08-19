import React from "react";
import { Grid, Typography, Link, Box, AppBar, Toolbar } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  return (
    <AppBar
      position="static"
      component="footer"
      sx={{ backgroundColor: "primary.main" }}
    >
      <Toolbar>
        <Grid
          container
          sx={{
            width: "100%",
            marginX: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* copyRight */}
          <Grid item xs={4} sm={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              color="white"
              sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
            >
              E-Shop
            </Typography>
            <Typography
              variant="body2"
              color="white"
              sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
            >
              &copy; 2024 Your Company. All rights reserved.
            </Typography>
          </Grid>

          {/* Follow Us */}
          <Grid item xs={4} sm={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              color="white"
              sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
            >
              Follow Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Link href="#" color="inherit">
                <FacebookIcon sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }} />
              </Link>
              <Link href="#" color="inherit">
                <InstagramIcon
                  sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
                />
              </Link>
              <Link href="#" color="inherit">
                <TwitterIcon sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }} />
              </Link>
              <Link href="#" color="inherit">
                <LinkedInIcon sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }} />
              </Link>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={4} sm={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              color="white"
              sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
            >
              Quick Links
            </Typography>
            <Link
              href="#"
              color="inherit"
              display="block"
              sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              display="block"
              sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="inherit"
              display="block"
              sx={{ fontSize: { xs: "0.5rem", sm: "1rem" } }}
            >
              Contact Us
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
