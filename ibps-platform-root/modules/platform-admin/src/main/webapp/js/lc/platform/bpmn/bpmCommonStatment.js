

/**
 * 常用语
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：zhongjh
 * 邮箱地址：zjh20140614@163.com
 * 创建时间：2017-10-28 09:44:18
 *</pre>
 */
$(function() {
	bpmCommonStatment  = new BpmCommonStatment();
	bpmCommonStatment.init();
	
	formUrl = bpmCommonStatment.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bpmCommonStatmentGrid",// 列表对象
			PAGER : "#bpmCommonStatmentPager",// 列表分页
			FORM : '#bpmCommonStatmentForm'// 表单form
	};
	/**
	 * 常用语 对象
	 * @returns {BpmCommonStatment}
	 */
	BpmCommonStatment = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmCommonStatment.prototype = {
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
						url : __ctx
								+ '/platform/bpmn/bpmCommonStatment/listJson.htm',
						pager : this.consts.PAGER,
						colNames : [ '主键', '内容', '动作类型', '是否默认',
								'创建时间', '管理' ],
						colModel : [
								{
									name : 'id',
									index : 'ID_',
									hidden : true,
									key : true
								},
								{
									name : 'value',
									index : 'VALUE_',
									width : 400
								},
								{
									name : 'action',
									index : 'ACTION_',
									width : 80,
									formatter : function(cellvalue,
											options, rowObject) {
										if (cellvalue == "agree") {
											return "同意";
										} else if (cellvalue == "oppose") {
											return "反对";
										} else if (cellvalue == "reject") {
											return "驳回";
										} else if (cellvalue == "rejectToStart") {
											return "驳回到发起人";
										} else if (cellvalue == "abandon") {
											return "弃权";
										} else if (cellvalue == "manualend") {
											return "人工终止";
										} else {
											return cellvalue;
										}
									}
								},
								{
									name : 'isDefault',
									index : 'IS_DEFAULT_',
									width : 80,
									formatter : function(cellvalue,
											options, rowObject) {
										if (cellvalue == "Y") {
											return "是";
										} else if (cellvalue == "N") {
											return "否";
										}
									}
								},
								{
									name : 'createTime',
									index : 'CREATE_TIME_',
									formatter : 'timestamp',
									width : 140,

								},
								{
									name : '__manage',
									width : 30,
									sortable : false,
									classes : 'rowOps',
									formatter : 'manage',
									formatoptions : [
											{
												label : '编辑',
												classes : 'btn btn-primary fa fa-edit',
												action : __ctx
														+ '/platform/bpmn/bpmCommonStatment/edit.htm?id={id}'
											},
											{
												label : '删除',
												classes : 'btn btn-primary fa fa-remove',
												action : __ctx
														+ '/platform/bpmn/bpmCommonStatment/remove.htm?id={id}'
											},
											{
												label : '设置为默认',
												classes : 'btn btn-primary fa fa-cog ops_more',
												action : 'javascript:bpmCommonStatment.setDefault("{id}")',
												hidden:function(opts, rowData){
													if(rowData.isDefault=="N"){
														return false;
													}
													return true;
												}
											},
											{
												label : '明细',
												classes : 'btn btn-primary fa fa-detail',
												action : __ctx
														+ '/platform/bpmn/bpmCommonStatment/get.htm?id={id}'
											} ]
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
		setDefault: function(id){
			DialogUtil.confirm("确定要设置为默认常用语吗?",  function(r) {
                if (r) {
                	var url = __ctx + '/platform/bpmn/bpmCommonStatment/setDefault.htm';
                	$.post(url,{id:id},function(data){
        	 			var obj=new com.lc.form.ResultMessage(data);
        	 			if(obj.isSuccess()){
							DialogUtil.toastr(obj.getMessage());
							window.location.href = __ctx+'/platform/bpmn/bpmCommonStatment/list.htm';
						}else{
							DialogUtil.error("设置默认常用语失败",obj.getMessage());
						}
        			});
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/bpmn/bpmCommonStatment/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


