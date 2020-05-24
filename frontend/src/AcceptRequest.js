import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Form, { useStyles } from "./components/Form";

export default function AcceptRequest(props) {
  const [order, setOrder] = useState({});
  const [acceptor, setAcceptor] = useState({ name: "", contact: "" });

  const orderId = props.match.params.orderId;

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(
        `http://localhost:5000/view_order/${orderId}`
      );
      const data = await response.json();

      setOrder(data);
      setTimeout(fetchOrder, 3000);
    };

    fetchOrder();
  }, [orderId]);

  const handleAcceptorChange = (e) => {
    setAcceptor({
      ...acceptor,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();

  const handleSubmit = async (e) => {
    const data = {
      acceptor_name: acceptor.name,
      acceptor_contact: acceptor.contact,
      order_id: orderId,
    };
    e.preventDefault();

    const response = await fetch("http://localhost:5000/accept_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    const message = await response.json();
  };

  return (
    <Box m={5}>
      <Box fontSize="h4.fontSize" fontWeight="fontWeightLight" mb={4} ml={1}>
        Accept Request
      </Box>
      <Box fontSize="h5.fontSize" fontWeight="fontWeightLight" ml={1}>
        Order Details
      </Box>
      <Form readOnly order={order} />
      <Box mt={5} ml={1} fontSize="h5.fontSize" fontWeight="fontWeightLight">
        Your Details
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={5} xs={11}>
            <TextField
              className={classes.textField}
              required
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleAcceptorChange}
            />
          </Grid>
          <Grid item sm={5} xs={11}>
            <TextField
              className={classes.textField}
              required
              type="number"
              label="Contact No."
              name="contact"
              variant="outlined"
              onChange={handleAcceptorChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              className={classes.textField}
              variant="contained"
              type="submit"
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
