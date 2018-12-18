/**
 * 流程实例
 * 
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-06 09:26:18
 * </pre>
 */
$(function() {
	bpmInst = new BpmInst();
	bpmInst.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#bpmInstGrid",// 列表对象
		PAGER : "#bpmInstPager",// 列表分页
		FORM : '#bpmInstForm'// 表单form
	};
	/**
	 * 流程实例 对象
	 * 
	 * @returns {BpmInst}
	 */
	BpmInst = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	BpmInst.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)// 列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)// 表单
				this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID)
					.GridList({
								url : __ctx+ '/platform/bpmn/instance/bpmInst/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ 'ID', '实例标题', '流程名称', '创建时间','结束时间', '持续时间', '审批结果','状态','管理' ],
								colModel : [
										{
											name : 'id',
											hidden : true,
											key : true
										},
										{
											name : 'subject',
											index : 'SUBJECT_',
											width : 220,
											formatter : function(val, opts,
													rowData) {
												return '<a href="javascript:bpmInst._get(\''
														+ rowData.id
														+ '\')">'
														+ val + '</a>';
											}

										},
										{
											name : 'procDefName',
											index : 'PROC_DEF_NAME_',
											width : 100
											
										},
										
										{
											name : 'createTime',
											index : 'CREATE_TIME_',
											formatter : 'timestamp',
											formatoptions : 'yyyy-MM-dd HH:mm:ss'
										},
										{
											name : 'endTime',
											index : 'END_TIME_',
											formatter : 'timestamp',
											formatoptions : 'yyyy-MM-dd HH:mm:ss',
											hidden:true
										},
										{
											name : 'duration',
											index : 'DURATION_',
											width : 80,
											hidden:true,
											formatter:function(val){
					                		   if($.isEmpty(val))
					                			   return "";
					                		   var d = moment.duration(val) ;
					                		   var seconds = d. seconds(),
						                		minutes =d. minutes(),
							                	hours =d. hours(),
							                	days=d. days(),dd='';
							                	if(days>0)
							                		dd +=days+"天";
						                    	if(hours>0)
							                		dd +=hours+"时";
						                      	if(minutes>0)
							                		dd +=minutes+"分";
						                    	if(seconds>0)
							                		dd +=seconds+"秒";
						                		   return dd;
						                	   }
										},
										{
											name : 'resultType',
											index : 'RESULT_TYPE_',
											formatter : 'dataFormat',
											width : 80,
											hidden:true,
											formatoptions : {
													value : [{
														name:'pending',
														value:'待审批',
														css:'purple'
													},{
														name:'agree',
														value:'审批通过',
														css:'green'
													},{
														name:'oppose',
														value:'审批不通过',
														css:'red'
													},{
														name:'complete',
														value:'完成',
														css:'red'
													},
													{
														name:'manual_end',
														value:'人工终止',
														css:'red'
													}]
												}

										} , {
											name : 'status',
											index : 'STATUS_',
											width : 60,
											formatter : 'dataFormat',
											formatoptions : {
												value : [ {
													name : 'draft',
													value : '草稿',
													css : 'red'
												}, {
													name : 'running',
													value : '运行中',
													css : 'green'
												}, {
													name : 'pending',
													value : '挂起',
													css : 'red'
												}, {
													name : 'end',
													value : '结束',
													css : 'red'
												}, {
													name : 'manualend',
													value : '人工结束',
													css : 'red'
												} ]
											}
										},{
											name : '__manage',
											label:'管理',
											width : 40,
											sortable:false,
											classes:'rowOps',
											formatter : 'manage',
											formatoptions :[
											  	{
													label:'明细',
													classes:'btn btn-primary fa fa-detail',
													action:__ctx+'/platform/bpmn/instance/bpmInst/detail.htm?id={id}'
												},{
													label:'删除',
													classes:'btn btn-primary fa fa-remove',
													action:__ctx+'/platform/bpmn/instance/bpmInst/remove.htm?id={id}'
													,hidden:function(opts, rowData){
														if(rowData.authorizeRight.instanceDel=="Y"){
															return false;
														}
														return true;
													}
												}
											]
									}]

							});
		},
		
		
		/**
		 * 获取流程实例详细信息
		 */
		_get:function(id){
			window.location.href = __ctx+'/platform/bpmn/instance/bpmInst/detail.htm?id='+id;
		},
		
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				frm.ajaxForm({
					success : me._showResponse
				});
				if (frm.valid())
					form.submit();
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/bpmn/instance/bpmInst/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
