/**
 * 汉语转拼音
 * 
 * <br>
 * 汉语转拼音多种方式的支持： 1、在输入框输入支持 <input data-pinyin="#groupKey" />
 * 
 * 2、在js中调用 $("#name").blur(function() {
 *  var pinyin = new ChineseToPinyin();
 *  pinyin.getPinyin( {
 *    param : { type : 'spelling', 
 *   				chinese : $(this).val() 
 *   			},
 *    callback :function(data) { 
 *   	$("#groupKey").val(data);
 *     } });
 *  });
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-11-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var Pinyin = function(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, Pinyin.DEFAULTS, options);
	};
	Pinyin.DEFAULTS = {
		type : 'initial',// initial:首字母，spelling：全拼。默认为initial
		mode : 'all',// first:多音字第一个，all：多音字全部。默认为first
		hasval : true // 有值是否返回
	};
	Pinyin.prototype = {
		toggle : function() {
			var me = this, options = this.$element.data("pinyin"), 
				chinese = this.$element.val();
			try {
				options = eval('(' + options + ')');
				this.options = $.extend({}, this.options, options);
			} catch (e) {
				this.options.target = options;
			}
			var targetVal = $(me.options.target).val();
			if (me.options.hasval && !$.isEmpty(targetVal))
				return;
			this.getPinyin({
				param : {
					type : this.options.type,
					mode : this.options.mode,
					chinese : chinese
				},
				callback : function(val) {
					var target =$(me.options.target);
					target.val(val);
					target.blur();
				}
			});
		},
		/**
		 * 获取拼音
		 * 
		 * @param option
		 */
		getPinyin : function(option) {
			var url = __ctx + "/pinyinServlet";
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
						&& option, data = new Pinyin(this, options);

				if (option == 'toggle')
					data.toggle();
				else
					data.getPinyin(option);
			});
		} else {
			return new Pinyin(this, option);
		}
	}
	ChineseToPinyin = Plugin;
	ChineseToPinyin.Constructor = Pinyin;

	// data-pinyin 这个监听
	$(document).on('blur', 'input[data-pinyin]', function(e) {
		Plugin.call($(e.target), 'toggle');
	});
})();
