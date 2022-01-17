const express = require('express');
const app = express();
const router = require('./routers/routes')
const port = process.env.PORT || 9000;
const cluster = require('cluster');
const mongoose = require('mongoose')
const  mongo = require('./database/mongo_config');


if (cluster.isMaster) {
     cluster.fork();
   //if the worker dies, restart it.
   cluster.on('exit', function(worker){
      console.log('Worker ' + worker.id + ' died..');
      cluster.fork();
   });
}
else{

app.use(router);

app.listen(port,(req,res)=>{
    console.log("I am running at port no. :: "+port)
})
}