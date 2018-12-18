/**
 * 下划线转驼峰
 * 
 * <br>
 * 下划线转驼峰多种方式的支持： 
 * 1、在输入框输入支持 <input data-camel="#groupKey" /> <input data-camel="#groupKey，#userKey" />
 * 
 * 2、在js中调用 $("#name").blur(function() {
 *  var camel = new CamelCase();
 *  camel.getCamel({
 *    param : { 
 *    	  type : 'underscore', 
 *    	  underscore : $(this).val() 
 *    },
 *    callback :function(data) {
 *   	$("#groupKey").val(data);
 *     }});
 *  });
 * 
 * <pre>
 * 作者:eddy
 * 邮箱:1546077710@qq.com
 * 日期:2017-06-16-下午2:03:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var CamelCase = function(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, CamelCase.DEFAULTS, options);
	};
	CamelCase.DEFAULTS = {
		source : 'underscore',//underscore camel
		hasval : true // 有值是否返回
	};
	CamelCase.prototype = {
		toggle : function() {
			var me = this, options = this.$element.data("camel"), 
			underscore = this.$element.val();
			try {
				options = eval('(' + options + ')');
				this.options = $.extend({}, this.options, options);
			} catch (e) {
				this.options.target = options;
			}
			var targetVal = $(me.options.target).val();
			if (me.options.hasval && !$.isEmpty(targetVal))
				return;
			this.getCamel({
				param : {
					type : this.options.type,
					underscore : underscore
				},
				callback : function(val) {
					var target =$(me.options.target);
					target.val(val);
					target.blur();
				}
			});
		},
		/**
		 * 获取驼峰
		 * 
		 * @param option
		 */
		getCamel : function(option) {
			var url = __ctx + "/camelServlet";
			url = url.getNewUrl();
			$.ajax({
				type : "POST",
				url : url,
				data : option.param,
				success : function(data) {
					option.callback.call(this, data);
				}
			});
		}
	};

	function Plugin(option) {
		if (this.length > 0) {
			return this.each(function() {
				var $this = $(this), options = typeof option == 'object'
						&& option, data = new CamelCase(this, options);

				if (option == 'toggle')
					data.toggle();
				else
					data.getCamel(option);
			});
		} else {
			return new CamelCase(this, option);
		}

	}
	CamelToCase = Plugin;
	CamelToCase.Constructor = CamelCase;

	// data-camel 这个监听
	$(document).on('blur', 'input[data-camel]', function(e) {
		Plugin.call($(e.target), 'toggle');
	});
})();
