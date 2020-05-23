import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

export default function MakeRequest() {
  const classes = useStyles();

  return (
    <Box m={5}>
      <Box fontSize="h4.fontSize" fontWeight="fontWeightLight" mb={2} ml={1}>
        Place your request
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
        <Grid container spacing={2} alignItems="center">
          <Grid item sm={5} xs={11}>
            <TextField
              required
              fullWidth
              label="Item"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item sm={2} xs={6}>
            <TextField
              required
              fullWidth
              label="Shop"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item sm={2} xs={5}>
            <TextField
              required
              fullWidth
              type="number"
              label="Qty"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item sm={2}>
            <IconButton size="large">
              <AddIcon />
            </IconButton>
            <IconButton size="large">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
