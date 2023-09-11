const express = require('express'); 
const app = express();
const port = 3000; 

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json() );

const ethRouter = require('./routes/ethRoute')

app.use('/eth', ethRouter)

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
