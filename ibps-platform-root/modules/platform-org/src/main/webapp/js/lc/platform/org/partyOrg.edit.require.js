/**
 * 组织
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2016-06-20 09:08:11
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
define(
	['jquery', 'dialog.util', 'jquery.form', 'form', 'bootstrap', 
	 	'jquery.qtip', 'qtip', 'util', 'valid', 'const.util', 
	 	'custom.valid', 'custom.valid.ext', 'json2', 'chinese.pinyin'], 
	function($, DialogUtil) {
		//定义常量
		var _consts = {
			FORM : '#partyOrgForm'// 表单form
		};
		
		/**
		 * 参与者 对象
		 * @returns {PartyOrg}
		 */
		PartyOrg = function() {
			//定义属性
		};
	
		/**
		 * 方法
		 */
		PartyOrg.prototype = {
			consts : _consts,
			/**
			 * 初始化
			 */
			init : function() {
				if (this.hasInit) // 是否已初始化
					return false;
				this.hasInit = true;
				if ($(this.consts.FORM).length > 0)//表单
					this._initForm();
			},
			
			/**
			 * 初始化表单
			 */
			_initForm : function() {
				var me 		= this, 
					form 	= $(this.consts.FORM), 
					frm 	= form.form();
				var clen = $("select[name='levelID']").children().length;
				if(clen < 1){
					DialogUtil.warn("组织等级无数据，请到【用户管理-等级管理】添加组织等级数据！");
				}
				// 触发表单验证
				frm.valid();
				// 处理表单保存
				$(document).on('click', 'a.fa-save', function() {
					var $el = $(this);
					$el.button('loading'); 
					frm.ajaxForm({
						success : function(responseText){
							$el.button('reset'); 
							me._showResponse(responseText);
						},
						error: function(){
							$el.button('reset'); 
						}
					});
					if (frm.valid()){
						form.submit();
					}else{
						$el.button('reset');
					}
				});
			},
			
			/**
			 * 表单成功返回信息
			 * 
			 * @param responseText
			 */
			_showResponse : function(responseText) {
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					//刷新左边的树
					if(parent.partyOrgManager)parent.partyOrgManager.loadTree();
					if(parent.partyOrgGradeManager)parent.partyOrgGradeManager.loadTree();
					DialogUtil.alert(msg.getMessage());
					window.location.reload(true);
				} else {
					DialogUtil.error(msg.getMessage());
				}
			}
		};
		
		return new PartyOrg();
	}
);
