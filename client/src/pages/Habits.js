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
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";


function Habits() {
  const [formData, setFormData] = useState({ newItem: "" });
  const [habits, setHabits] = useState([]);
  const [book, setBook] = useState({});

  const {id} = useParams();

  let date = new Date();
  date = date.toDateString();


  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = () =>{
    API.getBook(id)
    .then(res => setBook(res.data));
    
    
    API.getHabits(id)
      .then(res => {
        setHabits(res.data);
        console.log(res);
      })
      .catch(err => console.log(err));


  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newItem: value });
  };

  const addHabit = () => {

    if (formData.newItem){
      let updatedItems = habits;
      updatedItems.push({ name: formData.newItem, tracking: [], book: id });
      setHabits(updatedItems );
      setFormData({ newItem: "" });
  
      API.createHabit({ 
        name: formData.newItem, 
        tracking: [], 
        book: id 
      }).then(res => console.log(res))
      .catch(err => console.log(err));
    }
  };

  // const handleToggle = (value) => () => {
  //   const newChecked = items;
  //   const currentIndex = newChecked.indexOf(value);

  //   if (value.completed === false){
  //     newChecked[currentIndex].completed = true;
  //   } else {
  //     newChecked[currentIndex].completed = false;
  //   }


  //   setItems(newChecked);

  //   API.updateList(id, {
  //     ...list,
  //     items: items
  //   }).then(res => setList(res.data))
  //   .catch(err => console.log(err));

  // };

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
    <div>
      <Box>
        <TitleItem title="Your Daily Habits" description={date}/>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/dashboard" className={classes.link}>
            <HomeIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>Dashboard</span>
          </Link>
          <Link
            color="inherit"
            href={"/books/" + book._id}
            className={classes.link}
          >
            <ImportContactsIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px", marginLeft: "2px"}}>{book.title}</span>
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            <TrackChangesIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>Habit Tracker</span>
          </Typography>
        </Breadcrumbs>
        <List className={classes.root}>
          { habits  ? habits.map((value) => {
            const labelId = `checkbox-list-label-${value.name}`;

            return (
              <ListItem
                key={value.name}
                dense
                button
                // onClick={handleToggle(value)}
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
          })
        :
          <p>Add a habit to get started</p>   
        }
        </List>

        <NewItemForm
          formDataShown={formData.newItem}
          handleInputChange={handleInputChange}
          addItem={addHabit}
          type="habit"
        />
      </Box>
    </div>
  );
}

export default Habits;
