"use strict";

var iugu = require('../');
require('./config');

var account_id = '0738d9'
var test = true;
var data_payment_token = {
  'account_id': account_id, 
  'test': test,
  'method': 'credit_card',
  'data[number]': '4111111111111111',
  'data[verification_value]':'123',
  'data[first_name]': 'Joao',
  'data[last_name]': 'Silva',
  'data[month]': '12',
  'data[year]': '2014'
};

iugu.payment_token(null, data_payment_token, function (error, res) {
  console.log(error);
  console.log(res);
  
  if (res) {
    token = res.id;
  }
});