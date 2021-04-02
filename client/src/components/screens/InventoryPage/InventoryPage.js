import React, { useEffect, useState } from "react";
import {
  Paper,
  Button,
  IconButton,
  Modal, 
  Backdrop,
  Fade
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import InputBase from "@material-ui/core/InputBase";
import { Grid, Box } from "grommet";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { GridOverlay, DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import './InventoryPage.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    '& .ant-empty-img-1': {
      fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
      fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
    },
  },
  title_text: {
    fontWeight: 600
  },
  body_container: {
    backgroundColor: "#EFF0F6",
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  search: {
    position: "relative",
    borderRadius: 12,
    backgroundColor: fade(theme.palette.text.secondary, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.text.primary, 0.10),
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
      width: "100%",
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function CustomNoRowsOverlay() {
  const classes = useStyles();

  return (
    <GridOverlay className={classes.root}>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <div className={classes.label}>No Rows</div>
    </GridOverlay>
  );
}

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <Pagination
      color="primary"
      justify="center"
      variant="outlined"
      shape="rounded"
      page={state.pagination.page}
      count={state.pagination.pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value)}
    />
  );
}


export default function InventoryTable() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [selectedRow, getRow] = React.useState(false);
  // let selectedRow = []

  let handleSearch = (event) => {
    if (event.key !== "Enter") return;
    let searchString = event.target.value;
    console.log(event.target.value);
    // history.push("/products", { searchInput: searchString });
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'Product ID', flex: 0.5 },
    { field: 'product_name', headerName: 'Product Name', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1 },
    { field: 'price', headerName: 'Price', type: 'number', flex: 1 },
    {
      field: "",
      flex: 1,
      headerName: "Actions",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const openModal = () => {
          const api: GridApi = params.api;
          const fields = api
            .getAllColumns()
            .map((cols) => cols.field)
            .filter((cols) => cols !== "__check__" && !!cols);
          const thisRow = {};

          fields.forEach((field) => {
            thisRow[field] = params.getValue(field);
          });
          setOpen(true);
          getRow(JSON.stringify(thisRow, null, 4));
          // this.setState({
          //   selectedRow: JSON.stringify(thisRow, null, 4)
          // });
          return;
        };

        return <div>
          <IconButton color="disabled" onClick={openModal}>
            <EditIcon />
          </IconButton>
          <IconButton color="disabled" onClick={openModal}>
            <DeleteIcon />
          </IconButton>
        </div>;
      }
    },
  ];

  const rows = [
    { id: 15134, product_name: 'Dumbells 5Lb', category: 'Weights', quantity: 35, price: 130 },
    { id: 14624, product_name: 'Dumbells 15Lb', category: 'Weights', quantity: 35, price: 130 },
    { id: 16378, product_name: 'Dumbells 25Lb', category: 'Weights', quantity: 35, price: 130 },
    { id: 16367, product_name: 'Protein Shake ', category: 'Protein', quantity: 20, price: 130 },
    { id: 16358, product_name: 'Whey Protein', category: 'Protein', quantity: 25, price: 130 },
    { id: 10649, product_name: 'Dumbells 5Lb', category: 'Weights', quantity: 35, price: 130 },
    { id: 15783, product_name: 'Dumbells 5Lb', category: 'Weights', quantity: 35, price: 130 },
    { id: 15270, product_name: 'Dumbells 5Lb', category: 'Weights', quantity: 35, price: 130 },
    { id: 12345, product_name: 'Dumbells 5Lb', category: 'Weights', quantity: 35, price: 130 },
    { id: 17479, product_name: 'Dumbells 5Lb', category: 'Weights', quantity: 35, price: 130 },
    // { id: 15357, product_name: 'Dumbells 5Lb', category: 'Weights', quantity: 35, price: 130 },
    // { id: 11111, product_name: 'Dumbells 5Lb', category: 'Weights', quantity: 35, price: 130 },
    // { id: 12462, product_name: 'Dumbells 5Lb', category: 'Weights', quantity: 35, price: 130 },
    // { id: 124, product_name: 'Dumbells 5Lb', category: 'Weights', quantity: 35, price: 130 },

  ];

  return (
    <div>
      <Grid
        justify="stretch"
        justifyContent="center"
        rows={["xxsmall", "630px"]}
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
          fontWeight="fontWeightBold"
          style={{
            display: 'flex',
            // alignItems: 'center',
            flexWrap: 'wrap',
          }}>

          <Typography variant="h3" position="absolute" className={classes.title_text} gutterBottom>
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
          <div style={{ height: '100%', width: '100%', display: 'flex' }}>
            <div style={{ flexGrow: 1}}>
              <DataGrid
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                  Pagination: CustomPagination
                }}
                style={{
                  borderRadius: 50 
                }}
                rows={rows}
                columns={columns} />
            </div>
          </div>
        </Box>
      </Grid>
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Transition modal</h2>
          <p id="transition-modal-description">{selectedRow}</p>
        </div>
      </Fade>
    </Modal>
  </div>
  );
}
