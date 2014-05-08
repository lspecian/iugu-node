"use strict";

var iugu = require('../');
require('./config');

var data_plan = {
  'name': 'Plano Básico',
  'identifier': 'basic_plan',
  'interval': '1',
  'interval_type': 'months',
  'prices[][currency]': 'BRL',
  'prices[][value_cents]': '1000',
  'features[][name]': 'Número de Usuários',
  'features[][identifier]': 'users',
  'features[][value]': '10'
}

iugu.plans.create(null, data_plan, function (error, res) {
  console.log(error);
  console.log(res);
  iugu.plans.get(res.id, null, function (error, res) {
    console.log(error);
    console.log(res);
  });
  
  iugu.plans.getByIdentifier('basic_plan', null, function (error, res) {
    console.log(error);
    console.log(res);
  });
  
  iugu.plans.update(res.id, {'identifier': 'basic_plan_new'}, null, function (error, res) {
    console.log(error);
    console.log(res);
  });
  
  iugu.plans.remove(res.id, null, function (error, res) {
    console.log(error);
    console.log(res);
  });
});

iugu.plans.list({}, null, function (error, res) {
  console.log(error);
  console.log(res);
});

