
/**
 * 流程任务变更
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-11 19:45:11
 *</pre>
 */
$(function() {
	bpmTaskChange  = new BpmTaskChange();
	bpmTaskChange.init();
	
	formUrl = bpmTaskChange.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bpmTaskChangeGrid",// 列表对象
			PAGER : "#bpmTaskChangePager",// 列表分页
			FORM : '#bpmTaskChangeForm'// 表单form
	};
	/**
	 * 流程任务变更 对象
	 * @returns {BpmTaskChange}
	 */
	BpmTaskChange = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmTaskChange.prototype = {
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
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/bpmn/bpmTaskChange/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['ID','任务ID','事项标题','任务名称','流程实例ID','任务节点ID','更改类型','状态','所属人ID','执行人ID','变更描述','创建时间','完成时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'
				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'taskId',
				                	   index: 'task_id_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'taskSubject',
				                	   index: 'task_subject_'
				                	 					                	 	}, {
				                 	   name:'taskName',
				                	   index: 'task_name_'
				                	 					                	 	}, {
				                 	   name:'procInstId',
				                	   index: 'proc_inst_id_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'nodeId',
				                	   index: 'node_id_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'changeType',
				                	   index: 'change_type_'
				                	 	,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'assignee':'代理'
												,'shift':'转办'
			                                }
				                        }
				                	 	}, {
				                 	   name:'status',
				                	   index: 'status_'
				                	 	,formatter: 'dataFormat'
				                        ,formatoptions: {
				                        	value : [{
												name:'running',
												value:'运行中',
												css:'green'
											},{
												name:'finish',
												value:'完成',
												css:'blue'
											},{
												name:'cancel',
												value:'取消',
												css:'red'
											}]
				                        }
				                	 	}, {
				                 	   name:'ownerId',
				                	   index: 'owner_id_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'executorId',
				                	   index: 'executor_id_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'comment',
				                	   index: 'comment_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 	,formatoptions:'yyyy-MM-dd HH:mm:ss'
				                	 					                	 	}, {
				                 	   name:'completeTime',
				                	   index: 'complete_time_'
				                	 	,formatter: 'timestamp'
				                	 	,hidden:true
				                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'撤回',
										classes:'btn btn-primary fa fa-cancel',
										action:'javascript:bpmTaskChange.setStatus("{id}","cancel");',
										hidden: function (opts, rowData) {
		                                    return rowData.status!='running';
		                                }
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/bpmn/bpmTaskChange/get.htm?id={id}'
									}]
								} ]
					});
		},
		setStatus : function(id, status){
			var url = __ctx+'/platform/bpmn/bpmTaskChange/setStatus.htm';
			$.post(url, {id: id, status: status}, function (responseText) {
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					window.location.href = __ctx+'/platform/bpmn/bpmTaskChange/list.htm';
					DialogUtil.msg(msg.getMessage());
				} else {
					DialogUtil.error(msg.getMessage());
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
			me.formUrl.initSub('/platform/bpmn');
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				me.formUrl.submit(me._showResponse);
			});
			this._initBts();
		},
		_initBts:function(){
			// 取消子表按钮事件
			$(document).off('click', 'table a.js-add-record');
			// 重新绑定子表添加按钮事件
			this._initUserAdd();
		},
		_initUserAdd:function(){
			var me = this;
			$(document).on('click', 'table[name="s:bpmTaskChangeAssign"] a[data-type="add"]', function() {
				var table = $(this).parents().filter("table");
				
				new PersonDialog({
					isSingle:false, //是否单选
					isObj:true,
					callback : function(data) {
						var formData = {};
						me.formUrl.getSubData("table[name='s:bpmTaskChangeAssign']", me.formUrl.form, formData, 'r');
						var templateId = "s:bpmTaskChangeAssign:TrTemplate";
						var exist = false;
						for(var i = 0, len = data.length; i < len; i ++){
							// 去重
							if(formData.bpmTaskChangeAssignPoList && formData.bpmTaskChangeAssignPoList.length > 0){
								for(var j = 0, jlen = formData.bpmTaskChangeAssignPoList.length; j < jlen; j ++){
									if(data[i].userid == formData.bpmTaskChangeAssignPoList[j].executor){
										exist = true;
										break;
									}
								}
							}
							
							if(!exist){
								var html = template(templateId, {idx: $.uniqueId(), executor:data[i].userid, executorName:data[i].fullname, type:'employee', typeName:'用户'});
								// 添加一行
								$(table).find("tbody").append(html);
							}
						}
						me.formUrl.initChk();
					}
				}).show();
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
//			if(!$.isEmpty(frameElement) && !$.isEmpty(frameElement.dialog)){
//				var params = frameElement.dialog.params;
//				var data = params.data;
//				this.formUrl.setData("[name^='m:']", data);
//				this.formUrl.validate();
//			}
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.alert(msg.getMessage(),
					function() {
						DialogUtil.closeAll();
					}
					);
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


