const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define the schema and model
const RunningTimeSchema = new mongoose.Schema({
    date: { type: String, required: true },
    runner: { type: String, required: true },
    runningTime: { type: Number, required: true },
    lengthOfRun: { type: Number, required: true },
});

const RunningTime = mongoose.model('RunningTime', RunningTimeSchema);

// API endpoint to save running times
app.post('/api/running-times', (req, res) => {
    const newRunningTime = new RunningTime(req.body);
    newRunningTime.save()
        .then(() => res.json('Running time saved!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// API endpoint to fetch running times
app.get('/api/running-times', (req, res) => {
    RunningTime.find()
        .then(times => res.json(times))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
