'use strict';
/*
	~blesta/public/plugins/support_manager/models/support_manager_kb_articles.php
	Knowledgebase articles from the Support Manager plugin.
*/

module.exports = function(blesta){
	const _ = require('lodash');

	return {
		vote: function(article_id, direction, callback){
			return blesta.request('get', 'support_manager.SupportManagerKbArticles/vote', {
				article_id: article_id,
				direction: direction || 'up',
			}, callback);
		},
		get: function(article_id, callback){
			return blesta.request('get', 'support_manager.SupportManagerKbArticles/get', {
				article_id: article_id,
			}, callback);
		},
		getAll: function(data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerKbArticles/getAll', _.pick(data, ['company_id', 'category_id', 'access']), callback);
		},
		getPopular: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerKbArticles/getPopular', _.defaults({
				company_id: company_id,
			}, _.pick(data, ['category_id', 'access', 'max_articles'])), callback);
		},
		search: function(company_id, query, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerKbArticles/search', _.defaults({
				company_id: company_id,
				query: query,
			}, _.pick(data, ['access', 'page'])), callback);
		},
		getSearchCount: function(company_id, query, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerKbArticles/getSearchCount', _.defaults({
				company_id: company_id,
				query: query,
			}, _.pick(data, ['access'])), callback);
		},
	};
};