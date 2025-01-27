//express webserver
const express = require('express');
const routes = require('./routes');  //added to check functionality
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

//Middleware
app.use(express.json());
app.use('/', routes);

const port = process.env.port || 3001; 
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if(err)
        console.log(err);
    else{
        app.listen(port, () => {console.log(`Database is listening and node is running on port ${port}`)});
    }
});


