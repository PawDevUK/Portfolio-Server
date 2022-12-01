const mongoose = require('mongoose');

function DB(url){
    mongoose.connect(url, {
        // removes deprecation 
        // (node:9612) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    });
    
    
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('MongoDB database connection established successfully!!');
    });
}

module.exports = DB