'use strict';
/*
	http://source-docs.blesta.com/class-Currencies.html
	Invoice management
*/

module.exports = function(blesta){
	var _ = require('lodash');

	return {
		add: function(vars, callback){
			return blesta.request('put', 'invoices/add', {
				vars: vars
			}, callback);
		},
		addRecurring: function(vars, callback){
			return blesta.request('put', 'invoices/addRecurring', {
				vars: vars
			}, callback);
		},
		edit: function(invoice_id, vars, callback){
			return blesta.request('put', 'invoices/edit', {
				invoice_id: invoice_id,
				vars: vars
			}, callback);
		},
		editRecurring: function(invoice_recur_id, vars, callback){
			return blesta.request('put', 'invoices/editRecurring', {
				invoice_recur_id: invoice_recur_id,
				vars: vars
			}, callback);
		},
		addFromRecurring: function(invoice_recur_id, client_settings , callback){
			return blesta.request('put', 'invoices/editRecurring', {
				invoice_recur_id: invoice_recur_id,
				client_settings: client_settings 
			}, callback);
		},
		deleteDraft: function(invoice_id, vars, callback){
			return blesta.request('delete', 'invoices/deleteDraft', {
				invoice_id: invoice_id
			}, callback);
		},
		deleteRecurring: function(invoice_recur_id , vars, callback){
			return blesta.request('delete', 'invoices/deleteRecurring', {
				invoice_recur_id: invoice_recur_id 
			}, callback);
		},
		createFromServices: function(data, callback){
			return blesta.request('put', 'invoices/createFromServices', _.pick(data, ['client_id', 'service_ids', 'currency', 'due_date', 'allow_pro_rata', 'services_renew']), callback);
		},
		appendServices: function(invoice_id, service_ids, callback){
			return blesta.request('put', 'invoices/createFromServices', {
				invoice_id: invoice_id,
				service_ids: service_ids
			}, callback);
		},
		setClosed: function(invoice_id, callback){
			return blesta.request('put', 'invoices/setClosed', {
				invoice_id: invoice_id
			}, callback);
		},
		get: function(invoice_id, callback){
			return blesta.request('get', 'invoices/get', {
				invoice_id: invoice_id
			}, callback);
		},
		getRecurring: function(invoice_recur_id, callback){
			return blesta.request('get', 'invoices/getRecurring', {
				invoice_recur_id: invoice_recur_id
			}, callback);
		},
		getRecurringFromInvoices: function(invoice_id, callback){
			return blesta.request('get', 'invoices/getRecurringFromInvoices', {
				invoice_id: invoice_id
			}, callback);
		},
		getLineItems: function(invoice_id, callback){
			return blesta.request('get', 'invoices/getLineItems', {
				invoice_id: invoice_id
			}, callback);
		},
		getRecurringLineItems: function(invoice_recur_id, callback){
			return blesta.request('get', 'invoices/getRecurringLineItems', {
				invoice_recur_id: invoice_recur_id
			}, callback);
		},
		getList: function(client_id , data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'invoices/getList', _.defaults({
				client_id : client_id 
			}, _.pick(data, ['status', 'page', 'order_by'])), callback);
		},
		getListCount: function(client_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'invoices/getListCount', _.defaults({
				client_id : client_id 
			}, _.pick(data, ['status'])), callback);
		},
		getAll: function(client_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'invoices/getAll', _.defaults({
				client_id : client_id 
			}, _.pick(data, ['status', 'currency', 'order_by'])), callback);
		},
		getAllWithService: function(client_id, service_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'invoices/getAllWithService', _.defaults({
				client_id : client_id 
			}, _.pick(data, ['status', 'order_by'])), callback);
		},
		search: function(query, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'invoices/search', _.defaults({
				query : query 
			}, _.pick(data, ['page'])), callback);
		},
		getSearchCount: function(query, callback){
			return blesta.request('get', 'invoices/getSearchCount', {
				query : query 
			}, callback);
		},
		getAllRecurring: function(client_id callback){
			return blesta.request('get', 'invoices/getAllRecurring', {
				client_id : client_id 
			}, callback);
		},
		getAllRenewingRecurring: function(client_group_id  callback){
			return blesta.request('get', 'invoices/getAllRenewingRecurring', {
				client_group_id  : client_group_id  
			}, callback);
		},
		getRecurringList: function(client_id  data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'invoices/getRecurringList', _.defaults({
				client_id : client_id 
			}, _.pick(data, ['page', 'order'])), callback);
		},
		getRecurringListCount: function(client_id  callback){
			return blesta.request('get', 'invoices/getRecurringListCount', {
				client_id : client_id 
			}, callback);
		},
		getRecurringInfo: function(invoice_id  callback){
			return blesta.request('get', 'invoices/getRecurringInfo', {
				invoice_id : invoice_id 
			}, callback);
		},
		getAutodebitDate: function(invoice_id  callback){
			return blesta.request('get', 'invoices/getAutodebitDate', {
				invoice_id : invoice_id 
			}, callback);
		},
		createPayHash: function(client_id, invoice_id, callback){
			return blesta.request('post', 'invoices/createPayHash', {
				client_id: client_id,
				invoice_id: invoice_id
			}, callback);
		},
		verifyPayHash: function(client_id, invoice_id, hash, callback){
			return blesta.request('post', 'invoices/createPayHash', {
				client_id: client_id,
				invoice_id: invoice_id,
				hash: hash
			}, callback);
		},
	}
}