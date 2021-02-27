//import react
import React from "react";
//import components
import Grid from "@material-ui/core/Grid";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";

//exports the Screenshot component
export default function Screenshot(props) {
    //sets up prop types for the BanditPhotos component
    Screenshot.propTypes = {
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
    };
    //deconstructs props
    const {image, title, description}= props;
  return (
      //Material-UI's Grid component sets up a responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.
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
