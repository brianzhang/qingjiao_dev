window.JST["query_fields/dateRange"] = function(__obj) {
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
				_print(_safe(JST["partials/search-label"](this)));
				_print(_safe('<input type="text"  name="Q^'
						+ this.model.getFieldName()
						+ '^DL"  class="form-control  dateRange" datefmt="'
						+ this.model.getFieldOptions("datefmt")
						+'"  datetype="begin"/> '));
				_print(_safe('<label   class="search-label">至：</label>'));
				_print(_safe('<input type="text"  name="Q^'
						+ this.model.getFieldName()
						+ '^DG"  class="form-control dateRange"  datefmt="'
						+ this.model.getFieldOptions("datefmt")
						+'"  datetype="end"/> '));
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