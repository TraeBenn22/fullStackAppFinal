'use strict';

const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');


let scores = [
    { _id: '1', name: 'trae', score: '123' },
    { _id: '2', name: 'mark', score: '456' },
    { _id: '3', name: 'john', score: '789' },
    { _id: '4', name: 'doug', score: '0' },
];

router.get('/scores', (request, response) => {
    let result = scores.sort((a, b) => b.score - a.score);
    response.send(result);
});

router.post('/scores', (request, response) => {
    let newScore = request.body;
    newScore._id = uuid();
    scores.push(newScore);
    response.send(newScore);
});

router.delete('/scores/:id', (request, response) => {
    scores = scores.filter(score => request.params.id !== score._id);
    response.send(scores);
});

router.get('/scores-bigger-than/:value', (request, response) => {
    let value = parseInt(request.params.value);
    let results = scores.filter(score => value < parseInt(score.score));
    response.send(results);
});


module.exports = router;
