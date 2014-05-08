"use strict";

var iugu = require('../');
require('./config');

var data_subconta = {
  'name': 'Subconta',
  'commission_percent': '10'
}
/*
iugu.marketplace.create_account(null, data_subconta, function (error, res) {
  console.log(error);
  console.log(res);
});

*/

var data_reqverification = {
  'data[price_range]': 'Subconta', 
  'data[physical_products]': 'false',
  'data[business_type]': 'Serviços de Limpeza',
  'data[person_type]': 'Pessoa Física',
  'data[automatic_transfer]': 'true', 
  'data[cpf]': '123.123.123-12',
  'data[name]': 'Nome da Pessoa',
  'data[address]': 'Av. Paulista 320 cj 10', 
  'data[cep]': '01419-000',
  'data[city]': 'São Paulo', 
  'data[state]': 'São Paulo', 
  'data[telephone]': '11-91231-1234', 
  'data[bank]': 'Itaú', 
  'data[bank_ag]': '1234',
  'data[account_type]': 'Corrente',
  'data[bank_cc]': '11231-2',
  'files[id]': '@/home/user1/Desktop/rg.png',
  'files[cpf]': '@/home/user1/Desktop/cpf.png',   
  'files[activity]': '@/home/user1/Desktop/contrato.png'
}