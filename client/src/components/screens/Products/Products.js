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
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "grommet";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import "./Products.css";
import image from "../../../assets/product_imgs/bowflex-selecttech-552-dumbbell-set.png";

const useStyles = makeStyles((theme) => ({
  productContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#EFF0F6",
    // height: "100%",
    // maxWidth: "1200px",
    borderRadius: 50,
    padding: 50,
    justifyContent: "space-evenly",
  },
  productCard: {
    backgroundColor: "grey",
    maxWidth: 300,
  },
  productCardImage: {
    height: 140,
  },
  optionsMenuContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
}));

const CategoryOptions = () => {
  let history = useHistory();

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ButtonGroup orientation="vertical" variant="text">
          <Button>Weights</Button>
          <Button>Protein</Button>
          <Button>Fitness Gear</Button>
          <Button>All Products</Button>
        </ButtonGroup>
      </div>
    </>
  );
};

const FilterOptions = ({ filterPrice, setFilterPrice }) => {
  const handleChange = (event, newValue) => {
    setFilterPrice(newValue);
  };

  return (
    <>
      <Slider
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
}) => {
  const styles = {
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    maxWidth: 220,
  };

  return (
    <>
      {/* Category selection accordion */}
      <Accordion style={styles}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CategoryOptions category={category} setCategory={setCategory} />
        </AccordionDetails>
      </Accordion>
      {/* Filter by price accordion */}
      <Accordion style={styles}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Filter by Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterOptions
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
          />
        </AccordionDetails>
      </Accordion>
      {/* Sort by price accordion */}
      <Accordion style={styles}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Sort by Price</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
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
        // maxHeight: 260,
        marginTop: 10,
        marginBottom: 10,
        cursor: "pointer",
      }}
      onClick={() => history.push("/product-details", { productItem })}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          style={{ maxHeight: 140 }}
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
   *  Highest to lowest price = 0
   *  Lowest to Highest price = 1
   */
  const [sortBy, setSortBy] = useState(0);
  const [products, setProducts] = useState([]);
  const [filterPrice, setFilterPrice] = useState([0, 9000]);
  const [category, setCategory] = useState(null); // null = all products

  useEffect(() => {
    console.log(state);
    // Call DB here for products
    axios
      .get("https://fitnova-server.herokuapp.com/API/getProducts?page=1")
      .then((resp) => {
        console.log(resp);
        setProducts(resp.data.records);
      });
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
          {products.length ? (
            products
              .filter((product) => {
                console.log(category, product["category"]);
                return (
                  // product["category"].toLowerCase() === category &&
                  product["price"] <= filterPrice[1] &&
                  product["price"] >= filterPrice[0]
                );
              })
              .map((item, index) => {
                return <ProductCard key={index} productItem={item} />;
              })
          ) : (
            <></>
          )}
        </Paper>
      </Box>
    </Grid>
  );
}
