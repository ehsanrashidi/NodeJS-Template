const bcrypt = require("bcrypt");

module.exports = {
    // Generate a hash of the password
    hash: (input, cb) => bcrypt.hash(input, 10, (err, hash) => cb({ err: err, hash: hash })),

    // Compare a password with a hash
    compare: (input, hash) =>
        new Promise((resolve, reject) => bcrypt.compare(input, hash, (err, isMatch) => (err ? reject(err) : resolve(isMatch)))),
};
