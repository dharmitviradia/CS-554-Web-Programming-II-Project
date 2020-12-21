const express = require('express');
const app = express();
const configRoutes = require('./routes');
const PORT = process.env.PORT || 4040


let noOfRequest = 0;
let url_count = {};

var cors = require('cors')

app.use(cors())

app.use((req, res, next) => {
  noOfRequest++;
  console.log(`This is request number: ${noOfRequest}`);
  next();
})

app.use((req, res, next) => {
  console.log(`The requested body is: ${JSON.stringify(req.body)}`)
  console.log(`The requested url is: ${req.url}`)
  console.log(`The requested http method is: ${req.method}`)
  next();
})

app.use((req, res, next) => {
  if (url_count[req.originalUrl]) {
    url_count[req.originalUrl] = url_count[req.originalUrl] + 1;
  }
  else {
    url_count[req.originalUrl] = 1;
  }

  console.log(`Total number of requests made to URL: ${req.originalUrl} is: ${url_count[req.originalUrl]}`);
  next();
})

app.use(express.json());
configRoutes(app);


app.listen(PORT, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:4040');
});
