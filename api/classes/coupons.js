'use strict';
/*
	http://source-docs.blesta.com/class-Coupons.html
	Coupon management
*/

module.exports = function(blesta){
	var _ = require('lodash');

	return {
		getList: function(company_id, data, callback){
			if(data && !callback){
				callback = data;
				data = {};
			}
			return blesta.request('get', 'coupons/getList', _.defaults({
				company_id: company_id
			}, _.pick(data, ['page', 'order_by'])), callback);
		},
		getListCount: function(company_id, callback){
			return blesta.request('get', 'coupons/getListCount', {
				company_id: company_id
			}, callback);
		},
		getCouponAmounts: function(coupon_id, callback){
			return blesta.request('get', 'coupons/getCouponAmounts', {
				coupon_id: coupon_id
			}, callback);
		},
		get: function(coupon_id, callback){
			return blesta.request('get', 'coupons/get', {
				coupon_id: coupon_id
			}, callback);
		},
		getForPackages: function(data, callback){
			return blesta.request('post', 'coupons/getForPackages', _.pick(data, ['code', 'coupon_id', 'packages']), callback);
		},
		add: function(vars, callback){
			return blesta.request('put', 'coupons/add', {
				vars: vars
			}, callback);
		},
		edit: function(coupon_id, vars, callback){
			return blesta.request('put', 'coupons/edit', {
				coupon_id: coupon_id,
				vars: vars
			}, callback);
		},
		delete: function(coupon_id, vars, callback){
			return blesta.request('delete', 'coupons/delete', {
				coupon_id: coupon_id
			}, callback);
		},
		incrementUsage: function(coupon_id, callback){
			return blesta.request('post', 'coupons/incrementUsage', {
				coupon_id: coupon_id
			}, callback);
		}
	};
};