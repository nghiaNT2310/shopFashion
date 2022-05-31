const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', Admin);
