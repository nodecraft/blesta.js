'use strict';
/*
	http://source-docs.blesta.com/class-Accounts.html
	Accounts contain both ACH and Credit Card account information. Permits accounts to be fetched, added, edited, and deleted.
	Some accounts may require processing with remote gateways when added or edited. In such instances certain account details
	are not stored within the system, but only off-site on the remote gateway.
*/

module.exports = function(blesta){
	var _ = require('lodash');

	return {
		getListCc: function(contact_id, data, callback){
			return blesta.request('get', 'clients/getListCc', _.defaults({
				client_id: contact_id
			}, _.pick(data, ['sortby', 'order'])), callback);
		},
		getAllCc: function(contact_id, callback){
			return blesta.request('get', 'clients/getAllCc', {
				client_id: contact_id
			}, callback);
		},
		getAllCcByClient: function(client_id, callback){
			return blesta.request('get', 'clients/getAllCcByClient', {
				client_id: client_id
			}, callback);
		},
		getCc: function(account_id, data, callback){
			return blesta.request('get', 'clients/getCc', _.defaults({
				client_id: client_id
			}, _.pick(data, ['decrypt', 'passphrase', 'staff_id'])), callback);
		},
		getClientReferenceId: function(client_id, gateway_id, callback){
			return blesta.request('get', 'clients/getClientReferenceId', {
				client_id: client_id,
				gateway_id: gateway_id
			}, callback);
		},
		addCc: function(vars, callback){
			return blesta.request('put', 'clients/addCc', {
				vars: vars
			}, callback);
		},
		verifyCc: function(vars, callback){
			return blesta.request('post', 'clients/verifyCc', {
				vars: vars
			}, callback);
		},
		editCc: function(account_id, vars, callback){
			return blesta.request('post', 'clients/editCc', {
				account_id: account_id,
				vars: vars
			}, callback);
		},
		deleteCc: function(account_id, callback){
			return blesta.request('delete', 'clients/deleteCc', {
				account_id: account_id
			}, callback);
		},
		getCardsExpireSoon: function(date){
			return blesta.request('get', 'clients/getCardsExpireSoon', {
				date: blesta.createDate(date)
			}, callback);
		},
		getTypes: function(){
			return blesta.request('get', 'clients/getTypes', callback);
		},
		getCcTypes: function(){
			return blesta.request('get', 'clients/getCcTypes', callback);
		},
		validateCcType: function(type){
			return blesta.request('post', 'clients/validateCcType', {
				type: type
			}, callback);
		},
		creditCardType: function(card_number){
			return blesta.request('post', 'clients/creditCardType', {
				card_number: card_number
			}, callback);
		},
		luhnValid: function(card_number ){
			return blesta.request('post', 'clients/luhnValid', {
				card_number : card_number 
			}, callback);
		}
	};
};