const express = require('express'); 
const app = express();
const port = 3000; 

const db = require('./db-config');
db.connect()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json() );

const route = require('./routes/index');
app.use('/', route);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
