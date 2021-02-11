import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import Jumbotron from "../components/Jumbotron";
import BookButton from "../components/BookButton";
import FakeBooks from "../utils/fakeBooks";
import { useAuth } from "../contexts/AuthContext";
import API from "../utils/API";

function Dashboard() {
  // Gets current user data
  const { currentUser } = useAuth();
  // Set state based off user id form mongo db
  const [usersBooks, setUsersBooks] = useState([]);

  // testing user id
  console.log(currentUser.uid);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
    //  for the currentUser.uid
    API.getBooks(currentUser.uid)
      .then((res) => {
        // FakeBooks;
        setUsersBooks(FakeBooks);
        console.log(res);
        // setUsersBooks(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* {JSON.stringify(currentUser)} */}
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
            <BookButton key={item.id} link={`/books/${item.id}`} {...item} />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
