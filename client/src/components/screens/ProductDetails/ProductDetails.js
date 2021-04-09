import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { Add, ExpandMore, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import image from "../../../assets/product_imgs/bowflex-selecttech-552-dumbbell-set.png";
import "./ProductDetails.css";

export default function ProductDetails() {
  let { state } = useLocation();
  let history = useHistory();
  let { productItem } = state;
  const [quantity, setQuantity] = useState(1);
  console.log(productItem);

  useEffect(() => {
    document.title = "Product - " + productItem.product_name;
  });

  return (
    <div style={{ padding: "5px 10px 25px 20px", height: "100vh" }}>
      <Grid container direction="column" spacing={2}>
        <Grid item sm={8}>
          <Typography variant="h3" style={{ marginTop: 20, marginBottom: 10 }}>
            {productItem.product_name}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Grid container spacing={2}>
            <Grid item sm={8}>
              <Paper
                elevation={0}
                style={{
                  backgroundColor: "#EFF0F6",
                  borderRadius: 25,
                  display: "flex",
                }}
              >
                <img
                  width="100%"
                  height={800}
                  src={image}
                  style={{ objectFit: "contain" }}
                  alt={productItem.product_name}
                />
              </Paper>
            </Grid>
            <Grid
              item
              sm={4}
              style={{ display: "flex", flexDirection: "column", gap: 40 }}
            >
              <Paper
                elevation={4}
                style={{ borderRadius: 25, maxWidth: 400, minHeight: 400 }}
              >
                <div style={{ padding: 25 }}>
                  <Typography variant="h4" style={{ fontWeight: "bolder" }}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(productItem.price)}
                  </Typography>
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 150,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: "bolder" }}>
                        Quantity:
                      </Typography>
                      <IconButton
                        style={{
                          backgroundColor: "#EFF0F6",
                          height: 30,
                          width: 30,
                        }}
                        onClick={() => {
                          if (quantity > 1) setQuantity(quantity - 1);
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography style={{ fontWeight: "bold" }}>
                        {quantity}
                      </Typography>
                      <IconButton
                        style={{
                          backgroundColor: "#EFF0F6",
                          height: 30,
                          width: 30,
                        }}
                        onClick={() => {
                          if (quantity < productItem.quantity)
                            setQuantity(quantity + 1);
                        }}
                      >
                        <Add />
                      </IconButton>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <Button
                        variant="contained"
                        disableElevation
                        style={{
                          borderRadius: 25,
                          fontWeight: "bold",
                          color: "white",
                          backgroundColor: "#FE646F",
                        }}
                        onClick={() => {
                          history.push("/checkout");
                        }}
                      >
                        Purchase
                      </Button>
                      <Button
                        variant="outlined"
                        style={{
                          borderRadius: 25,
                          fontWeight: "bold",
                          color: "#FE646F",
                          borderColor: "#FE646F",
                          borderWidth: 2,
                        }}
                        onClick={() => {}}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Paper>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  maxWidth: 400,
                }}
              >
                <Accordion
                  style={{ borderRadius: 10, backgroundColor: "#EFF0F6" }}
                  elevation={0}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bolder" }}
                    >
                      Description
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">
                      {productItem.product_description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  style={{ borderRadius: 10, backgroundColor: "#EFF0F6" }}
                  elevation={0}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bolder" }}
                    >
                      Additional Info
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">{productItem.notes}</Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
