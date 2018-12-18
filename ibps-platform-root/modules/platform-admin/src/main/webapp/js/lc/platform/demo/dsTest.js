

/**
 * DsTest
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-07-03 15:14:35
 *</pre>
 */
$(function() {
	test  = new DsTest();
	test.init();
	
	formUrl = test.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#testGrid",// 列表对象
			PAGER : "#testPager",// 列表分页
			FORM : '#testForm'// 表单form
	};
	/**
	 * TEST 对象
	 * @returns {Test}
	 */
	DsTest = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DsTest.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/demo/dsTest/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['ID_','ACCOUNT_','NAME_','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'account',
				                	   index: 'ACCOUNT_'
				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'NAME_'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/demo/dsTest/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/demo/dsTest/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/demo/dsTest/get.htm?id={id}'
									}]
								} ]
	
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
				formUrl.submit(me._showResponse);
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/demo/dsTest/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


