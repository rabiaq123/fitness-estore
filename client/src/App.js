import React from "react";
import "./App.css";
import Navbar from "./components/utils/Navbar/Navbar";
import Router from "./Router";
import Carousel from "./components/utils/Carousel/Carousel";
import { Box, Grid } from "grommet";
// function App() {
//   // Landing page
//   return (
//     <article>
//       <header>
//         <Navbar />
//       </header>
//       <Grid
//         rows={["xxsmall", "small"]}
//         columns={["xsmall", "large"]}
//         gap="small"
//         areas={[{ name: "main", start: [1, 1], end: [1, 1] }]}
//       >
//         <Box
//           gridArea="main"
//           direction="row"
//           pad="medium"
//           height={{
//             min: "600px",
//           }}
//           width={{
//             max: "1000px",
//           }}
//         >
//           <Carousel />
//         </Box>
//       </Grid>
//     </article>
//   );

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
