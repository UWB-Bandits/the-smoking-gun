import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const NewCalendarForm = (props) => {
  const { handleCalendarInputChange, addCalendar, type, formDataShown} = props;
  return (
    <Box style={{width:"100%"}}>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: "0px 5px" }}>
          <TextField
            style={{ width: "100%" }}
            id="newListInput"
            label={`Add a new ${type}`}
            type="text"
            name="newList"
            onChange={handleCalendarInputChange}
            value={formDataShown}
          />
        </div>

        <Button
          className={"styled-button"}
          style={{
            margin: "10px",
            display: "block",
          }}
          variant="contained"
          color="primary"
          onClick={addCalendar}
        >Add
        </Button>
      </form>
    </Box>
  );
};

NewCalendarForm.propTypes = {
  addCalendar: PropTypes.func,
  handleCalendarInputChange: PropTypes.func,
  type: PropTypes.string,
  formDataShown: PropTypes.string
};

export default NewCalendarForm;
