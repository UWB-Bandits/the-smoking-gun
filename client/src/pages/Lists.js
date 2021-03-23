//import react and react hooks
import React, { useState, useEffect } from "react";
//import Material UI components
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
//import components
import TitleItem from "../components/TitleItem";
import NewItemForm from "../components/NewItemForm";
//import Material UI hooks
import { makeStyles } from "@material-ui/core/styles";
//import useParams to grab URL parameters
import { useParams } from "react-router-dom";
//import routes
import API from "../utils/API";
//import Material UI icons
import HomeIcon from "@material-ui/icons/Home";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import DeleteIcon from "@material-ui/icons/Delete";
//import Material-UI lab
import Alert from "@material-ui/lab/Alert";
//import context
import { useAuth } from "../contexts/AuthContext";

//initialize Lists page
function Lists() {
   //set state hooks
  const [formData, setFormData] = useState({ newItem: "" });
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);
  const [book, setBook] = useState({});
  const [error, setError] = useState("");
  //get current user info from context
  const { currentUser } = useAuth();
  //get bookId and listId from URL
  const {bookId, listId} = useParams();
  //this side effect grabs the book and list info on load
  useEffect(() => {
    loadBook();
    loadList();
  }, []);
  //calls database to get the book info and updates state
  const loadBook = async () => {
    const bookResponse = await API.getBook(bookId, currentUser.uid);
    setBook(bookResponse.data);
  };
  //calls database to get the list info and updates state
  const loadList = () =>{
    API.getList(listId)
      .then(res => {
        let pageList = {
          user: res.data.book.user,
          name: res.data.name,
          items: res.data.items,
          date: res.data.date,
          bookName: res.data.book.title,
          bookId: res.data.book._id
        };
        setList(pageList);
        setItems(res.data.items);
      })
      .catch(err => console.log(err));
  };
  //updates state as the user types in the form
  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newItem: value });
  };
  //calls database to send the info from the form as a new list item
  const addItem = () => {
    if (formData.newItem === "") {
      setError("Please enter a new item.");
    } else if (formData.newItem) {
      setError("");
      let updatedItems = items;
      //pushes new item onto other items array
      updatedItems.push({ name: formData.newItem, completed: false });
      setFormData({ newItem: "" });
      //updates list with the array that includes the new item
      API.updateList(listId, {
        ...list,
        items: updatedItems
        //reloads the list
      }).then(loadList())
      .catch(err => console.log(err));
    }
  };
  //when a user clicks the checkbox
  const handleToggle = (value) => () => {
    const newChecked = items;
    const currentIndex = newChecked.indexOf(value);
    //checks if the item is completed
    if (value.completed === false){
      //if not, marks it complete
      newChecked[currentIndex].completed = true;
    } else {
      //if yes, marks it incomplete
      newChecked[currentIndex].completed = false;
    }
    //updates state, which checks the appropriate checkboxes
    setItems(newChecked);
    //updates the database with the completion status
    API.updateList(listId, {
      ...list,
      items: newChecked
      //reloads the list
    }).then(loadList())
    .catch(err => console.log(err));
  };
  //deletes an item from the list in the database
  const handleDelete = (value) => () => {
    const newDelete = items;
    const currentIndex = newDelete.indexOf(value);
    //removes that item from the items array
    newDelete.splice(currentIndex, 1);
    //calls to update the list with the new array
    API.updateList(listId, {
      ...list,
      items: newDelete
      //reloads the list
    }).then(loadList())
    .catch(err => console.log(err));
  };
  //initialize the classes variable with our makeStyles hook
  const classes = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginLeft: "10px",
      marginRight: "10px",
    },
    link: {
      display: "flex",
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  }));
  //this returns a List page that holds stores items and their completion status
  return (
    <div className={book.colorScheme} style={{backgroundColor:"rgba(221, 221, 221, 0.5)"}}>
      {/* Material-UI Box component serves as a wrapper component for most of the CSS utility needs. */}
      <Box>
        {/* custom component that displays the title of the book */}
        <TitleItem title={list.name} description={list.description}/>
        {/* Material-UI Breadcrumb component allow users to make selections from a range of values. */}
        <Breadcrumbs aria-label="breadcrumb">
          {/* Material-UI Link component allows you to easily customize anchor elements with your theme colors and typography styles. */}
          <Link color="inherit" href="/dashboard" className={classes.link}>
            {/* Material-UI Icon Component */}
            <HomeIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px", fontFamily: "'Raleway', sans-serif",}}>Dashboard</span>
          </Link>
          <Link
            color="inherit"
            href={"/books/" + list.bookId}
            className={classes.link}
          >
            <ImportContactsIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px", marginLeft: "2px", fontFamily: "'Raleway', sans-serif",}}>{list.bookName}</span>
          </Link>
          {/* Material-UI Typography component is used to present your design and content as clearly and efficiently as possible. */}
          <Typography color="textPrimary" className={classes.link}>
            <PlaylistAddCheckIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px", fontFamily: "'Raleway', sans-serif",}}>{list.name}</span>
          </Typography>
        </Breadcrumbs>
        {/* Material UI List component are continuous, vertical indexes of text or images. */}
        <List className={classes.root}>
          {/*Material-Ui component that serves as a convenience wrapper */}
          <ListItem>
            {error && <Alert severity="error">{error}</Alert>}
          </ListItem>
          {items.map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            //this returns a list of items and the option to add more items
            return (
              // Material UI ListItem component is a wrapper for items contained in a list
              <ListItem
                key={items.indexOf(value)}
                dense
                button
                onClick={handleToggle(value)}
              >
                {/* Material UI ListItemIcon component is used as wrapper for an icon used within a list  */}
                <ListItemIcon >
                  {/* Material UI checkbox component allow the user to select one or more items from a set.*/}
                  <Checkbox
                    edge="start"
                    checked={value.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} ><span style={{fontFamily: "'Raleway', sans-serif",}}>{value.name}</span> </ListItemText>
                {/* Material UI ListItemSecondaryAction allows a secondary action within a list item  */}
                <ListItemSecondaryAction>
                  {/* Material UI IconButton component is clickable icon wrapper */}
                  <IconButton 
                    edge="end" 
                    aria-label="delete item" 
                    onClick={handleDelete(value)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        {/* custom component that returns a form to add new items */}
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
//exports Lists page
export default Lists;
