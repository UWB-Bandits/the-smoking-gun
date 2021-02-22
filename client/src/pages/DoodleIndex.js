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
  const [doodles, setDoodles] = useState([]);
  const [bookTitle, setBookTitle] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    API.getBook(id).then((res) => {
      setBookTitle(res.data.title);
    });
    loadDoodles();
  }, []);

  const deleteDoodle = (e) => {
    const doodle_id = e.target.id; // ? e.target.id : e.target.parentNode.id;
    console.log(doodle_id);
    API.deleteDoodle(doodle_id)
      .then((res) => {
        console.log(res.data);
        // setDoodles(res.data);
        loadDoodles();
        // doodles = res.data;
      })
      .catch((err) => console.log(err));
    // console.log(e.target.id);
  };
  const loadDoodles = () => {
    API.getDoodles(id)
      .then((res) => {
        setDoodles(res.data);
        const listOfDoodles_id = res.data.map((item) => item._id);
        API.updateBook(id, { doodles: listOfDoodles_id });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/dashboard" className={classes.link}>
          <HomeIcon
            style={{ verticalAlign: "middle" }}
            className={classes.icon}
          />
          <span style={{ fontSize: "12px", marginLeft: "2px" }}>Dashboard</span>
        </Link>
        <Link color="inherit" href={"/books/" + id} className={classes.link}>
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
        <h2>
          <a href={"/doodle/" + id}>Make a New Doodle?</a>
        </h2>
      </div>
      {/* _______________________________Previous Doodles_____________________________ */}

      <DoodleSlider deleteDoodle={deleteDoodle} doodles={doodles} />
      {/* _______________________________Make a Doodle_____________________________ */}
    </div>
  );
};

export default DoodleIndex;
