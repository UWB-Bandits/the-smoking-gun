import React from "react";

import {  useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";


DaysMenu.propTypes = {
    resultsDays: PropTypes.number,
    handleChange: PropTypes.func,
};

const days = [5,7,10,15,30,60,90,120];

function getStyles(number, resultsDays, theme) {
  return {
    fontWeight:
      resultsDays === number
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DaysMenu(props) {
  const theme = useTheme();
  const {resultsDays, handleChange} = props;

  return (
    <div>
      <FormControl >
        <Select
          displayEmpty
          value={resultsDays}
          onChange={handleChange}
          input={<Input />}
          label="days"
          inputProps={{ "aria-label": "Without label" }}
        >
          {days.map((number) => (
            <MenuItem key={number} value={number} style={getStyles(number, resultsDays, theme)}>
              {number}
            </MenuItem>
          ))}
        </Select>

      </FormControl>
      <p>Days shown</p>
    </div>
  );
}