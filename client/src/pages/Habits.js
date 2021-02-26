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
  Grid
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
//import Material UI hook
import { makeStyles } from "@material-ui/core/styles";
//import Material UI icons
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
//import components
import TitleItem from "../components/TitleItem";
import NewItemForm from "../components/NewItemForm";
import HabitDoughnut from "../components/HabitDoughnut";
import DaysMenu from "../components/DaysMenu";
import DeleteModal from "../components/DeleteModal";
//import useParams to grab URL parameters
import { useParams } from "react-router-dom";
//import route
import API from "../utils/API";
//import context
import { useAuth } from "../contexts/AuthContext";
//initialize Habits page
function Habits() {
  //set state hooks
  const [formData, setFormData] = useState({ newItem: "" });
  const [habits, setHabits] = useState([]);
  const [book, setBook] = useState({});
  const [completedToday, setCompletedToday] = useState([]);
  const [resultsDays, setResultsDays] = useState(7);
  //grab the current user info from context
  const { currentUser } = useAuth();
  //grab the bookId and habitIt from the URL
  const {bookId, habitId} = useParams();
  //initialize date variables
  let date = new Date();
  let dateString = date.toDateString();
  let dateNeeded = date.setDate(date.getDate() - resultsDays);
  let dateNeededString = new Date(dateNeeded).toDateString();
  //this side effect runs loadBook and loadHabits functions
  useEffect(() => {
    loadBook();
    loadHabits();
  }, []);
  //this grabs the book by id and sets book state with the data
  const loadBook = async () => {
    const bookResponse = await API.getBook(bookId, currentUser.uid);
    setBook(bookResponse.data);
  };
  //this grabs the book by id and sets book state with the data then sets habits
  const loadHabits = () =>{
    API.getBook(bookId, currentUser.uid)
    .then(res => setBook(res.data));
    //initialize and empty array
    let todaysTracking = [];
    //this finds completed habits
    function findCompleted(dbHabits){
      dbHabits.forEach(habit =>{
        let tracking = habit.tracking;
        let tracked = tracking.filter(item => item.day === dateString);
        if (tracked.length > 0) {
          todaysTracking.push(habit._id);
        } 
      });
    }
    //this makes a call to the database and find by habitId and sets habits state, runs findCompleted function, sets completeToday state
    API.getHabits(habitId)
      .then(res => {
        let dbHabits = res.data;
        setHabits(dbHabits);
        findCompleted(dbHabits);
        setCompletedToday(todaysTracking);
      })
      .catch(err => console.log(err));
  };
  //this sets resultsDays state based off of the event target
  const handleDaysChange = (event) => {
    setResultsDays(event.target.value);
  };
  //this sets the formData state based off of the event target
  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newItem: value });
  };
  //this adds a habit to the habit tracker
  const addHabit = () => {
    if (formData.newItem){
      API.createHabit({ 
        name: formData.newItem, 
        tracking: [], 
        book: bookId 
      }).then(loadHabits())
      .catch(err => console.log(err));
      setFormData({ newItem: "" });
    }
  };
  //this handles the toggle of completed or not
  const handleToggle = (value) => () => {
    const newChecked = habits;
    const currentIndex = newChecked.indexOf(value);
    const todaysTrackingIndex = completedToday.indexOf(value._id);
    const completedTodayTemp = completedToday;
    if (todaysTrackingIndex === -1){
      newChecked[currentIndex].tracking.push({
        day: dateString,
        completed: true
      });
      completedTodayTemp.push(value._id);
    } else {
      let removedTracking = habits[currentIndex].tracking.filter(item => item.day !== dateString);
      newChecked[currentIndex].tracking = removedTracking;
      completedTodayTemp.splice(todaysTrackingIndex, 1);
    }
    setCompletedToday(completedTodayTemp);
    setHabits(newChecked);
    API.updateHabit(value._id, {
      ...habits[currentIndex]
    }).then(loadHabits())
    .catch(err => console.log(err));
  };
  //initialize the classes variable with our makeStyles hook
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
  //this returns a habit tracker page that a user can enter in new habits and mark them off daily as completed
  return (
    <div className={book.colorScheme} style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
      {/* Material-UI Box component serves as a wrapper component for most of the CSS utility needs. */}
      <Box>
        {/* custom component that displays a title nicely */}
        <TitleItem title="Your Daily Habits" description={dateString}/>
        {/* Material-UI Breadcrumb component allow users to make selections from a range of values. */}
        <Breadcrumbs aria-label="breadcrumb">
          {/* Material-UI Link component allows you to easily customize anchor elements with your theme colors and typography styles. */}
          <Link color="inherit" href="/dashboard" className={classes.link}>
            {/* Material-UI Icon Component */}
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
          {/* Material-UI Typography component is used to present your design and content as clearly and efficiently as possible. */}
          <Typography color="textPrimary" className={classes.link}>
            <TrackChangesIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>Habit Tracker</span>
          </Typography>
        </Breadcrumbs>
        <Typography color="textPrimary" className={classes.heading}>
        </Typography>
        {/* Material UI List component are continuous, vertical indexes of text or images. */}
        <List className={classes.root}>
          <h2>Which habits have you completed today?</h2>
          { habits  ? habits.map((value) => {
            const labelId = `checkbox-list-label-${value.name}`;
            //this returns a list of habits and the option to add more habits
            return (
              // Material UI ListItem component is a wrapper for items contained in a list
              <ListItem
                key={value._id}
                dense
                button
                onClick={handleToggle(value)}
                style={{backgroundColor:"rgba(255, 255, 255, 0.75)"}}
              >
                {/* Material UI ListItemIcon component is used as wrapper for an icon used within a list  */}
                <ListItemIcon>
                  {/* Material UI checkbox component allow the user to select one or more items from a set.*/}
                  <Checkbox
                    edge="start"
                    checked={completedToday.indexOf(value._id) !==  -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
                {/* Material UI ListItemSecondaryAction allows a secondary action within a list item  */}
                <ListItemSecondaryAction>
                {/* Material UI IconButton component is clickable icon wrapper */}
                <IconButton edge="end" aria-label="delete item">
                  <DeleteModal id={value._id} name={value.name} type="habit"/>
                </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
          :
            <p>Add a habit to get started</p>   
          }
        </List>
        {/* custom component that returns a form to add new habits */}
        <NewItemForm
          formDataShown={formData.newItem}
          handleInputChange={handleInputChange}
          addItem={addHabit}
          type="habit"
        />
        <h2>See your progress:</h2>
        {/* custom component that returns an option to change the number of days tracked on the habit tracker */}
        <DaysMenu style={{display:"inline"}} handleChange={handleDaysChange} resultsDays={resultsDays}/>
        {/* The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts. */}
        <Grid container>
          { habits  ? habits.map( (value)=> {
            // custom component that returns a chart js doughnut chart
              return (<HabitDoughnut key={value._id} date={dateNeededString} days={resultsDays} {...value}/>);
            })
            :
              <p>Add a habit to get started</p>   
          }
        </Grid>
      </Box>
    </div>
  );
}
//exports Habits page
export default Habits;
