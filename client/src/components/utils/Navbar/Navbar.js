import React, { useState } from "react";
import fitnova from "../../../assets/fitnova_logo.png";
import {
  AppBar,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import loggedIn from "../../state/actions/loginAction.js";

import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    // display: "flex",
  },
  navButtons: {
    fontWeight: "bold",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    margin: "0 0 0 20px",
  },
  navMenu: {
    "& > .MuiPaper-root": {
      // textAlign: "right",
      borderRadius: "25px",
    },
  },
  navMenuItems: {
    fontWeight: "bold",
    borderRadius: "10px",
    margin: "0 10px 0 10px",
    justifyContent: "center",
  },
  search: {
    position: "relative",
    flexGrow: 1,
    borderRadius: 20,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  shoppingCartButton: {
    borderRadius: "50%",
    padding: 10,
  },
  shoppingCartIcon: {
    color: "white",
    size: "small",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  let handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let handleClose = () => {
    setAnchorEl(null);
  };

  let handleSearch = (event) => {
    if (event.key !== "Enter") return;
    let searchString = event.target.value;
    // console.log(event.target.value);
    history.push("/products", { searchInput: searchString });
  };

  let redirectToLogin = (event) => {
    history.push("login");
  };

  let redirectToInventory = (event) => {
    history.push("inventory");
  };

  let redirectToLogout = (event) => {
    history.push("/");
    dispatch(loggedIn());
  };

  let redirectToCheckout = (event) => {
    history.push("checkout");
  };

  let productsMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      className={classes.navMenu}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem className={classes.navMenuItems} onClick={handleClose}>
        <Link
          to={{ pathname: "/products", state: { category: "weights" } }}
          className="menu_links"
        >
          Weights
        </Link>
      </MenuItem>
      <MenuItem className={classes.navMenuItems} onClick={handleClose}>
        <Link
          to={{ pathname: "/products", state: { category: "protein" } }}
          className="menu_links"
        >
          Protein
        </Link>
      </MenuItem>
      <MenuItem className={classes.navMenuItems} onClick={handleClose}>
        <Link
          to={{ pathname: "/products", state: { category: "fitness gear" } }}
          className="menu_links"
        >
          Fitness Gear
        </Link>
      </MenuItem>
      <MenuItem className={classes.navMenuItems} onClick={handleClose}>
        <Link
          to={{ pathname: "/products", state: { category: "others" } }}
          className="menu_links"
        >
          Others
        </Link>
      </MenuItem>
      <MenuItem className={classes.navMenuItems} onClick={handleClose}>
        <Link to="/products" className="menu_links">
          All Products
        </Link>
      </MenuItem>
    </Menu>
  );

  let employeeOptions;
  if (isLogged) {
    employeeOptions = (
      <div>
        <Button className={classes.navButtons} onClick={redirectToInventory}>
          Inventory
        </Button>

        <Button
          className={classes.navButtons}
          onClick={() => {
            console.log("Redirecting to orders page");
          }}
        >
          Orders
        </Button>
      </div>
    );
  }

  let loginOptions;
  if (isLogged) {
    loginOptions = (
      <div>
        <Button
          startIcon={<AccountCircleIcon className={classes.shoppingCartIcon} />}
          className={classes.navButtons}
          onClick={redirectToLogout}
        >
          Logout
        </Button>
      </div>
    );
  } else {
    loginOptions = (
      <div>
        <Button
          startIcon={<AccountCircleIcon className={classes.shoppingCartIcon} />}
          className={classes.navButtons}
          onClick={redirectToLogin}
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    // {location !== "/checkout" &&
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: "#FE646F",
            paddingLeft: 20,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Link to="/">
            <img height="50px" width="auto" src={fitnova} alt="Fitnova logo" />
          </Link>
          <Button className={classes.navButtons} onClick={handleClick}>
            Products
          </Button>

          {employeeOptions}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
              onKeyDown={handleSearch}
            />
          </div>
          <IconButton className={classes.shoppingCartButton}>
            <ShoppingCart
              className={classes.shoppingCartIcon}
              size="small"
              onClick={redirectToCheckout}
            />
          </IconButton>

          {loginOptions}
        </Toolbar>
        {productsMenu}
      </AppBar>
    </div>
  );
}
