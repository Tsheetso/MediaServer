const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Sample Data Arrays
let series = [
  {
    id: 1,
    title: "Stranger Things",
    genre: "Sci-Fi",
    seasons: 4
  },
  {
    id: 2,
    title: "Breaking Bad",
    genre: "Crime",
    seasons: 5
  }
];

let movies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan"
  }
];

let songss = [
  {
    id: 1,
    title: "2022",
    author: "Pleasure"
  }
];

// Generic function to handle routes
function setupCrudRoutes(path, dataArray) {
  // GET all items
  app.get(`/${path}`, (req, res) => {
    res.json(dataArray);
  });

  // POST - Add new item
  app.post(`/${path}`, (req, res) => {
    const newItem = req.body;
    newItem.id = dataArray.length ? dataArray[dataArray.length - 1].id + 1 : 1;
    dataArray.push(newItem);
    res.json(dataArray);
  });

  // PUT - Update an item
  app.put(`/${path}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const index = dataArray.findIndex(item => item.id === id);

    if (index !== -1) {
      dataArray[index] = { ...dataArray[index], ...req.body };
      res.json(dataArray);
    } else {
      res.status(404).json({ message: `${path} with id ${id} not found.` });
    }
  });

  // DELETE - Remove an item
  app.delete(`/${path}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    dataArray = dataArray.filter(item => item.id !== id);
    if (path === 'series') series = dataArray;
    if (path === 'movies') movies = dataArray;
    if (path === 'Songs') songss = dataArray;
    res.json(dataArray);
  });
}

// Set up routes
setupCrudRoutes('series', series);
setupCrudRoutes('movies', movies);
setupCrudRoutes('Songs', songss);

// Handle undefined routes (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
