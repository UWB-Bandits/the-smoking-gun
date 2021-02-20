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
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";


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
        let pageList = {
          user: res.data.book.user,
          name: res.data.name,
          items: res.data.items,
          date: res.data.date,
          bookName: res.data.book.title,
          bookId: res.data.book._id
        };

        setList(pageList);
        console.log(res.data);
        setItems(res.data.items);
      })
      .catch(err => console.log(err));
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newItem: value });
  };

  const addItem = () => {

    if (formData.newItem){
      let updatedItems = items;
      updatedItems.push({ name: formData.newItem, completed: false });
      setFormData({ newItem: "" });
  
      API.updateList(id, {
        ...list,
        items: updatedItems
      }).then(loadList())
      .catch(err => console.log(err));
    }
  };

  const handleToggle = (value) => () => {
    const newChecked = items;
    const currentIndex = newChecked.indexOf(value);

    if (value.completed === false){
      newChecked[currentIndex].completed = true;
    } else {
      newChecked[currentIndex].completed = false;
    }

    API.updateList(id, {
      ...list,
      items: newChecked
    }).then(loadList())
    .catch(err => console.log(err));

  };

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

  return (
    <div style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
      <Box>
        <TitleItem title={list.name} description={list.description}/>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/dashboard" className={classes.link}>
            <HomeIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>Dashboard</span>
          </Link>
          <Link
            color="inherit"
            href={"/books/" + list.bookId}
            className={classes.link}
          >
            <ImportContactsIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px", marginLeft: "2px"}}>{list.bookName}</span>
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            <PlaylistAddCheckIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>{list.name}</span>
          </Typography>
        </Breadcrumbs>
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
