'use strict';


/**
 * Obtain information about the people working in the compnay
 *
 * bodyLimit Integer The amount of people returned (optional)
 * pageLimit Integer The pages to return people info (optional)
 * returns List
 **/

const Promise = require('bluebird');
const fs = require('fs'),
      knex = require("knex");

var sqlDb = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: true,
  debug: process.env.NODE_ENV === "development"
});



exports.personGET = function(bodyLimit,pageLimit) {
  return new Promise(function(resolve, reject) {
    sqlDb.select()
    .from('person')
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
 * Obtain information about event in which one person is the main contact
 *
 * id Integer The ID of the person
 * returns Object
 **/
exports.personIdEventGET = function(id) {
  return new Promise(function(resolve, reject) {
    sqlDb.select('id','name','contact','text_presentation','starting_date','ending_date','image')
    .from('event')
    .where('contact',id)
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
 * Obtain information about specific person
 *
 * id Integer The ID of the person
 * returns Object
 **/
exports.personIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    
    sqlDb.select('id','name','age','role','profession','short_description','email','image')
    .from('person')
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
 * Obtain information about service in which one person is involved
 *
 * id Integer The ID of the person
 * returns Object
 **/
exports.personIdServiceGET = function(id) {
  return new Promise(function(resolve, reject) {
    var subquery_1 = sqlDb.select('id').from('person').where('id',id);
    var subquery_2 = sqlDb.select('id_service').from('person_involved').where('id_person','in',subquery_1);
    sqlDb.select('id','name','description').from('service').where('id','in',subquery_2)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  });
}

