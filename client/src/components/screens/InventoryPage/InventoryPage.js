import React, { useEffect, useState } from "react";
import axios from "axios";

// Core Components
import {
  LinearProgress,
  IconButton,
  Typography,
  InputBase,
  CardMedia,
  FormControl,
  InputAdornment,
  OutlinedInput,
  MenuItem,
  TextField,
  Card,
  Snackbar,
  Button
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Box } from "grommet";

// Icons
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import { GridOverlay, DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import MuiAlert from '@material-ui/lab/Alert';
import './InventoryPage.css';
// Styling used in this page
const useStyles = makeStyles((theme) => ({
  gridOverlayRoot: {
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
  body_container: {
    backgroundColor: "#EFF0F6",
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  title_text: {
    fontWeight: 600
  },

  // Searchbar Styling
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
    width: "100%",
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

  addButton: {
    borderRadius: "20px",
    backgroundColor: "#FE646F",
    marginTop: 10,
    "&:hover": {
      backgroundColor: fade('#FE646F', 0.80),
    },
    padding: 10,
  },

  // Edit Modal Components
  modal: {
    minWidth: 500,
    minHeight: 600,
    borderRadius: 20,
  },
  saveButton: {
    borderRadius: "50%",
    backgroundColor: "#FE646F",
    "&:hover": {
      backgroundColor: fade('#FE646F', 0.80),
    },
    padding: 10,
  },
  saveIcon: {
    color: "white",
    size: 'small'
  },
  modalLabels: {
    fontWeight: 600,
    marginTop: 10
  },
  modalInputs: {
    borderRadius: 20,
    backgroundColor: fade(theme.palette.text.secondary, 0.05),
  },
  modalImg: {
    marginTop: 0,
    marginRight: 0,
    borderRadius: 25,
  },
  editButtonModal: {
    position: "relative",
    borderRadius: "50%",
    backgroundColor: "#FE646F",
    "&:hover": {
      backgroundColor: fade('#FE646F', 0.80),
    },
    left: "315px",
    bottom: "30px"
  },
  editIconModal: {
    color: "white",
    size: 'small'
  },

  // Delete Dialog
  deleteModalTitle: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#FE646F",
    fontWeight: 600
  },
  checkButton: {
    borderRadius: "50%",
    backgroundColor: "#319E1E",
    "&:hover": {
      backgroundColor: fade('#319E1E', 0.80),
    },
    padding: 10,
  },
  checkIcon: {
    color: "white",
    size: 'small'
  },
  cancelButton: {
    borderRadius: "50%",
    backgroundColor: "#a61b1b",
    "&:hover": {
      backgroundColor: fade('#a61b1b', 0.80),
    },
    padding: 10,
  },
  cancelIcon: {
    color: "white",
    size: 'small'
  },
}));

// Other Styles used
const styles = (theme) => ({
  rootModal: {
    margin: 0,
    // borderRadius: 15,
    padding: theme.spacing(2),
    backgroundColor: "#FE646F",
    fontWeight: 600
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1.5),
    color: "white",
  },
  titleText: {
    fontWeight: 600,
    color: 'white'
  }
});

// Creating a custom display which is shown when there are no rows in the database 
function CustomNoRowsOverlay() {
  const classes = useStyles();

  return (
    <GridOverlay className={classes.gridOverlayRoot}>
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
      <div className={classes.label}>No Data Found</div>
    </GridOverlay>
  );
}

// Creating a custom pagination function
function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={state.pagination.page + 1}
      count={state.pagination.pageCount}
      // @ts-expect-error
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

// Shows a loading animation when loading data
function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}


/** 
 * Modal functions 
 **/

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.rootModal} classes={{ root: 'borderTopRadius' }} {...other}>
      <Typography variant="h4" className={classes.titleText}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const category = [
  {
    value: 'Others',
    label: 'Others',
  },
  {
    value: 'Weights',
    label: 'Weights',
  },
  {
    value: 'Protein',
    label: 'Protein',
  },
  {
    value: 'Fitness Gear',
    label: 'Fitness Gear',
  },
];

