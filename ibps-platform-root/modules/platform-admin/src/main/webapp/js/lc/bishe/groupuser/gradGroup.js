
/**
 * t_grad_group
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:35
 *</pre>
 */
$(function() {
	gradGroup  = new GradGroup();
	gradGroup.init();
	
	formUrl = gradGroup.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#gradGroupGrid",// 列表对象
			PAGER : "#gradGroupPager",// 列表分页
			FORM : '#gradGroupForm',// 表单form
			FORMGET : '#gradGroupFormGet'// 表单form
	};
	/**
	 * t_grad_group 对象
	 * @returns {GradGroup}
	 */
	GradGroup = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	GradGroup.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			debugger
			var a = this;
			localStorage.removeItem("tour_end");
			localStorage.setItem("tour_current_step", 0);
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				
			}
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
				this._initOffice('e');
			}
			if ($(this.consts.FORMGET).length > 0){// 明细页面office控件初始化
				this._initOffice('r');
			}
		},
		_initOffice : function(_rights){
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			debugger
			var me = this;
			var type = $('#type').val();
			var typeFlag = $('#typeFlag').val();
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/bishe/group/gradGroup/listJson.htm?typeFlag=' + typeFlag,
						caption:type + '小组',  
						pager :this.consts.PAGER,
						colNames: ['主键','名称','类型','组长'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	},{
				                 	   name:'name',
				                	   index: 'name'

				                	 					                	 	}, {
				                 	   name:'type',
				                	   index: 'type'

				                	 					                	 	}, {
				                 	   name:'leader',
				                	   index: 'leader'

				                	 					                	 	}],
								loadComplete: function(){
									try{
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									}catch(e){}
								}
	
					});
		},
		

		
		
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				// office提交
        		OfficePlugin.submit();
				me.formUrl.submit(me._showResponse);
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
				&& !$.isEmpty(frameElement.dialog) 
				&& !$.isEmpty(frameElement.dialog.params)
				&& !$.isEmpty(frameElement.dialog.params.data)){
				var data = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/bishe/group/gradGroup/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


