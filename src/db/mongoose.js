const mongoose = require('mongoose');

// connecting to the database
mongoose.connect(process.env.MONGODB_DATABASE, {
    useCreateIndex: true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

