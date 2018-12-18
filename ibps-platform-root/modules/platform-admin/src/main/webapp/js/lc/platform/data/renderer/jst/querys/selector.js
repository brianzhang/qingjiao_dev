// 查询字段选择器
	window.JST["query_fields/selector"] = function(__obj) {
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
				var bindId = this.model.getBindId(),
					bindName = this.model.getBindName(),
					name = this.model.getName(), 
					fieldName = this.model.getFieldName(), 
					selectorType = this.model.getSelectorType();

				_print(_safe('<div class="input-group ">'));
				if ($.isNotEmpty(bindId)) {
					_print(_safe('<input type="hidden" name="Q^' + bindName
							+ '^S"  id="' + bindId + '"  value=""/> '));
					_print(_safe('<input type="text" class="form-control search-selector"  id="'
							+ name
							+ '" name="'
							+ fieldName
							+ '" readonly="readonly"/> '
							+ '<span class="input-group-btn"> '
							+ '<button type="button" class="btn  btn-info btn-mm"  data-toggle="selector" data-type="'
							+ selectorType
							+ '" data-id="#'
							+ bindId
							+ '" data-name="#'
							+ name
							+ '" > '
							+ '<i class="fa fa-user"></i></button> '
							+ '</span> '));
				} else {
					_print(_safe('<input type="hidden" name="Q^' + fieldName
							+ '^SL"  id="' + name + 'ID"  value=""/> '));
					_print(_safe('<input type="text" class="form-control search-selector"  id="'
							+ name
							+ '" name="'
							+ fieldName
							+ '" readonly="readonly"/> '
							+ '<span class="input-group-btn"> '
							+ '<button type="button" class="btn  btn-info btn-mm"  data-toggle="selector" data-type="'
							+ selectorType
							+ '" data-id="#'
							+ name
							+ 'ID" data-name="#'
							+ name
							+ '" > '
							+ '<i class="fa fa-user"></i></button> '
							+ '</span> '));
				}
				_print(_safe('</div> '));

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