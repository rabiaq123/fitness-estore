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
import { Add, Remove } from "@material-ui/icons";
import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import image from "../../../assets/product_imgs/bowflex-selecttech-552-dumbbell-set.png";

export default function ProductDetails() {
  let { state } = useLocation();
  let history = useHistory();
  let { productItem } = state;
  const [quantity, setQuantity] = useState(1);
  console.log(productItem);

  return (
    <div style={{ padding: "5px 10px 25px 20px", height: "100vh" }}>
      <Grid container direction="row" spacing={2}>
        <Typography variant="h3" style={{ marginTop: 20, marginBottom: 10 }}>
          {productItem.product_name}
        </Typography>
        <Grid item sm={8} style={{ overflow: "auto" }}>
          <Paper
            elevation={0}
            style={{
              backgroundColor: "#EFF0F6",
              borderRadius: 25,
              display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <img
              width="100%"
              height={800}
              src={image}
              style={{ objectFit: "cover" }}
              alt={productItem.product_name}
            />
          </Paper>
        </Grid>
        <Grid item sm={4} style={{ display: "flex", flexDirection: "column" }}>
          <Paper elevation={4} style={{ borderRadius: 25 }}>
            <div style={{ padding: 25 }}>
              <Typography variant="h4" style={{ fontWeight: "bolder" }}>
                $ {productItem.price}
              </Typography>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
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
                    onClick={() => {
                      /* TODO */
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
          <div>
            <Accordion
              style={{ borderRadius: 10, backgroundColor: "#EFF0F6" }}
              elevation={0}
            >
              <AccordionSummary>
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
              <AccordionSummary>
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
    </div>
  );
}
