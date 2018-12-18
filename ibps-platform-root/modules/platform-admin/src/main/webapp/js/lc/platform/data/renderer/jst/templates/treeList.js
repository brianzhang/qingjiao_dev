window.JST["templates/treeList"] = function(__obj) {
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
				//选择数据
				if(this.isDialog()){
					_print(_safe('<div class="ui-layout-north">'));
					
					_print(_safe(JST["partials/selected-container"](this)));
					
					_print(_safe('</div>'));		
				}
				
			//左树
				_print(_safe('<div class="ui-layout-west">'
						+'<div class=" layout-header">'
						+'	<h5>'+this.getTreeLabel()+'</h5>'
						+'	<div class="layout-tools">'
						+'		<a herf="javascript:void(0);" class="pinBtn"> <i class="fa fa-angle-double-left"></i>'
						+'		</a>'
						+'	</div>'
						+'</div>'));
			_print(_safe('<div class="compose-tree"></div>'));		
				
			_print(_safe('</div>'));	
			//右列表
			
			_print(_safe(' <div class="ui-layout-center">'));
			
			_print(_safe('<div class="compose-list"></div>'));		
			
			_print(_safe('</div>'));
			
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