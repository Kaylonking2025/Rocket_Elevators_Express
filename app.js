
//used for setting up an Express application app.js
const express = require('express');

//imports the variables from a .env file into your app.js
const env = require("dotenv")

// Imports the agents data
const agents = require('./agent.js');

// Imports the body-parser middleware
const bodyParser = require('body-parser');

// Import the calculations module
const { calculateElevators,calculateCost, costs, } = require('./elevatorCalculations.js'); 

// Load environment variables from .env file
env.config();

// sets up the Express application
const app = express();

// enables the Express application to handle JSON request
app.use(express.json());

//
app.use(bodyParser.json());

//  sets up a specific port for the server
const port = process.env.port;   

// Default to 'development'
const environment = process.env.environment; 



// sets up a endpoint in the application to handle GET requests
app.get('/hello', (req,res) => {

  // making it easier to track the server's activity
  console.log(`We are using port: ${port}`)

  // sends the specified text back to the client as a response.
  res.send("Hello World")

});

//sets up a endpoint in the application to handle GET requests
app.get('/status', (req,res) => {

  //making it easier to track the server's activity
  console.log(`We are using port: ${port}`)

  //Create a status route
  res.send(`Server is running on port ${port} in ${environment} mode.`,)
});

//requests an error endpoint.
app.get('/error', (req,res) => {

  //sends a response back to the client with a status code
  res.status(404).json({
    code: 500,
    message: "Internal Server Error: Not Found"
  });

});

// Create an email list route
app.get('/email-list', (req, res) => {

  // Create comma-delimited email list
  const emailList = agents.map(agent => agent.email).join(', '); 

  //sends a response back to the client 
  res.json({ emails: emailList });
});


//creates a region average route
app.get('/region-avg', (req,res) => {

  //gets the region from query parameters
  const region = req.query.region; 

  // checks if the region variable has a value
  if (!region) {
    return res.status(500).json({ message: "No Agents Were Found." });
  }
  // filters the list of agents based on the specified region.
  const filteredAgents = agents.filter(agent => agent.region.toLowerCase() === region.toLowerCase());

  //checks for any agents from the specified a region.
  if (filteredAgents.length === 0) {
    return res.json({ message: `No agents found in the supplied region: ${region}.` });
  }

  //calculates the total rating of all agents within filter agents
  const totalRating = filteredAgents.reduce((sum, agent) => sum + agent.rating, 0);

  //calculates the total fee for all agents
  const totalFee = filteredAgents.reduce((sum, agent) => sum + agent.fee, 0);

    //calculates the total fee for all agents in the specified region.
  const averageRating = ((totalRating / filteredAgents.length).toFixed(2));

    //calculates the average fee of the agents in the specified region
  const averageFee = ((totalFee / filteredAgents.length).toFixed(2));

  //sends the final response back to the client
  res.json({
    region: region,

     // Convert to float for proper JSON
    averageRating: parseFloat(averageRating),

     // Convert to float for proper JSON
    averageFee: parseFloat(averageFee),
  });
});

//
// Endpoint for calculating elevators and costs
app.get('/calc-residential', (req, res) => {
  const { apartments, floors, tier } = req.body;

  // Validate input
  const validTiers = ['standard', 'premium', 'excelium'];
  
  // checks if the tier value provided in the request is one of the predefined valid tiers
  if (!validTiers.includes(tier)) {
      return res.status(500).json({ message: "Invalid tier. Must be 'standard', 'premium', or 'excelium'." });
  }

  // Convert to numbers
  const apartmentsNum = Number(apartments);
  const floorsNum = Number(floors);

  //Checks if the apartments input is a number, if the apartments value is an integer,
  //is greater than zero 
  if (typeof apartmentsNum !== 'number' || !Number.isInteger(apartmentsNum) || apartmentsNum <= 0) {

    //It resonds with a error code & returns with an error message 
    //stating that the number must be a positive integer
      return res.status(500).json({ message: "Apartments must be a positive integer." });
  }


  //Checks if the floors input is a number & if the floors value is an integer
  //& if the number of floors is greater than zero & also 
  if (typeof floorsNum !== 'number' || !Number.isInteger(floorsNum) || floorsNum <= 0) {

    //It resonds with a error code & returns with an error message 
    //stating that the number must be a positive integer
      return res.status(500).json({ message: "Floors must be a positive integer." });
  }

  // Calculate elevators
  const result = calculateCost(apartmentsNum, floorsNum, tier);
  
  //is a convenient method in js for sending responses to the client
  res.json(result);
});

//// Endpoint for contact us 
app.get('/contact-us', (req, res) => {
  // Extract data from the request body
  const { first_name, last_name, message } = req.body;

  // Log the entire request
  console.log('Received message:', req.body);

  // Validate input
  if (!first_name || !last_name || !message) {
      return res.status(400).json({
          error: 'All fields (first_name, last_name, message) are required.'
      });
  }

  // Create a response message
  const responseMessage = `Thank you, ${first_name} ${last_name}, for your message!`;

  // Send the response back to the client
  res.status(200).json({
      message: responseMessage
  });
});


// starts the server on the specified port and allows me to 
//add aditional code once the server is running
app.listen(port, () => {

  //prints a message on the console indicating that the 
  //server is actively listening on the specified port.
  console.log(` server listening on port ${port} `)
})
