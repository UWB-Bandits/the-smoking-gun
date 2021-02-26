//import react
import React from "react";
//import Material-UI functions
import {  useTheme } from "@material-ui/core/styles";
// import Material-UI Components
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//sets up prop types for the DaysMenu component
DaysMenu.propTypes = {
    resultsDays: PropTypes.number,
    handleChange: PropTypes.func,
};
//initialize an array of number of days used as options
const days = [5,7,10,15,30,60,90,120];
//this function returns a style based on the number of days the user wants to compare their habits
function getStyles(number, resultsDays, theme) {
  return {
    fontWeight:
      resultsDays === number
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
//export and initialize the DaysMenu component that is passed down
export default function DaysMenu(props) {
  //initialize theme variable with useTheme hook
  const theme = useTheme();
  //deconstruct props used down below
  const {resultsDays, handleChange} = props;
  //this returns an option to change the number of days tracked on the habit tracker
  return (
    <div>
      {/*Material-Ui component that provides context such as filled/focused/error/required for form inputs.  */}
      <FormControl >
        {/*Material-Ui component used for collecting user provided information from a list of options.*/}
        <Select
          displayEmpty
          value={resultsDays}
          onChange={handleChange}
          input={<Input />}
          label="days"
          inputProps={{ "aria-label": "Without label" }}
        >
          {days.map((number) => (
            // Material-Ui component used to wrap items in a menu component/form
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