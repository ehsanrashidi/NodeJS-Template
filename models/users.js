const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String},
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

UserSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.isValidPassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
};

module.exports = mongoose.model('Users', UserSchema);