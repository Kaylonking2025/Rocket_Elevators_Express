
//used for setting up an Express application app.js
const express = require('express')

// sets up the Express application
const app = express()

// enables the Express application to handle JSON request
app.use(express.json())

//  sets up a specific port for the server
const port = 3000


// sets up a endpoint in the application to handle GET requests
app.get('/hello', (req,res) => {

  // making it easier to track the server's activity
  console.log(`We are using port: ${port}`)

  // sends the specified text back to the client as a response.
  res.send("Hello World")

})


// starts the server on the specified port and allows me to 
//add aditional code once the server is running
app.listen(port, () => {

  //prints a message on the console indicating that the 
  //server is actively listening on the specified port.
  console.log(` server listening on port ${port} `)
})
