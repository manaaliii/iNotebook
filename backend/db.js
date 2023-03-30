const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/iNotebook"
const connectToMongo = () => {
    mongoose.connect(mongoURI) // if error it will throw async error
    .then(() => { // if all is ok we will be here
        console.log("Connected to mongo");
    })
    .catch(err => { // we will not be here...
        console.error('App starting error:', err.stack);
        process.exit(1);
    });
}
module.exports = connectToMongo;