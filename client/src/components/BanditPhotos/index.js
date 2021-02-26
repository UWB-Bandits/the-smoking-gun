import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";


export default function BanditPhotos(props) {
    BanditPhotos.propTypes = {
        name: PropTypes.string,
        image: PropTypes.string,
        link: PropTypes.string
    };

    const {image, name, link}= props;
  return (
    <Grid item xs={6} md={3}>
        <Avatar style={{width:"150px", height:"150px", display:"block", marginTop:"10px", marginLeft:"auto", marginRight:"auto"}} src={image} alt={name} />
        <a href={link} target="_blank" rel="noreferrer" style={{textAlign:"center"}}><p >{name}</p></a>
    </Grid>
  );
}
