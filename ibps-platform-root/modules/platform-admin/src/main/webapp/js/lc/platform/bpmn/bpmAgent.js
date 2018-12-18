
/**
 * 流程代理
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-30 17:29:13
 *</pre>
 */
$(function() {
	bpmAgent  = new BpmAgent();
	bpmAgent.init();
	
	formUrl = bpmAgent.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bpmAgentGrid",// 列表对象
			PAGER : "#bpmAgentPager",// 列表分页
			FORM : '#bpmAgentForm'// 表单form
	};
	/**
	 * 流程代理 对象
	 * @returns {BpmAgent}
	 */
	BpmAgent = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmAgent.prototype = {
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
						url :  __ctx+'/platform/bpmn/bpmAgent/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','标题','委托人','代理人','是否启用','生效时间','失效时间','代理类型','创建人','创建时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'
				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'title',
				                	   index: 'title_'
				                	 					                	 	}, {
				                 	   name:'delegatorName',
				                	   index: 'delegator_name_'
				                	 					                	 	}, {
				                 	   name:'agenterName',
				                	   index: 'agenter_name_'
				                	 					                	 	}, {
				                 	   name:'isEnabled',
				                	   index: 'is_enabled_'
				                	 	,formatter: 'dataFormat'
				                        ,formatoptions: {
			                            	value: [{
												name:'enabled',
												value:'启用',
												css:'green'
											},{
												name:'disabled',
												value:'禁用',
												css:'red'
											}]
				                         }
				                	 	}, {
				                 	   name:'effectiveTime',
				                	   index: 'effective_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'expiryTime',
				                	   index: 'expiry_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'agentType',
				                	   index: 'agent_type_'
				                	 	,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'all':'全权代理'
												,'part':'部分代理'
												,'condition':'条件代理'
			                                }
				                        }
				                	 	}, {
				                 	   name:'createBy',
				                	   index: 'create_by_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 	,hidden:true
				                	 	},  {
									name : '__manage',
									width : 46,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/bpmn/bpmAgent/edit.htm?id={id}'
									},{
										label:'启用',
										classes:'btn btn-primary fa fa-toggle-on',
										action:'javascript:bpmAgent.setEnable("{id}","enabled");',
										hidden: function (opts, rowData) {
		                                    return rowData.isEnabled=='enabled';
		                                }
									},{
										label:'禁用',
										classes:'btn btn-primary fa fa-toggle-off',
										action:'javascript:bpmAgent.setEnable("{id}","disabled");',
										hidden: function (opts, rowData) {
		                                    return rowData.isEnabled=='disabled';
		                                }
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/bpmn/bpmAgent/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/bpmn/bpmAgent/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		setEnable:function(id, isEnabled){
			var url = __ctx+'/platform/bpmn/bpmAgent/setEnable.htm';
			$.post(url, {id: id, isEnabled: isEnabled}, function (responseText) {
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					window.location.href = __ctx+'/platform/bpmn/bpmAgent/list.htm';
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
				var isExec = me._validData();
				if(!isExec){
					return;
				}
				
				formUrl.submit(me._showResponse);
			});
			this._initRadio();
			this._initBts();
		},
		
		_validData :function(){
			var effectiveTime = $("input[name='m:bpmAgent:effectiveTime']").val();
			var expiryTime = $("input[name='m:bpmAgent:expiryTime']").val();
			if($.isNotEmpty(effectiveTime) && $.isNotEmpty(expiryTime)){
				var effectiveDate = new Date(effectiveTime);
				var expiryDate = new Date(expiryTime);
				if(effectiveDate > expiryDate){
					DialogUtil.warn("代理日期范围不合法！");
					return false;
				}
			}
			
			var delegatorId = $("textarea[name='m:bpmAgent:delegatorId']").val();
			if($.isEmpty(delegatorId)){
				DialogUtil.warn("委托人为空！");
				return false;
			}
			
			var agentType = $("input[name='m:bpmAgent:agentType']:checked").val();
			var agenterId = $("textarea[name='m:bpmAgent:agenterId']").val();
			if((agentType == 'all' || agentType == 'part') && $.isEmpty(agenterId)){
				DialogUtil.warn("代理人为空！");
				return false;
			}
			
			return true;
		},
		
		_initBts:function(){
			// 取消子表按钮事件
			$(document).off('click', 'table a.js-add-record');
			$(document).off('click', 'table a.js-edit-row');
			// 重新绑定子表添加按钮事件
			this._initProcDefAdd();
			this._initRuleEdit();
		},
		_initProcDefAdd:function(){
			var me = this;
			
			// procDefName
			var proc = $("#flowSelector");
			var options = proc.data();

			// 绑定点击事件
			$("#flowSelector").on("click", function(){
				me.clickEvent(options);
			});
			
			$(options.name).on("click", function(){
				me.clickEvent(options);
			});
			
			me.clear($("#flowClear"));
			
			$(document).on('click', 'table[name="s:bpmAgentDef"] a[data-type="add"]', function() {
				var table = $(this).parents().filter("table");
				new BpmDefinitionDialog({
					callback:function(data,index){
						var formData = {};
						me.formUrl.getSubData("table[name='s:bpmAgentDef']", me.formUrl.form, formData, 'r');
						var templateId = "s:bpmAgentDef:TrTemplate";
						var exist = false;
						for(var i = 0, len = data.length; i < len; i ++){
							// 去重
							if(formData.bpmAgentDefPoList && formData.bpmAgentDefPoList.length > 0){
								for(var j = 0, jlen = formData.bpmAgentDefPoList.length; j < jlen; j ++){
									if(data[i].defKey == formData.bpmAgentDefPoList[j].procDefKey){
										exist = true;
										break;
									}
								}
							}
							
							if(!exist){
								var html = template(templateId, {procDefKey:data[i].defKey, procDefName:data[i].name});
								// 添加一行
								$(table).find("tbody").append(html);
							}
						}
						me.formUrl.initChk();
						
						DialogUtil.close(index);
					}
				}).show();
			});
		},
		
		clickEvent:function(options,callback){
			var  type = options.type,
					isSingle = $.isEmpty(options.single)?true:(options.single=='true' || options.single==true?true:false),
					id=options.id,
					key=options.key,
					name=options.name;
			var idVal = $(id).val(),keyVal = $(key).val(),nameVal = $(name).val(),
				data=[];
			if($.isNotEmpty(idVal)&& $.isNotEmpty(nameVal) ){
				var idArr = idVal.split(','), nameArr = nameVal.split(',');
				if(idArr.length == nameArr.length){
					$.each(idArr, function(i, id) {
						var datai={'id':id};
						datai['name']=nameArr[i];
						datai['key']='';
						data.push(datai);
					});
				}
			}
			
			new BpmDefinitionDialog({
				isSingle:isSingle,
				callback:function(data,index){
					if($(id).length > 0){
						$(id).val(data[0].defId);
					}
					if($(key).length > 0){
						$(key).val(data[0].defKey);
					}
					$(name).val(data[0].name);
					if(callback)
						callback(data);
					DialogUtil.close(index);
				}
			}).show();
		},
		
		clear:function($this){
			var options = $this.data(),
				id=options.id,
				key=options.key,
				name=options.name,
				orgid=options.orgid,
				orgkey=options.orgkey,
				orgname=options.orgname;
			// 点击事件
			$this.click(function() {
				if($(id).length > 0 ) $(id).val('');
				if($(key).length > 0 ) $(key).val('');
				if($(name).length > 0 ) $(name).val('');
				if($(orgid).length > 0 ) $(orgid).val('');
				if($(orgkey).length > 0 ) $(orgkey).val('');
				if($(orgname).length > 0 ) $(orgname).val('');
			});
		},
		
		_initRuleEdit:function(){
			var me = this;
			$(document).on('click', 'table[name="s:bpmAgentCondition"] a[data-type="add"],table[name="s:bpmAgentCondition"] a.js-edit-row', function() {
				if($.isEmpty($("#procDefId").val())){
					DialogUtil.toastr("请选择流程！");
					return;
				}
				
				var table = $(this).parents().filter("table");
				var tr = $(this).parents().filter("tr");
				var data = $(this).hasClass('js-edit-row')?me.formUrl.getData("[name^='s:']", tr):{};
				var defId = $("#procDefId").val();
				var url = __ctx + '/platform/bpmn/bpmAgentCondition/edit.htm';
				
				// 弹出框编辑
				DialogUtil.dialog({
					title:'添加条件',
					content:url,
					params:{data:data,defId:defId},//传递参数
					area:['66%','88%'],
					btn:[{
						label: '确定',
						iconCls:'btn btn-primary fa fa-ok',
				        action: function(dialog,index) {
				      	  	var form = DialogUtil.getChildFrameWindow(index).bpmAgentCondition.formUrl;
				      	  	if(form.validate()){
				      	  		var dialogData = form.getValue();
				          	  	if($.isEmpty(dialogData)){
				          		  	DialogUtil.toastr("请正确输入！");
				          		  	return;
				          	  	}
				          	  	
				          	  	// agenterId
				          	  	if($.isEmpty(dialogData.agenterId)){
					          	  	DialogUtil.toastr("代理人为空！");
				          		  	return;
				          	  	}
				          	  	
				          	  	// condition
				          	  	if($.isEmpty(dialogData.condition)){
					          	  	DialogUtil.toastr("代理规则为空！");
				          		  	return;
				          	  	}
				          	  
				          	  	var templateId = "s:bpmAgentCondition:TrTemplate";
								var html = template(templateId, dialogData);
								// 添加一行
								$(table).find("tbody").append(html);
								
								tr.remove();
								me.formUrl.initChk();
								DialogUtil.close(index);
				      	  	} else {
				      	  		DialogUtil.warn('数据校验不通过，请检查数据填写格式或必填项是否填写！');
				      	  	}
				        }
				    }, {
				    	label: '取消',
				    	iconCls:'btn btn-danger fa fa-cancel',
				        action: function(dialog,index) {
				        	DialogUtil.close(index);
				        }
				    }]
				});
			});
		},
		_initRadio:function(){
			var me = this,initVal = $(":radio[name='m:bpmAgent:agentType']:checked").val();
			this._initTable(initVal);
			
			$(document).on('click', ":radio[name='m:bpmAgent:agentType']", function() {
				var val = $(this).val();
				me._initTable(val);
			});
		},
		_initTable:function(val){
			if('all' == val){
				$("#agentor-div").show();
				
				$("table[name='s:bpmAgentDef'] tbody").html('');
				$("table[name='s:bpmAgentDef']").hide();
				
				$("#procDefId").val('');
				$("#procDefKey").val('');
				$("#procDefName").val('');
				$("#procdef-div").hide();
				$("table[name='s:bpmAgentCondition'] tbody").html('');
				$("table[name='s:bpmAgentCondition']").hide();
			}else if('part' == val){
				$("#agentor-div").show();
				
				$("table[name='s:bpmAgentDef']").show();
				
				$("#procDefId").val('');
				$("#procDefKey").val('');
				$("#procDefName").val('');
				$("#procdef-div").hide();
				$("table[name='s:bpmAgentCondition'] tbody").html('');
				$("table[name='s:bpmAgentCondition']").hide();
			}else if('condition' == val){
				$("textarea[name='m:bpmAgent:agenterId']").val('');
				$("textarea[name='m:bpmAgent:agenterName']").val('');
				$("#agentor-div").hide();
				
				$("table[name='s:bpmAgentDef'] tbody").html('');
				$("table[name='s:bpmAgentDef']").hide();
				
				$("#procdef-div").show();
				$("table[name='s:bpmAgentCondition']").show();
			}
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
							window.location.href = __ctx+'/platform/bpmn/bpmAgent/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


