'use strict';
/*
	~blesta/public/plugins/support_manager/models/support_manager_kb_categories.php
	Knowledgebase article categories from the Support Manager plugin.
*/

module.exports = function(blesta){
	const _ = require('lodash');

	return {
		add: function(data, callback){
			return blesta.request('get', 'support_manager.SupportManagerTickets/add', _.pick(data, ['vars', 'require_email']), callback);
		},
		edit: function(ticket_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/edit', _.defaults({
				ticket_id: ticket_id
			}, _.pick(data, ['vars', 'log'])), callback);
		},
		editMultiple: function(ticket_ids, vars, callback){
			// assume object key(id) => values(vars)
			if(ticket_ids && !vars){
				vars = _.values(ticket_ids);
				ticket_ids = _.keys(ticket_ids);
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/editMultiple', {
				ticket_ids: ticket_ids,
				vars: vars
			}, callback);
		},
		close: function(ticket_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/close', _.defaults({
				ticket_id: ticket_id
			}, _.pick(data, ['by_staff_id'])), callback);
		},
		addReply: function(ticket_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/addReply', _.defaults({
				ticket_id: ticket_id
			}, _.pick(data, [
				'vars',
				'files',
				'new_ticket',
				'staff_id'
			])), callback);
		},
		merge: function(ticket_id, tickets, callback){
			return blesta.request('get', 'support_manager.SupportManagerTickets/merge', {
				ticket_id: ticket_id,
				tickets: tickets
			}, callback);
		},
		split: function(ticket_id, replies, callback){
			return blesta.request('get', 'support_manager.SupportManagerTickets/split', {
				ticket_id: ticket_id,
				replies: replies
			}, callback);
		},
		getStatusCount: function(status, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/getStatusCount', _.defaults({
				status: status
			}, _.pick(data, ['staff_id', 'client_id'])), callback);
		},
		get: function(ticket_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/get', _.defaults({
				status: status
			}, _.pick(data, ['get_replies', 'reply_types', 'staff_id'])), callback);
		},
		getTicketByCode: function(code, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/getTicketByCode', _.defaults({
				code: code
			}, _.pick(data, ['get_replies', 'reply_types'])), callback);
		},
		getList: function(status, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/getList', _.defaults({
				status: status
			}, _.pick(data, ['staff_id', 'client_id', 'page', 'order_by', 'get_replies', 'reply_types'])), callback);
		},
		getListCount: function(status, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/getListCount', _.defaults({
				status: status
			}, _.pick(data, ['staff_id', 'client_id'])), callback);
		},
		search: function(query, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/search', _.defaults({
				query: query
			}, _.pick(data, ['staff_id', 'page', 'order_by'])), callback);
		},
		searchByCode: function(query, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/searchByCode', _.defaults({
				query: query
			}, _.pick(data, ['staff_id', 'status', 'page', 'order_by'])), callback);
		},
		getSearchCount: function(query, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/getSearchCount', _.defaults({
				query: query
			}, _.pick(data, ['staff_id'])), callback);
		},
		searchTickets: function(query, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'support_manager.SupportManagerTickets/searchTickets', _.defaults({
				query: query
			}, _.pick(data, ['staff_id'])), callback);
		},
		getPriorities: function(callback){
			return blesta.request('get', 'support_manager.SupportManagerTickets/getPriorities', {}, callback);
		},
		getStatuses: function(callback){
			return blesta.request('get', 'support_manager.SupportManagerTickets/getStatuses', {}, callback);
		},
		getReplyTypes: function(callback){
			return blesta.request('get', 'support_manager.SupportManagerTickets/getReplyTypes', {}, callback);
		}
	};
};