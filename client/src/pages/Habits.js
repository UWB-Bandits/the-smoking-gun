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
  Grid
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
import HabitDoughnut from "../components/HabitDoughnut";
import DaysMenu from "../components/DaysMenu";
import DeleteModal from "../components/DeleteModal";

function Habits() {
  const [formData, setFormData] = useState({ newItem: "" });
  const [habits, setHabits] = useState([]);
  const [book, setBook] = useState({});
  const [completedToday, setCompletedToday] = useState([]);
  const [resultsDays, setResultsDays] = useState(7);

  const {bookId, habitId} = useParams();

  let date = new Date();
  let dateString = date.toDateString();
  let dateNeeded = date.setDate(date.getDate() - resultsDays);
  let dateNeededString = new Date(dateNeeded).toDateString();

  useEffect(() => {
    loadBook();
    loadHabits();
  }, []);

  const loadBook = async () => {
    const bookResponse = await API.getBook(bookId);
    setBook(bookResponse.data);
  };

  const loadHabits = () =>{
    API.getBook(habitId)
    .then(res => setBook(res.data));
    
    let todaysTracking = [];
    
    function findCompleted(dbHabits){
      dbHabits.forEach(habit =>{
        let tracking = habit.tracking;
        let tracked = tracking.filter(item => item.day === dateString);
        if (tracked.length > 0) {
          todaysTracking.push(habit._id);
        } 
      });
    }

    API.getHabits(habitId)
      .then(res => {
        let dbHabits = res.data;
        setHabits(dbHabits);
        findCompleted(dbHabits);
        setCompletedToday(todaysTracking);
      })
      .catch(err => console.log(err));
  };

  const handleDaysChange = (event) => {
    setResultsDays(event.target.value);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newItem: value });
  };

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
    <div className={book.colorScheme} style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
      <Box>
        <TitleItem title="Your Daily Habits" description={dateString}/>
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
        <Typography color="textPrimary" className={classes.heading}>
            
        </Typography>
        <List className={classes.root}>
          <h2>Which habits have you completed today?</h2>
          { habits  ? habits.map((value) => {
            const labelId = `checkbox-list-label-${value.name}`;

            return (
              <ListItem
                key={value._id}
                dense
                button
                onClick={handleToggle(value)}
                style={{backgroundColor:"rgba(255, 255, 255, 0.75)"}}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={completedToday.indexOf(value._id) !==  -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
                <ListItemSecondaryAction>
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
        <NewItemForm
          formDataShown={formData.newItem}
          handleInputChange={handleInputChange}
          addItem={addHabit}
          type="habit"
        />
        <h2>See your progress:</h2>
        <DaysMenu style={{display:"inline"}} handleChange={handleDaysChange} resultsDays={resultsDays}/>
         
        <Grid container>
          { habits  ? habits.map( (value)=> {
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

export default Habits;
