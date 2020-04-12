'use strict';

const path = require('path'),
	util = require('util'),
	fs = require('fs');

const _ = require('lodash'),
	request = require('request'),
	moment = require('moment');

const blesta = function(options){
	if(!(this instanceof blesta)){
		return new blesta(options);
	}

	this.options = _.defaults(options, {
		url: 'http://localhost:80',
		auth: {
			username: "admin",
			password: "password"
		}
	});

	// returns moment date
	this.parseDate = function(date){
		return moment(date);
	};

	// create format: YYYY-MM-DDThh:mm:ssZ / 2021-12-31T12:00:00Z
	this.createDate = function(date){
		if(date){
			date = moment();
		}else{
			date = moment(date);
		}
		return date.format("Y");
	};

	// default errors
	this.errors = {
		"blesta.bad_request": "The request cannot be fulfilled due to bad syntax.",
		"blesta.unauthorized": "The request cannot be fulfilled due to bad syntax.",
		"blesta.forbidden": "The requested resource is not accessible.",
		"blesta.not_found": "The requested resource does not exist.",
		"blesta.not_supported": "The format requested is not supported by the server.",
		"blesta.error": "An unexpected error occured.",
		"blesta.maintenance": "The requested resource is currently unavailable due to maintenance.",
		"blesta.not_handled": "The request response returned an unexpected code."
	};

	this.error = function(code, data){
		//Error.captureStackTrace(this, this.constructor);
		if(!this.errors[code]){
			throw new Error('Invalid error code `' + code + '` provided.');
		}
		let message = this.errors[code];
		if(data && data.message){
			message = data.message;
		}
		const error = new Error(message);
		error.name = 'blestaError';
		error.code = code;

		// check if data is still somehow a string (bad HTML response?)
		if(typeof(data) === 'string'){
			data = {body: data};
		}
		error.data = _.omit(data || {}, ['message']);
		return error;
	};

	this.request = function(method, url, data, callback){
		const self = this;
		if(data && !callback){
			callback = data;
			data = null;
		}
		method = String(method).toLowerCase();
		if(url.slice(0, 1) !== '/'){
			url = '/' + url;
		}
		let req = {
			url: util.format('%s/api%s.json', options.url, url),
			auth: options.auth,
			json: true,
			method: method
		};
		req = _.defaults(req, this.options);

		if(data && method === 'get'){
			req.qs = data;
		}else if(data){
			req.form = data;
		}
		return request(req, function(err, res, body){
			if(err){
				return callback(self.error('blesta.bad_request', err));
			}
			switch(res.statusCode){
				case 400:
					return callback(self.error('blesta.bad_request', body));
				case 401:
					return callback(self.error('blesta.unauthorized', body));
				case 403:
					return callback(self.error('blesta.forbidden', body));
				case 404:
					body.url = req.url;
					return callback(self.error('blesta.not_found', body));
				case 415:
					return callback(self.error('blesta.not_supported', body));
				case 500:
					return callback(self.error('blesta.error', body));
				case 503:
					return callback(self.error('blesta.maintenance', body));
				case 200:{
					if(typeof(body) === undefined){
						return callback(self.error('blesta.error'));
					}
					if(res.headers && res.headers['content-type'] && !res.headers['content-type'].includes('application/json')){
						// not a valid JSON response
						return callback(self.error('blesta.error', body));
					}
					const response = body && body.response || {};
					if(response === undefined){
						return callback(self.error('blesta.error', body));
					}else if(response && response.settings){
						delete response.settings;
					}
					return callback(null, response, res);
				}
				default:
					return callback(self.error('blesta.not_handled', body));
			}
		});
	};


	const self = this;
	_.each(fs.readdirSync(__dirname + '/api'), function(folder){
		const dir = __dirname + '/api/' + folder;
		_.each(fs.readdirSync(dir), function(file){
			self[path.basename(file, '.js')] = require(dir + '/' + file)(self);
		});
	});
};

module.exports = blesta;