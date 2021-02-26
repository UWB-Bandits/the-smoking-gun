import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";


export default function Screenshot(props) {
    Screenshot.propTypes = {
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
    };

    const {image, title, description}= props;
  return (
    <Grid style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}} item xs={12} md={6} lg={4}>
        <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
                <img  style={{width:"100%", marginTop:"20px"}} src={image} alt={`screenshot of ${title}`} />
            </Grid>
            <Grid  item xs={6} md={8}>
                <h2>{title}</h2>
                <p >{description}</p>
            </Grid>
        </Grid>
    </Grid>
  );
}
