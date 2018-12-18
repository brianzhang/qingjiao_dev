/**
 * 表单--封装自定义代码扩展接口
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2017-10-01-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	$.extend({
		JList : {
			// 已经初始化
			_isInitialization : false,
			_isInitializationView : false,
			_init : function(list) {
				if (this._isInitialization)
					return;
				this.list = list;
				// 把所有控件转为 this.DataField的模式,如 this.F****.set("value");
				var _this = this;
				this._isInitialization = true;
			},
			// 顶部按钮view
			_initView: function(view) {
				if (this._isInitializationView)
					return;
				this.view = view;
				
				this._isInitializationView = true;
			},

			// list加载
			_onLoad : function(_this) {
				if ($.isFunction($.JList.onLoad)) {
					this._init(_this);
					$.JList.onLoad();
				}
			},

			// 加载按钮
			_onLoadActions : function(_this, actions) {
				if ($.isFunction($.JList.onLoadActions)) {
					this._init(_this);
					$.JList.onLoadActions(actions);
				}
			},

			/**
			 * 按钮提交前事件 action 就是按钮Code. position ：manage toolbar params：
			 * 如果是toolbar，就是按钮model等其他参数， 如果是manage，就是当记录id，gridId等其他参数，
			 */
			_beforeSubmit : function(_this, action,position,params) {
				if ($.isFunction($.JList.beforeSubmit)) {
					if(position == 'toolbar'){
						this._initView(_this);
					}
					this._init(_this);
					return $.JList.beforeSubmit(action,position,params);
				}
			},
			
			/**
			 * 按钮提交后事件 action 就是按钮Code. position ：manage toolbar params：
			 * 如果是toolbar，就是按钮model等其他参数， 如果是manage，就是当记录id，gridId等其他参数，
			 */
			_afterSubmit : function(_this, action,position,params) {
				if ($.isFunction($.JList.afterSubmit)) {
					if(position == 'toolbar'){
						this._initView(_this);
					}
					this._init(_this);
					return $.JList.afterSubmit(action,position,params);
				}
			},

			// 清理所有自定义事件
			cleanEvents : function() {
				this.onLoad = null;
				this.onLoadActions = null;
				this._isInitialization = false;
				this._isInitializationView = false;
			}
		}
	});

}).call(this);
