// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 2020;
const server = app.listen(port, listening);
function listening() {
    console.log('Server is running');
    console.log(`Running on localhost: ${port}`);
}

/* GET Routes */
app.get('/all', getProjectData);

function getProjectData(req, res) {
    console.log('GET request is ongoing. Sending project data.');
    res.send(projectData);
}

/* POST Routes */
// For adding temperature, date and user response to projectData
app.post('/', postProjectData);

function postProjectData(req, res) {
    console.log('Post request is ongoing. Adding new information to project data.' + req.body);
    if(req.body) {
        projectData.temperature = req.body.temperature;
        projectData.date = req.body.date;
        projectData.userResponse = req.body.userResponse;
        // projectData.city = req.body.city;
    }
    res.send(projectData);
    console.log(
        `The temperature is: ${projectData.temperature}, 
         The date is: ${projectData.date}, 
         The user response is: ${projectData.user_response}, city: ${projectData.city}`);
}