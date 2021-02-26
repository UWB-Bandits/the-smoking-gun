import React, { useEffect, useState } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { useParams } from "react-router-dom";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import API from "../utils/API";
import DoodleSlider from "../components/DoodleSlider/DoodleSlider";
import { useAuth } from "../contexts/AuthContext";
import TitleItem from "../components/TitleItem";
import { Button } from "@material-ui/core";

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

const DoodleIndex = () => {
  const { currentUser } = useAuth();
  const [doodles, setDoodles] = useState([]);
  const [bookTitle, setBookTitle] = useState([]);
  const [colorScheme, setColorScheme] = useState("");
  const { bookId } = useParams();

  useEffect(() => {
    API.getBook(bookId, currentUser.uid).then((res) => {
      console.log(res.data.colorScheme);
      setColorScheme(res.data.colorScheme);
      setBookTitle(res.data.title);
    });
    loadDoodles();
  }, []);

  const deleteDoodle = (e) => {
    const doodle_id = e.target.id;
    API.deleteDoodle(doodle_id)
      .then(() => {
        loadDoodles();
      })
      .catch((err) => console.log(err));
  };
  const loadDoodles = () => {
    API.getDoodles(bookId)
      .then((res) => {
        setDoodles(res.data);
        const listOfDoodles_id = res.data.map((item) => item._id);
        API.updateBook(bookId, { doodles: listOfDoodles_id });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={colorScheme}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
    >
      <TitleItem title="View or Make doodles" />
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/dashboard" className={classes.link}>
          <HomeIcon
            style={{ verticalAlign: "middle" }}
            className={classes.icon}
          />
          <span style={{ fontSize: "12px", marginLeft: "2px" }}>Dashboard</span>
        </Link>
        <Link
          color="inherit"
          href={"/books/" + bookId}
          className={classes.link}
        >
          <ImportContactsIcon
            style={{ verticalAlign: "middle" }}
            className={classes.icon}
          />
          <span style={{ fontSize: "12px", marginLeft: "2px" }}>
            {bookTitle}
          </span>
        </Link>
        <Typography color="textPrimary" className={classes.link}>
          <DateRangeIcon
            style={{ verticalAlign: "middle" }}
            className={classes.icon}
          />
          <span style={{ fontSize: "12px", marginLeft: "2px" }}>
            Doodle Index
          </span>
        </Typography>
      </Breadcrumbs>
      <div style={{ margin: "2rem 0", textAlign: "center" }}>
        <Button className={`${colorScheme} styled-button`}>
          {/* <h2> */}
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1.3rem",
            }}
            href={`/books/${bookId}/newDoodle`}
          >
            Make a New Doodle?
          </Link>
          {/* </h2> */}
        </Button>
      </div>
      {/* _______________________________Previous Doodles_____________________________ */}
      <DoodleSlider
        colorScheme={colorScheme}
        deleteDoodle={deleteDoodle}
        doodles={doodles}
      />
    </div>
  );
};

export default DoodleIndex;
