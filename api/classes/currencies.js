'use strict';
/*
	http://source-docs.blesta.com/class-Currencies.html
	Currency Management
*/

module.exports = function(blesta){
	var _ = require('lodash');

	return {
		getList: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'currencies/getList', _.defaults({
				company_id: company_id
			}, _.pick(data, ['page', 'order_by'])), callback);
		},
		getListCount: function(company_id, callback){
			return blesta.request('get', 'currencies/getListCount', {
				company_id: company_id
			}, callback);
		},
		getAll: function(company_id, callback){
			return blesta.request('get', 'currencies/getAll', {
				company_id: company_id
			}, callback);
		},
		get: function(company_id, currency_code, callback){
			return blesta.request('get', 'currencies/get', {
				currency_code: currency_code,
				company_id: company_id
			}, callback);
		},
		getFormats: function(company_id, callback){
			return blesta.request('get', 'currencies/getFormats', callback);
		},
		convert: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('post', 'currencies/convert', _.defaults({
				company_id: company_id
			}, _.pick(data, ['amount', 'from_currency', 'to_currency'])), callback);
		},
		toDecimal: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('post', 'currencies/convert', _.defaults({
				company_id: company_id
			}, _.pick(data, ['value', 'currency', 'decimals'])), callback);
		},
		toCurrency: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('post', 'currencies/toCurrency', _.defaults({
				company_id: company_id
			}, _.pick(data, ['value', 'currency', 'prefix', 'suffix', 'code', 'with_separator', 'decimals'])), callback);
		},
		toCurrencyValue: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('post', 'currencies/toCurrency', _.defaults({
				company_id: company_id
			}, _.pick(data, ['value', 'currency', 'with_separator', 'decimals'])), callback);
		},
		getExchangeRateProcessors: function(callback){
			return blesta.request('get', 'currencies/getExchangeRateProcessors', callback);
		},
		updateRates: function(callback){
			return blesta.request('post', 'currencies/updateRates', callback);
		}
	}
}