import React, { useEffect, useState } from "react";
import {
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ButtonGroup,
  Button,
  Slider,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "grommet";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import "./Products.css";
// import image from "../../../assets/product_imgs/bowflex-selecttech-552-dumbbell-set.png";

const useStyles = makeStyles((theme) => ({
  productContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#EFF0F6",
    borderRadius: 50,
    padding: 50,
    gap: 20,
    justifyContent: "center",
    overflow: "auto",
    minHeight: "90%",
  },
  productCard: {
    backgroundColor: "grey",
    maxWidth: 300,
  },
  productCardImage: {
    height: 140,
  },
  optionsMenuItemList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  optionMenuItem: {
    fontWeight: "bold",
    borderRadius: "10px",
    width: "150px",
    margin: "0 0 0 5px",
    justifyContent: "center",
    border: "none",
    textTransform: "none",
    fontSize: 16,
  },
  optionTitle: {
    marginBottom: 0,
  },
  thumb: {
    background: "#FE646F",
    "&~&": {
      background: "#FE646F",
    },
  },
  rail: {
    background: "#FE646F",
  },
  track: {
    background: "#FE646F",
  },
  valueLabel: {
    "&>*": {
      background: "#FE646F",
    },
  },
  valueLabel: {
    "&>*": {
      background: "#FE646F"
    }
  }
}));

const SortOptions = ({ sortBy, setSortBy }) => {
  const classes = useStyles();
  return (
    <div className={classes.optionsMenuItemList}>
      <ButtonGroup
        className={classes.optionMenuItem}
        orientation="vertical"
        variant="outlined"
      >
        <Button
          onClick={() => {
            setSortBy(0);
          }}
          className={classes.optionMenuItem}
        >
          Low to High
        </Button>
        <Button
          onClick={() => {
            setSortBy(1);
          }}
          className={classes.optionMenuItem}
        >
          High to Low
        </Button>
      </ButtonGroup>
    </div>
  );
};

const CategoryOptions = ({ category, setCategory }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.optionsMenuItemList}>
        <ButtonGroup
          className={classes.optionMenuItem}
          orientation="vertical"
          variant="outlined"
        >
          <Button
            onClick={() => {
              setCategory("weights");
            }}
            className={classes.optionMenuItem}
          >
            Weights
          </Button>
          <Button
            onClick={() => {
              setCategory("protein");
            }}
            className={classes.optionMenuItem}
          >
            Protein
          </Button>
          <Button
            onClick={() => {
              setCategory("fitness gear");
            }}
            className={classes.optionMenuItem}
          >
            Fitness Gear
          </Button>
          <Button
            onClick={() => {
              setCategory("others");
            }}
            className={classes.optionMenuItem}
          >
            Others
          </Button>
          <Button
            onClick={() => {
              setCategory(null);
            }}
            className={classes.optionMenuItem}
          >
            All Products
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

const FilterOptions = ({ filterPrice, setFilterPrice }) => {
  const handleChange = (event, newValue) => {
    setFilterPrice(newValue);
  };
  const classes = useStyles();
  return (
    <>
      <Slider
        classes={{
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.track,
          valueLabel: classes.valueLabel,
        }}
        min={0}
        max={2000}
        value={filterPrice}
        valueLabelDisplay="auto"
        onChange={handleChange}
      />
    </>
  );
};

const ProductOptionsMenu = ({
  category,
  setCategory,
  filterPrice,
  setFilterPrice,
  sortBy,
  setSortBy,
}) => {
  const styles = {
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    maxWidth: 220,
    width: 200,
    backgroundColor: "#EFF0F6",
  };

  const classes = useStyles();

  return (
    <>
      <Accordion style={styles} elevation={0}>
        <AccordionSummary
          className={classes.optionTitle}
          expandIcon={<ExpandMore />}
        >
          <Typography>
            <b>Categories</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CategoryOptions category={category} setCategory={setCategory} />
        </AccordionDetails>
      </Accordion>
      <Accordion style={styles} elevation={0}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>
            <b>Filter by Price</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterOptions
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion style={styles} elevation={0}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>
            <b>Sort by Price</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const ProductCard = ({ productItem }) => {
  let history = useHistory();

  // console.log(productItem);
  // NOTE Gonna hardcode the images for now since they're null
  return (
    <Card
      style={{
        borderRadius: 25,
        maxWidth: 300,
        height: "fit-content",
        marginTop: 10,
        marginBottom: 10,
        cursor: "pointer",
      }}
      onClick={() => history.push("/product-details", { productItem })}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={
            productItem.image_url
              ? `/product_imgs/${productItem.image_url}`
              : "/no-image.png"
          }
          height={140}
          title={productItem.product_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {productItem.product_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ float: "right", paddingRight: 25, color: "grey" }}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(productItem.price)}
      </CardActions>
    </Card>
  );
};

export default function Products() {
  const classes = useStyles();
  const { state } = useLocation();
  /*
   * SORT OPTIONS
   *  Lowest to Highest price = 0
   *  Highest to lowest price = 1
   */
  const [sortBy, setSortBy] = useState(0);
  const [products, setProducts] = useState(null);
  const [filterPrice, setFilterPrice] = useState([0, 2000]);
  const [category, setCategory] = useState(
    state?.category ? state.category : null
  ); // null = all products

  useEffect(() => {
    // Call DB here for products
    axios
      .get("https://fitnova-server.herokuapp.com/API/getProducts")
      .then((resp) => {
        // console.log(resp);
        setProducts(resp.data.records);
      });

    document.title = "Products";
    // Filter by
    // return () => {};
  }, [sortBy, filterPrice, category]);

  return (
    <Grid
      justify="stretch"
      // fill="horizontal"
      rows={["384px", "384px"]}
      columns={["0.25fr", ".75fr"]}
      gap="xlarge"
      areas={[
        { name: "left-options", start: [0, 0], end: [0, 1] },
        { name: "products-container", start: [1, 0], end: [1, 1] },
      ]}
      style={{ margin: 50, marginLeft: 50, marginRight: 100 }}
    >
      <Box gridArea="left-options">
        <Paper
          style={{
            backgroundColor: "white",
            height: "100%",
            maxWidth: 250,
            borderRadius: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          elevation={0}
        >
          <ProductOptionsMenu
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
            category={category}
            setCategory={setCategory}
          />
        </Paper>
      </Box>
      <Box gridArea="products-container">
        <Paper className={classes.productContainer} elevation={0}>
          {!products && <CircularProgress style={{ alignSelf: "center" }} />}
          {products?.length === 0 && (
            <div>
              <Typography variant="h2">
                Looks like there are no products like that...
              </Typography>
              <Typography variant="subtitle1" style={{ color: "grey" }}>
                Maybe try another category or search for something else?
              </Typography>
            </div>
          )}
          {products?.length > 0 &&
            products
              .filter((product) => {
                // console.log(category, product["category"]);
                return (
                  product["category"].toLowerCase() ===
                  (category ? category : product["category"].toLowerCase()) &&
                  product["price"] <= filterPrice[1] &&
                  product["price"] >= filterPrice[0]
                );
              })
              .map((item, index) => {
                return <ProductCard key={index} productItem={item} />;
              })
              .sort((firstEl, secondEl) => {
                let priceOne = firstEl.props.productItem.price;
                let priceTwo = secondEl.props.productItem.price;

                if (sortBy === 0) {
                  // Lowest to highest
                  return priceOne - priceTwo;
                } else {
                  // Highest to lowest
                  return priceTwo - priceOne;
                }
              })}
        </Paper>
      </Box>
    </Grid>
  );
}
