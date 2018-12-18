	window.JST["query_fields/text"] = function(__obj) {
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

				_print(_safe('<input type="text"  name="Q^'
						+ this.model.getFieldName()
						+ '^SL"  class="form-control"  /> '));

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
	
	
window.JST["query_fields/hidden"] = function(__obj) {
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
			var refField  = this.model.get("ref_field"),
				name = this.model.getFieldName();
			if($.isNotEmpty(refField)){

				_print(_safe('<input type="hidden"  ref-field="'+name
						+'" name="Q^'
						+ name
						+ '^SIN"  class="form-control"  /> '));
			}else{
				_print(_safe('<input type="hidden" '
						+' name="Q^'
						+ name
						+ '^S"  class="form-control"  /> '));
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
	

	
	