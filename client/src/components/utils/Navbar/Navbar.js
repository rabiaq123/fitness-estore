import React, { useState } from "react";
import fitnova from "../../../assets/fitnova_logo.png";
import {
  AppBar,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
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
    margin: "0 20px 0 20px",
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
    borderRadius: theme.shape.borderRadius,
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
    padding: 25,
  },
  shoppingCartIcon: {
    color: "white",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

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
          to={{ pathname: "/products", state: { category: "fitness-gear" } }}
          className="menu_links"
        >
          Fitness Gear
        </Link>
      </MenuItem>
      <MenuItem className={classes.navMenuItems} onClick={handleClose}>
        <Link to="/products" className="menu_links">
          All Products
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#FE646F", padding: 20 }}>
          <Link to="/">
            <img height="50px" width="auto" src={fitnova} alt="Fitnova logo" />
          </Link>
          <Button className={classes.navButtons} onClick={handleClick}>
            Products
          </Button>
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
          <Button className={classes.shoppingCartButton}>
            <ShoppingCart className={classes.shoppingCartIcon} />
          </Button>
        </Toolbar>
        {productsMenu}
      </AppBar>
    </div>
  );
}
