import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const country = [
  {
    value: "Lahore",
    label: "Lahore",
  },
  {
    value: "Karachi",
    label: "Karachi",
  },
  {
    value: "Faisalabad",
    label: "Faisalabad",
  },
  {
    value: "Islamabad",
    label: "Islamabad",
  },
  {
    value: "Peshawar",
    label: "Peshawar",
  },
];

export default function SelectTextFields() {
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
        >
          {country.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
