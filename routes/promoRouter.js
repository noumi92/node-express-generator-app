const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');
//api config
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
//router configurations for all promos
promoRouter.route('/')
.get((request,response, next)=>{
    Promotions.find({})
    .then((promos)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(promos);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.post((request, response, next)=>{
    Promotions.create(request.body)
    .then((promo)=>{
        console.log('Promotion Created', promo);
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(promo);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.put((request, response, next)=>{
    response.statusCode = 403;
    response.end('PUT operation is not supported on promos');
})
.delete((request,response, next)=>{
    Promotions.remove({})
    .then((resp)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(resp);
    }, (err)=>next(err))
    .catch((err)=> next(err));
});
//router configurations for single promo
promoRouter.route('/:promoId')
.get((request,response, next)=>{
    Promotions.findById(request.params.promoId)
    .then((promo)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(promo);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.put((request, response, next)=>{
    Promotions.findByIdAndUpdate(request.params.promoId, {
        $set: request.body
    }, {new: true})
    .then((promo)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(promo);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.post((request, response, next)=>{
    response.statusCode = 403;
    response.end('POST operation is not supported on promo: ' + request.params.promoId);
})
.delete((request,response, next)=>{
    Promotions.findByIdAndRemove(request.params.promoId)
    .then((resp)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(resp);
    }, (err)=>next(err))
    .catch((err)=> next(err)); 
});

module.exports = promoRouter;