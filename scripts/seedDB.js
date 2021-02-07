const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/theSmokingGunDB"
);

const bookSeed = [
  {
    title: "2020 Journal",
    colorScheme: "blue",
    date: new Date(Date.now()),
    lists: [
      {
      name: "Places to Visit",
      items: [{
          name: "Italy", 
          completed: false
        },
        {
          name: "Scotland", 
          completed: false
        },
        {
          name: "New Orleans", 
          completed: false
        },
        {
          name: "Boston", 
          completed: true
        },
        {
          name: "Belize",
          completed: false
        }],
      date: new Date(Date.now())
      },
      {
        name: "Places to Eat",
        items: [{
            name: "Archipelago", 
            completed: false
          },
          {
            name: "Canlis", 
            completed: false
          },
          {
            name: "Spinasse", 
            completed: false
          },
          {
            name: "Altura", 
            completed: true
          },
          {
            name: "JuneBaby",
            completed: false
          }],
        date: new Date(Date.now())
        },
        {
          name: "Groceries",
          items: [{
              name: "Milk", 
              completed: false
            },
            {
              name: "Eggs", 
              completed: false
            },
            {
              name: "Cheese", 
              completed: false
            },
            {
              name: "Meat", 
              completed: true
            },
            {
              name: "Fruit",
              completed: false
            }],
          date: new Date(Date.now())
          },
          {
            name: "Gratitude",
            items: [{
                name: "Family", 
                completed: false
              },
              {
                name: "Friends", 
                completed: false
              },
              {
                name: "Fresh Sheets", 
                completed: false
              },
              {
                name: "Warm weather", 
                completed: true
              },
              {
                name: "Internet",
                completed: false
              }],
            date: new Date(Date.now())
          }
    ]
  },
  {
    title: "2021 Journal",
    colorScheme: "red",
    date: new Date(Date.now()),
    lists: [
      {
      name: "Places to Visit",
      items: [{
          name: "Italy", 
          completed: false
        },
        {
          name: "Scotland", 
          completed: false
        },
        {
          name: "New Orleans", 
          completed: false
        },
        {
          name: "Boston", 
          completed: true
        },
        {
          name: "Belize",
          completed: false
        }],
      date: new Date(Date.now())
      },
      {
        name: "Places to Eat",
        items: [{
            name: "Archipelago", 
            completed: false
          },
          {
            name: "Canlis", 
            completed: false
          },
          {
            name: "Spinasse", 
            completed: false
          },
          {
            name: "Altura", 
            completed: true
          },
          {
            name: "JuneBaby",
            completed: false
          }],
        date: new Date(Date.now())
        },
        {
          name: "Groceries",
          items: [{
              name: "Milk", 
              completed: false
            },
            {
              name: "Eggs", 
              completed: false
            },
            {
              name: "Cheese", 
              completed: false
            },
            {
              name: "Meat", 
              completed: true
            },
            {
              name: "Fruit",
              completed: false
            }],
          date: new Date(Date.now())
          },
          {
            name: "Gratitude",
            items: [{
                name: "Family", 
                completed: false
              },
              {
                name: "Friends", 
                completed: false
              },
              {
                name: "Fresh Sheets", 
                completed: false
              },
              {
                name: "Warm weather", 
                completed: true
              },
              {
                name: "Internet",
                completed: false
              }],
            date: new Date(Date.now())
          }
    ]
  },
  {
    title: "Gratitude Journal",
    colorScheme: "green",
    date: new Date(Date.now()),
    lists: [
      {
      name: "Places to Visit",
      items: [{
          name: "Italy", 
          completed: false
        },
        {
          name: "Scotland", 
          completed: false
        },
        {
          name: "New Orleans", 
          completed: false
        },
        {
          name: "Boston", 
          completed: true
        },
        {
          name: "Belize",
          completed: false
        }],
      date: new Date(Date.now())
      },
      {
        name: "Places to Eat",
        items: [{
            name: "Archipelago", 
            completed: false
          },
          {
            name: "Canlis", 
            completed: false
          },
          {
            name: "Spinasse", 
            completed: false
          },
          {
            name: "Altura", 
            completed: true
          },
          {
            name: "JuneBaby",
            completed: false
          }],
        date: new Date(Date.now())
        },
        {
          name: "Groceries",
          items: [{
              name: "Milk", 
              completed: false
            },
            {
              name: "Eggs", 
              completed: false
            },
            {
              name: "Cheese", 
              completed: false
            },
            {
              name: "Meat", 
              completed: true
            },
            {
              name: "Fruit",
              completed: false
            }],
          date: new Date(Date.now())
          },
          {
            name: "Gratitude",
            items: [{
                name: "Family", 
                completed: false
              },
              {
                name: "Friends", 
                completed: false
              },
              {
                name: "Fresh Sheets", 
                completed: false
              },
              {
                name: "Warm weather", 
                completed: true
              },
              {
                name: "Internet",
                completed: false
              }],
            date: new Date(Date.now())
          }
    ]
  }
];

db.Book
  .remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
