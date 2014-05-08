"use strict";

var iugu = require('../');
require('./config');

var data_invoice = {
  'email': 'teste@teste.com',
  'due_date': '30/11/2014',
  'items[][description]': 'Item Um',
  'items[][quantity]': '1',
  'items[][price_cents]': '1000'
}

iugu.invoices.create(null, data_invoice, function (error, res) {
  console.log(error);
  console.log(res);
  
  iugu.invoices.get(res.id, null, function (error, res) {
    console.log(error);
    console.log(res);
  });
  
  iugu.invoices.update(res.id, {'due_date': '30/12/2015'}, null, function (error, res) {
    console.log(error);
    console.log(res);
  });
  
  iugu.invoices.remove(res.id, null, function (error, res) {
    console.log(error);
    console.log(res);
  });
  
  iugu.invoices.cancel(res.id, null, function (error, res) {
    console.log(error);
    console.log(res);
  });
  
});

iugu.invoices.list({}, null, function (error, res) {
    console.log(error);
    console.log(res);
  });


