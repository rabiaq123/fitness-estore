import React from "react";
import Carousel from "../../utils/Carousel/Carousel";
import { Box } from "grommet";

export default function LandingPage() {
  return (
    <div>
      <Box
        gridArea="main"
        direction="row"
        pad="medium"
        width={{
          max: "1200px",
        }}
        style={{ margin: "auto", marginTop: 50 }}
      >
        <Carousel />
      </Box>
    </div>
  );
}
