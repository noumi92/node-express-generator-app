const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');
//db config

//api config
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
//router configurations for all dishes
dishRouter.route('/')
.get((request,response, next)=>{
    Dishes.find({})
    .then((dishes)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(dishes);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.post((request, response, next)=>{
    Dishes.create(request.body)
    .then((dish)=>{
        console.log('Dish Created', dish);
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(dish);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.put((request, response, next)=>{
    response.statusCode = 403;
    response.end('PUT operation is not supported on dishes');
})
.delete((request,response, next)=>{
    Dishes.remove({})
    .then((resp)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(resp);
    }, (err)=>next(err))
    .catch((err)=> next(err));
});
//router configurations for single dish
dishRouter.route('/:dishId')
.get((request,response, next)=>{
    Dishes.findById(request.params.dishId)
    .then((dish)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(dish);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.put((request, response, next)=>{
    Dishes.findByIdAndUpdate(request.params.dishId, {
        $set: request.body
    }, {new: true})
    .then((dish)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(dish);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.post((request, response, next)=>{
    response.statusCode = 403;
    response.end('POST operation is not supported on dish: ' + request.params.dishId);
})
.delete((request,response, next)=>{
    Dishes.findByIdAndRemove(request.params.dishId)
    .then((resp)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(resp);
    }, (err)=>next(err))
    .catch((err)=> next(err));    
});
//router configuration for sub documents (comments)
dishRouter.route('/:dishId/comments')
.get((request,response, next)=>{
    Dishes.findById(request.params.dishId)
    .then((dish)=>{
        if(dish !== null){
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dish.comments);
        }else{
            err = new Error('Dish' + request.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.post((request, response, next)=>{
    Dishes.findById(request.params.dishId)
    .then((dish)=>{
        if(dish != null){
            dish.comments.push(request.body);
            dish.save()
            .then((dish)=>{
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(dish.comments);
            })
        }else{
            err = new Error('Dish' + request.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.put((request, response, next)=>{
    response.statusCode = 403;
    response.end('PUT operation is not supported on dishes');
})
.delete((request,response, next)=>{
    Dishes.findById(request.params.dishId)
    .then((dish)=>{
        if(dish != null){
            for(i=dish.comments.length -1; i>=0; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish)=>{
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(dish.comments);
            })
        }else{
            err = new Error('Dish' + request.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err)=> next(err));
});
//router configurations for single sub-document (comment)
dishRouter.route('/:dishId/comments/:commentId')
.get((request,response, next)=>{
    Dishes.findById(request.params.dishId)
    .then((dish)=>{
        if(dish != null && dish.comments.id(request.params.commentId) != null){
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dish.comments.id(request.params.commentId));
        }else if(dish == null){
            err = new Error('Dish' + request.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        }else{
            err = new Error('Comment' + request.params.commentId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.put((request, response, next)=>{
    Dishes.findById(request.params.dishId)
    .then((dish)=>{
        if(dish != null && dish.comments.id(request.params.commentId) != null){
            if(request.body.rating){
                dish.comments.id(request.params.commentId).rating =
                request.body.rating;
            }
            if(request.body.comment){
                dish.comments.id(request.params.commentId).comment =
                request.body.comment;
            }
            dish.save()
            .then((dish)=>{
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(dish.comments.id(request.params.commentId));
            }, (err)=>next(err));
        }else if(dish == null){
            err = new Error('Dish' + request.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        }else{
            err = new Error('Comment' + request.params.commentId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err)=> next(err));
})
.post((request, response, next)=>{
    response.statusCode = 403;
    response.end('PUT operation is not supported on dishes');
})
.delete((request,response, next)=>{
    Dishes.findById(request.params.dishId)
    .then((dish)=>{
        if(dish != null && dish.comments.id(request.params.commentId) != null){
            dish.comments.id(request.params.commentId).remove();
            dish.save()
            .then((dish)=>{
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(dish.comments);
            })
        }else if(dish == null){
            err = new Error('Dish' + request.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        }else{
            err = new Error('Comment' + request.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err)=> next(err));
});
module.exports = dishRouter;