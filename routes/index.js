const home = require("./home");
const users = require("./users");
module.exports = {
    init: (app) => {
        app.use("/", home);
        app.use("/users", users);
    },
};
