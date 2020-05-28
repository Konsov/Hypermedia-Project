'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.eventGET = function eventGET (req, res, next) {
  var finished = req.swagger.params['finished'].value;
  Event.eventGET(finished)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventIdGET = function eventIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Event.eventIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventIdPersonGET = function eventIdPersonGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Event.eventIdPersonGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventIdServiceGET = function eventIdServiceGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Event.eventIdServiceGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
