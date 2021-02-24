import React, {useState, useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import SaveIcon from "@material-ui/icons/Save";
import API from "../../utils/API";

const EditListForm = (props) => {
    
    const [formData, setFormData] = useState({
        name: ""
      });

    useEffect(() => {
        setFormData({
            name: props.name,
           
        });
    }, []);

   EditListForm.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string
   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

  const handleSubmit = () => {
    
    API.updateList(props.id, formData)
    .then( res => {
      res;
      window.location.reload(true);
    })
    .catch(err => console.log(err));
};
  return (
    <Box
      boxShadow={2}
      p={2}
      style={{
        width: "80%",
        margin: "10px auto",
        minWidth: "300px",
        borderRadius: "5px",
      }}
      bgcolor="background.paper"
    >
      <h2>Edit {"'"}{props.name}{"'"} List</h2>
      <form
        style={{
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: "0px 5px" }}>
          <TextField
            style={{ width: "100%" }}
            id="newListName"
            label="Name"
            type="text"
            name="name"
            onChange={handleInputChange}
          />
        </div>
        <Button
          style={{
            margin: "25px 10px 25px auto",
            display: "block",
          }}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};



export default EditListForm;