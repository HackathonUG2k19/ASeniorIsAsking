import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

export const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

export default function Form(props) {
  const [items, setItem] = useState([1]);
  const [count, setCount] = useState(2);

  const classes = useStyles();

  const handleInsert = () => {
    setCount((prevCount) => prevCount + 1);
    const newItems = [...items, count];
    setItem(newItems);
  };

  const handleDelete = (id) => {
    const newItems = items.filter((itemId) => id !== itemId);
    setItem(newItems);
  };

  const readOnly = props.readOnly;

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item sm={5} xs={11}>
          <TextField
            className={classes.textField}
            required
            label="Name"
            variant="outlined"
            inputProps={{ readOnly }}
          />
        </Grid>
        <Grid item sm={5} xs={11}>
          <TextField
            className={classes.textField}
            required
            type="number"
            label="Contact No."
            variant="outlined"
            inputProps={{ readOnly }}
          />
        </Grid>
      </Grid>
      {items.map((elem) => (
        <Grid container spacing={2} alignItems="center" key={elem}>
          <Grid item sm={5} xs={11}>
            <TextField
              required
              fullWidth
              label="Item"
              variant="outlined"
              className={classes.textField}
              inputProps={{ readOnly }}
            />
          </Grid>
          <Grid item sm={2} xs={5}>
            <TextField
              required
              fullWidth
              label="Shop"
              variant="outlined"
              className={classes.textField}
              inputProps={{ readOnly }}
            />
          </Grid>
          <Grid item sm={2} xs={4}>
            <TextField
              required
              fullWidth
              type="number"
              label="Qty"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          {!readOnly && (
            <Grid item sm={1} xs={1}>
              <IconButton
                size="large"
                disabled={items.length === 1}
                onClick={() => handleDelete(elem)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ))}
      {!readOnly && (
        <Grid container spacing={2}>
          <Grid item>
            <Button
              className={classes.textField}
              variant="contained"
              size="large"
            >
              Request
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.textField}
              variant="contained"
              size="large"
              onClick={handleInsert}
            >
              Add Item
            </Button>
          </Grid>
        </Grid>
      )}
    </form>
  );
}
