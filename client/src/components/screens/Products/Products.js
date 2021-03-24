import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "grommet";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function Products({ category, search }) {
  const classes = useStyles();

  useEffect(
    () => {
      // Call DB here for products
      // Filter by
      // return () => {};
    },
    [
      /* Track category, filter, and sort by values (left accordion)*/
    ]
  );

  return (
    <Grid
      justify="stretch"
      fill="horizontal"
      rows={["medium", "medium"]}
      columns={["medium", "large"]}
      gap="large"
      areas={[
        { name: "left-options", start: [0, 0], end: [0, 1] },
        { name: "products-container", start: [1, 0], end: [1, 1] },
      ]}
      // style={{ margin: "auto" }}
    >
      <Box gridArea="left-options">
        <div style={{ backgroundColor: "pink" }}></div>
      </Box>
      <Box gridArea="products-container">
        <Paper
          style={{ backgroundColor: "grey", height: "100%", width: "100%" }}
          className={classes.root}
          elevation={0}
        >
          Test
        </Paper>
      </Box>
    </Grid>
  );
}
