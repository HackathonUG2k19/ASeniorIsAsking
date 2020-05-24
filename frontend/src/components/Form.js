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

export default function Form({ readOnly, url }) {
  const [requester, setRequester] = useState({ name: "", contact: "" });
  const [items, setItem] = useState([{ item: "", shop: "", qty: "", id: 1 }]);
  const [count, setCount] = useState(2);

  const classes = useStyles();
  const blankItem = { item: "", shop: "", qty: "" };

  const handleRequesterChange = (e) => {
    setRequester({
      ...requester,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (e) => {
    const newItems = [...items];
    const idx = e.target.getAttribute("idx");
    const field = e.target.getAttribute("field");
    newItems[idx][field] = e.target.value;
    setItem(newItems);
  };

  const handleInsert = () => {
    setCount((prevCount) => prevCount + 1);
    const newItems = [...items, { ...blankItem, id: count }];
    setItem(newItems);
  };

  const handleDelete = (id) => {
    const newItems = items.filter((item) => id !== item.id);
    setItem(newItems);
  };

  const handleSubmit = async (e) => {
    const data = {
      name: requester.name,
      contact: requester.contact,
      items: items.map((elem) => {
        return {
          item: elem.item,
          shop: elem.shop,
          qty: elem.qty,
        };
      }),
    };
    e.preventDefault();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      });

      const message = await response.json();
      window.location = `${window.location.origin}/view-request/${message.order_id}`;
    } catch {
      // TODO: Error handling
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item sm={5} xs={11}>
          <TextField
            className={classes.textField}
            required
            name="name"
            label="Name"
            variant="outlined"
            inputProps={{ readOnly }}
            onChange={handleRequesterChange}
          />
        </Grid>
        <Grid item sm={5} xs={11}>
          <TextField
            className={classes.textField}
            required
            type="number"
            name="contact"
            label="Contact No."
            variant="outlined"
            inputProps={{ readOnly }}
            onChange={handleRequesterChange}
          />
        </Grid>
      </Grid>
      {items.map((elem, idx) => (
        <Grid container spacing={2} alignItems="center" key={elem.id}>
          <Grid item sm={5} xs={11}>
            <TextField
              required
              label="Item"
              variant="outlined"
              className={classes.textField}
              value={items[idx].item}
              inputProps={{ readOnly, idx, field: "item" }}
              onChange={handleItemChange}
            />
          </Grid>
          <Grid item sm={2} xs={5}>
            <TextField
              required
              label="Shop"
              variant="outlined"
              className={classes.textField}
              value={items[idx].shop}
              inputProps={{ readOnly, idx, field: "shop" }}
              onChange={handleItemChange}
            />
          </Grid>
          <Grid item sm={2} xs={4}>
            <TextField
              required
              type="number"
              label="Qty"
              variant="outlined"
              className={classes.textField}
              value={items[idx].qty}
              inputProps={{ readOnly, idx, field: "qty" }}
              onChange={handleItemChange}
            />
          </Grid>
          {!readOnly && (
            <Grid item sm={1} xs={1}>
              <IconButton
                size="large"
                disabled={items.length === 1}
                onClick={() => handleDelete(elem.id)}
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
              type="submit"
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
