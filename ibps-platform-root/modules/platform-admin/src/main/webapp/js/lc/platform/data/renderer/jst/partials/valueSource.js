if (!window.JST) {
	window.JST = {};
}
//值来源
window.JST["partials/valueSource"] = function(__obj) {
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
			_print(_safe('<div class="toolbar-panel ">'
						+'<div class="toolbar-box"><div class="toolbar-head clearfix">'
						+'		<div class="buttons">'
						+'			<a class="btn btn-primary fa fa-search js-search" 	href="javascript:void(0);"><span>搜索</span></a>'
		/*				+'			<a class="btn btn-primary fa fa-help js-help"  	href="javascript:void(0);"><span>帮助</span></a>'*/
						+'</div>'
						+'<div class="tools">'
						+'		<a href="javascript:void(0);" class="collapse"> <i class="bigger-180 fa  fa-angle-double-up"></i></a>'
						+'</div>'
						+'</div>'
						
						+'<div class="toolbar-body">'
						+'   <form role="form" class="search-form"  id="searchForm"> </form>'
						+'</div>'
					+'</div>'
					+'</div>'));
			
			_print(_safe('<div id="queryResults" style="display:none;"></div>'));
			
			_print(_safe('		<div class="jqGrid_wrapper" style="display:none">'
					+'<table  id="' + this.getViewId() + '" ></table>'
					+'</div>'));

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