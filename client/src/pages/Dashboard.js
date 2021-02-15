import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import Jumbotron from "../components/Jumbotron";
import BookButton from "../components/BookButton";
import { useAuth } from "../contexts/AuthContext";
import API from "../utils/API";

function Dashboard() {
  // Gets current user data
  // Set state based off user id form mongo db
  const [user, setUser] = useState({});
  const [usersBooks, setUsersBooks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    getUser();
    getAllBooks();
  }, []);

  const getAllBooks = () => {
    //  for the currentUser.uid

    API.getBooksWhere(currentUser.uid)
      .then((res) => {
        setUsersBooks(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    API.getUser(currentUser.uid).then((res) => {
      setUser(res.data);
      console.log(res);
    });
  };

  return (
    <div>
      <Box>
        <Jumbotron userName={user.firstName} />
        <Grid container>
          <BookButton
            title="Create a new book!"
            description="Click here to start a new journal"
            link="/create-book"
            colorScheme="yellow"
          />
          {usersBooks.map((item) => (
            <BookButton key={item._id} link={`/books/${item._id}`} {...item} />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
