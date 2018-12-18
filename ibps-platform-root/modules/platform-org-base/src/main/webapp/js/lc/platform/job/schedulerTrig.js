/**
 * qrtz_triggers
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 20:17:15
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */



$(function() {
	var schedulerTrig  = new SchedulerTrig();
	schedulerTrig.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#schedulerTrigGrid",// 列表对象
			PAGER : "#schedulerTrigPager",// 列表分页
			FORM : '#schedulerTrigForm'// 表单form
	};
	/**
	 * qrtz_triggers 对象
	 * @returns {SchedulerTrig}
	 */
	SchedulerTrig = function() {
		//定义属性
		this.jobName = $("#jobName").val();
		this.group = $("#group").val();
	};

	/**
	 * 方法
	 */
	SchedulerTrig.prototype = {
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
			this.$grid.GridList(
					{
						url :  __ctx+'/platform/job/scheduler/trigListJson.htm?jobName='+me.jobName+'&group='+me.group,
						pager :this.consts.PAGER,
						colNames: ['分组','任务名称','计划名称','计划描述','状态','管理'],
				        colModel: [ {
				                 	   name:'group',
				                 	   sortable:false
				                	 	},{
				                 	   name:'jobName',
				                 	   sortable:false
				                	 	},{
				                 	   name:'trigName',
				                 	   sortable:false,
				                	   key:true
				                	 	}, {
				                 	   name:'description',
				                 	   sortable:false
				                	 	}, {
				                 	   name:'state',
				                 	   sortable:false,
						               formatter:'select', 
						               formatoptions:{value:{ 'NORMAL':'启用','PAUSED':'禁用','ERROR':'执行出错','COMPLETE':'完成','BLOCKED':'正在执行','NONE':'未启动'}}
				                	 	},{
										name : '__manage',
										width : 40,
										sortable:false,
										classes:'rowOps',
										formatter : 'manage',
										formatoptions :[{
											label: function(opts,rowData){
												return rowData.state=='PAUSED'?'启用':'禁用';
											},
											classes: function(opts,rowData){
												return rowData.state=='PAUSED'?'btn btn-primary fa fa-play-circle':'btn btn-primary fa fa-ban';
											},
											action:__ctx+'/platform/job/scheduler/toggleTriggerRun.htm?trigName={trigName}&group={group}&state={state}'
										},{
											label:'日志',
											classes:'btn btn-primary fa fa-detail',
											action: __ctx+'/platform/job/jobLog/list.htm?trigName={trigName}&group={group}'
										},{
											label:'删除',
											classes:'btn btn-primary fa fa-remove',
											action:__ctx+'/platform/job/scheduler/trigRemove.htm?trigName={trigName}&group={group}'
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
			    var trigName = [],group =[];
				for (var i = 0; i < data.length; i++) {
					trigName.push( data[i].trigName);
					group.push( data[i].group);
				}
			   var param = { };
			   		 param["trigName"] = trigName.join(",");
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
					success :function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					},
					error: function(){
						$el.button('reset'); 
					}
				});
				if (frm.valid()){
					var isExist =me._checkName();
					if(isExist) return ;
					me._getPlanParam();
					form.submit();
				}else{
					$el.button('reset');
				}
			});
			me._changePlanType("once");
			$("select#planType").on("change",function(){
				var planType = $(this).val();
				me._changePlanType(planType);
			});
			
			$("#trigName").on("blur",function(){
				me._checkName();
			});
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var me=this, msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/job/scheduler/trigList.htm?jobName='+me.jobName+'&group='+me.group;
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		
		_changePlanType:function(planType){
			var me = this, ruleStr;
			switch(planType){
			    case "once":
			    	$("#onceDiv").show();
			    	$("#minuteDiv").hide();
			    	$("#dayDiv").hide();
			    	$("#weekDiv").hide();
			    	$("#monthDiv").hide();
			    	$("#cronDiv").hide();
			    	break;
			    case "minute":
			    	$("#onceDiv").hide();
			    	$("#minuteDiv").show();
			    	$("#dayDiv").hide();
			    	$("#weekDiv").hide();
			    	$("#monthDiv").hide();
			    	$("#cronDiv").hide();
			    	break;
			    case "day":
			    	$("#onceDiv").hide();
			    	$("#minuteDiv").hide();
			    	$("#dayDiv").show();
			    	$("#weekDiv").hide();
			    	$("#monthDiv").hide();
			    	$("#cronDiv").hide();
			    	break;
			    case "week":
			    	$("#onceDiv").hide();
			    	$("#minuteDiv").hide();
			    	$("#dayDiv").hide();
			    	$("#weekDiv").show();
			    	$("#monthDiv").hide();
			    	$("#cronDiv").hide();
			    	break;
			    case "month":
			    	$("#onceDiv").hide();
			    	$("#minuteDiv").hide();
			    	$("#dayDiv").hide();
			    	$("#weekDiv").hide();
			    	$("#monthDiv").show();
			    	$("#cronDiv").hide();
			    	break;
			    case "cron":
			    	$("#onceDiv").hide();
			    	$("#minuteDiv").hide();
			    	$("#dayDiv").hide();
			    	$("#weekDiv").hide();
			    	$("#monthDiv").hide();
			    	$("#cronDiv").show();
			    	break;
			}
		},
		_checkName:function(){
			var allTrigName = $("#allTrigName").val();
			if(!allTrigName) return false;
			var trigNameJson = eval('(' + allTrigName + ')');
			var trigName = $("#trigName").val();
			for(var i=0;i<trigNameJson.length;i++ ){
				if(trigNameJson[i]==trigName){
					DialogUtil.toastr("计划名称:"+trigName+"已经存在了，请重新输入！");
					return true;
				}
			}
			return false;
		},
		_getPlanParam:function(){
			var me=this;
			var planType=$("select#planType").find("option:checked").val();
			var plan = "";
			switch(planType){
			  case "once":
				  	var date= $("#txtOnceDate").val();
					var h= $("#txtOnceHour").val();
					var m= $("#txtOnceMinute").val();
					var s= $("#txtOnceSecond").val();
					plan=date +" " +h +":" + m +":" + s ;
					plan="{\"type\":1,\"timeInterval\":\"" +plan+"\"}"; 
			    	break;
			    case "minute":
			    	plan= $("#selEveryDay").val();
					plan="{\"type\":2,\"timeInterval\":\"" +plan+"\"}"; 
			    	break;
			    case "day":
			    	  var h= $("#txtDayHour").val();
					  var m= $("#txtDayMinute").val();
			          plan=  h +":" + m ;
			          plan="{\"type\":3,\"timeInterval\":\"" +plan+"\"}"; 
			    	  break;
			    case "week":
			    	  plan=me._getChkValue("chkWeek");
					  var h= $("#txtWeekHour").val();
					  var m= $("#txtWeekMinute").val();
			          plan+="|" + h +":" + m ;
			          plan="{\"type\":4,\"timeInterval\":\"" +plan+"\"}"; 
			    	  break;
			    case "month":
			    	  plan=me._getChkValue("chkMon");
					  var h= $("#txtMonHour").val();
					  var m= $("#txtMonMinute").val();
				
			          plan+="|" + h +":" + m ;
			          plan="{\"type\":5,\"timeInterval\":\"" +plan+"\"}"; 
			    	  break;
			    case "cron":
			    	plan+=$("#txtCronExpression").val();
					plan="{\"type\":6,\"timeInterval\":\"" +plan+"\"}"; 
			    	break;
			}
			$("#planJson").val(plan);
		},
		
		_getChkValue:function(cla) {
			var str = "";
			$('input[type="checkbox"][chkName=' + cla + ']:checked').each(function() {
					str += $(this).val() + ",";
			});
			if (str != "")
				str = str.substring(0, str.length - 1);
			return str;
		},
	};
})();


