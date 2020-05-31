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
 * Obtain information about event proposed by the company
 *
 * finished Boolean If the event is finished (optional)
 * returns List
 **/
exports.eventGET = function(finished) {
  return new Promise(function(resolve, reject) {
    sqlDb.select()
    .from('event')
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
 * Obtain information about specific event
 *
 * id Integer The ID of the event
 * returns inline_response_200_2
 **/
exports.eventIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    sqlDb.select('id','name','contact','text_presentation','starting_date','ending_date','image')
    .from('event')
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

exports.eventGroupGET = function(month,year) {
  return new Promise(function(resolve, reject) {
    sqlDb.raw(`SELECT id, name, contact,text_presentation,starting_date,ending_date,image from event
    WHERE EXTRACT(MONTH FROM starting_date) = ? AND EXTRACT(YEAR FROM ending_date) = ?`, [month,year])
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
 * returns inline_response_200_2
 **/
exports.eventIdPersonGET = function(id) {
  return new Promise(function(resolve, reject) {
    var subquery = sqlDb.select('contact').from('event').where('id',id)
    sqlDb.select('id','name','age','role','profession','short_description','email','image')
    .from('person')
    .where('id',subquery)
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
 * Obtain information about all the service presented in an event
 *
 * id Integer The ID of the person
 * returns inline_response_200_2
 **/
exports.eventIdServiceGET = function(id) {
  return new Promise(function(resolve, reject) {
    var subquery_1 = sqlDb.select('id').from('event').where('id',id);
    var subquery_2 = sqlDb.select('id_service').from('service_presented').where('id_event','in',subquery_1);
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

