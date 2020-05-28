'use strict';

var utils = require('../utils/writer.js');
var Service = require('../service/ServiceService');

module.exports.serviceGET = function serviceGET (req, res, next) {
  Service.serviceGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.serviceIdEventGET = function serviceIdEventGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Service.serviceIdEventGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.serviceIdPhotoGET = function serviceIdEventGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Service.serviceIdPhotoGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.serviceIdGET = function serviceIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Service.serviceIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response[0]);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.serviceIdPersonGET = function serviceIdPersonGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Service.serviceIdPersonGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.serviceIdProjectGET = function serviceIdProjectGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Service.serviceIdProjectGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
