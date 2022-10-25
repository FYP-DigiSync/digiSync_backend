// KBMS API version 0.0.0.1 release
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const errorHandler= require('./Utils/errorHandler');
const errorMiddleware= require('./Middleware/errorMiddleware')

// route implemented imports
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post"); 


// General ApI information
const api_name = "digsync";
const api_version = "0.1";

// Configure for environment Variable
dotenv.config();

// Intializing express App
const app = express();

// Only parse requests of content-type :Application/json
app.use(express.json());

// Enable cors for all requests by using cors middleware
app.use(cors());
app.options("*", cors());



// API Application Routes
app.use(`/${api_name}/api/v${api_version}/user`, userRoute);
app.use(`/${api_name}/api/v${api_version}/post`, postRoute);

// make upload folder static
app.use(`/${api_name}/api/v${api_version}/Uploads`, express.static('Uploads'));


// Generic API Information Endpoint
app.use('/info', (req, res, next) => {
  res.status(200).json({
      "Name": api_name,
      "Version": `v${api_version}`
  });
});

// 404 Error on the API
app.all("*", (req, res, next) => {
  return next(new errorHandler(404, "Routes Not found"));
});

app.use(errorMiddleware);

const port= process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;


// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  app.listen(port, () => {
      console.log(`Server listening at port ${port}`)
  })
}).catch((err) => {
  console.log(err.message + "000")
})