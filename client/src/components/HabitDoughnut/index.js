//import react
import React from "react";
//import Doughnut chart from chartjs
import {Doughnut} from "react-chartjs-2";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import Material-Ui component
import {Grid} from "@material-ui/core/";
//initialize and export HabitDoughnut component
export default function HabitDoughnut(props) {
    //deconstruct and initialize props 
    const {tracking, days} = props;
    //initialize a date variable and assigns a new Date
    let date = new Date();
    //the sets the date to how many days is set
    date.setDate(date.getDate() - days);
    //intialize a new variable to store a parsed date
    let parsedDate = date;
    //initialize a variable and assign a filtered tracking day array to find completed days
    let completed = tracking.filter(entry => {
        let trackingDate = Date.parse(entry.day);
        if (trackingDate.valueOf()>parsedDate.valueOf()){
            return entry;
        }
        });
    //initialize a variable to the amount of incompleted days
    let incomplete = days-completed.length;
    //initialize a variable object that stores the data that is passed into the doughnut chart
    const data = {
        labels: ["Incomplete", "Completed"],
        datasets: [
            {
            backgroundColor: [
                "#B21F00",
                "#2FDE00",
            ],
            hoverBackgroundColor: [
            "#501800",
            "#175000",
            ],
            data: [incomplete, completed.length]
            }
        ]
    };
    //sets up prop types for the HabitDoughnut component
    HabitDoughnut.propTypes = {
        name: PropTypes.string,
        tracking: PropTypes.array,
        date: PropTypes.string,
        days: PropTypes.number,
    };
    //this returns a Dougnut chart representing the habit complete and incomplete days
    return (
        <Grid style={{marginBottom:"20px"}} item xs={12} md={6}>
            <Doughnut 
                data={data}
                options={{
                    title:{
                    display:true,
                    text: props.name,
                    fontSize:20
                    },
                    legend:{
                    display:false,
                    }
                }}
            />
      </Grid>
    ); 
}