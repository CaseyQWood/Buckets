import React, { useState } from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/icons/Menu";

export default function NavBar(props) {
  return (
    <>
    <AppBar>
      <Toolbar>
        <Menu>
          <MenuItem>An item</MenuItem>
          <MenuItem>Another item</MenuItem>
        </Menu>
        <Button>BucketUp</Button>
      </Toolbar>
    </AppBar>
    </>
  );
}
