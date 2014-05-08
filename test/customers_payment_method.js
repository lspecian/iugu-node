"use strict";

var iugu = require('../');
require('./config');
var data_customer = {
  'email': 'email@email.com',
  'name': 'Nome do Cliente',
  'notes': 'Anotações Gerais'
};

var data_payment_method = {
  'description': 'Meu Cartão de Crédito',
  'item_type': 'credit_card',
  'data[number]': '4111111111111111',
  'data[verification_value]': '123',
  'data[first_name]': 'Joao',
  'data[last_name]': 'Silva',
  'data[month]': '12',
  'data[year]': '2014'
};

iugu.customers.create(null, data_customer, function (error, cus_res) {
  console.log(error);
  console.log(cus_res);
  iugu.customers.payment_methods.create(cus_res.id, null, data_payment_method, function (error, res) {
    console.log(error);
    console.log(res);
    iugu.customers.payment_methods.get(res.customer_id, res.id, null, function (error, res) {
      console.log(error);
      console.log(res);
    });
    
    iugu.customers.payment_methods.update(res.customer_id, res.id, {'description': 'Novo Meu Cartão de Crédito'}, null, function (error, res) {
      console.log(error);
      console.log(res);
    });
    
    iugu.customers.payment_methods.remove(res.customer_id, res.id, null, function (error, res) {
      console.log(error);
      console.log(res);
    });
    
    iugu.customers.payment_methods.list(res.customer_id, null, function (error, res) {
      console.log(error);
      console.log(res);
    });
  });
  
  iugu.customers.remove(cus_res.id, null, function (error, res) {
    console.log(error);
    console.log(res);
  }); 
  
});