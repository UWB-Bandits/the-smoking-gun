mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/theSmokingGunDB"
  );

const listSeed = [
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
  ];

  
db.List
.remove({})
.then(() => db.List.collection.insertMany(listSeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});