import React, { useEffect, useState } from "react";
import {
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "grommet";
import ProductDetails from "../ProductDetails/ProductDetails";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  product_container: {
    display: "flex",
    flexWrap: "wrap",
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(16),
    //   height: theme.spacing(16),
    // },
    backgroundColor: "#EFF0F6",
    height: "100%",
    maxWidth: "1200px",
    borderRadius: 50,
    padding: 50,
  },
  // product_container: {
  //   backgroundColor: "grey",
  //   height: "100%",
  //   maxWidth: "100%",
  //   borderRadius: 50,
  //   padding: 50,
  // },
}));

const ProductCard = (productItem) => {
  // TODO
  return <div></div>;
};

export default function Products() {
  const classes = useStyles();
  const location = useLocation();
  const payload = {
    code: 200,
    token: "6C3ccXkMYv4Vok_Huxptwg",
    data: {
      price: "nameFirst",
      email: "internetEmail",
      phone: "phoneHome",
      // _repeat: 1,
    },
  };
  const [products, setProducts] = useState([]);

  useEffect(
    () => {
      // For testing purposes
      // (async function getProducts() {
      //   axios
      //     .post("https://app.fakejson.com/q", payload)
      //     .then((resp) => {
      //       setProducts(resp.data);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // })();
      // setProducts([
      //   {
      //     id: 1,
      //     price: 199.99,
      //     name: "Testing Dumbbell",
      //     image_url: "bowflex-selecttech-552-dumbbell-set.png",
      //   },
      // ]);
      // Call DB here for products
      // Filter by
      // return () => {};
    }
    // [
    //   /* Track category, filter, and sort by values (left accordion) */
    // ]
  );
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
        <Paper className={classes.product_container} elevation={0}>
          {products.length ? (
            products.map((item, index) => {
              return <ProductCard key={index} {...item} />;
            })
          ) : (
            <></>
          )}
        </Paper>
      </Box>
    </Grid>
  );
}
