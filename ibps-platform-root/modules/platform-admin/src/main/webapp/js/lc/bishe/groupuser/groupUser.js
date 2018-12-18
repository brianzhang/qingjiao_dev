
/**
 * t_group_user
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-20 13:27:42
 *</pre>
 */
$(function() {
	groupUser  = new GroupUser();
	groupUser.init();
	
	formUrl = groupUser.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#groupUserGrid",// 列表对象
			PAGER : "#groupUserPager",// 列表分页
			FORM : '#groupUserForm',// 表单form
			FORMGET : '#groupUserFormGet'// 表单form
	};
	/**
	 * t_group_user 对象
	 * @returns {GroupUser}
	 */
	GroupUser = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	GroupUser.prototype = {
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
			debugger;
			var me = this;
			var groupId = $('#groupId').val();
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/bishe/groupuser/groupUser/listJson.htm?groupId=' + groupId,
						pager :this.consts.PAGER,
						colNames: ['主键','人员ID','小组名','人员','身份','组长','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	},{
						                name:'userId'

						                ,hidden:true
						                	 	},  {
				                 	   name:'groupId',
				                	   index: 'groupId'
				                	   ,hidden:true

				                	 					                	 	},{
				                 	   name:'userName'

				                	 					                	 	},{
				                	   name:'type'
				                	   ,hidden:true								},{
				                	   name:'master'	                         
				                	   ,hidden:true                             },{
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'设为组长',
										classes:'btn btn-primary fa fa-edit',
										action : 'javascript:groupUser.setMaster("{userId}","{groupId}")',
										hidden : function(opts, rowData){
											debugger;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
											return  rowData.type == "stu" || rowData.master == rowData.userId;
										}
									},{
										label:'撤销组长',
										classes:'btn btn-primary fa fa-edit',
										action:'javascript:groupUser.revokeSEC("{id}","{groupId}")',
										hidden : function(opts, rowData){
											return rowData.type == "stu" || rowData.master != rowData.userId;
										}
									},{
										label:'设为秘书',
										classes:'btn btn-primary fa fa-edit',
										action : 'javascript:groupUser.setSEC("{userId}","{groupId}")',
										hidden : function(opts, rowData){
											debugger;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
											return  rowData.type == "stu" || rowData.sec == rowData.userId;
										}
									},{
										label:'撤销秘书',
										classes:'btn btn-primary fa fa-edit',
										action:'javascript:groupUser.revoke("{id}","{groupId}")',
										hidden : function(opts, rowData){
											return rowData.type == "stu" || rowData.sec != rowData.userId;
										}
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/bishe/groupuser/groupUser/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/bishe/groupuser/groupUser/get.htm?id={id}'
									}]
								} ],
								loadComplete: function(){
									debugger
									try{
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									}catch(e){}
								}
	
					});
		},
		
		setMaster : function(userId,groupId){
			$.ajax({
				type: "POST",
				url : "/bishe/groupuser/groupUser/setMaster.htm",
				data:{"userId":userId, "groupId":groupId},
				dataType:"json",
				success : function(data) {
					if(data.status){
						window.location.reload(true);
					}else{
						DialogUtil.error(data.msg);
					}
				}
			})
		},
		
		revoke : function(userId,groupId){
			$.ajax({
				type: "POST",
				url : "/bishe/groupuser/groupUser/revoke.htm",
				data:{"userId":userId, "groupId":groupId},
				dataType:"json",
				success : function(data) {
					if(data.status){
						window.location.reload(true);
					}else{
						DialogUtil.error(data.msg);
					}
				}
			})
		},
		
		setSEC : function(userId,groupId){
			$.ajax({
				type: "POST",
				url : "/bishe/groupuser/groupUser/setSEC.htm",
				data:{"userId":userId, "groupId":groupId},
				dataType:"json",
				success : function(data) {
					if(data.status){
						window.location.reload(true);
					}else{
						DialogUtil.error(data.msg);
					}
				}
			})
		},
		
		revokeSEC : function(userId,groupId){
			$.ajax({
				type: "POST",
				url : "/bishe/groupuser/groupUser/revokeSEC.htm",
				data:{"userId":userId, "groupId":groupId},
				dataType:"json",
				success : function(data) {
					if(data.status){
						window.location.reload(true);
					}else{
						DialogUtil.error(data.msg);
					}
				}
			})
		},
		
		/**
		 * 添加教师
		 * @param posId
		 */
		addTch : function(groupId,typeFlag){
			debugger;
			var me = this;
			var url =__ctx+"/bishe/groupuser/groupUser/saveUser.htm"; 
			//PartyEmployeeDialog
			new TchDialog({
			//	url:__ctx+'/platform/org/partyEmployee/dialog.htm',        //界面
//				url:__ctx + '/bishe/urlZhiYuant/urlZhiYuan/studialog.htm',
				url:__ctx + '/bishe/audit/tchLabel/tchdialog.htm',
//				params : {url: __ctx + '/platform/org/partyEmployee/listJson.htm', isHidden : true},    //数据
//				params : {url: __ctx + '/bishe/urlZhiYuant/urlZhiYuan/listJson.htm', isHidden : true}, 
				params : {url: __ctx + '/bishe/audit/tchLabel/listJsonForTchBox.htm', isHidden : true}, 
				callback : function(userIds, fullNames) {
						var param = {
								groupId:groupId+'',
								userIds:userIds.toString()+'',
								type:'tch',
								grouptypeFlag:typeFlag+''
								};
						debugger;
						me.post(url,param);
				}
			}).show();
		},
		
		/**
		 * 添加学生
		 * @param posId
		 */
		addStu : function(groupId,typeFlag){
			debugger;
			var me = this;
			var url =__ctx+"/bishe/groupuser/groupUser/saveUser.htm";
			//PartyEmployeeDialog
			new StuDialog({
			//	url:__ctx+'/platform/org/partyEmployee/dialog.htm',        //界面
				url:__ctx + '/bishe/urlZhiYuant/urlZhiYuan/studialog.htm',
//				url:__ctx + '/bishe/audit/tchLabel/tchdialog.htm',
//				params : {url: __ctx + '/platform/org/partyEmployee/listJson.htm', isHidden : true},    //数据
				params : {url: __ctx + '/bishe/urlZhiYuant/urlZhiYuan/listJson.htm', isHidden : true}, 
//				params : {url: __ctx + '/bishe/audit/tchLabel/listJsonForTchBox.htm', isHidden : true}, 
				callback : function(userIds, fullNames) {
						var param = {
								groupId:groupId+'',
								userIds:userIds.toString()+'',
								type:'stu',
								grouptypeFlag:typeFlag+''
								};
						debugger;
						me.post(url,param);
				}
			}).show();
		},
		
		
		post : function(url,param){
			$.post(url,param,function(responseText){
				var msg=new com.lc.form.ResultMessage(responseText);
				if(msg.isSuccess()){
					DialogUtil.alert(msg.getMessage());
					window.location.reload(true);
				}else{
					DialogUtil.error(msg.getMessage(),"");
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
							window.location.href = __ctx+'/bishe/groupuser/groupUser/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


