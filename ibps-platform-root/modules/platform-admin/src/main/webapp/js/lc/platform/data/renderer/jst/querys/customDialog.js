// 查询字段--自定义对话框
	window.JST["query_fields/customDialog"] = function(__obj) {
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
				var name = this.model.getName(), 
					fieldName = this.model.getFieldName(), 
					dialogType = this.model.getDialogType(),
		    	 	icon = this.model.getIcon();

				_print(_safe('<div class="input-group " data-toggle="customdialog">'));
				_print(_safe('<input type="hidden" name="Q^' + fieldName
						+ '^SL"  id="' + name + 'ID"  value=""/> '));
		       	  _print(_safe('<input type="text"\n     name="' + fieldName
							+ '"  id="' + name + '"'));
		       	  
  				_print(_safe('\n'));
				
		  	      _print(_safe('\n  readonly="readonly"      class="form-control " />'));

	    	   // 图标
	     	  _print(_safe('<span class="input-group-addon"   ><i class="'+icon+'"></i></span></div>\n\n'));
				
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