export default function InventoryTable() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openSuccessDelete, setOpenSuccessDelete] = React.useState(false);
  const [openErrorDelete, setOpenErrorDelete] = React.useState(false);
  const [openSuccessUpdate, setOpenSuccessUpdate] = React.useState(false);
  const [openErrorUpdate, setOpenErrorUpdate] = React.useState(false);
  const [openErrorAdd, setOpenErrorAdd] = React.useState(false);
  const [openSuccessAdd, setOpenSuccessAdd] = React.useState(false);

  const [selectedRow, getRow] = React.useState({});
  const [rows, loadRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilter, setFilter] = useState("");
  const baseURL = "https://fitnova-server.herokuapp.com/API";

  // Updates rows in datagrid when something is updated
  useEffect(() => {
    axios
      .get("https://fitnova-server.herokuapp.com/API/getProducts")
      .then((resp) => {
        // console.log(resp.data.message);
        let data = resp.data.records;
        // Apply filter if there is one
        if (searchFilter != null && data.length > 0) {
          // console.log("here" + searchFilter)
          data = data.filter(row => row.product_name.toLowerCase().includes(searchFilter.toLowerCase()));
        }
        // console.log(data)
        loadRows(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchFilter, rows])


  // Saves the search string
  let handleSearch = (event) => {
    if (event.key !== "Enter") return;
    setIsLoading(true);
    let searchString = event.target.value;
    // console.log(searchString);
    setFilter(searchString)
  };

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  });

  const price = {
    type: 'number',
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    cellClassName: 'font-tabular-nums',
  };

  // Closes the modals
  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setOpenErrorDelete(false);
    setOpenErrorUpdate(false);
    setOpenSuccessDelete(false);
    setOpenSuccessUpdate(false);
    setOpenErrorAdd(false);
    setOpenSuccessAdd(false);
  };

  // Updates the selected row data with the new values in inputs 
  const updateSelected = (prop) => (event) => {
    getRow({ ...selectedRow, [prop]: event.target.value });
  }

  // Updates or adds product to backend server
  const updateProduct = () => {
    // Update product since id exists
    if (selectedRow.id !== 0) {
      let JSONObject = {
        tableName: 'PRODUCTS',
        data: [selectedRow]
      }
      console.log(JSONObject);
      axios({
        method: "post",
        url: baseURL + '/updateData',
        data: {
          data: JSONObject
        }
      }).then(response => {
        console.log(response.data);

        // Updating datagrid rows with updated data
        setIsLoading(true);
        axios({
          method: "get",
          url: baseURL + '/getProducts',
        }).then(response => {
          console.log(response.data.message);
          loadRows(response.data.records);
          console.log(rows);
          setIsLoading(false);
        }).catch(error => {
          console.log(error.message);
        });
        handleClose();
        setOpenSuccessUpdate(true);
        return response.data;
      }).catch(error => {
        setOpenErrorUpdate(true);
        console.log(error.message);
      });


    } else {
      // Add a new product
      delete selectedRow.id;
      let JSONObject = {
        tableName: 'PRODUCTS',
        data: [selectedRow]
      }
      console.log(JSONObject);
      axios({
        method: "post",
        url: baseURL + '/addData',
        data: {
          data: JSONObject
        }
      }).then(response => {
        console.log(response.data);

        // Updating datagrid rows with updated data
        setIsLoading(true);
        axios({
          method: "get",
          url: baseURL + '/getProducts',
        }).then(response => {
          console.log(response.data.message);
          loadRows(response.data.records);
          console.log(rows);
          setIsLoading(false);
        }).catch(error => {
          console.log(error.message);
        });
        handleClose();
        setOpenSuccessAdd(true);
        return response.data;
      }).catch(error => {
        setOpenErrorAdd(true);
        console.log(error.message);
      });

    }
  }

  // Delete a product
  const deleteProduct = () => {
    let JSONObject = {
      tableName: 'PRODUCTS',
      identifiers: {
        id: selectedRow.id
      }
    }
    console.log(JSONObject);
    axios({
      method: "post",
      url: baseURL + '/deleteData',
      data: {
        data: JSONObject
      }
    }).then(response => {
      console.log(response.data);
      setOpenSuccessDelete(true);
      return response.data;
    }).catch(error => {
      setOpenErrorDelete(true);
      console.log(error.message);
    });

    // Updating datagrid rows
    setIsLoading(true);
    axios({
      method: "get",
      url: baseURL + '/getProducts',
    }).then(response => {
      console.log(response.data.message);
      loadRows(response.data.records);
      console.log(rows);
      setIsLoading(false);
    }).catch(error => {
      console.log(error.message);
    });
    handleClose();
  }

  // Open edit modal with a dummy row data (id = 0 indicates a new product)
  const addProduct = () => {
    let newProduct = {
      id: 0,
      product_name: "",
      category: "",
      price: 0,
      quantity: 0,
      notes: ""
    }
    getRow(newProduct);
    setOpen(true);
  };

  const saveImgUrl = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    selectedRow.image_url = target.files[0].name
    getRow(selectedRow);
  };

  // Sets the columns (and their data) of the table 
  const columns = [
    { field: 'id', headerName: 'Product ID', flex: 0.5, disableClickEventBubbling: true, align: 'center' },
    { field: 'product_name', headerName: 'Product Name', flex: 1, disableClickEventBubbling: true, align: 'center' },
    { field: 'category', headerName: 'Category', flex: 1, disableClickEventBubbling: true, align: 'center' },
    { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1, disableClickEventBubbling: true, align: 'center' },
    { field: 'price', headerName: 'Price', ...price, flex: 1, disableClickEventBubbling: true, align: 'center' },
    {
      field: "actions", flex: 1, headerName: "Actions", disableClickEventBubbling: true,
      // Creating the 2 button functions that will be in the actions column
      renderCell: (params) => {
        // Function for clicking the edit button for a specific row
        const openModal = () => {
          // Retrieving data for that row
          const api: GridApi = params.api;

          // Getting fields
          const fields = api
            .getAllColumns()
            .map((cols) => cols.field)
          const thisRow = {};
          fields.forEach((field) => {
            thisRow[field] = params.getValue(field);
          });

          // Set the selected row data
          getRow(Object.assign({}, rows.find(row => row.id === thisRow['id'])));
          if (selectedRow.image_url === null) {
            selectedRow.image_url = 'no-image.png';
          }
          console.log(selectedRow)
          // Open modal
          setOpen(true);
          return;
        };

        const openDeleteModal = () => {
          // Retrieving data for that row
          const api: GridApi = params.api;

          // Getting fields
          const fields = api
            .getAllColumns()
            .map((cols) => cols.field)
          const thisRow = {};
          fields.forEach((field) => {
            thisRow[field] = params.getValue(field);
          });

          // Set the selected row data
          getRow(Object.assign({}, rows.find(row => row.id === thisRow['id'])));
          if (selectedRow.image_url === null) {
            selectedRow.image_url = 'no-image.png';
          }
          setOpenDelete(true);
          return;
        };

        return <div>
          <IconButton color="default" align="center" onClick={openModal}>
            <EditIcon />
          </IconButton>
          <IconButton color="default" onClick={openDeleteModal}>
            <DeleteIcon />
          </IconButton>
        </div>;
      }
    },
  ];

  return (
    <div>
      <Grid
        justify="stretch"
        justifyContent="center"
        rows={["xxsmall", "630px"]}
        columns={["0.25fr", ".75fr"]}
        gap="medium"
        areas={[
          { name: "search-bar", start: [0, 0], end: [1, 0] },
          { name: "inventory-table", start: [0, 1], end: [1, 1] },
        ]}
        style={{ margin: 50, marginLeft: 50, marginRight: 50, marginTop: 20, marginBottom: 20 }}
      >
        <Box
          gridArea="search-bar"
          fontWeight="fontWeightBold"
          style={{
            display: 'flex',
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
        <Box gridArea="inventory-table" textAlign="center">
          <div style={{ height: '100%', width: '100%', display: 'flex' }}>
            <div style={{ flexGrow: 1, textAlign: 'center', justify: 'center' }}>
              <DataGrid
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                  LoadingOverlay: CustomLoadingOverlay,
                  Pagination: CustomPagination
                }}
                pageSize={10}
                loading={isLoading}
                rows={rows}
                columns={columns}
                disableColumnMenu />
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              className={classes.addButton}
              onClick={addProduct}
            >
              Add Product
            </Button>
          </div>
        </Box>
      </Grid>

      {/* Edit Modal Dialog */}
      <Dialog
        fullWidth={true}
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          paper: classes.modal
        }}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Product  #{selectedRow.id}
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <Grid
              justify="stretch"
              rows={["sm", "sm", "sm", "sm", "sm", "sm"]}
              columns={["0.20fr", "0.40fr", "0.40fr"]}
              gap="small"
              areas={[
                { name: "name_label", start: [0, 0], end: [0, 0] },
                { name: "name", start: [1, 0], end: [1, 0] },
                { name: "category_label", start: [0, 1], end: [0, 1] },
                { name: "category", start: [1, 1], end: [1, 1] },
                { name: "quantity_label", start: [0, 2], end: [0, 2] },
                { name: "quantity", start: [1, 2], end: [1, 2] },
                { name: "price_label", start: [0, 3], end: [0, 3] },
                { name: "price", start: [1, 3], end: [1, 3] },
                { name: "image", start: [2, 0], end: [2, 3] },
                { name: "description_label", start: [0, 4], end: [0, 4] },
                { name: "description", start: [1, 4], end: [2, 4] },
                { name: "additionalInfo_label", start: [0, 5], end: [0, 5] },
                { name: "additionalInfo", start: [1, 5], end: [2, 5] },
              ]}
              style={{ margin: 5 }}
            >
              <Box gridArea="name_label" textAlign="center">
                <Typography className={classes.modalLabels}>Product Name
              </Typography>
              </Box>
              <Box gridArea="name" textAlign="center">
                <div>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-name"
                      value={selectedRow.product_name}
                      className={classes.modalInputs}
                      onChange={updateSelected('product_name')}
                      inputProps={{
                        'aria-label': 'name',
                      }}
                      labelWidth={0}
                    />
                  </FormControl>
                </div>
              </Box>
              <Box gridArea="category_label" textAlign="center">
                <Typography className={classes.modalLabels}>Category
              </Typography>
              </Box>
              <Box gridArea="category" textAlign="center">
                <TextField
                  id="standard-select-currency-native"
                  select
                  value={selectedRow.category}
                  InputProps={{
                    classes: {
                      root: classes.modalInputs,
                    },
                  }}
                  onChange={updateSelected('category')}
                  variant="outlined"
                >
                  {category.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box gridArea="quantity_label" textAlign="center">
                <Typography className={classes.modalLabels}>Quantity
              </Typography>
              </Box>
              <Box gridArea="quantity" textAlign="center">
                <div>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-quantity"
                      value={selectedRow.quantity}
                      className={classes.modalInputs}
                      onChange={updateSelected('quantity')}
                      inputProps={{
                        'aria-label': 'quantity',
                      }}
                      type="number"
                      labelWidth={0}
                    />
                  </FormControl>
                </div>
              </Box>

              <Box gridArea="price_label" textAlign="center">
                <Typography className={classes.modalLabels}>Price
              </Typography>
              </Box>
              <Box gridArea="price" textAlign="center">
                <div>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={selectedRow.price}
                      className={classes.modalInputs}
                      onChange={updateSelected('price')}
                      endAdornment={<InputAdornment position="end">CAD$</InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'price',
                      }}
                      type="number"
                      labelWidth={0}
                    />
                  </FormControl>
                </div>
              </Box>

              <Box gridArea="description_label" textAlign="center">
                <Typography className={classes.modalLabels}>Description
              </Typography>
              </Box>
              <Box gridArea="description" textAlign="center">
                <FormControl variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-description"
                    value={selectedRow.product_description}
                    className={classes.modalInputs}
                    onChange={updateSelected('product_description')}
                    inputProps={{
                      'aria-label': 'description',
                    }}
                    multiline
                    rows={3}
                    labelWidth={0}
                  />
                </FormControl>
              </Box>

              <Box gridArea="additionalInfo_label" textAlign="center">
                <Typography className={classes.modalLabels}>Additional Info
              </Typography>
              </Box>
              <Box gridArea="additionalInfo" textAlign="center">
                <FormControl variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-notes"
                    value={selectedRow.notes}
                    className={classes.modalInputs}
                    onChange={updateSelected('notes')}
                    inputProps={{
                      'aria-label': 'notes',
                    }}
                    multiline
                    rows={3}
                    labelWidth={0}
                  />
                </FormControl>
              </Box>

              <Box gridArea="image" maxWidth="200" maxHeight="200" align="center" marginTop="0" marginRight="0">
                <div>
                  <Card classes={{ root: classes.modalImg }} variant="outlined">
                    <CardMedia
                      component="img"
                      image={selectedRow.image_url ? `/product_imgs/${selectedRow.image_url}` : `no-image.png`}
                      title={selectedRow.product_name}
                    ></CardMedia>
                  </Card>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={saveImgUrl}
                  />
                  <label htmlFor="raised-button-file">
                    <IconButton component="span" className={classes.editButtonModal}>
                      <EditIcon className={classes.editIconModal} />
                    </IconButton>
                  </label>

                </div>
              </Box>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={updateProduct} className={classes.saveButton}>
            <SaveIcon className={classes.saveIcon} />
          </IconButton>
        </DialogActions>
      </Dialog>

      {/* Delete Modal Dialog */}
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this product?"}</DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleClose} className={classes.cancelButton}>
            <CloseIcon className={classes.cancelIcon} />
          </IconButton>
          <IconButton onClick={deleteProduct} className={classes.checkButton}>
            <CheckIcon className={classes.checkIcon} />
          </IconButton>
        </DialogActions>
      </Dialog>

      {/* Status update toast notifications */}
      <Snackbar open={openSuccessDelete} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Product Successfully Deleted!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorDelete} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          An error occurred when deleting. Couldn't delete product.
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccessUpdate} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Product Successfully Updated!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorUpdate} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          An error occurred when updating. Couldn't update product.
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccessAdd} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          New Product Successfully Added!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorAdd} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          An error occurred when adding the new product. Couldn't add product.
        </Alert>
      </Snackbar>
    </div>
  );
}
