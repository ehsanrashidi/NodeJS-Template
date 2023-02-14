const { users, messages } = require("../models");
const cryptography = require("./cryptography");

module.exports = {
    getById: async (userId) => await users.findOne({ _id: userId }),
    save: (user) =>
        new Promise((resolve, reject) => {
            cryptography.hash(user.password, (result) => {
                if (!result.err) {
                    user.password = result.hash;
                    new users(user).save((err, res) => {
                        if (err && err.code === 11000) reject(messages.DuplicateKeyError);
                        else if (err) reject(err);
                        else resolve(res);
                    });
                }
            });
        }),
    checkUserName: (username) =>
        new Promise((resolve, reject) =>
            users.findOne({ userName: username }, (err, user) => {
                if (err) reject(err);
                else if (user) resolve(true);
                else resolve(false);
            })
        ),
};
