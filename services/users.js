const { signToken } = require("../authentication");
const { users, messages } = require("../models");

module.exports = {
    getById: (userId) =>
        new Promise((resolve, reject) =>
            users.findOne({ _id: userId }, (err, res) => {
                if (err) return reject(err);
                else return resolve(res);
            })
        ),
    save: (user) =>
        new Promise((resolve, reject) => {
            new users(user).save((err, res) => {
                if (err && err.code === 11000) reject(messages.DuplicateKeyError);
                else if (err) reject(err);
                else resolve(res);
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
    login: (data) =>
        new Promise((resolve, reject) => {
            // Find user document with matching username
            users.findOne({ userName: data.userName }, async (err, user) => {
                if (err) reject(err);
                if (!user) reject(false); // User not found

                // Compare hashed password with provided password
                user.isValidPassword(data.password)
                    .then((isMatch) => resolve({ status: isMatch, token: isMatch ? signToken({ userId: user._id }) : null }))
                    .catch(reject);
            });
        }),
};
