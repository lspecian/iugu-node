"use strict";

var iugu = require('../');
require('./config');

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

data.method = 'bank_slip';
iugu.charge(null, data, function (error, res) {
  console.log(error);
  console.log(res);
});
