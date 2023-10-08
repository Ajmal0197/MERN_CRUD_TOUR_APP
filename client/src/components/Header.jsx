import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import SearchIcon from "@mui/icons-material/Search";
import { getTours, searchTours } from "../redux/features/tourSlice";
import decode from "jwt-decode";

export default function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.user);
  const [search, setSearch] = useState("");
  const token = userData?.token;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("");
    } else {
      dispatch(getTours());
      navigate("/");
    }
  };

  const onLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/login");
  };

  //logs out user after token expires, currently token expiration is 1 hr
  if (token) {
    const decodedToken = decode(token);
    /**
     * Return:
     {
        "email": "testah@mern.com",
        "id": "6506ebd61656d99d713074fa",
        "iat": 1696699774,
        "exp": 1696958974
      }
     */
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      onLogout();
    }
  }

  const navItems = !userData
    ? [
        {
          route: "/",
          name: "Home",
          onClick: () => {
            dispatch(getTours());
            navigate("/");
          },
        },
        { route: "/login", name: "Login" },
      ]
    : [
        {
          route: "/",
          name: "Home",
          onClick: () => {
            dispatch(getTours());
            navigate("/");
          },
        },
        { route: "/addTour", name: "Add Tour" },
        { route: "/dashboard", name: "Dashboard" },
        {
          route: "/logout",
          name: "Logout",
          onClick: onLogout,
        },
      ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Travel App
          </Typography>

          <form
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: 20,
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search Tour"
              value={search}
              style={{ width: "20vw", height: 40 }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <SearchIcon />
            </div>
          </form>

          {userData?.result?.name && (
            <Typography variant="h5" sx={{ mr: 3 }}>
              Logged in as: {userData?.result?.name}
            </Typography>
          )}

          <Box>
            {navItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => {
                  if (item?.onClick) {
                    item?.onClick();
                  } else {
                    navigate(item?.route);
                  }
                }}
                sx={{ color: "#fff" }}
              >
                {item?.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
