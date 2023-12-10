import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LoginIcon from "@mui/icons-material/LoginOutlined";
import Link from "next/link";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

function ResponsiveAppBar() {
  const pages = ["Products", "Pricing", "News", "About"];
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      const storedName = localStorage.getItem("name");
      const storedSurname = localStorage.getItem("surname");
      const storedRole = localStorage.getItem("role");

      setUserId(userId || "");
      setName(storedName || "");
      setSurname(storedSurname || "");
      setRole(storedRole || "");
    }
  }, []);

  function clearUserLocalStorage() {
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ display: { md: "flex" }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-SHOP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onMouseEnter={handleOpenNavMenu}
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClick={handleCloseNavMenu}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onMouseLeave={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <StorefrontIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-SHOP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {name && surname && (
            <Typography sx={{ mr: 3 }}>
              Welcome {name} {surname}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            {!name && !surname && (
              <Tooltip title='login'>
                <IconButton>
                  <Link href={"/login"}>
                    <LoginIcon
                      sx={{
                        color: "white",
                      }}
                    />
                  </Link>
                </IconButton>
              </Tooltip>
            )}

            <IconButton>
              <Tooltip title='cart'>
                <Link href={`/cart`}>
                  <ShoppingCartIcon
                    sx={{
                      color: "white",
                    }}
                  />
                </Link>
              </Tooltip>
            </IconButton>

            <Tooltip title='user settings'>
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircleIcon
                  sx={{
                    color: "white",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            sx={{ mt: "45px" }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Account</MenuItem>
            <MenuItem>Dashboard</MenuItem>

            {role === "admin" && (
              <MenuItem>
                <Link
                  style={{ textDecoration: "none" }}
                  key='AddItem'
                  color='white'
                  href={"/addItem"}
                >
                  Add items
                </Link>
              </MenuItem>
            )}

            <MenuItem>
              <Link
                style={{ textDecoration: "none" }}
                key='login'
                color='white'
                href={"/login"}
                onClick={clearUserLocalStorage}
              >
                <LogoutIcon titleAccess='Logout' />
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
