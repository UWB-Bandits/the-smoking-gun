import React, { useState, useEffect } from "react";
import { Box, List, ListItem, ListItemIcon, Checkbox, ListItemText, ListItemSecondaryAction, IconButton, } from "@material-ui/core";
import TitleItem from "../components/TitleItem";
import { makeStyles } from "@material-ui/core/styles";
import NewItemForm from "../components/NewItemForm";
import FakeLists from "../utils/fakeLists";

function Lists() {
  const [checked, setChecked] = useState([]);
  const [formData, setFormData] = useState({ newItem: ""});
  const [list, setList] = useState(FakeLists[0]);

  //GET ID OFF OF ROUTE AND SET UP STATE FOR THE LIST SHOWN -- UPDATE REFERENCES TO FakeLists[0] ABOVE 

  useEffect(() => {
    loadChecks();
  }, []);

  const loadChecks = () => {
    let checkedBoxes = [];
    list.items.forEach( item => {
      if (item.completed === true) {
        checkedBoxes.push(item);
        setChecked(checkedBoxes);
      };
    });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newItem: value });
  };

  const addItem = () =>{
    //HAVE NEWITEM POST TO DATABASE AND ADD TO LIST
    let updatedItems = list.items;
    updatedItems.push({name: formData.newItem, completed: false});
    setList({...list, items: updatedItems});
    setFormData({newItem: ""});
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    //HAVE COMPLETED STATUS UPDATE IN DATABASE
  };

  const classes = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginLeft: "10px",
      marginRight: "10px"
    },
    accordion: {
      width: "100%",
      marginLeft: "10px",
      marginRight: "10px"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

  return (
    <div> 
        <Box>
            <TitleItem {...list}/>
            <List className={classes.root}>
              {list.items.map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                const newChecked = [...checked];

                return (
                  <ListItem key={value.name} dense button onClick={handleToggle(value)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value.name} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>



            <NewItemForm formDataShown={formData.newItem} handleInputChange={handleInputChange} addItem={addItem} type="item"/>
        </Box>
             
    </div>
  );
}

export default Lists;
