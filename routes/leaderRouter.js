const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');
//api config
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
//router configurations for all leaders
leaderRouter.route('/')
.get((request,response, next)=>{
    Leaders.find({})
    .then((leaders)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(leaders);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.post((request, response, next)=>{
    Leaders.create(request.body)
    .then((leader)=>{
        console.log('New Leader Born', leader);
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(leader);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.put((request, response, next)=>{
    response.statusCode = 403;
    response.end('PUT operation is not supported on leaders');
})
.delete((request,response, next)=>{
    Leaders.remove({})
    .then((resp)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(resp);
    }, (err)=>next(err))
    .catch((err)=> next(err));
});
//router configurations for single leader
leaderRouter.route('/:leaderId')
.get((request,response, next)=>{
    Leaders.findById(request.params.leaderId)
    .then((leader)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(leader);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.put((request, response, next)=>{
    Leaders.findByIdAndUpdate(request.params.leaderId, {
        $set: request.body
    }, {new: true})
    .then((leader)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(leader);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.post((request, response, next)=>{
    response.statusCode = 403;
    response.end('POST operation is not supported on leader: ' + request.params.promoId);
})
.delete((request,response, next)=>{
    Leaders.findByIdAndRemove(request.params.leaderId)
    .then((resp)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(resp);
    }, (err)=>next(err))
    .catch((err)=> next(err)); 
});

module.exports = leaderRouter;