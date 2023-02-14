const mongoose = require("mongoose");
const DbConnection = process.env.DbConnection;
mongoose.set("strictQuery", true);
const connect = (cb) =>
    mongoose.connect(
        DbConnection,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            cb("connected");
        }
    );
module.exports = {
    DbConnect: connect,
};
