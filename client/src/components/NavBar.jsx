import React from "react";
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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "gold",
    color: "white"
  },
  button: {
    backgroundColor: "gold",
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "gold"
    }
  },
  menutItem: {
    fontSize: "10px",
    textDecoration: "none",
    backgroundColor: "white",
    color: "gold",
    "&:hover": {
      backgroundColor: "gold",
      color: "white"
    }
  }
}));

export default function NavBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Menu
          style={{ marginTop: "50px" }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to="/budget" style={{ textDecoration: "none"}}>
            <MenuItem className={classes.root, classes.menutItem}>CURRENT BUDGET</MenuItem>
          </Link>
          <MenuItem className={classes.root, classes.menutItem}>CREATE A NEW BUDGET</MenuItem>
        </Menu>
        <Menu
          style={{ marginTop: "50px" }}
          id="menue-message"
          anchorEl={anchorEl1}
          keepMounted
          open={Boolean(anchorEl1)}
          onClose={handleClose1}
        >
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem className={classes.root, classes.menutItem}>DASHBOARD</MenuItem>
          </Link>
          <Link
            to="/messages"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem className={classes.root, classes.menutItem}>MESSAGE</MenuItem>
          </Link>
        </Menu>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button className={classes.root, classes.button}>
              <LocalAtmIcon />
              BucketUp
            </Button>
          </Link>
          <Button
            className={classes.root, classes.button}
            saria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AccountBalanceWalletIcon />
            Your Budeget
          </Button>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Button
              className={classes.root, classes.button}
              saria-controls="menue-message"
              aria-haspopup="true"
              onClick={handleClick1}
            >
              <AccountCircleIcon />
              Profile
            </Button>
          </Link>
          <Button className={classes.root, classes.button}>
            <FaceIcon />
            About us
          </Button>
          <Button className={classes.root, classes.button}>
            <ErrorOutlineIcon />
            Report
          </Button>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button className={classes.root, classes.button}>
              <VpnKeyIcon />
              Login
            </Button>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
