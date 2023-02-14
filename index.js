require("dotenv").config();
const port = process.env.APP_PORT;
const express = require("express");
const cookieParser = require("cookie-parser");
const { DbConnect } = require("./data-base/db");
const middleware = require("./middleware");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//initialize all middlewares
middleware.init(app);

//initialize all routes
routes.init(app);

DbConnect(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
