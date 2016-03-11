'use strict';
/*
	http://source-docs.blesta.com/class-Contacts.html
	Contact management
*/

module.exports = function(blesta){
	var _ = require('lodash');

	return {
		add: function(vars, callback){
			return blesta.request('put', 'contacts/add', {
				vars: vars
			}, callback);
		},
		edit: function(contact_id, vars, callback){
			return blesta.request('put', 'contacts/edit', {
				contact_id: contact_id,
				vars: vars
			}, callback);
		},
		delete: function(contact_id, callback){
			return blesta.request('delete', 'contacts/delete', {
				contact_id: contact_id
			}, callback);
		},
		get: function(contact_id, callback){
			return blesta.request('get', 'contacts/get', {
				contact_id: contact_id
			}, callback);
		},
		getList: function(client_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'contacts/get', _.defaults({
				client_id: client_id
			}, _.pick(data, ['page', 'order'])), callback);
		},
		getListCount: function(client_id, callback){
			return blesta.request('get', 'contacts/get', {
				client_id: client_id
			}, callback);
		},
		getAll: function(client_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'contacts/get', _.defaults({
				client_id: client_id
			}, _.pick(data, ['contact_type', 'order'])), callback);
		},
		getContactTypes: function(callback){
			return blesta.request('put', 'contacts/getContactTypes', callback);
		},
		getType: function(contact_type_id, callback){
			return blesta.request('put', 'contacts/getType', {
				contact_type_id: contact_type_id
			}, callback);
		},
		getTypes: function(company_id, callback){
			return blesta.request('put', 'contacts/getType', {
				company_id: company_id
			}, callback);
		}
	}
}