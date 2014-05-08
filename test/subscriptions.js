"use strict";

var iugu = require('../');
require('./config');

var data_subscription = {
  'plan_identifier': 'basic_plan',
  'customer_id': '8B45',
  'only_on_charge_success': 'false',
  'subitems[][description]': 'Item um',
  'subitems[][price_cents]': '1000', 
  'subitems[][quantity]': '1'
}

/*
iugu.subscriptions.create(null, data_subscription, function (error, res) {
  console.log(error);
  console.log(res);
});

iugu.subscriptions.get('60A9E09B5D994AF39EDCB727900DDB2E', null, function (error, res) {
  console.log(error);
  console.log(res);
});

iugu.subscriptions.update('60A9E09B5D994AF39EDCB727900DDB2E', {'suspended': 'false'}, null, function (error, res) {
  console.log(error);
  console.log(res);
});

iugu.subscriptions.suspend('60A9E09B5D994AF39EDCB727900DDB2E', null, function (error, res) {
  console.log(error);
  console.log(res);
});

iugu.subscriptions.activate('60A9E09B5D994AF39EDCB727900DDB2E', null, function (error, res) {
  console.log(error);
  console.log(res);
});

iugu.subscriptions.change_plan('60A9E09B5D994AF39EDCB727900DDB2E', 'id2', null, function (error, res) {
  console.log(error);
  console.log(res);
});

iugu.subscriptions.add_credits('60A9E09B5D994AF39EDCB727900DDB2E', 10, null, function (error, res) {
  console.log(error);
  console.log(res);
});

iugu.subscriptions.remove_credits('60A9E09B5D994AF39EDCB727900DDB2E', 5, null, function (error, res) {
  console.log(error);
  console.log(res);
});



iugu.subscriptions.remove('60A9E09B5D994AF39EDCB727900DDB2E', null, function (error, res) {
  console.log(error);
  console.log(res);
});
*/

iugu.subscriptions.list({}, null, function (error, res) {
  console.log(error);
  console.log(res);
});