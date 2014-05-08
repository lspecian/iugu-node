"use strict";

var http = require('http');
var https = require('https');
var querystring = require('querystring');

module.exports = function () {

    var sdk_version = '0.0.1';
    var user_agent = 'Iugu-Node/sdk-nodejs ' + sdk_version + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + ')';
    var default_options = {
        'schema': 'https',
        'host': 'api.iugu.com',
        'port': '',
        'headers': {}
    };

    /* Merge Two Objects */

    function merge(obj1, obj2) {
        for (var p in obj2) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor === Object) {
                    obj1[p] = merge(obj1[p], obj2[p]);

                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }

    function copy_missing(obj1, obj2) {
        for (var p in obj2) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor === Object) {
                    if (!obj1[p]) {
                        obj1[p] = {};
                    }

                } else if (!obj1[p]) {
                    obj1[p] = obj2[p];

                }
            } catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }

    function configure(options) {
        default_options = merge(default_options, options);
    }

    function payment_token(config, data, cb) {
        if (typeof config === "function") {
            cb = config;
            config = default_options;
        } else if (!config) {
            config = default_options;
        }

        var http_options = {
            schema: config.schema || default_options.schema,
            host: config.host || default_options.host,
            port: config.port || default_options.port,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        invoke('POST', '/v1/payment_token/', querystring.stringify(data), http_options, function (err, res) {
            var token = null;
            if (res) {
                token = JSON.parse(res);
            }
            cb(err, token);
        });

    }
  
    function executeHttp(http_method, path, data, config, cb) {
      if (typeof config === "function") {
        cb = config;
        config = default_options;
      } else if (!config) {
        config = default_options;
      }
      var basicAuthString = 'Basic ' + new Buffer(config.apiToken + ':').toString('base64');
      var request_data = querystring.stringify(data);
      var http_options = {
        schema: config.schema || default_options.schema,
        host: config.host || default_options.host,
        port: config.port || default_options.port,
        headers: {
          'Authorization': basicAuthString,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      
      invoke(http_method, path, request_data, http_options, function (err, res) {
        var token = null;
        if (res) {
          token = JSON.parse(res);
        }
        cb(err, token);
      });
      
    }

    function invoke(http_method, path, data, http_options_param, cb) {
        var client = (http_options_param['schema'] === 'http') ? http : https;

        var request_data = data;

        if ( http_method === 'GET' ) {
            if (typeof request_data !== 'string') {
                request_data = querystring.stringify(request_data);
            }
            if (request_data) {
                path = path + "?" + request_data;
                request_data = "";
            }
        } else if (typeof request_data !== 'string') {
            request_data = JSON.stringify(request_data);
        }

        var http_options = {};

        if (http_options_param) {

            http_options = JSON.parse(JSON.stringify(http_options_param));

            if (!http_options.headers) {
                http_options.headers = {};
            }
            http_options.path = path;
            http_options.method = http_method;
            if (request_data) {
                http_options.headers['Content-Length'] = Buffer.byteLength(request_data, 'utf-8');
            }

            if (!http_options.headers.Accept) {
                http_options.headers.Accept = 'application/json';
            }

            if (!http_options.headers['Content-Type']) {
                http_options.headers['Content-Type'] = 'application/json';
            }

            http_options.headers['User-Agent'] = user_agent;
        }

        var req = client.request(http_options);

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
            cb(e, null);
        });

        req.on('response', function (res) {
            var response = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                response += chunk;
            });

            res.on('end', function () {
                var err = null;

                response.httpStatusCode = res.statusCode;

                try {

                    if (res.headers['content-type'] === "application/json") {
                        response = JSON.parse(response);
                    }

                } catch (e) {
                    err = new Error('Invalid JSON Response Received');
                    err.error = {
                        name: 'Invalid JSON Response Received, JSON Parse Error'
                    };
                    err.response = response;
                    err.httpStatusCode = res.statusCode;
                    response = null;
                }

                if (!err && (res.statusCode < 200 || res.statusCode >= 300) ) {
                    err = new Error('Response Status : ' + res.statusCode);
                    err.response = response;
                    err.httpStatusCode = res.statusCode;
                    response = null;
                }
                cb(err, response);
            });
        });

        if (request_data) {
            req.write(request_data);
        }
        req.end();
    }
    
    return {
        version: sdk_version,
        configure: function (options) {
            configure(options);
        },
        payment_token : function (config, data, cb) {
            payment_token(config, data, cb);
        },
        charge: function (config, data, cb) {
            executeHttp('POST', '/v1/charge', data, config, cb);
        },
        customers: {
            create: function (config, data, cb) {
                executeHttp('POST', '/v1/customers', data, config, cb);
            },
            get: function (client_id, config, cb) {
                executeHttp('GET', '/v1/customers/' + client_id, {}, config, cb);
            },
            update: function (client_id, data, config, cb) {
                executeHttp('PUT', '/v1/customers/' + client_id, data, config, cb);
            },
            remove: function (client_id, config, cb) {
              executeHttp('DELETE', '/v1/customers/' + client_id, {'remove':'true'}, config, cb);
            },
            list: function (data, config, cb) {
                executeHttp('GET', '/v1/customers/', data, config, cb);
            }, 
            payment_methods: {
              create: function (client_id, config, data, cb) {
                  executeHttp('POST', '/v1/customers/' + client_id + '/payment_methods/', data, config, cb);
              },
              get: function (client_id, payment_id, config, cb) {
                  executeHttp('GET', '/v1/customers/' + client_id + '/payment_methods/' + payment_id, {}, config, cb);
              },
              update: function (client_id, payment_id, data, config, cb) {
                  executeHttp('PUT', '/v1/customers/' + client_id + '/payment_methods/' + payment_id, data, config, cb);
              },
              remove: function (client_id, payment_id, config, cb) {
                  executeHttp('DELETE', '/v1/customers/' + client_id + '/payment_methods/' + payment_id, {'remove':'true'}, config, cb);
              },
              list: function (client_id, config, cb) {
                  executeHttp('GET', '/v1/customers/' + client_id + '/payment_methods/', {}, config, cb);
              }
            }
        },
        invoices: {
            create: function (config, data, cb) {
                executeHttp('POST', '/v1/invoices/', data, config, cb);
            },
            get: function (invoice_id, config, cb) {
                executeHttp('GET', '/v1/invoices/' + invoice_id, {}, config, cb);
            },
            update: function (invoice_id, data, config, cb) {
                executeHttp('PUT', '/v1/invoices/' + invoice_id, data, config, cb);
            },
            cancel: function (invoice_id, config, cb) {
                executeHttp('PUT', '/v1/invoices/' + invoice_id + '/cancel', {'cancel':'true'}, config, cb);
            },
            remove: function (invoice_id, config, cb) {
              executeHttp('DELETE', '/v1/invoices/' + invoice_id, {'remove':'true'}, config, cb);
            },
            list: function (data, config, cb) {
                executeHttp('GET', '/v1/invoices/', data, config, cb);
            }
        },
        plans: {
            create: function (config, data, cb) {
                executeHttp('POST', '/v1/plans/', data, config, cb);
            },
            get: function (plan_id, config, cb) {
                executeHttp('GET', '/v1/plans/' + plan_id, {}, config, cb);
            },
            getByIdentifier: function (identifier, config, cb) {
                executeHttp('GET', '/v1/plans/identifier/' + identifier, {}, config, cb);
            },
            update: function (plan_id, data, config, cb) {
                executeHttp('PUT', '/v1/plans/' + plan_id, data, config, cb);
            },
            remove: function (plan_id, config, cb) {
              executeHttp('DELETE', '/v1/plans/' + plan_id, {'remove':'true'}, config, cb);
            },
            list: function (data, config, cb) {
                executeHttp('GET', '/v1/plans/', data, config, cb);
            }
        },
        subscriptions: {
            create: function (config, data, cb) {
                executeHttp('POST', '/v1/subscriptions/', data, config, cb);
            },
            get: function (subscription_id, config, cb) {
                executeHttp('GET', '/v1/subscriptions/' + subscription_id, {}, config, cb);
            },
            update: function (subscription_id, data, config, cb) {
                executeHttp('PUT', '/v1/subscriptions/' + subscription_id, data, config, cb);
            },
            suspend: function (subscription_id, config, cb) {
                executeHttp('POST', '/v1/subscriptions/' + subscription_id + '/suspend', {'suspend':'true'}, config, cb);
            },
            activate: function (subscription_id, config, cb) {
                executeHttp('POST', '/v1/subscriptions/' + subscription_id + '/activate', {'suspend':'false'}, config, cb);
            },
            change_plan: function (subscription_id, plan_identifier, config, cb) {
                  executeHttp('POST', '/v1/subscriptions/' + subscription_id + '/change_plan/' + plan_identifier, {'change_plan':'true'}, config, cb);
            },
            add_credits: function (subscription_id, quantity, config, cb) {
                executeHttp('PUT', '/v1/subscriptions/' + subscription_id + '/add_credits', {'quantity': quantity}, config, cb);
            },
            remove_credits: function (subscription_id, quantity, config, cb) {
                executeHttp('PUT', '/v1/subscriptions/' + subscription_id + '/remove_credits', {'quantity': quantity}, config, cb);
            },
            remove: function (subscription_id, config, cb) {
              executeHttp('DELETE', '/v1/subscriptions/' + subscription_id, {'remove':'true'}, config, cb);
            },
            list: function (data, config, cb) {
                executeHttp('GET', '/v1/subscriptions/', data, config, cb);
            }
        },
        transfers: {
            transfer: function (config, data, cb) {
                executeHttp('POST', '/v1/transfers/', data, config, cb);
            },
            list: function (data, config, cb) {
                executeHttp('GET', '/v1/transfers/', data, config, cb);
            }
        },
        marketplace: {
            create_account: function (config, data, cb) {
                executeHttp('POST', '/v1/marketplace/create_account/', data, config, cb);
            },
            request_verification: function (account_id, data, config, cb) {
                config = {'account_id': account_id, 'account_secret': ''};
                executeHttp('POST', '/v1/accounts/' + account_id + '/request_verification', data, config, cb);
            },
            get: function (account_id, config, cb) {
                config = {'account_id': account_id, 'account_secret': ''};
                executeHttp('GET', '/v1/accounts/' + account_id, {}, config, cb);
            }
        }
    };

};
