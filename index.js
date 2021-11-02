'use strict';

const server = require('./src/server');
const {db} = require('./src/models/index');

require('dotenv').config();
const port = process.env.PORT || 8080 ;

db.sync().then(()=>{
    server.start(port);
}).catch(console.error);
