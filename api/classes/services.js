'use strict';
/*
	http://source-docs.blesta.com/class-Services.html
	Services Management

Model
*/

module.exports = function(blesta){
	var _ = require('lodash');

	return {
		get: function(service_id , callback){
			return blesta.request('get', 'services/get', {
				service_id : service_id
			}, callback);
		},
		getList: function(data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'services/getList', _.pick(data, ['client_id', 'status', 'page', 'order_by', 'children']), callback);
		},
		search: function(query, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'services/search', _.defaults({
				query : query
			}, _.pick(data, ['page', 'search_fields '])), callback);
		},
		getSearchCount: function(query, callback){
			return blesta.request('get', 'services/getSearchCount', _.defaults({
				query : query
			}, _.pick(data, ['page', 'search_fields '])), callback);
		},
		cancel: function(service_id, vars, callback){
			return blesta.request('get', 'services/cancel', {
				service_id : service_id,
				vars: vars
			}, callback);
		},
		unCancel: function(service_id, callback){
			return blesta.request('get', 'services/unCancel', {
				service_id : service_id,
			}, callback);
		},
	}
}