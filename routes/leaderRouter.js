const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
//router configurations for all leaders
leaderRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((request,response, next)=>{
    response.end('Will send all leaders to client!');
})
.post((request, response, next)=>{
    response.end('will add the leader:' + request.body.name + 'with details' + request.body.description);
})
.put((request, response, next)=>{
    response.statusCode = 403;
    response.end('PUT operation is not supported on leaders');
})
.delete((request,response, next)=>{
    response.end('!!!Deleting all the leaders!!!');
});
//router configurations for single leader
leaderRouter.route('/:leaderId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((request,response, next)=>{
    response.end('Will send details of leader: ' + request.params.leaderId);
})
.put((request, response, next)=>{
    response.write('Updating the leader: '+request.params.leaderId+'\n');
    response.end('will update the leader: ' + request.body.name + ' with details: ' + request.body.description);
})
.post((request, response, next)=>{
    response.statusCode = 403;
    response.end('POST operation is not supported on leader: ' + request.params.leaderId);
})
.delete((request,response, next)=>{
    response.end('!!!Deleting athe leader: ' + request.params.leaderId);
});

module.exports = leaderRouter;