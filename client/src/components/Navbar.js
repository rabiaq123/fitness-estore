import React from "react";
import { AppBar, InputBase, Toolbar } from "@material-ui/core";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar style={{ backgroundColor: "#FE646F" }}>
        <img src="" />
        <InputBase placeholder="Search..." />
      </Toolbar>
    </AppBar>
  );
}
