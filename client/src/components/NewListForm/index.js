import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const NewListForm = (props) => {
  const { handleInputChange, addList } = props;

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
            label="Add a new list"
            type="text"
            name="newList"
            onChange={handleInputChange}
          />
        </div>

        <Button
          style={{
            margin: "10px",
            display: "block",
          }}
          variant="contained"
          color="primary"
          onClick={addList}
        >Add
        </Button>
      </form>
    </Box>
  );
};

NewListForm.propTypes = {
  addList: PropTypes.func,
  handleInputChange: PropTypes.func,
};

export default NewListForm;
