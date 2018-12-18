
/**
 * 流程通知
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-29 21:28:25
 *</pre>
 */
$(function() {
	bpmOperNotify  = new BpmOperNotify();
	bpmOperNotify.init();
	
	formUrl = bpmOperNotify.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bpmOperNotifyGrid",// 列表对象
			PAGER : "#bpmOperNotifyPager",// 列表分页
			FORM : '#bpmOperNotifyForm'// 表单form
	};
	/**
	 * 流程通知 对象
	 * @returns {BpmOperNotify}
	 */
	BpmOperNotify = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmOperNotify.prototype = {
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
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this,grid=$(this.consts.GRID);
			grid.GridList(
					{
						url :  __ctx+'/platform/bpmn/bpmOperNotify/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','','通知标题','流程定义','节点','通知人','通知时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
					          				name:'isRead',
					          				width:30,
					          				formatter:function(val, opts, rowData) {
					          					//判断是否有附件和是否查看
					          					var isRead ='N'==val?"fa-envelope":"fa-envelope-o";
					          					return '<i class="fa '+isRead+'" ></i>';
					          				}
					          			} ,{
						                 	   name:'notifyTitle',
						                	   index: 'notify_title_'

						                	 					                	 	},{
				                 	   name:'procDefName',
				                	   index: 'proc_def_name_'
				                	 	}, {
				                 	   name:'nodeName',
				                	   index: 'node_name_'

				                	 					                	 	},  {
				                 	   name:'notifierName',
				                	   index: 'notifier_name_'

				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 	,formatoptions:'yyyy-MM-dd HH:mm:ss'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/bpmn/bpmOperNotify/get.htm?id={id}',
										hidden:function(opts, rowData){
											return rowData.notifier != __currentUserId;
										}
									},{
										label:'查看',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/bpmn/bpmOperNotify/get.htm?id={id}&show=false',
										hidden:function(opts, rowData){
											return rowData.notifier == __currentUserId;
										}
									}]
								} ]
	
					});
			this._initButtons(grid);
		},
		/**
		 * 标记已读事件
		 */
		_initButtons:function(grid){
			$(document).on("click", "#mark", function(){
				var  ids = grid.jqGrid('getGridParam', 'selarrrow');
				if (ids == null || ids.length == 0) {
					DialogUtil.toastr('请选择记录!');
					return false;
				}
				$.post(__ctx+'/platform/bpmn/bpmOperNotify/readAll.htm',{ids:ids.join(',')}, function(responseText){
					var msg = new com.lc.form.ResultMessage(responseText);
					if (msg.isSuccess()) {
						$('.fa-search').click();
						DialogUtil.msg(msg.getMessage());
					} else {
						DialogUtil.error(msg.getMessage());
					}
				});
			})
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			me.formUrl.initSub('/platform/bpmn');
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				formUrl.submit(me._showResponse);
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) && !$.isEmpty(frameElement.dialog)){
				var params = frameElement.dialog.params;
				var data = params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
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
							window.location.href = __ctx+'/platform/bpmn/bpmOperNotify/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


