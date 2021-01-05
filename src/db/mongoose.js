const mongoose = require('mongoose');

// connecting to the database
mongoose.connect('mongodb://127.0.0.1:27017/registration-api', {
    useCreateIndex: true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

