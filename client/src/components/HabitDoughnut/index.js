import React from "react";
import {Doughnut} from "react-chartjs-2";
import PropTypes from "prop-types";
import {Grid} from "@material-ui/core/";





export default function HabitDoughnut(props) {

    const {date, tracking, days} = props;
    let parsedDate = Date.parse(date);

    let completed = tracking.filter(entry => {
        let trackingDate = Date.parse(entry.day);
        if (trackingDate>parsedDate)
            return entry;
        });
    let incomplete = days-completed.length;


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

    

    HabitDoughnut.propTypes = {
        name: PropTypes.string,
        tracking: PropTypes.array,
        date: PropTypes.string,
        days: PropTypes.number,
    };


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