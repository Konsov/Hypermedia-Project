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
 * Obtain information about all project of the company
 *
 * returns List
 **/
exports.projectGET = function() {
  return new Promise(function(resolve, reject) {
    sqlDb.select()
    .from('project')
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
 * Obtain information about specific project
 *
 * id Integer The ID of the project
 * returns inline_response_200_3
 **/
exports.projectIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    sqlDb.select('id','status','description','starting_date','ending_date')
    .from('project')
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
 * Obtain information about all the service linked to a specific project
 *
 * id Integer The ID of the project
 * returns inline_response_200_1
 **/
exports.projectIdServiceGET = function(id) {
  return new Promise(function(resolve, reject) {
    var subquery_1 = sqlDb.select('id').from('project').where('id',id);
    var subquery_2 = sqlDb.select('id_service').from('project_related').where('id_project',subquery_1);
    sqlDb.select('id','name','description').from('service').where('id',subquery_2)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  });
}

