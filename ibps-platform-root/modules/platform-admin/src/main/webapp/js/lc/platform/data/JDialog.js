/**
 * 对话框自定义脚本
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
		JDialog : {
			// 已经初始化
			_isInitialization : false,
			_isInitializationView : false,
			_init : function(dialog) {
				if (this._isInitialization)
					return;
				this.dialog = dialog;
			//	var _this = this;
				this._isInitialization = true;
			},

			// list加载
			_onLoad : function(_this) {
				if ($.isFunction($.JDialog.onLoad)) {
					this._init(_this);
					$.JDialog.onLoad();
				}
			},

			// 加载按钮
			_onLoadActions : function(_this, actions) {
				if ($.isFunction($.JDialog.onLoadActions)) {
					this._init(_this);
					$.JDialog.onLoadActions(actions);
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
				if ($.isFunction($.JDialog.beforeSubmit)) {
					this._init(_this);
					return $.JDialog.beforeSubmit(action,position,params);
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
				if ($.isFunction($.JDialog.afterSubmit)) {
					if(position == 'toolbar'){
						this._initView(_this);
					}
					this._init(_this);
					return $.JDialog.afterSubmit(action,position,params);
				}
			},

			// 清理所有自定义事件
			cleanEvents : function() {
				this.onLoad = null;
				this.onLoadActions = null;
				this._isInitialization = false;
			}
		}
	});

}).call(this);
