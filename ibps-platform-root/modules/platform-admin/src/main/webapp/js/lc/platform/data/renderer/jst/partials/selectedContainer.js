/**
 * 选中区域
 */
window.JST["partials/selected-container"] = function(__obj) {
	var _safe = function(value) {
		if (typeof value === 'undefined' && value == null)
			value = '';
		var result = new String(value);
		result.ecoSafe = true;
		return result;
	};
	return (function() {
		var __out = [], __self = this, _print = function(value) {
			if (typeof value !== 'undefined' && value != null)
				__out.push(value.ecoSafe ? value : __self.escape(value));
		}, _capture = function(callback) {
			var out = __out, result;
			__out = [];
			callback.call(this);
			result = __out.join('');
			__out = out;
			return _safe(result);
		};

		(function() {
			_print(_safe('	<div class="selector-wrapper"><div  class ="selector-container" name="selected-container" ></div></div>'));
		}).call(this);

		return __out.join('');
	}).call((function() {
		var obj = {
			escape : function(value) {
				return ('' + value).replace(/&/g, '&amp;')
						.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(
								/"/g, '&quot;');
			},
			safe : _safe
		}, key;
		for (key in __obj)
			obj[key] = __obj[key];
		return obj;
	})());
};

/**
 * 选中区域-数据模版
 */
window.JST["partials/selected-data-template"] = function(__obj,__params) {
	var _safe = function(value) {
		if (typeof value === 'undefined' && value == null)
			value = '';
		var result = new String(value);
		result.ecoSafe = true;
		return result;
	};
	return (function() {
		var __out = [], __self = this, _print = function(value) {
			if (typeof value !== 'undefined' && value != null)
				__out.push(value.ecoSafe ? value : __self.escape(value));
		}, _capture = function(callback) {
			var out = __out, result;
			__out = [];
			callback.call(this);
			result = __out.join('');
			__out = out;
			return _safe(result);
		};

		(function() {
			if ($.isEmpty(__params) || $.isEmpty(__params.data))
				return;
			var data = __params.data,
				id = data[FormOptions.t.DATA_KEY.ID],
				title = data[FormOptions.t.DATA_KEY.TITLE];
			if ($.isEmpty(id))
				return;

			_print(_safe('<span class="attach-span selected-span" data-id="'
					+ id
					+ '">'
					+ '<span title="'
					+ title
					+ '">'
					+ title
					+ '</a>&nbsp;'
					+ '<a class="btn btn-ms js-remove-selected" title="移除" href="javascript:void(0);"    ><i class="fa fa-remove"></i></a>'
					+ '</span>' + '</span>'));

		}).call(this);

		return __out.join('');
	}).call((function() {
		var obj = {
			escape : function(value) {
				return ('' + value).replace(/&/g, '&amp;')
						.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(
								/"/g, '&quot;');
			},
			safe : _safe
		}, key;
		for (key in __obj)
			obj[key] = __obj[key];
		return obj;
	})());
};
