const express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/Person');


const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection 

mongoose.connect('mongodb://127.0.0.1/personDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(express.json());  // Parse JSON requests


// Validation middleware
function validateName(req, res, next) {
    const name = req.params.name;
    if (typeof name !== 'string'){
        return res.status(400).json({ error: "Name should be a string"});
    }
    next();
}


// CREATE
app.post('/api', async (req,res) => {
    try {
        const person = new Person(req.body);
        const savedPerson = await person.save();
        res.json(savedPerson);
    }   catch (error) {
        res.status(400).json({ error: error.message});
    }

});


// READ 
app.get('/api/:name', validateName, async (req, res) => {
    const name = req.params.name;
    try {
        const person = await Person.findOne({name});
        if (!person) {
            return res.status(404).json({ error: 'Person not found'});
        }
        res.json(person);
    }   catch (error)  {
        res.status(500).json({ error: error.message });
    }
    
});


// UPDATE
app.put('/api/:name', validateName, async (req, res) => {
    const name = req.params.name;
    try{
        const updatedPerson = await Person.findOneAndUpdate({name}, req.body, {
            new: true,
        });
        if (!updatedPerson) {
            return res.status(404).json({ error: 'Person not found'});
        }
        res.json(updatedPerson);
    }   catch (error) {
        res.status(500).json({ error: error.message});
    }
});

// DELETE 
app.delete('/api/:name', validateName,  async(req, res) => {
    const name = req.params.name;
    try {
        const deletedPerson = await Person.findOneAndRemove({name});
        if(!deletedPerson) {
            return res.status(404).json({ error: 'Person not found'});
        }
        res.json(deletedPerson);
    }   catch (error) {
        res.status(500).json({ error: error.message});
    }

});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});