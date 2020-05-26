'use strict';

var utils = require('../utils/writer.js');
var Person = require('../service/PersonService');

module.exports.personGET = function personGET (req, res, next, bodyLimit, pageLimit) {
  Person.personGET(bodyLimit, pageLimit)
    .then(function (response) {
      console.log(response)
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.personIdEventGET = function personIdEventGET (req, res, next, id) {
  Person.personIdEventGET(id)
    .then(function (response) {
      console.log(response.length)
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.personIdGET = function personIdGET (req, res, next, id) {
  var person_id = req.swagger.params['id'].value;
  Person.personIdGET(person_id)
    .then(function (response) {
      if(response.length){
        utils.writeJson(res, response[0]);
    } else {
        utils.writeJson(res, response, 404)
    }
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.statusCode || 500);
    });
};

module.exports.personIdServiceGET = function personIdServiceGET (req, res, next, id) {
  Person.personIdServiceGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
