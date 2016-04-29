'use strict';
/*
	~blesta/public/plugins/support_manager/models/support_manager_kb_categories.php
	Knowledgebase article categories from the Support Manager plugin.
*/

module.exports = function(blesta){
	var _ = require('lodash');

	return {
		getItemCount: function(category_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerKbCategories/getItemCount', _.defaults({
				category_id: category_id,
			}, _.pick(data, ['access'])), callback);
		},
		get: function(category_id, callback){
			return blesta.request('get', 'support_manager.SupportManagerKbCategories/get', {
				category_id: category_id
			}, callback);
		},
		getAll: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerKbCategories/getAll', _.defaults({
				company_id: company_id
			}, _.pick(data, ['parent_id', 'categorize', 'access'])), callback);
		},
		getAllParents: function(category_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerKbCategories/getAllParents', _.defaults({
				category_id: category_id,
			}, _.pick(data, ['exclude'])), callback);
		},
		getCategories: function(data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerKbCategories/getCategories', _.pick(data, ['category_id', 'company_id']), callback);
		}
	}
}