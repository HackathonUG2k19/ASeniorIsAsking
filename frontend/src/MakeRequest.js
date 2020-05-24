import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Form from "./components/Form";

export default function MakeRequest() {
  return (
    <Box m={5}>
      <Box fontSize="h4.fontSize" fontWeight="fontWeightLight" mb={4} ml={1}>
        Place your request
      </Box>
      <Form url="http://localhost:5000/order_request" />
    </Box>
  );
}
