"use strict";

var iugu = require('../');
require('./config');

var data_customer = {
  'email': 'email@email.com',
  'name': 'Nome do Cliente',
  'notes': 'Anotações Gerais'
};

iugu.customers.create(null, data_customer, function (error, res) {
  console.log(error);
  console.log(res);
   
  iugu.customers.get(res.id, null, function (error, res) {
    console.log(error);
    console.log(res);
    
    data_customer.name = 'novo nome';
    data_customer.notes = 'novas Anotações';
    iugu.customers.update(res.id, data_customer, null, function (error, res) {
      console.log(error);
      console.log(res);
      
       iugu.customers.remove(res.id, null, function (error, res) {
        console.log(error);
        console.log(res);
      }); 
    });  
    
  });
  
});

iugu.customers.list({}, null, function (error, res) {
  console.log(error);
  console.log(res);      
});