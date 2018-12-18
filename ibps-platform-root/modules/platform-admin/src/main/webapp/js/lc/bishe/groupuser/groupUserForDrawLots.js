
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
		
		
//		//开始抽签
		start : function(){

            var me = this, form = $(this.consts.FORM), frm = form.form();
            me.formUrl = new com.lc.form.FormData(form);
            // 触发表单验证
            frm.valid();
			debugger
			var type = $('#type').val();
			var typeFlag = $('#typeFlag').val();
			var curBatch = $('#batch').val();
			var numBatch = $('#numBatch').val();
            var totalNumBatch = $('#curBatchTotalNum').val();
			var me = this;
			//获得所选小组数据
        	var ids = $('#gradGroupGrid').jqGrid('getGridParam','selarrrow');
        	if (ids == null || ids.length == 0) {
        		DialogUtil.toastr('请选择小组！');
        		return;
        	}
        	//为小组分配学生
        	url =  "/bishe/groupuser/groupUser/allotStuForGroup.htm";
		    $.ajax({
		    	type: "POST",
		    	dataType:"json",
		    	data:{"typeFlag":typeFlag,"curBatch":curBatch,'groupId': ids.join(','),'numBatch':numBatch,"totalNumBatch":totalNumBatch},
		    	url : url,
		   		async: false,
		/*    		contentType:"application/json",
		 */		success:function (data) {
					debugger
					if (data.status) {
						//刷新抽取列表
						 $('#groupUserGrid').jqGrid('setGridParam', {
								url : __ctx+'/bishe/groupuser/groupUser/listJsonForNo.htm?typeFlag=' + typeFlag + '&curBatch='+curBatch,
								page : 1
							}).trigger("reloadGrid"); 
						 $('#curBatchEnableNum').val(data.msg );
					} else {
						DialogUtil.error(data.msg);
					}
		    	}
		    });
		},

        //为学生指定答辩小组
        appointGroup : function(){
            debugger
            var userId = $('#userId').val();
            //获得所选小组数据
            var ids = $('#gradGroupGrid').jqGrid('getGridParam','selarrrow');
            if (ids == null || ids.length == 0) {
                DialogUtil.toastr('请选择小组！');
                return;
            }
            if (ids.length > 1) {
                DialogUtil.toastr('只能选取一个小组');
                return;
            }
            //为学生指定小组
            url =  "/bishe/groupuser/groupUser/appointGroup.htm";
            $.ajax({
                type: "POST",
                dataType:"json",
                data:{"userId":userId,'groupId': ids.join(',')},
                url : url,
                async: false,
					success:function (data) {
                    debugger
                    if (data.status) {
						//关闭窗口
                        DialogUtil.msg(data.msg);
                        DialogUtil.closeAll();
                    } else {
                        DialogUtil.error(data.msg);
                    }
                }
            });
        },


		/**
		 * 初始列表
		 */
		
		_initGridList : function() {
			debugger;
			var me = this;
			var type = $('#type').val();
			var typeFlag = $('#typeFlag').val();
			var curBatch = $('#batch').val();
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/bishe/groupuser/groupUser/listJsonForNo.htm?flag=1', //表示第一次进入
                        multiselect: false,
						pager :this.consts.PAGER,
						caption:'论文分配情况',  
						colNames: ['主键','人员ID','小组ID','姓名','小组名','小组地点','答辩状态','管理'],
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
				                 	   name:'userName',
							           index: 'user_id_'

				                	 					                	 	},{
				                 	   name:'groupName',
							           index: 'group_id_'
				                	 					                	 	},{
											name:'groupPlace',
											sortable:false,
										}
				                	 					                	 	,{
				                 	   name:'dbStatus',
                                       sortable:false,
				                	 					                	 	},{
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'缺席',
										classes:'btn btn-primary fa fa-add',
										action: 'javascript:groupUser.setdbStatus("{id}","{groupId}","{userId}","缺席")'
									},{
										label:'完成',
										classes:'btn btn-primary fa fa-add',
										action: 'javascript:groupUser.setdbStatus("{id}","{groupId}","{userId}","完成")',
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
			 $(me.consts.GRID).jqGrid('setGridParam', {
				    url : __ctx+'/bishe/groupuser/groupUser/listJsonForNo.htm?typeFlag=' + typeFlag + '&curBatch='+curBatch,
					page : 1
				}).trigger("reloadGrid"); // 重新载入
		},
		
		setdbStatus : function(id,groupId,userId,result){
			var type = $('#type').val();
            var curBatch = $('#batch').val();
            var typeFlag = $('#typeFlag').val();
			debugger
			$.ajax({
				type: "POST",
				url : "/bishe/groupuser/groupUser/setdbStatus.htm",
				data:{"userId":userId, "result":result,"typeFlag":typeFlag,"curBatch":curBatch,"groupId":groupId},
				dataType:"json",
				success : function(data) {
					if(data.status){
						//更新行显示
						debugger
						if(result == "缺席"){
                            $("#groupUserGrid").jqGrid('delRowData',id);
						}else {
                            $("#groupUserGrid").jqGrid('setCell',id,"dbStatus",result);
						}
						DialogUtil.msg(data.msg);
					}else{
						DialogUtil.error(data.msg);
					}
				}
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


