const fakeLists = [
    {
    title: "Places to Visit",
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
      title: "Places to Eat",
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
        title: "Groceries",
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
          title: "Gratitude",
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

export default fakeLists;