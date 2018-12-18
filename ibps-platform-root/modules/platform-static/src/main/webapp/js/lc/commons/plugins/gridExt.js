/* ========================================================================
 *  jqGrid  扩展
 * ========================================================================
 * Copyright 2011-2015 lc, Inc.
 * 作者：hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-10-20-上午11:15:52
 * 版权：广州流辰信息技术有限公司版权所有
 * ======================================================================== */
var GridExt = null;
;(function($, window, document, undefined) {

	var pluginName = "GridExt", 
		me, defaults = {
			datatype : "json",
			mtype : "POST",
			autowidth : true,
			shrinkToFit : true,
			multiselect : true,
			pagerpos : 'left',
			rowNum : 20,
			rowList : [ 10, 20, 50, 100 ],
			viewrecords : true
		};

	function Plugin(element, options) {
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.element = element;
		this.$grid = $(this.element);
		this.init();
	}

	Plugin.prototype = {
		init : function() {
			GridExt = this;
			me = this;
			//初始化表格
			this.initGrid();
		},
		/**
		 * 初始化列表
		 */
		initGrid : function() {
			this.$grid.jqGrid(this.options);
		}
	};
		$.fn[pluginName] = function(options) {
			return this.each(function() {
						if (!$.data(this, "plugin_" + pluginName)) {
							$.data(this, "plugin_" + pluginName, new Plugin(this,options));
						}
					});
		};

	})(jQuery, window, document);
