require('dotenv').config();
const port = process.env.APP_PORT;
const express = require('express');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

//initialize all middlewares
middleware.init(app);

//initialize all routes
routes.init(app);



app.listen(port, () => {
  console.log('Server listening on port 3000');
});