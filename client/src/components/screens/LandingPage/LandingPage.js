import React from "react";
import Carousel from "../../utils/Carousel/Carousel";
import { Box } from "grommet";

export default function LandingPage() {
  return (
    <div style={{ height: "100vh" }}>
      <Box
        gridArea="main"
        direction="row"
        pad="medium"
        width={{
          max: "2000px",
        }}
        style={{ margin: "auto", marginTop: 50 }}
      >
        <Carousel />
      </Box>
    </div>
  );
}
