import React, { useState } from "react";
import { MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core";

export default function SettingsWeather() {
  const [currency, setCurrency] = useState("EUR");
  // const handleClick = (url) => {
  //   // TODO Add noopener and noreferrer tags
  //   window.open(url, "_blank").focus();
  // };
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];
  return (
    <>
      <TextField
        id="standard-select-currency"
        select
        label="Select"
        value={currency}
        onChange={handleChange}
        helperText="Please select your currency"
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
