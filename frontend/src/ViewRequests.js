import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "./components/Card";

export default function ViewRequests() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/pending_orders_list");
      const data = await response.json();

      setOrders(() => {
        return Object.keys(data).map((key) => {
          return { ...JSON.parse(data[key]), orderId: key };
        });
      });
    };

    fetchData();
    const repeater = setInterval(fetchData, 3000);

    return function cleanup() {
      clearInterval(repeater);
    };
  }, []);

  return (
    <Box m={5}>
      <Box fontSize="h4.fontSize" fontWeight="fontWeightLight" mb={4} ml={1}>
        Pending requests
      </Box>
      <Grid container>
        {orders.map((order) => (
          <Grid item md={3} sm={6} xs={12}>
            <Card orderId={order.orderId}>
              <List>
                {order.items.slice(0, 3).map((item) => (
                  <ListItem>
                    <Grid container justify="space-between">
                      <Grid item>
                        <ListItemText
                          primary={item.item}
                          secondary={item.shop}
                        />
                      </Grid>
                      <Grid>
                        <ListItemText primary={item.qty} />
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
