"use strict";

var iugu = require('../');
require('./config');

var data_transfer = {
  'receiver_id': '97daf7a',
  'amount_cents': '1000'
}
/*
iugu.transfers.transfer(null, data_transfer, function (error, res) {
  console.log(error);
  console.log(res);
});

iugu.transfers.list({}, null, function (error, res) {
  console.log(error);
  console.log(res);
});
*/