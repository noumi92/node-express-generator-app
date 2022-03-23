const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
//router configurations for all promos
promoRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((request,response, next)=>{
    response.end('Will send all promos to client!');
})
.post((request, response, next)=>{
    response.end('will add the promo:' + request.body.name + 'with details' + request.body.description);
})
.put((request, response, next)=>{
    response.statusCode = 403;
    response.end('PUT operation is not supported on promos');
})
.delete((request,response, next)=>{
    response.end('!!!Deleting all the promos!!!');
});
//router configurations for single promo
promoRouter.route('/:promoId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((request,response, next)=>{
    response.end('Will send details of promo: ' + request.params.promoId);
})
.put((request, response, next)=>{
    response.write('Updating the promo: '+request.params.promoId+'\n');
    response.end('will update the promo: ' + request.body.name + ' with details: ' + request.body.description);
})
.post((request, response, next)=>{
    response.statusCode = 403;
    response.end('POST operation is not supported on promo: ' + request.params.promoId);
})
.delete((request,response, next)=>{
    response.end('!!!Deleting athe promo: ' + request.params.promoId);
});

module.exports = promoRouter;