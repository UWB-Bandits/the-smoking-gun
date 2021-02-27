//import react
import React from "react";
//import components
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";


//exports the BanditPhotos component
export default function BanditPhotos(props) {
    //sets up prop types for the BanditPhotos component
    BanditPhotos.propTypes = {
        name: PropTypes.string,
        image: PropTypes.string,
        link: PropTypes.string
    };
    //deconstructs props
    const {image, name, link}= props;

  return (
    //Material-UI's Grid component sets up a responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.
    <Grid item xs={6} md={3}>
        {/*Material-UI's Avatar compnent returns a circular photo*/}
        <Avatar style={{width:"150px", height:"150px", display:"block", marginTop:"10px", marginLeft:"auto", marginRight:"auto"}} src={image} alt={name} />
        {/*Links to each developer's GitHub*/}
        <a href={link} target="_blank" rel="noreferrer" style={{textAlign:"center"}}><p >{name}</p></a>
    </Grid>
  );
}
