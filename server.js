const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express_fileupload=require('express-fileupload')
const errorHandler= require('./Utils/errorHandler');
const errorMiddleware= require('./Middleware/errorMiddleware')

// route implemented imports
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post"); 
const metaRoute = require("./Routes/meta"); 
const templateRoute= require("./Routes/template");
const linkedinRoute= require("./Routes/linkedin");
const smsRoute= require('./Routes/sms');
const EmailRoute= require('./Routes/emailTeam');




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

app.use(express_fileupload())

// API Application Routes
app.use(`/${api_name}/api/v${api_version}/user`, userRoute);
app.use(`/${api_name}/api/v${api_version}/post`, postRoute);
app.use(`/${api_name}/api/v${api_version}/meta`, metaRoute);
app.use(`/${api_name}/api/v${api_version}/template`, templateRoute);
app.use(`/${api_name}/api/v${api_version}/linkedin`, linkedinRoute);
app.use(`/${api_name}/api/v${api_version}/sms`, smsRoute);
app.use(`/${api_name}/api/v${api_version}/email`, EmailRoute);






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

// Set strictQuery to false to allow for more flexible queries
mongoose.set("strictQuery", false);
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