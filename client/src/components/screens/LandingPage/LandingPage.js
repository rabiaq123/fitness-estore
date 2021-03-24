import React from "react";
import Carousel from "../../utils/Carousel/Carousel";
import { Grid, Box } from "grommet";

export default function LandingPage() {
  return (
    <Grid
      rows={["xxsmall", "small"]}
      columns={["xsmall", "large"]}
      gap="small"
      areas={[{ name: "main", start: [1, 1], end: [1, 1] }]}
    >
      <Box
        gridArea="main"
        direction="row"
        pad="medium"
        height={{
          min: "600px",
        }}
        width={{
          max: "1000px",
        }}
      >
        <Carousel />
      </Box>
    </Grid>
  );
}
