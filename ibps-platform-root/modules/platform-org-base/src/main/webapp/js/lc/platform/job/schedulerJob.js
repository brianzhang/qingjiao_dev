/**
 * qrtz_job_details
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 11:17:28
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var schedulerJob;
$(function() {
	 schedulerJob  = new SchedulerJob();
	schedulerJob.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#schedulerJobGrid",// 列表对象
			PAGER : "#schedulerJobPager",// 列表分页
			FORM : '#schedulerJobForm'// 表单form
	};
	/**
	 * qrtz_job_details 对象
	 * @returns {Scheduler}
	 */
	SchedulerJob = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	SchedulerJob.prototype = {
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
			this.$grid = $(this.consts.GRID);
			this.$grid .GridList(
					{
						url :  __ctx+'/platform/job/scheduler/jobListJson.htm',
						pager :this.consts.PAGER,
						colNames: ['任务名称','分组','任务类','任务描述','管理'],
				        colModel: [{
				                 	   name:'jobName',
				                 	    sortable:false
				                	 	}, {
					                 	   name:'group',
					                 	   sortable:false
						                }, {
				                 	   name:'jobClass',
				                 	   sortable:false
				                	 	}, {
				                 	   name:'description',
				                 	  sortable:false
				                	 	}, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'添加计划',
										classes:'btn btn-primary fa fa-add ',
										action:__ctx+'/platform/job/scheduler/trigEdit.htm?jobName={jobName}&group={group}'
									},{
										label:'计划列表',
										classes:'btn btn-primary fa fa-detail',
										action:__ctx+'/platform/job/scheduler/trigList.htm?jobName={jobName}&group={group}'
									},{
										label:'执行',
										classes:'btn btn-primary fa fa-play-circle ',
										action:'javascript:schedulerJob._executeJob("{jobName}","{group}")'
									},{
										label:'日志',
										classes:'btn btn-primary fa fa-calendar ',
										action:__ctx+'/platform/job/jobLog/list.htm?jobName={jobName}&group={group}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/job/scheduler/jobRemove.htm?jobName={jobName}&group={group}'
									}]
								} ]
	
					});
			
			this.handlerRemoveSelect();
			
		},
		getGridCheckedData : function() {
			var	 ids =  this.$grid.jqGrid('getGridParam', 'selarrrow');
			var data = [];
			if( ids.length <= 0)
				return data;
			
			for (var i = 0; i < ids.length; i++) {
				 var obj =  this.$grid.jqGrid('getRowData',ids[i]);
				 data.push(obj);
			}
			return  data;
		},
		/**
		 * 处理顶部删除
		 */
		handlerRemoveSelect:function(){
			var me =this;
			$(document).on("click", ".toolbar-panel a.btn.fa-times", function(){
			    if ($(this).hasClass('disabled'))
			    	return false;
			    var self = $(this),
			    	url = self.attr('action'), 
					data =  me.getGridCheckedData();
			    if ($.isEmpty(data)) {
			    	DialogUtil.toastr( '请选择记录!');
			    	return false;
			    }
			    if (url == null || url == '') {
			    	DialogUtil.toastr( '未找到配置参数[action]!');
			    	return false;
			    }
			    var jobName = [],group =[];
				for (var i = 0; i < data.length; i++) {
					jobName.push( data[i].jobName);
					group.push( data[i].group);
				}
			    
			   var param = { };
			   		 param["jobName"] = jobName.join(",");
			   			 param["group"] =  group.join(",");
			    me.removeRecord( {
			    		url : GridList._getUrl(url, param)
			    });

			});
		},
		removeRecord:function(conf){
			var me = this;
			DialogUtil.confirm('确认删除吗？',function(rtn){
				if(!rtn)
					return;
				$.post(conf.url, function(responseText){
				    var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.toastr(resultMessage.getMessage(),true);
				  		me.$grid.trigger('reloadGrid');
				    } else {
				    	DialogUtil.toastr( '删除失败！'+resultMessage.getMessage(),true);
				    }
				});
			});
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
					var jsonNameMap = $("#jsonNameMap").val();
					if(!$.isEmpty(jsonNameMap)){
						var jsonNameObj = JSON2.parse(jsonNameMap);
						if(!$.isEmpty(jsonNameObj)){
							var group = $("#group").val();
							var jsonNameAry = jsonNameObj[group];
							var jobName = $("#jobName").val();
							for(var i=0; i<jsonNameAry.length;i++){
								if(jsonNameAry[i]==jobName){
									DialogUtil.toastr("任务名"+jobName+",在分组："+group);
									$el.button('reset');
									return ;
								}
							}
						}
					}
					me._getParam();
					form.submit();
				}else{
					$el.button('reset');
				}
			});
			$("#addRow").on('click',function(){
				me._addParamRow();
			});
			
			$("#validClass").on("click",function(){
				me._validClass(this);
			})
			
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
							window.location.href = __ctx+'/platform/job/scheduler/jobList.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		
		_addParamRow:function(){
			var me=this;
			var paramView =$("#paramView");
			var len = paramView.children().length;
			var strClass=(len%2==0)?"odd":"even";
			var strTr='';
			strTr+='<tr class="'+strClass+'" id="paramTr">';
			strTr+='<td >';
			strTr+='<input type="text"  class="form-control"  id="paramName" name="paramName" />';
			strTr+='</td>';
			/*strTr+='<td >';
			strTr+='<select  class="form-control" id="paramType"   name="paramType">';
			strTr+='<option value="int">int</option>';
			strTr+='<option value="long">long</option>';
			strTr+='<option value="float">float</option>';
			strTr+='<option value="string">string</option>';
			strTr+='<option value="blooean">blooean</option>';
			strTr+='</select>';
			strTr+='</td>';*/
			strTr+='<td >';
			strTr+='<input type="text"  class="form-control"  id="paramValue" name="paramValue"/>';
			strTr+='</td>';
			strTr+='<td>';
			strTr+='<a href="javascript:;" class="btn btn-primary fa fa-remove"  id="delRow" onclick="schedulerJob._delRow(this)">删除</a>';
			strTr+='</td>';
			strTr+='</tr>';
			var trObj=$(strTr);
			paramView.append(trObj);
		},
		_delRow : function(conf){
			$(conf).closest("tr").remove();
		},
		
		_validClass : function(conf){
			var jobClass=$("#jobClass").val();
			if(!jobClass){
				DialogUtil.toastr("请填写任务类！");
				return;
			}
			var url = __ctx+'/platform/job/scheduler/validClass.htm';
			url=url.getNewUrl();
			$.post(url,{jobClass:jobClass},function(responseText){
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					DialogUtil.toastr(msg.getMessage());
				}else{
					DialogUtil.error(msg.getMessage(),"");
				}
			})
		},
		
		_getParam : function(){
			var paramAry=[];
			$("tr#paramTr").each(function(i){
				var name=$(this).find('input[name=paramName]').val();
			/*	var type=$(this).find('select[name=paramType]').val();*/
				var value=$(this).find('input[name=paramValue]').val();
				var paramObj={
						name : name,
						/*type : type,*/
						value : value
				};
				paramAry.push(JSON2.stringify(paramObj))
			});
			$("#parameterJson").val("["+paramAry.join(",")+"]");
			
		},
		
		_executeJob : function(jobName,group){
			var me = this;
			var url = __ctx+'/platform/job/scheduler/executeJob.htm';
			url=url.getNewUrl();
			$.post(url,{jobName:jobName,group:group},function(responseText){
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					DialogUtil.toastr(msg.getMessage());
				}else{
					DialogUtil.error(msg.getMessage(),"");
				}
			})
		}
	};
})();


