const FakeBooks = [
    {
        id: 1,
        title: "2021",
        description: "My current bullet journal",
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
        id: 2,
        title: "2020",
        description: "Journal for the worst year ever",
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
        id: 3,
        title: "Family",
        description: "Lists and activities for the family"
    }
];

export default FakeBooks;

