import TextField from "@material-ui/core/TextField";
import {Button, ButtonGroup} from "@material-ui/core/";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import React from "react";

const EntryForm = (props) => {
  const { formData, onSave, onDelete, handleInputChange, type} = props;
  const {title, body} = formData;

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
      {type === "new" ?  
        <div style={{ margin: "0px 5px" }}>
          <TextField
            value={title}
            style={{ width: "100%", marginTop: "20px" }}
            id="titleInput"
            label="Title"
            variant="outlined"
            name="title"
            onChange={handleInputChange}
            
          ></TextField>
          <TextField
            id="outlined-multiline-static"
            onChange={handleInputChange}
            label="Body"
            name="body"
            multiline
            rows={10}
            variant="outlined"
            value={body}
            style ={{
                marginTop: "20px",
                width: "100%"
            }}
          ></TextField>
        </div>
      :
        <div style={{ margin: "0px 5px"}}>
          <TextField
            id="outlined-multiline-static"
            onChange={handleInputChange}
            name="body"
            multiline
            rows={10}
            variant="outlined"
            defaultValue={body}
            style ={{
                marginTop: "20px",
                width: "100%"
            }}
          ></TextField>
        </div>
      }
          {type === "new" ?
            <Button
              className={"styled-button"}
              style={{
                  margin: 10,
                  display: "in-line",
                  width:"50%"
              }}
              variant="contained"
              color="primary"
              onClick={onSave}
              >Save Entry
            </Button>
            :
            <ButtonGroup>  
              <Button
                className={"styled-button"}
                style={{
                    margin: 10,
                    display: "in-line",
                    width:"50%"
                }}
                variant="contained"
                // color="primary"
                onClick={onSave}
                >Save Entry
              </Button>
              <Button
                style={{
                    margin: 10,
                    display: "inline",
                    width:"50%"
                }}
                variant="contained"
                // color="secondary"
                onClick={onDelete}
                >Delete Entry
              </Button>
            </ButtonGroup>
          }
      </form>
    </Box>
  );
};

EntryForm.propTypes = {
  formData: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  handleInputChange: PropTypes.func,
  type: PropTypes.string
};

export default EntryForm;
