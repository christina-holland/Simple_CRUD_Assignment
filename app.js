//Importing the express module
const express = require('express');
//Creating an instance of express
const app = express();

//Importing middleware for handling JSON data
app.use(express.json());

//Initializing an empty array to store items 
const items = [];

//Setting up a POST route that adds a new item with a unique id to the array
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1, //Automatically assigns a unique ID to the new user
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

//Setting up a GET route to list all items in the array
app.get('/items', (req, res) => {
    res.status(200).json(items);
});

//Setting up a GET route to retrieve a single item by its id
app.get('/items/:id', (req, res) => {
    const item = items.find(item => item.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.status(200).json(item);
});

//Setting up a PUT route to modify an existing item based on its id, ensuring the request can handle partial updates
app.put('/items/:id', (req, res) => {
    const item = items.find(item => item.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found' );
    }
    //Update fields that are present in the request body
    item.name = req.body.name || item.name;
    //Update other fields as needed
    res.status(200).json(item);
});

//Setting up a DELETE route that removes an item from the array based on its id
app.delete('/items/:id', (req, res) => {
    items = items.filter(item => item.id !== parseInt(req.params.id));
    res.status(204).send();
});

//Configure the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
