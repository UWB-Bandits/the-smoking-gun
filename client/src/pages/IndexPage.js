import React, { useState, useEffect } from "react";
import { Box, Grid, Accordion, AccordionSummary, Typography, AccordionDetails, TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FakeBooks from "../utils/fakeBooks";
import TitleItem from "../components/TitleItem";
import { makeStyles } from "@material-ui/core/styles";
import NewListForm from "../components/NewItemForm";

function IndexPage() {
  const [formData, setFormData] = useState({ newList: ""});

  //GET ID OFF OF ROUTE AND SET UP STATE FOR THE BOOK SHOWN -- UPDATE REFERENCES TO FakeBooks[0] 

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newList: value });
  };

  const addList = () =>{
    //HAVE NEWLIST POST TO DATABASE AND REDIRECT TO "/lists/:listid"
  };

  const classes = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginLeft: "10px",
      marginRight: "10px"
    },
    accordion: {
      width: "100%",
      marginLeft: "10px",
      marginRight: "10px"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

  return (
    <div> 
        <Box>
            <TitleItem {...FakeBooks[0]}/>

              <Accordion >
                <AccordionSummary 
                  className={classes.accordion}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Lists</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ul>
                      {FakeBooks[0].lists.map(item => <li key={item.name}><a href={`/lists/${item.id}`}>{item.name}</a></li>)}
                        <NewListForm handleInputChange={handleInputChange} addItem={addList} type="list"/>
                    </ul>
                </AccordionDetails>
              </Accordion>                            
              <Accordion disabled>
                <AccordionSummary
                  className={classes.accordion}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className={classes.heading}>Calendars (Feature coming soon!)</Typography>
                </AccordionSummary>
              </Accordion>
              <Accordion disabled>
                <AccordionSummary
                  className={classes.accordion}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className={classes.heading}>Habits (Feature coming soon!)</Typography>
                </AccordionSummary>
              </Accordion>
        </Box>
             
    </div>
  );
}

export default IndexPage;
