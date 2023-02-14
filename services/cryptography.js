const bcrypt = require("bcrypt");

module.exports = {
    hash: (input, cb) => {
        // Generate a hash of the password
        bcrypt.hash(input, 10, (err, hash) => cb({ err: err, hash: hash }));
    },
    compare: (input, hash, cb) => {
        // Compare a password with a hash
        bcrypt.compare(input, hash, (err, result) => cb(err ? false : result));
    },
};
