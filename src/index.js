const express = require('express');
require('./db/mongoose');
const UserRouter = require('./routes/userRouter') 

// creating the app
const app = express();

// creating the server port
const port = process.env.PORT || 5000

// serving the expressing
app.use(express.json())

// serving the routers to be read.
app.use(UserRouter)
// listening on a server
app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})
