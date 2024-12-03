const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const tripRoutes = require('./routes/Trip');
const app = express();

// Kết nối MongoDB
mongoose 
  .connect("mongodb+srv://nguyenducmanh1809:manh1234@cluster0.1ya4y.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Cấu hình middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes

app.use('/trips', tripRoutes);

// Server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
