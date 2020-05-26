'use strict';

const Promise = require('bluebird');
const fs = require('fs'),
      knex = require("knex");

var sqlDb = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: true,
  debug: process.env.NODE_ENV === "development"
});
/**
 * Obtain information about service proposed by the company
 *
 * returns List
 **/
exports.serviceGET = function() {
  return new Promise(function(resolve, reject) {
    sqlDb.select()
    .from('service')
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  });
}


/**
 * Obtain information about all the event in which a service is presented
 *
 * id Integer The ID of the person
 * returns inline_response_200_2
 **/
exports.serviceIdEventGET = function(id) {
  return new Promise(function(resolve, reject) {
    var subquery_1 = sqlDb.select('id').from('service').where('id',id);
    var subquery_2 = sqlDb.select('id_event').from('service_presented').where('id_service',subquery_1);
    sqlDb.select('id','name','contact','text_presentation','starting_date','ending_date','image').from('event').where('id',subquery_2)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  });
}


/**
 * Obtain information about specific service
 *
 * id Integer The ID of the service
 * returns inline_response_200_1
 **/
exports.serviceIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    sqlDb.select('id','name','description')
    .from('service')
    .where('id',id)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  });
}


/**
 * Obtain information about people involved in a service
 *
 * id Integer The ID of the service
 * returns inline_response_200
 **/
exports.serviceIdPersonGET = function(id) {
  return new Promise(function(resolve, reject) {
    var subquery_1 = sqlDb.select('id').from('service').where('id',id);
    var subquery_2 = sqlDb.select('id_person').from('person_involved').where('id_service',subquery_1);
    sqlDb.select('id','name','age','role','profession','short_description','email','image').from('person').where('id',subquery_2)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  });
}


/**
 * Obtain information about all project involved in a service
 *
 * id Integer The ID of the service
 * returns inline_response_200_3
 **/
exports.serviceIdProjectGET = function(id) {
  return new Promise(function(resolve, reject) {
    var subquery_1 = sqlDb.select('id').from('service').where('id',id);
    var subquery_2 = sqlDb.select('id_project').from('project_related').where('id_service',subquery_1);
    sqlDb.select('id','name','status','description','starting_date','ending_date').from('project').where('id',subquery_2)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  });
}

