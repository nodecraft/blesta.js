'use strict';
/*
	http://source-docs.blesta.com/class-Clients.html
	Client management
*/

module.exports = function(blesta){
	var _ = require('lodash');

	return {
		create: function(vars, callback){
			return blesta.request('put', 'clients/create', {
				vars: vars
			}, callback);
		},
		create: function(vars, callback){
			return blesta.request('put', 'clients/create', {
				vars: vars
			}, callback);
		},
		add: function(vars, callback){
			return blesta.request('put', 'clients/add', {
				vars: vars
			}, callback);
		},
		edit: function(client_id, vars, callback){
			return blesta.request('post', 'clients/edit', {
				client_id: client_id,
				vars: vars
			}, callback);
		},
		delete: function(client_id, callback){
			return blesta.request('delete', 'clients/delete', {
				client_id: client_id
			}, callback);
		},
		delete: function(client_id, callback){
			return blesta.request('delete', 'clients/delete', {
				client_id: client_id
			}, callback);
		},
		setRestrictedPackages: function(client_id, package_client_ids, callback){
			return blesta.request('put', 'clients/setRestrictedPackages', {
				client_id: client_id,
				package_client_ids: package_client_ids
			}, callback);
		},
		deleteRestrictedPackages: function(client_id, callback){
			return blesta.request('delete', 'clients/deleteRestrictedPackages', {
				client_id: client_id
			}, callback);
		},
		getRestrictedPackages: function(client_id, callback){
			return blesta.request('get', 'clients/getRestrictedPackages', {
				client_id: client_id
			}, callback);
		},
		getNoteList: function(client_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'clients/getNoteList', _.defaults({
				client_id: client_id
			}, _.pick(data, ['page', 'order_by'])), callback);
		},
		setDebitAccountFailure: function(client_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('put', 'clients/setDebitAccountFailure', _.defaults({
				client_id: client_id
			}, _.pick(data, ['type', 'account_id'])), callback);
		},
		resetDebitAccountFailure: function(client_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'clients/getNoteList', _.defaults({
				client_id: client_id
			}, _.pick(data, ['type', 'account_id'])), callback);
		},
		get: function(client_id, callback){
			return blesta.request('get', 'clients/get', {
				client_id: client_id
			}, callback);
		},
		getAll: function(data, callback){
			return blesta.request('get', 'clients/get', _.pick(data, ['status', 'client_group_id']), callback);
		},
		search: function(query, page, callback){
			if(page && !callback){
				callback = page
				page = 1;
			}
			return blesta.request('get', 'clients/search', {
				query: query,
				page: page
			}, callback);
		},
		getSearchCount: function(query, callback){
			return blesta.request('get', 'clients/getSearchCount', {
				query: query
			}, callback);
		},
		getMailLogEntry: function(client_id, email_log_id, callback){
			return blesta.request('get', 'clients/getMailLogEntry', {
				client_id: client_id,
				email_log_id: email_log_id
			}, callback);
		},
		getMailLogList: function(client_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'clients/getMailLogList', _.defaults({
				client_id: client_id
			}, _.pick(data, ['page', 'order_by'])), callback);
		},
		getMailLogListCount: function(client_id, data, callback){
			return blesta.request('get', 'clients/getMailLogListCount', {
				client_id: client_id
			}, callback);
		},
		usedCurrencies: function(client_id, callback){
			return blesta.request('get', 'clients/usedCurrencies', {
				client_id: client_id
			}, callback);
		}
	}
}