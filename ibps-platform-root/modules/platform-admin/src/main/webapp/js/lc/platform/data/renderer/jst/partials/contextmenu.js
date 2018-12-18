window.JST["partials/contextmenu"] = function(__obj) {
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
						
			//功能按钮
				_print(_safe('<div id="'+this.getViewId()+'SubMenu" class="bootstrap-contextmenu">'
							+'<ul class="dropdown-menu" role="menu">'
							+'</ul>'
							+'</div>'));

					_print(_safe('<div id="'+this.getViewId()+'RootMenu"class="bootstrap-contextmenu">'
							+'<ul class="dropdown-menu" role="menu">'
							+'</ul>'
							+'</div>'));
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