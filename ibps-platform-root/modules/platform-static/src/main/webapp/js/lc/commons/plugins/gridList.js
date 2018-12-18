/* ========================================================================
 *  jqGrid 列表 扩展
 * ========================================================================
 * Copyright 2011-2015 lc, Inc.
 * 作者：hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-10-20-上午11:15:52
 * 版权：广州流辰信息技术有限公司版权所有
 * ======================================================================== */
var GridList = null;
;(function($, window, document, undefined) {

	var pluginName = "GridList", 
		me, defaults = {
			datatype : "json",
			mtype : "POST",
			autowidth : true,
			shrinkToFit : true,
			multiselect : true,
			pagerpos : 'left',
			rowNum : 20,
			rowList : [ 10, 20, 50, 100 ],
			viewrecords : true,
			initRowOptions:function(){
				try{
					var rowOps = 	$(".rowOps",this);
					if(rowOps.length >0)
						rowOps.each(function() {
							$(this).rowOps();
						});
				}catch(e){}
			},
			loadComplete:function(){
				if(this.p.initRowOptions)
					this.p.initRowOptions.apply(this, arguments);
			},loadError:function(xhr, status, error){
				DialogUtil.error('数据加载异常：'+error);
			}
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
			GridList = this;
			me = this;
			// 处理收缩、展开
			this.handlerCollapseExpand();
			//初始化表格
			this.initGrid();
			// 处理搜索
			this.handlerSearch();
			// 处理回车查询事件
			this.handleSearchKeyPress();
			//处理编辑
			this.handlerEditor();
			// 删除选中行
			this.handlerRemoveSelect();
			// 处理管理列按钮
			this.handlerRowAction();

		},
		/**
		 * 初始化列表
		 */
		initGrid : function() {
			this.$grid.jqGrid(this.options);
			this.resizeGridSize();
		},
		/**
		 * 重置grid尺寸
		 * @param offset
		 */
		resizeGridSize : function() {
			var me = this,$grid= me.$grid;
			setTimeout(function() {
					//窗口高度-距离顶部高度-标题-分页 
					var newGridHeight = $(window).height()
								-$($grid,".jqGrid_wrapper").offset().top 
								-  30-30;
					$grid.jqGrid("setGridHeight", newGridHeight);
					$grid.jqGrid("resizeGrid", {
						base : $grid,
						offset : 0
					});
			},200);
		},
		/**
		 * 序列化查询参数
		 * 
		 * @param {}
		 *            form
		 * @return {}
		 */
		_serializeObject : function(form) {
			var o = {}, a = $(form).serializeArray();
			$.each(a, function() {
				var v = this.value || '';
				if (o[this.name]) {
					o[this.name] = o[this.name] +","+ v;
				} else {
					o[this.name] =v;
				}
			});
			return o;
		},
		/**
		 * 查询
		 * @param obj
		 */
		search : function(obj) {
			if ($(obj).hasClass('disabled'))
				return;
			var searchForm = $(obj).closest("div .toolbar-panel").find(
					".search-form");
			if (searchForm.length == 0)
				return;
			var data = me._serializeObject(searchForm);
			this.$grid.jqGrid('setGridParam', {
				url : this.options.url,
				postData : data, // 发送数据
				page : 1
			}).trigger("reloadGrid"); // 重新载入
		},
		/**
		 * 处理查询
		 */
		handlerSearch : function() {
			$(document).on("click", ".toolbar-panel a.btn.fa-search", function(){
				me.search(this);
			});
		},
		/**
		 * 处理按钮事件（包含回车）
		 */
		handleSearchKeyPress : function() {
			$(".toolbar-panel").keydown(function(e) {
						if (e.keyCode == 13) {// 回车
							e.preventDefault();
							me.search($(".toolbar-panel a.btn.fa-search"));
						} else if (e.keyCode == 27) {// ESC
							e.preventDefault();
							var searchForm = $(".search-form");
							if (searchForm.length == 0){
								$("input[name^='Q^'],select[name^='Q^]",searchForm).each(function() {
											$(this).val('');
										});
								me.search($(".toolbar-panel a.btn.fa-search"));
							}
						}
					});
		},
		_parseUrl : function(u, p) {
			if (u.indexOf('?') != -1)
				return '&' + p;
			else
				return '?' + p;
		},
		_getUrl : function(url, param) {
			if ($.type(param) == "object") {
				$.each(param, function(i, n) {
					var p = i + "=" + n;
					url += me._parseUrl(url, p);
				});
			} else {
				url += me._parseUrl(url, param);
			}
			return url;
		},
		getGridCheckedId : function() {
			return this.$grid.jqGrid('getGridParam', 'selarrrow');
		},
		getGridKeyName:function(){
			return this.$grid.jqGrid('getGridParam', 'keyName');
		},
		/**
		 * 处理编辑、明细
		 */
		handlerEditor : function() {
			$(document).on("click", ".toolbar-panel a.btn.fa-edit, .toolbar-panel a.btn.fa-detail", function(){
				if ($(this).hasClass('disabled'))
					return false;
				var self = $(this), url = self.attr('action'),
					ids =  me.getGridCheckedId(),
					keyName = me.getGridKeyName();
				if (url == null || url == '') {
					DialogUtil.toastr('未找到配置参数[action]!');
					return false;
				}
				if (ids == null || ids.length == 0) {
					DialogUtil.toastr('请选择记录!');
					return false;
				}
				if (ids.length > 1) {
					var url1 = me._getUrl(url, {"id":ids[0]});
					DialogUtil.toastr('已经选择了多项,请选择一项进行操作!');
					return false;
				}
	    		if(GridList.beforeEvent){
					var rtn =GridList.beforeEvent({
						opt: self.hasClass("fa-edit")?"edit":"detail",
						ids:ids,
						keyName:keyName,
						self:self,
						grid:	me.$grid
					});
					if(!rtn)
						return;
				}
				var param = { };
				  param[keyName] = ids[0];
				window.location.href = me._getUrl(url, param);
			});
		},
		handlerRowAction:function(){
			$(document).on("click", ".rowOps a.btn", function(){
				if ($(this).hasClass('disabled'))
					return false;
				var self = $(this), url = self.attr('action');
				if (url == null || url == '') {
					DialogUtil.toastr('未找到配置参数[action]!');
					return false;
				}
				//前置事件处理
				if(GridList.beforeEvent){
					var rtn =GridList.beforeEvent({
						opt:"rowOps",
						self:self,
						grid:	me.$grid
					});
					if(!rtn)
						return;
				}
				if(self.hasClass("fa-remove"))//删除特别处理
					me.removeRecord( {url : url});
				else
					window.location.href =  url;
			});
		},
		/**
		 * 删除记录
		 * @param conf
		 */
		removeRecord:function(conf){
			DialogUtil.confirm('确认删除吗？',function(rtn){
				if(!rtn)
					return;
				$.post(conf.url, function(responseText){
				    var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
					    //后置事件处理
			    		if(GridList.afterEvent){
							var rtn =GridList.afterEvent(me.$grid);
							if(!rtn)
								return;
						}
				    	DialogUtil.toastr(resultMessage.getMessage(),true);
				  		me.$grid.trigger('reloadGrid');
				    } else {
				    	DialogUtil.toastr( '删除失败！'+resultMessage.getMessage(),true);
				    }
				});
			});
		},
		/**
		 * 处理顶部删除
		 */
		handlerRemoveSelect:function(){
			$(document).on("click", ".toolbar-panel a.btn.fa-remove", function(){
			    if ($(this).hasClass('disabled'))
			    	return false;
			    var self = $(this),
			    	url = self.attr('action'), 
					ids =  me.getGridCheckedId(),
					keyName = me.getGridKeyName();
			    if (ids == null || ids.length < 1) {
			    	DialogUtil.toastr( '请选择记录!');
			    	return false;
			    }
			    if (url == null || url == '') {
			    	DialogUtil.toastr( '未找到配置参数[action]!');
			    	return false;
			    }
	    		if(GridList.beforeEvent){
					var rtn =GridList.beforeEvent({
						opt: "remove",
						ids:ids,
						keyName:keyName,
						self:self,
						grid:	me.$grid
					});
					if(!rtn)
						return;
				}
			    
			   var param = { };
			   		 param[keyName] = ids.join(',');
			    me.removeRecord( {
			    		url : me._getUrl(url, param)
			    });

			});
		},
		/**
		 * 收缩/展开
		 */
		handlerCollapseExpand : function() {
			// 收缩、展开
			$(document).on("click", ".toolbar-box .tools .collapse, .toolbar-box .tools .expand", function(){
						var self = $(this), el = self.parents(".toolbar-box").children(".toolbar-body");
						if (self.hasClass("collapse")) {
							$.cookie("isCollapse", true);
							self.attr("title", "展开");
							self.removeClass("collapse").addClass("expand");
							var i = self.children(".fa-angle-double-up");
							i.removeClass("fa-angle-double-up").addClass(
									"fa-angle-double-down");
							self.parents('.toolbar-box').addClass(
									"toolbar-border-bottom");
							el.slideUp(200,function(){
								// 重置表格的尺寸
								me.resizeGridSize();
							});
						} else {
							$.cookie("isCollapse", false);
							self.attr("title", "收缩");
							self.removeClass("expand").addClass("collapse");
							var i = self.children(".fa-angle-double-down");
							i.removeClass("fa-angle-double-down").addClass(
									"fa-angle-double-up");
							self.parents('.toolbar-box').removeClass(
									"toolbar-border-bottom");
							el.slideDown(200,function(){
								// 重置表格的尺寸
								me.resizeGridSize();
							});
						}
					});
			if($.cookie && $.cookie("isCollapse")=="true")
				$('.toolbar-box .tools .collapse').click();
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

/**
 * 重置列表
 */
$(window).resize(function() {
	if(GridList)
		GridList.resizeGridSize();
});