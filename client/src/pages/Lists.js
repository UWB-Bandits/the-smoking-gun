import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import TitleItem from "../components/TitleItem";
import { makeStyles } from "@material-ui/core/styles";
import NewItemForm from "../components/NewItemForm";
import { useParams } from "react-router-dom";
import API from "../utils/API";

function Lists() {
  const [formData, setFormData] = useState({ newItem: "" });
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);

  const {id} = useParams();


  useEffect(() => {
    loadList();
  }, []);

  const loadList = () =>{
    API.getList(id)
      .then(res => {
        setList(res.data);
        setItems(res.data.items);
      })
      .catch(err => console.log(err));
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newItem: value });
  };

  const addItem = () => {
    
    let updatedItems = items;
    updatedItems.push({ name: formData.newItem, completed: false });
    setList({ ...list, items: updatedItems });
    setFormData({ newItem: "" });

    API.updateList(id, {
      ...list,
      items: items
    }).then(res => console.log(res))
    .catch(err => console.log(err));

  };

  const handleToggle = (value) => () => {
    const newChecked = items;
    const currentIndex = newChecked.indexOf(value);

    if (value.completed === false){
      newChecked[currentIndex].completed = true;
    } else {
      newChecked[currentIndex].completed = false;
    }


    setItems(newChecked);

    API.updateList(id, {
      ...list,
      items: items
    }).then(res => setList(res))
    .catch(err => console.log(err));

    //HAVE COMPLETED STATUS UPDATE IN DATABASE
  };

  const classes = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginLeft: "10px",
      marginRight: "10px",
    },
    accordion: {
      width: "100%",
      marginLeft: "10px",
      marginRight: "10px",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

  return (
    <div>
      <Box>
        <TitleItem title={list.name} description={list.description}/>
        <List className={classes.root}>
          {items.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value.name}
                dense
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments"></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>

        <NewItemForm
          formDataShown={formData.newItem}
          handleInputChange={handleInputChange}
          addItem={addItem}
          type="item"
        />
      </Box>
    </div>
  );
}

export default Lists;
