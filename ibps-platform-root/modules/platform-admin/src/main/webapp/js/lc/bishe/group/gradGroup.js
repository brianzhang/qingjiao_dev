
/**
 * t_grad_group
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:35
 *</pre>
 */
$(function() {
	gradGroup  = new GradGroup();
	gradGroup.init();
	
	formUrl = gradGroup.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#gradGroupGrid",// 列表对象
			PAGER : "#gradGroupPager",// 列表分页
			FORM : '#gradGroupForm',// 表单form
			FORMGET : '#gradGroupFormGet'// 表单form
	};
	/**
	 * t_grad_group 对象
	 * @returns {GradGroup}
	 */
	GradGroup = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	GradGroup.prototype = {
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
			debugger
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/bishe/group/gradGroup/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','名称','类型','地点','组长','秘书','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'

				                	 					                	 	}, {
				                 	   name:'type',
				                	   index: 'type'

				                	 					                	 	}, {
										name:'place',
										index: 'place_'						}, {

				                 	   name:'leader',
				                	   index: 'leader_'

				                	 					                	 	}, {
				                 	   name:'sec',
				                	   index: 'sec_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[
										{
											label : ' 设置组员',
											classes : 'btn btn-primary fa fa-detail',
											action : 'javascript:gradGroup.setUser("{id}","{type}")',
										},
									{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/bishe/group/gradGroup/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/bishe/group/gradGroup/remove.htm?id={id}'
									}]
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
		
		setUser : function(groupId,type){
			debugger
			var typeFlag = 4;
			if(type == "中期")
				typeFlag = 1;
			if(type == "答辩")
				typeFlag = 2;
			DialogUtil.dialog({
				title : '小组人员管理',
				content : __ctx + '/bishe/groupuser/groupUser/list.htm?groupId='
						+ groupId + "&typeFlag=" + typeFlag,
				index : 'setUser',
				area : [ '80%', '80%' ],
				btn : [ 
					{
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						debugger
						DialogUtil.close(b);
					}
				} ],
			end:function(){
				debugger
				window.location.reload(true);
			}
			});
		},
		
		allotStu : function(){
			var me = this;
        	var groupIds = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
/*        	if (groupIds == null || groupIds.length == 0) {
        		DialogUtil.toastr('请选择数据！');
        		return;
        	}*/
        	debugger
        	var type = $('#type').val();
			var typeFlag = 4;
			if(type == "中期")
				typeFlag = 1;
			if(type == "答辩")
				typeFlag = 2;
			DialogUtil.dialog({
				title : '分配学生',
				content : __ctx + '/bishe/groupuser/groupUser/allotStu.htm?groupIds='
						+ groupIds + "&typeFlag=" + typeFlag,
				dataType:"json",
				index : 'allotStu',
				area : [ '80%', '80%' ],
				btn : [ 
					{
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						debugger
						DialogUtil.close(b);
					}
				} ],
			end:function(){
				debugger
				window.location.reload(true);
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
							window.location.href = __ctx+'/bishe/group/gradGroup/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


