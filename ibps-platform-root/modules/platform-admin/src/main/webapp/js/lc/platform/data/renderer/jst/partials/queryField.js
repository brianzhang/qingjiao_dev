// 查询字段
	window.JST["partials/response_query_field"] = function(__obj) {
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
				if (this.field_type == 'hidden' ) {
					_print(_safe(JST["query_fields/" + this.field_type](this)));
				} else if (this.field_type == 'datePicker' ||this.field_type == 'dateRange') {// 日期范围
					_print(_safe(JST["query_fields/" + this.field_type](this)));
				} else if ( this.field_type == 'select' 
					|| this.field_type == 'radio') {// 单选、下拉
					_print(_safe(JST["partials/search-label"](this)));
					_print(_safe(JST["query_fields/select"](this)));
				} else if ( this.field_type == 'checkbox' ) {//多选
					_print(_safe(JST["partials/search-label"](this)));
					_print(_safe(JST["query_fields/checkbox"](this)));
				} else if ( this.field_type == 'selector'
						|| this.field_type == 'dictionary'
						|| this.field_type == 'address') {// 选择器
					_print(_safe(JST["partials/search-label"](this)));
					_print(_safe(JST["query_fields/" + this.field_type](this)));
				}else if (this.field_type == 'customDialog') {// 自定义对话框
					_print(_safe(JST["partials/search-label"](this)));
					_print(_safe(JST["query_fields/" + this.field_type](this)));
				
				}else {// 其他
					_print(_safe(JST["partials/search-label"](this)));
					_print(_safe(JST["query_fields/text"](this)));
				}

			}).call(this);

			return __out.join('');
		}).call((function() {
			var obj = {
				escape : function(value) {
					return ('' + value).replace(/&/g, '&amp;').replace(/</g,
							'&lt;').replace(/>/g, '&gt;').replace(/"/g,
							'&quot;');
				},
				safe : _safe
			}, key;
			for (key in __obj)
				obj[key] = __obj[key];
			return obj;
		})());
	};