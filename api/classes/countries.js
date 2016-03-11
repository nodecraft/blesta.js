'use strict';
/*
	http://source-docs.blesta.com/class-Countries.html
	Countries adhere to ISO 3166-1 and contain English and native country name (when differing from English)
*/

module.exports = function(blesta){
	var _ = require('lodash');

	return {
		getList: function(data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'countries/getList', _.pick(data, ['sort_by', 'order']), callback);
		},
		get: function(code, callback){
			return blesta.request('get', 'countries/get', {
				code: code
			}, callback);
		},
		validateAlpha3InUse: function(data, callback){
			return blesta.request('post', 'countries/get', _.pick(data, ['alpha3', 'alpha2']), callback);
		}
	}
}