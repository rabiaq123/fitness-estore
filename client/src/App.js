import React from "react";
import "./App.css";
<<<<<<< HEAD
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel/Carousel";
import { Box, Grid } from "grommet";
function App() {
  // Landing page
  return (
    <article>
      <header>
        <Navbar />
      </header>
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
    </article>
  );
=======
import Router from "./Router";

function App() {
    return (
        <div className="App">
            <Router />
        </div>
    );
>>>>>>> origin/main
}

export default App;
