import React, {useContext} from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from "@material-ui/icons/Face";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { authContext } from "../providers/AuthProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "gold",
    color: "black"
  },
  button: {
    backgroundColor: "gold",
    color: "black",
    "&:hover": {
      backgroundColor: "black",
      color: "gold"
    }
  },
  menutItem: {
    fontSize: "10px",
    textDecoration: "none",
    backgroundColor: "black",
    color: "gold",
    "&:hover": {
      backgroundColor: "gold",
      color: "black"
    }
  }
}));

export default function NavBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

<<<<<<< HEAD
  const { auth, user } = useContext(authContext);
=======
  const { auth, user , logout} = useContext(authContext);
>>>>>>> fddc3a12e537056685e99683620c3eca9672abfa

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
    <AppBar className={(classes.root)}>
      <Toolbar>
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
            <MenuItem className={(classes.root, classes.menutItem)}>
              DASHBOARD
            </MenuItem>
          </Link>
          <Link
            to="/analytics"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem className={(classes.root, classes.menutItem)}>
              ANALYTICS
            </MenuItem>
          </Link>
          <Link
            to="/messages"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem className={(classes.root, classes.menutItem)}>
              MESSAGE
            </MenuItem>
          </Link>
        </Menu>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button className={(classes.root, classes.button)}>
              <LocalAtmIcon />
              BucketUp
            </Button>
          </Link>
          
          <Link to="/budget" style={{ textDecoration: "none" }}>
          <Button
            className={(classes.root, classes.button)}
            saria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AccountBalanceWalletIcon />
            Your Budeget
          </Button>
          </Link>

          <Button
            className={(classes.root, classes.button)}
            saria-controls="menue-message"
            aria-haspopup="true"
            onClick={handleClick1}
          >
            <AccountCircleIcon />
            Profile
          </Button>

          <Button className={(classes.root, classes.button)}>
            <FaceIcon />
            About us
          </Button>

          {!auth && <Link to="/login" style={{ textDecoration: "none" }}>
            <Button className={(classes.root, classes.button)}>
              <VpnKeyIcon />
              Login
            </Button>
          </Link> }
<<<<<<< HEAD
          {auth && <Button className={(classes.root, classes.button)}><EmojiEmotionsIcon/>Hi, {user.name}</Button>
          }
          {auth && 
            <Button className={(classes.root, classes.button)}>
=======
          {auth && <Button className={(classes.root, classes.button)}><EmojiEmotionsIcon/>Hi, {user.name}!</Button>
          }
          {auth && 
            <Button className={(classes.root, classes.button)} onClick={() => logout()}>
>>>>>>> fddc3a12e537056685e99683620c3eca9672abfa
              <ExitToAppIcon />
              logout
            </Button>
          }
<<<<<<< HEAD
          

=======
>>>>>>> fddc3a12e537056685e99683620c3eca9672abfa

        </Grid>
      </Toolbar>
    </AppBar>
  );
}
