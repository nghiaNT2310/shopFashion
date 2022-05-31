const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://bkfashionshop:project1@cluster0.lh5fp.mongodb.net/test', {
           
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect Successfully!!');
    } catch (error) {
        console.log('Connect failure!!');
    }
}

module.exports = { connect };
