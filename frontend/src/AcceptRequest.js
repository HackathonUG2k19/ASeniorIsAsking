import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Form, { useStyles } from "./components/Form";

export default function AcceptRequest(props) {
  const orderId = props.match.params.orderId;

  const classes = useStyles();

  return (
    <Box m={5}>
      <Box fontSize="h4.fontSize" fontWeight="fontWeightLight" mb={4} ml={1}>
        Accept Request
      </Box>
      <Box fontSize="h5.fontSize" fontWeight="fontWeightLight" ml={1}>
        Order Details
      </Box>
      <Form readOnly />
      <Box mt={5} ml={1} fontSize="h5.fontSize" fontWeight="fontWeightLight">
        Your Details
      </Box>
      <form>
        <Grid container spacing={2}>
          <Grid item sm={5} xs={11}>
            <TextField
              className={classes.textField}
              required
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={5} xs={11}>
            <TextField
              className={classes.textField}
              required
              type="number"
              label="Contact No."
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              className={classes.textField}
              variant="contained"
              size="large"
            >
              Accept
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
