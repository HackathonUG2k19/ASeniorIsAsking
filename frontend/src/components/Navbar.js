import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    textTransform: "none",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar style={{ background: "#557A95" }} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ASeniorIsAsking
          </Typography>
          <Button className={classes.button} color="inherit">
            <Link
              to="/make-request"
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              Make Request
            </Link>
          </Button>
          <Button className={classes.button} color="inherit">
            <Link
              to="/"
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              View Requests
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
