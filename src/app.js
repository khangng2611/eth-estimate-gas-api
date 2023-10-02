import express from 'express';
import { Connection } from './db-config/index.js'; 
import { router } from './routes/index.js';
import bodyParser from 'body-parser';
import morgan from 'morgan';
const app = express();
const port = 4000; 

Connection();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json() );
app.use('/', router);
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
