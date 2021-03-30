//import react
import React from "react";
//import Material-Ui components
import TextField from "@material-ui/core/TextField";
import {Fab, ButtonGroup} from "@material-ui/core/";
import Box from "@material-ui/core/Box";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//initialize EntryForm component that is passed down props
const EntryForm = (props) => {
  //initialize deconstructed state variables, functions, and strings from props
  const { formData, onSave, onDelete, handleInputChange, type} = props;
  //initialize the title and body variables from formData
  const {title, body} = formData;
  //this returns a form for users to to a journal entry
  return (
    //Material-UI component that serves as a wrapper component for most of the CSS utility needs.
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
          {/* Material-Ui component that serves as a convenience wrapper */}
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
            //Material-UI component that allows users to take actions, and make choices, with a single tap.
            <Fab
              className={"styled-button"}
              style={{
                  margin: 10,
                  display: "in-line",
                  width:"50%",
                  fontFamily: "Raleway, sans-serif"
              }}
              variant="extended"
              color="primary"
              onClick={onSave}
              >Save Entry
            </Fab>
            :
            //Material-UI component used to create a split button.
            <ButtonGroup>  
              <Fab
                className={"styled-button"}
                style={{
                    margin: 10,
                    display: "in-line",
                    width:"50%",
                    fontFamily: "Raleway, sans-serif"
                }}
                variant="extended"
                onClick={onSave}
                >Save Entry
              </Fab>
              <Fab
                style={{
                    margin: 10,
                    display: "inline",
                    width:"50%",
                    fontFamily: "Raleway, sans-serif",
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor:"#474747",
                    borderWidth:"2px",
                    borderStyle:"solid"
                }}
                variant="extended"
                onClick={onDelete}
                >Delete Entry
              </Fab>
            </ButtonGroup>
          }
      </form>
    </Box>
  );
};
//sets up prop types for the EntryForm component
EntryForm.propTypes = {
  formData: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  handleInputChange: PropTypes.func,
  type: PropTypes.string
};
//export the EntryForm component
export default EntryForm;
