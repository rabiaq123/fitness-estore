import React from "react";
import { AppBar, InputBase, Toolbar } from "@material-ui/core";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Put logo here */}
        <InputBase placeholder="Search..." />
      </Toolbar>
    </AppBar>
  );
}
