import React, { useEffect, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TitleItem from "../components/TitleItem";
import { makeStyles } from "@material-ui/core/styles";
import NewListForm from "../components/NewItemForm";
import API from "../utils/API";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

function IndexPage() {
  const [formData, setFormData] = useState({ newList: "" });
  const [book, setBook] = useState({});
  const [lists, setLists] = useState([]);
  
  console.log(formData);
 
  const {id} = useParams();

  useEffect(() => {
    API.getBook(id)
      .then(res => {
        console.log(res);
      
        setBook(res.data);
        setLists(res.data.lists);
      })
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newList: value });
  };

  const addList = () => {
    API.saveList({
      name: formData.newList,
      items: [],
      book: book._id
    }).then(res => {
      let newBookLists = lists.map(list => list._id);
      newBookLists.push(res.data._id);
      API.updateBook(id, {
        ...book,
        lists: newBookLists
      }).then(res => console.log(res))
      .catch(err => console.log(err));
      window.location.href = "/lists/" + res.data._id;
    })
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
    <div>
      <Box>
        <TitleItem {...book} />
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/dashboard" className={classes.link}>
            <HomeIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>Dashboard</span>
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            <ImportContactsIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>{book.title}</span>
          </Typography>
        </Breadcrumbs>
        <Accordion>
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
              {lists ? lists.map((item) => (
                <li key={item._id}>
                  <a href={`/lists/${item._id}`}>{item.name}</a>
                </li>
              ))
              :
              <li>Add a new list to get started</li>
            }
              <NewListForm
                handleInputChange={handleInputChange}
                addItem={addList}
                type="list"
              />
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
            <Typography className={classes.heading}>
              Calendars (Feature coming soon!)
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              Habits (Feature coming soon!)
            </Typography>
          </AccordionSummary>
        </Accordion>
      </Box>
    </div>
  );
}

export default IndexPage;
