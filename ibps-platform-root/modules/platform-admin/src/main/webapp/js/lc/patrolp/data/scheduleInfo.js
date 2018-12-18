
/**
 * 课表信息
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:56:44
 *</pre>
 */
$(function() {
	scheduleInfo  = new ScheduleInfo();
	scheduleInfo.init();
	
	formUrl = scheduleInfo.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#scheduleInfoGrid",// 列表对象
			PAGER : "#scheduleInfoPager",// 列表分页
			FORM : '#scheduleInfoForm',// 表单form
			FORMGET : '#scheduleInfoFormGet'// 表单form
	};
	/**
	 * 课表信息 对象
	 * @returns {ScheduleInfo}
	 */
	ScheduleInfo = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ScheduleInfo.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				this._bindImportBtns();
				this._bindStartBtns();
				this._bindStoptBtns();
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
		
		_bindImportBtns : function(){
			var me = this;
			$(document).on('click', 'a.fa-upload', function () {
				alert("选择xls文件，格式为 : ?年级.xls");
				$('#xlsFile').click();
            });
		},
		

		_bindStartBtns : function(){
			var me = this;
			$(document).on('click', 'a.fa-check-square', function () {
            	var ids = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
            	if (ids == null || ids.length == 0) {
            		DialogUtil.toastr('请选择数据！');
            		return;
            	}
            	
            	var lid = DialogUtil.load();
            	var url = __ctx + "/patrolp/data/scheduleInfo/useSchedule.htm";
                $.post(url, {'id': ids.join(',')}, function (responseText) {
                	DialogUtil.close(lid);
                	var msg = new com.lc.form.ResultMessage(responseText);
        			if (msg.isSuccess()) {
        				DialogUtil.msg(msg.getMessage());
        				window.location.reload(true);
        			} else {
        				DialogUtil.error(msg.getMessage());
        			}
                });
            });
		},
		
		_bindStoptBtns : function(){
			var me = this;
			$(document).on('click', 'a.fa-times-circle', function () {
            	var ids = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
            	if (ids == null || ids.length == 0) {
            		DialogUtil.toastr('请选择数据！');
            		return;
            	}
            	
            	var lid = DialogUtil.load();
            	var url = __ctx + "/patrolp/data/scheduleInfo/stopSchedule.htm";
                $.post(url, {'id': ids.join(',')}, function (responseText) {
                	DialogUtil.close(lid);
                	var msg = new com.lc.form.ResultMessage(responseText);
        			if (msg.isSuccess()  || msg.isWarn() ) {
        				DialogUtil.msg(msg.getMessage());
        				window.location.reload(true);
        			} else {
        				DialogUtil.error(msg.getMessage());
        			}
                });
            });
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/patrolp/data/scheduleInfo/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键',
							'<div style="text-align:center;">上传时间</div>',
							'<div style="text-align:center;">名称</div>',
							'<div style="text-align:center;">状态</div>',
							'<div style="text-align:center;">管理</div>'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	},{
					                 	   name:'createTime',
					                	   index: 'create_time_',
					                	   formatter: 'timestamp',
					                	   align:'center'
					                	 					                	},{
				                 	   name:'name',
				                	   index: 'name_',
				                	   align:'center'

				                	 					                	 	}, {
				                 	   name:'state',
				                	   index: 'state_',
				                	   align:'center'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									align:'right',
									formatoptions :[{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/patrolp/data/scheduleInfo/remove.htm?id={id}'
									},{
										label:'明细',										
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/patrolp/data/scheduleInfo/get.htm?id={id}'
									},
//									{
//										label:'启动',
//										button:'启动',
//										classes:'btn btn-primary fa fa-caret-square-o-right',
//										action:__ctx + "/patrolp/data/scheduleInfo/useSchedule.htm?id={id}"
//									},{
//										label:'停用',
//										button:'btn btn-primary fa fa-stop-square-o-right',
//										action:__ctx + "/patrolp/data/scheduleInfo/stopSchedule.htm?id={id}"}
									]
								} ],
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
							window.location.href = __ctx+'/patrolp/data/scheduleInfo/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


