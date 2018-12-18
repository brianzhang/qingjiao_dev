/**
 * 自定义查询
 * 
 * <pre>
 * 作者：HuangYx
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-20 18:53:58
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	customQuery = new CustomQuery();
	customQuery.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#customQueryGrid",// 列表对象
		PAGER : "#customQueryPager",// 列表分页
		FORM : '#customQueryForm'// 表单form
	};
	/**
	 * 自定义查询 对象
	 * @returns {CustomQuery}
	 */
	CustomQuery = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CustomQuery.prototype = {
		consts : _consts,
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
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/platform/form/customQuery/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', '名称', '别名', '对象名称', '数据源的别名', '管理' ],
								colModel : [
										{
											name : 'id',
											index : 'ID_',
											hidden : true,
											key : true
										},
										{
											name : 'name',
											index : 'NAME_'
										},
										{
											name : 'alias',
											index : 'ALIAS_'
										},
										{
											name : 'objName',
											index : 'OBJ_NAME_'
										},
										
										{
											name : 'dsalias',
											index : 'DSALIAS_'
										},
									
										{
											name : '__manage',
											width : 20,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/form/customQuery/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/form/customQuery/remove.htm?id={id}'
													},
													{
														label : '预览',
														classes : 'btn btn-primary fa fa-eye',
//														action : __ctx
//														+ '/platform/form/customQuery/get.htm?id={id}'
														action : 'javascript:customQuery._customQueryPreview("{id}")'
													}]
										} ]

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
				frm.ajaxForm({
					success : me._showResponse
				});
				if (frm.valid())
					form.submit();
			});
			$("#btnSearch").on("click",function(){
				me._searchObjectList();
			})
			me._setDialog();
		},
		
		/**
		 * 预览
		 */
		_customQueryPreview:function(id){
			$.post(__ctx+'/platform/form/customQuery/getById.htm',{"id":id},function(data){
			var url=__ctx+'/platform/form/customQuery/get.htm?id='+id;
			DialogUtil.dialog({
				title:'预览',
				content:url,
				params:data,
			    area: ['80%', '80%'],
			    btn:[{
	            	label: '关闭',
	            	iconCls:'btn btn-danger fa fa-cancel',
	                action: function(dialog,index) {
	                	DialogUtil.close(index);
	                }
	            }]
			});
		});
		},
		
		
		/**
		 * 查询表信息
		 */
		_searchObjectList:function(){
			var selList=$("#objname");
			var dsName=$("#dataSource").val();
			var objectname=$("input[name='objectname']").val();
			var istable=$("#isTable").val();
			var url=__ctx +"/platform/form/customDialog/getByDsObjectName.htm";
			var loading = DialogUtil.load("提示信息","正在查询，请耐心等待...");
			$.post(url, { dsName:dsName, objectName: objectname,istable:istable },function(data) {
				DialogUtil.close(loading);
				selList.empty();
				var success=data.success;
				if(success=='false'){
					DialogUtil.error("提示信息","后台出错了,请联系产品维护人员!");
					return;
				}
				//表的处理
				if(istable=="1"){
					var tables=data.tables;
					for(key in tables ){
						selList.append("<option title='"+tables[key]+"' value='"+ key+"'>"+ key +"("+tables[key] +")" +"</option>" );
					}
				}
				//视图的处理
				else{
					var aryView=data.views;
					for(var i=0;i<aryView.length;i++){
						var v=aryView[i];
						selList.append("<option value='"+ v+"'>"+v+"</option>" );
					}
				}
		    });
		},
		
		/**
		 * 设置列的事件
		 */
		_setDialog:function(){
			var me=this;
			$(document).on("click", "#btnSetting", function() {
				var id=$("#id").val();
				var istable=$("#isTable").val();
				var objname=$("#objname").val();
				var dataSource=$("#dataSource").val();
				
				if(id==null||id=="" ){
					id=0;
					if(objname==null){
						DialogUtil.msg("请先选择数据库表!");
						return ;
					}
				}
				me.showSettingDialog(dataSource,objname,istable,id);
			})
		},
		
		/**
		 * 显示设置物理表信息
		 */
		showSettingDialog:function(dsName,objectname,istable,id){
			var settingobj=$("#settingobj").val(),fields={};
		
			if(settingobj==objectname){
				var conditionField=$("#conditionfield").val(),resultField=$("#resultfield").val(),sortField=$("#sortfield").val();
				if(conditionField)
					fields.conditionField=conditionField;
				if(resultField)
					fields.resultField=resultField;
				if(sortField)
					fields.sortField=sortField;
			}
			DialogUtil.dialog({
				title:'设置列',
				content:__ctx+"/platform/form/customQuery/setting.htm?dsName=" +dsName +"&objectName=" + objectname +"&istable=" + istable +"&id=" + id,
			    area: ['80%', '80%'],
			    params:{'dsName':dsName,'objectName':objectname,'istable':istable,'id':id,'fields':fields },
			    btn:[{
	            	label: '确定',
	            	iconCls:'btn btn-primary fa fa-ok',
	                action: function(dialog,index) {
	                	var  data = DialogUtil.getChildFrameWindow(index).customQuerySetting.getData();
	                	 if($.isEmpty(data))
		              		  return;
		              	$("#settingobj").val(objectname);
	           		 	$("#conditionfield").val(data.conditionfield);
	           		 	$("#resultfield").val(data.resultfield);
	           		 	$("#sortfield").val(data.sortfield);
		               	DialogUtil.close(index);
	                }
	            },{
	            	label: '取消',
	            	iconCls:'btn btn-danger fa fa-cancel',
	                action: function(dialog,index) {
	                	DialogUtil.close(index);
	                }
	            }]
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
								+ '/platform/form/customQuery/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
