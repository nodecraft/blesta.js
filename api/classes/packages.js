'use strict';
/*
	http://source-docs.blesta.com/class-PackageGroups.html
	Package Group management

Model
*/

module.exports = function(blesta){
	var _ = require('lodash');

	return {
		get: function(package_id, callback){
			return blesta.request('get', 'packages/get', {
				package_id: package_id
			} callback);
		},
		getByPricingId: function(package_pricing_id, callback){
			return blesta.request('get', 'packages/getByPricingId', {
				package_pricing_id: package_pricing_id
			} callback);
		},
		getAll: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'packages/getAll', _.defaults({
				company_id: company_id
			}, _.pick(data, ['order', 'status', 'type'])), callback);
		},
		getList: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'packages/getList', _.defaults({
				company_id: company_id
			}, _.pick(data, ['page', 'order_by', 'status'])), callback);
		},
		getList: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'packages/getList', _.defaults({
				company_id: company_id
			}, _.pick(data, ['page', 'order_by', 'status'])), callback);
		},
		search: function(query, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'packages/search', _.defaults({
				query : query 
			}, _.pick(data, ['page'])), callback);
		},
		getSearchCount: function(query, callback){
			return blesta.request('get', 'packages/getSearchCount', {
				query : query 
			}, callback);
		},
	}
}