const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

UserSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
};

module.exports = mongoose.model("Users", UserSchema);
