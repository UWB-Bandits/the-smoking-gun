import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import Jumbotron from "../components/Jumbotron";
import BookButton from "../components/BookButton";
// import FakeBooks from "../utils/fakeBooks";
import { useAuth } from "../contexts/AuthContext";
import API from "../utils/API";

function Dashboard() {
  // Gets current user data
  // Set state based off user id form mongo db
  const [usersBooks, setUsersBooks] = useState([]);
  const { currentUser } = useAuth();
  // testing user id
  console.log(currentUser.uid);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
      //  for the currentUser.uid

    API.getBooksWhere({user: currentUser.uid})
      .then((res) => {
        // FakeBooks;
        setUsersBooks(res.data);
        console.log(res);
        // setUsersBooks(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Box>
        <Jumbotron />
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
