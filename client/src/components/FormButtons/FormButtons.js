import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
const FormButtons = ({ button1, button2, setPage }) => {
  return (
    <div>
      <div>
        <Button
          style={{
            margin: "25px 10px 25px auto",
            display: "block",
          }}
          variant="contained"
          color="primary"
          type="submit"
          // onClick={(e) => e.preventDefault()}
        >
          {button1}
        </Button>
      </div>
      <p
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        {button2[0]}
        <Button
          style={{
            margin: "10px 5px",
            padding: "3px 8px ",
          }}
          variant="contained"
          value={button2[1]}
          onClick={setPage}
        >
          {button2[1]}
        </Button>
      </p>
    </div>
  );
};

FormButtons.propTypes = {
  button1: PropTypes.string,
  button2: PropTypes.array,
  setPage: PropTypes.func,
};

export default FormButtons;
