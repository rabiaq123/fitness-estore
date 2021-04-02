import React, { useEffect, useState } from "react";
import {
  Paper,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import InputBase from "@material-ui/core/InputBase";
import { Grid, Box } from "grommet";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  body_container: {
    backgroundColor: "#EFF0F6",
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  search: {
    position: "relative",
    borderRadius: 15,
    backgroundColor: fade(theme.palette.text.secondary, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.text.primary, 0.25),
    },
    marginRight: 10,
    marginLeft: 0,
    // paddingLeft: 50,
    marginTop: 15,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "85%",
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
  table: {
    display: "flex",
  }
}));

export default function InventoryTable() {
  const classes = useStyles();
  const history = useHistory();
  const parentValue = 4;
  const childValue = 1;
  const [data, setdata] = React.useState("");

  let handleSearch = (event) => {
    if (event.key !== "Enter") return;
    let searchString = event.target.value;
    // console.log(event.target.value);
    history.push("/products", { searchInput: searchString });
  };


  const generateTable = () => {
    let table = [];
    // Outer loop to create parent
    for (let i = 0; i < parentValue; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < childValue; j++) {
        children.push(
          <td>
            <InputBase
              defaultValue="TextInput"
              Value={data}
              onChange={(e) => {
                setdata(e.target.value);
              }}
            />
          </td>
        );
      }

      table.push(
        <TableRow key={i}>
          <TableCell>{children}</TableCell>
        </TableRow>
      );
      console.log(table);
      console.log(data);
    }
    return table;
  };

  return (
    <Grid
      justify="stretch"
      justifyContent="center"
      // fill="horizontal"
      rows={["xxsmall", "large"]}
      columns={["0.25fr", ".75fr"]}
      gap="large"
      areas={[
        { name: "search-bar", start: [0, 0], end: [1, 0] },
        { name: "inventory-table", start: [0, 1], end: [1, 1] },
      ]}
      style={{ margin: 50, marginLeft: 50, marginRight: 50 }}
    >
      <Box
        gridArea="search-bar"
        style={{
          display: 'flex',
          // alignItems: 'center',
          flexWrap: 'wrap',
      }}>
        
        <Typography variant="h3" position="absolute" gutterBottom>
          Inventory
        </Typography>
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
      </Box>
      <Box gridArea="inventory-table">
        <Paper className={classes.body_container} elevation={0}>
          {/* <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>{generateTable()}</TableBody>
          </Table>
        </TableContainer> */}
        </Paper>
      </Box>
    </Grid>
  );
}
