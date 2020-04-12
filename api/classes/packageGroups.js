'use strict';
/*
	http://source-docs.blesta.com/class-PackageGroups.html
	Package Group management

Model
*/

module.exports = function(blesta){
	const _ = require('lodash');

	return {
		getTypes: function(data, callback){
			return blesta.request('get', 'packageGroups/getTypes', callback);
		},
		getTypeCount: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'packageGroups/getTypeCount', _.defaults({
				company_id: company_id
			}, _.pick(data, ['type'])), callback);
		},
		get: function(package_group_id, callback){
			return blesta.request('get', 'packageGroups/get', {
				package_group_id: package_group_id
			}, callback);
		},
		getAll: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'packageGroups/getAll', _.defaults({
				company_id: company_id
			}, _.pick(data, ['page', 'type', 'order_by'])), callback);
		},
		getListCount: function(company_id, callback){
			return blesta.request('get', 'packageGroups/getTypeCount', {
				company_id: company_id
			}, callback);
		}
	};
};