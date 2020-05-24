import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "./components/Card";

export default function ViewRequests() {
  return (
    <Box m={5}>
      <Box fontSize="h4.fontSize" fontWeight="fontWeightLight" mb={4} ml={1}>
        Pending requests
      </Box>
      <Grid container>
        <Grid item sm={3} xs={12}>
          <Card orderId={1}>
            <List>
              <ListItem>
                <Grid container justify="space-between">
                  <Grid item>
                    <ListItemText primary="Tava Bhonda" secondary="Shop 1" />
                  </Grid>
                  <Grid>
                    <ListItemText primary="3" />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <ListItemText primary="Tava Bhonda" secondary="Shop 1" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tava Bhonda" secondary="Shop 1" />
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Card orderId={1}></Card>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Card orderId={1}></Card>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Card orderId={1}></Card>
        </Grid>
      </Grid>
    </Box>
  );
}
