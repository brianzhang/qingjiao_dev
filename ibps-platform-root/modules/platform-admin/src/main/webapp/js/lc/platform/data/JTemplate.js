/**
 * 数据模版-自定义脚本
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
		JTemplate : {
			// 已经初始化
			_isInitialization : false,
			_isInitializationView : false,
			_init : function(template) {
				if (this._isInitialization)
					return;
				this.template = template;
			//	var _this = this;
				this._isInitialization = true;
			},
			//顶部按钮view
			_initView: function(view) {
				if (this._isInitializationView)
					return;
				this.view = view;
				
				this._isInitializationView = true;
			},

			// list加载
			_onLoad : function(_this) {
				if ($.isFunction($.JTemplate.onLoad)) {
					this._init(_this);
					$.JTemplate.onLoad();
				}
			},

			// 加载按钮
			_onLoadActions : function(_this, actions) {
				if ($.isFunction($.JTemplate.onLoadActions)) {
					this._init(_this);
					$.JTemplate.onLoadActions(actions);
				}
			},

			/**
			 * 按钮提交前事件
			 * action 就是按钮Code.
			 * position ：manage  toolbar
			 * params： 如果是toolbar，就是按钮model等其他参数，
			 * 				  如果是manage，就是当记录id，gridId等其他参数，
			 */
			_beforeSubmit : function(_this, action,position,params) {
				if ($.isFunction($.JTemplate.beforeSubmit)) {
					if(position == 'toolbar'){
						this._initView(_this);
					}
					this._init(_this);
					return $.JTemplate.beforeSubmit(action,position,params);
				}
			},
			
			/**
			 * 按钮提交后事件
			 * action 就是按钮Code.
			 * position ：manage  toolbar
			 * params： 如果是toolbar，就是按钮model等其他参数，
			 * 				  如果是manage，就是当记录id，gridId等其他参数，
			 */
			_afterSubmit : function(_this, action,position,params) {
				if ($.isFunction($.JTemplate.afterSubmit)) {
					if(position == 'toolbar'){
						this._initView(_this);
					}
					this._init(_this);
					return $.JTemplate.afterSubmit(action,position,params);
				}
			},
			_customFormatter:function(_this,name,column,model){
				if ($.isFunction($.JTemplate.customFormatter)) {
					this._init(_this);
					return $.JTemplate.customFormatter(name,column,model);
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
