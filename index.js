const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function() {
    console.log('Connected to MongoDB');
}).on('error', function(error){
    console.log('Connection error:', error);
});

// Middleware

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

// app.get('/', (req, res) => {
//     res.send('Welcome to homepage');
//     });
// app.get('/users', (req, res) => {
//     res.send('Welcome to users page');
//     });

app.listen(4400, () => {
  console.log('Server is running on port 4400');
});