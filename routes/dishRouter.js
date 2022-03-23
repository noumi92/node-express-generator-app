const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
//router configurations for all dishes
dishRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((request,response, next)=>{
    response.end('Will send all dishes to client!');
})
.post((request, response, next)=>{
    response.end('will add the dish:' + request.body.name + 'with details' + request.body.description);
})
.put((request, response, next)=>{
    response.statusCode = 403;
    response.end('PUT operation is not supported on dishes');
})
.delete((request,response, next)=>{
    response.end('!!!Deleting all the dishes!!!');
});
//router configurations for single dish
dishRouter.route('/:dishId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((request,response, next)=>{
    response.end('Will send details of dish: ' + request.params.dishId);
})
.put((request, response, next)=>{
    response.write('Updating the dish: '+request.params.dishId+'\n');
    response.end('will update the dish: ' + request.body.name + ' with details: ' + request.body.description);
})
.post((request, response, next)=>{
    response.statusCode = 403;
    response.end('POST operation is not supported on dish: ' + request.params.dishId);
})
.delete((request,response, next)=>{
    response.end('!!!Deleting athe dish: ' + request.params.dishId);
});

module.exports = dishRouter;