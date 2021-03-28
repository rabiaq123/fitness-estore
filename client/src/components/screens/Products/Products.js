import React, { useEffect, useState } from "react";
import {
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "grommet";
import ProductDetails from "../ProductDetails/ProductDetails";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Products.css";
import image from "../../../assets/product_imgs/bowflex-selecttech-552-dumbbell-set.png";

const useStyles = makeStyles((theme) => ({
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#EFF0F6",
    height: "100%",
    maxWidth: "1200px",
    borderRadius: 50,
    padding: 50,
  },
  productCard: {
    backgroundColor: "grey",
    maxWidth: 300,
  },
  productCardImage: {
    height: 140,
  },
}));

const ProductCard = (productItem) => {
  // TODO
  console.log(productItem);
  // NOTE Gonna hardcode the images for now since they're null
  return (
    <Card className="test">
      <CardActionArea>
        <CardMedia
          image={image}
          // className={style.productCardImage}
          title={productItem.productName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {productItem.productName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default function Products() {
  const classes = useStyles();
  const location = useLocation();
  // const payload = {
  //   code: 200,
  //   token: "6C3ccXkMYv4Vok_Huxptwg",
  //   data: {
  //     price: "nameFirst",
  //     email: "internetEmail",
  //     phone: "phoneHome",
  //     // _repeat: 1,
  //   },
  // };
  /*
   * SORT OPTIONS
   *  Highest to lowest price = 0
   *  Lowest to Highest price = 1
   */
  const [sortBy, setSortBy] = useState(0);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [category, setCategory] = useState(null); // null = all products

  useEffect(() => {
    // Call DB here for products
    axios
      .get("https://fitnova-server.herokuapp.com/API/getProducts?page=1")
      .then((resp) => {
        console.log(resp);
        setProducts(resp.data.records);
      });
    // Filter by
    // return () => {};
  }, []);
  console.log(location);

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
            backgroundColor: "#EFF0F6",
            height: "100%",
            width: "100%",
            borderRadius: 50,
          }}
          elevation={0}
        ></Paper>
      </Box>
      <Box gridArea="products-container">
        <Paper className={classes.productContainer} elevation={0}>
          {products.length ? (
            products.map((item, index) => {
              return (
                <ProductCard key={index} style={classes} productItem={item} />
              );
            })
          ) : (
            <></>
          )}
        </Paper>
      </Box>
    </Grid>
  );
}
