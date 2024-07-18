const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();

mongoose.connect('mongodb://localhost:27017/registrationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({
        name,
        email,
        password,
    });

    newUser.save((err) => {
        if (err) {
            res.status(500).send('Error registering new user.');
        } else {
            res.send('Registration successful!');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
