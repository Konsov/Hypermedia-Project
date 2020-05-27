'use strict';

var utils = require('../utils/writer.js');
var Project = require('../service/ProjectService');

module.exports.projectGET = function projectGET (req, res, next) {
  Project.projectGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.projectIdGET = function projectIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Project.projectIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.projectIdPhotoGET = function serviceIdEventGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Project.projectIdPhotoGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.projectIdServiceGET = function projectIdServiceGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Project.projectIdServiceGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
