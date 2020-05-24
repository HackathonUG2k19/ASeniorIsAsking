import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default function RequestStatus(props) {
  const [order, setOrder] = useState({});

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

  return (
    <Box m={5}>
      <Box fontSize="h4.fontSize" fontWeight="fontWeightLight" mb={3} ml={1}>
        Request Status
      </Box>
      {!order.acceptor_name && (
        <Box fontSize="h5.fontSize" fontWeight="fontWeightLight" ml={1}>
          Your Order is Pending
        </Box>
      )}
      {order.acceptor_name && (
        <Box>
          <Box fontSize="h5.fontSize" fontWeight="fontWeightLight" ml={1}>
            Your Order has been accepted by {order.acceptor_name}
          </Box>
          <Box fontSize="h6.fontSize" fontWeight="fontWeightLight" ml={1}>
            Contact - {order.acceptor_contact}
          </Box>
        </Box>
      )}
    </Box>
  );
}
