"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useContext } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../_lib/CartContextProvider";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@mui/joy";

function NavBar() {
  const ctx = useContext(CartContext);
  const categories = [
    "Computer & Smartphone",
    "Foto",
    "Video",
    "Audio",
    "Smart Home",
    "Offerte",
    "Second Hand",
  ];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const location = usePathname();
  const router = useRouter();

  return (
    <AppBar elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* MENU MOBILE VERSION */}
            <Box className="flex md:hidden">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                disableScrollLock={true}
                id="menu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {categories.map((page, index) => (
                  <MenuItem key={index}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/devices"
              sx={{
                ml: 2,
                display: "flex",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                alignSelf: "center",
              }}
            >
              LOGO
            </Typography>

            {/* MENU DESKTOP VERSION */}
            <Box className="hidden md:flex">
              {categories.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {location !== "/cart" && (
              <Button onClick={() => router.push("/cart")}>
                <Badge
                  badgeContent={ctx?.cartCounter}
                  invisible={!ctx?.cartCounter}
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </Badge>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
