import React, { useState } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import FaceIcon from "@material-ui/icons/Face";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  const buttonStyle = {
    color: "white",
    background: "gold"
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar style={buttonStyle}>
      <Toolbar>
        <Menu
          style={{ marginTop: "50px" }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        ><Link to="/budget" style={{ textDecoration: "none" }}>
          <MenuItem>Current Budeget</MenuItem></Link>
          <MenuItem>Create New Budget</MenuItem>
        </Menu>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Link to="/" style={{ textDecoration: "none"}}>
            <Button style={buttonStyle}>
              <LocalAtmIcon />
              BucketUp
            </Button>
          </Link>
          <Button
            style={buttonStyle}
            saria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AccountBalanceWalletIcon />
            Your Budeget
          </Button>
          <Link to="/profile" style={{ textDecoration: "none" }}>

          <Button style={buttonStyle}>
            <AccountCircleIcon />
            Profile
          </Button>
          </Link>
          <Button style={buttonStyle}>
            <FaceIcon />
            About us
          </Button>
          <Button style={buttonStyle}>
            <ErrorOutlineIcon />
            Report
          </Button>
          <Link to="/login" style={{ textDecoration: "none" }}>
          <Button style={buttonStyle}>
            <VpnKeyIcon />
            Login
          </Button>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
