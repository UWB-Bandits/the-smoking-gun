import React from "react";
import { Box, Grid } from "@material-ui/core";
import Jumbotron from "../components/Jumbotron";
import BookButton from "../components/BookButton";
import FakeBooks from "../utils/fakeBooks";

function Dashboard() {

  return (
    <div> 
        <Box>
            <Jumbotron>
            </Jumbotron>
            <Grid container >
                <BookButton title="Create a new book!" description="Click here to start a new journal" link="/create-book" colorScheme="yellow"/>
                {FakeBooks.map(item => <BookButton key={item.id} link={`/books/${item.id}`} {...item}/> )}
                                    
            </Grid>
       
        </Box>
             
    </div>
  );
}

export default Dashboard;
