import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import Jumbotron from "../components/Jumbotron";
import BookButton from "../components/BookButton";
import API from "../utils/API";




function Dashboard() {

  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  }


  return (
    <div> 
        <Box>
            <Jumbotron />
            <Grid container >
                <BookButton title="Create a new book!" description="Click here to start a new journal" link="/create-book" colorScheme="yellow"/>
                {books.map(item => <BookButton key={item._id} link={`/books/${item._id}`} {...item}/> )}
                                    
            </Grid>
       
        </Box>
             
    </div>
  );
}

export default Dashboard;
