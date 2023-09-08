const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
    email : String,
    password : String
});
const secret = process.env.SECRET;
// userSchema.plugin(encrypt, {secret:secret, encryptedFields:['password']});

const User = mongoose.model("User", userSchema);

module.exports = User;