"use strict";

var iugu = require('../');
require('./config');

var account_id = '0738d949-27cf-493b-b079-abf045d13e12' 
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

var data = { 
  'email': 'test@test.com', 
  'items[][description]': 'Item Um', 
  'items[][quantity]': '1', 
  'items[][price_cents]': '1099', 
  'payer[cpf_cnpj]': '12312312312', 
  'payer[name]': 'Nome do Cliente', 
  'payer[phone_prefix]': '11', 
  'payer[phone]': '12121212', 
  'payer[email]': 'test@test.com', 
  'payer[address][street]': 'Rua Tal', 
  'payer[address][number]': '700',
  'payer[address][city]': 'São Paulo',
  'payer[address][state]': 'SP',
  'payer[address][country]': 'Brasil',
  'payer[address][zip_code]': '12122-000'
};

iugu.payment_token(null, data_payment_token, function (error, res) {
  console.log(error);
  console.log(res);
  
  if (res) {
    data.token = res.id;

    iugu.charge(null, data, function (error, res) {
      console.log(error);
      console.log(res);
    });
  }
});

