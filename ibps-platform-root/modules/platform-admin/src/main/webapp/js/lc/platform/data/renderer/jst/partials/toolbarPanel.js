// 顶部面板
	window.JST["partials/toolbar-panel"] = function(__obj) {
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
				_print(_safe('<div  class="toolbar-panel ">'
									+ '<div class="toolbar-box">'
										+ '<div class="toolbar-head clearfix">'
												+ '<div class="buttons"> </div>'
						+ '<div class="tools">'));
				if(this.hasFilterCondition()){
					_print(_safe( '<div class="dropdown tools-dropdown  ">'
							+ '<a data-target="#" data-toggle="dropdown" role="button" >'
							+ '<span data-filter-condition>'+ this.getCurrentFilterCondition()+'</span>'
							+ '<span class="caret"></span>'
							+ '</a>'
							+ '<ul class="dropdown-menu dropdown-menu-right " >'));
					
								_.each(this.getFilterCondition(),function(n){
									_print(_safe('<li><a href="javascript:void(0);" data-filter-key="'+n.key+'">'+n.label+'</a></li>'));
								});
		
					_print(_safe(' </ul>'
							+ '</div>'));
				}
								
				_print(_safe( '<a href="javascript:void(0);" class="collapse">'+ '<i class="bigger-180 fa  fa-angle-double-up"></i>'+ '</a>' 
								+ '</div></div>'
						+ '<div class="toolbar-body hidden" >'
						+ '<form role="form" class="search-form"></form>'
						+ '</div></div></div> '));
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