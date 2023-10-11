const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')

const issueRoutes = require('./routes/issue'); 
const userRoutes = require('./routes/user');

// MongoDB connection
mongoose.connect(
    'mongodb+srv://st10082116:celento@cluster0.abeuymk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('NOT connected :-(', error));

app.use(express.json());

// Handling CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Issues route
app.use(urlprefix + '/issues', issueRoutes); 

// Users route
app.use(urlprefix + '/users', userRoutes);

module.exports = app;
