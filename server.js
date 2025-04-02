const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views')); // Đặt thư mục chứa các file EJS

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root route to login page
app.get('/', (req, res) => {
    res.redirect('/index');
});

// Route for the login page
app.get('/index', (req, res) => {
    res.render('index'); // Render file login.ejs
});

// Route to handle login form submission
app.post('/index', (req, res) => {
    const { username, password } = req.body;

    // Example: Check username and password (replace with your own logic)
    if (username === 'admin' && password === '1') {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid username or password' });
    }
});

// Route for the home page (after successful login)
app.get('/home', (req, res) => {
    res.render('index'); // Render file index.ejs
});
// Route to handle logout
app.get('/logout', (req, res) => {
    // Perform logout actions (e.g., clear session or token)
    // Redirect to the login page
    res.redirect('/login');
});

app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

require('dotenv').config();