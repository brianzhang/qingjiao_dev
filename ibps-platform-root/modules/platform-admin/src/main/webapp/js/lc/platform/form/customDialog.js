/**
 * 自定义对话框
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 21:40:48
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	customDialog = new CustomDialog();
	customDialog.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#customDialogGrid",// 列表对象
		PAGER : "#customDialogPager",// 列表分页
		FORM : '#customDialogForm'// 表单form
	}; ;
	/**
	 * 自定义对话框 对象
	 * @returns {CustomDialog}
	 */
	CustomDialog = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CustomDialog.prototype = {
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
			$('#objName').click(function(event) {
				event.preventDefault();
			});
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
										+ '/platform/form/customDialog/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ 'ID_', '名称', '别名', '对象名称',	'数据源的别名', '是否数据库表', '管理' ],
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
											name : 'isTable',
											index : 'IS_TABLE_',
											formatter : 'select',
											formatoptions : {
												value : {
													'1' : '表',
													'0' : '视图'
												}
											}
										},
										{
											name : '__manage',
											width : 30,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/form/customDialog/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/form/customDialog/remove.htm?id={id}'
													},
													{
														label : '预览',
														classes : 'btn btn-primary fa fa-eye',
														action : 'javascript:customDialog.preview("{alias}")'
													}
													]
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
				var alias=$("#alias").val(),settingobj=$("#settingobj").val(),objname=$("#objName").val(),id=$("[name=id]").val(),
				  style=$("input[name='style']:checked").val(),styletemp=$("#styletemp").val();
			
				frm.ajaxForm({
					success : me._showResponse
				});
				if(/.*[\u4e00-\u9fa5]+.*$/.test(alias)){
					DialogUtil.alert("别名不能为中文!");
					return;
				}else if(objname!=settingobj){
					DialogUtil.alert("当前选择的表(视图)未设置显示的列!");
					return;
				}else if(id && style!=styletemp){
					DialogUtil.alert("你配置的表(视图)的列类型与选择显示样式的类型不一致，请重设置列！");
					return;
				}
				if (frm.valid())
					form.submit();
			});
			me._showPage();
			me._setDialog();
			$("#btnSearch").on("click",function(){
				me._searchObjectList();
			})
		},
		
		/**
		 * 预览
		 */
		preview:function(alias,callback,isHelp){
			//向对话框传入参数
			var me = this;
			if($.isEmpty(alias)){
				DialogUtil.alert("别名为空！");
				return;
			}
			var url = __ctx+'/platform/form/customDialog/getByAlias.htm';
			$.post(url,{"alias":alias},function(data){
				var fieldObj=eval("("+data.conditionfield.trim()+")"),
				isParamsNeeded= false,paramArr=[];
				for(var i=0,c;c=fieldObj[i++];){
					//4：动态传入参数，5：java脚本参数
					if(c.defaultType=="4"){
						paramArr.push(c.fieldName) ;
						isParamsNeeded = true ;
					}else if(c.defaultType=="5" && c.dbType=='isAfferent'){
						paramArr.push(c.field);
						isParamsNeeded = true ;
					}
				}
				if(!isParamsNeeded){
					var o = {
	          			callback:function(d){
	        				DialogUtil.alert(JSON.stringify(d));
	          			}
	          		};
					CustomDialogUtil.preview(data,o);
				}else{
					data.paramArr = paramArr;
					data.isPreviewCallCode = true;
					var urlForParams = __ctx + "/platform/form/customDialog/params.htm";
					DialogUtil.dialog({
						title:data.name+"-设置参数",
						content:urlForParams,
						params:data,//传递参数
						area:['50%','50%'],
						btn:[{
				            	label: '下一步',
				            	iconCls:'btn btn-primary fa fa-ok',
				                action: function(dialog,index) {
				                	var   params = DialogUtil.getChildFrameWindow(index).getData();
				                	DialogUtil.closeAll();
				          			var o = {
				          				params:params,
				          				callback:function(d){
				          					DialogUtil.alert(JSON.stringify(d));
				          				}
				          			};
				                	CustomDialogUtil.preview(data,o);
				                }
						 	},{
				            	label: '取消',
				            	iconCls:'btn btn-danger fa fa-cancel',
				                action: function(dialog,index) {
				                	DialogUtil.close(index);
				                }
				            }]
					});
				}
				
			});
			
			


			
		},
		
		/**
		 * 查询表或视图
		 */
		_searchObjectList:function(){
			var selList=$("#objName");
			var dsName=$("#dataSource").val();
			
			var objectname=$("#objectname").val();
			var istable=$("#isTable").val();
			var url=__ctx +"/platform/form/customDialog/getByDsObjectName.htm";
			if(dsName==null || dsName==""){
				DialogUtil.error("提示信息","请选择数据源!");
				return ;
			}
			
			var loading = DialogUtil.load("正在查询，请耐心等待...");
			$.post(url, {dsName:dsName, objectName: objectname,istable:istable },function(data) {
				selList.empty();
				var success=data.success;
				if(success=='false'){
					DialogUtil.error("提示信息","后台出错了,请联系产品维护人员!");
					DialogUtil.close(loading);
					return;
				}
				//表的处理
				if(istable=="1"){
					var tables=data.tables;
					for(key in tables ){
						selList.append("<option title='"+tables[key]+"' value='"+ key+"'>"+ key +"("+tables[key] +")" +"</option>" );
					}
					DialogUtil.close(loading);
				}
				//视图的处理
				else{
					var aryView=data.views;
					for(var i=0;i<aryView.length;i++){
						var v=aryView[i];
						selList.append("<option value='"+ v+"'>"+v+"</option>" );
					}
					DialogUtil.close(loading);
				}
		    });
		},
		
		
		/**
		 * 点击分页事件
		 */
		_showPage:function(){
			$(document).on("click", "input[name='needPage']", function() {
				var isneedPage=$("input:radio[name='needPage']:checked").val();
				if(isneedPage>0){
					$("#spanPageSize").css("display","");
				}else{
					$("#spanPageSize").css("display","none");
				}
			});
		},
		
		/**
		 *设置列对话框
		 */
		_setDialog:function(){
			var me=this;
			$(document).on("click", "#btnSetting", function() {
				var istable=$("#isTable").val(),
					objectName=$("#objName").val(),
					dataSource=$("#dataSource").val(),
					style=$("input[name='style']:checked").val();
				if($.isEmpty(objectName)){
						DialogUtil.msg("请先选择表或者视图!");
						return ;
				}
				var fields={},
					displayField=$("#displayfield").val(),
					conditionField=$("#conditionfield").val(),
					sortField=$("#sortfield").val(),
					resultField=$("#resultfield").val();
				if(displayField)
					fields.displayField=displayField;
				if(conditionField)
					fields.conditionField=conditionField;
				if(resultField)
					fields.resultField=resultField;
				if(sortField)
					fields.sortField=sortField;
				
				DialogUtil.dialog({
					title:'设置列',
					content:__ctx+"/platform/form/customDialog/setting.htm?dsName=" +dataSource +"&objectName=" + objectName +"&istable=" + istable +"&style=" +style,
				    area: ['90%', '100%'],
				    params:{'dsName':dataSource,'objectName':objectName,'istable':istable,'style':style,'fields':fields },
				    btn:[{
		            	label: '确定',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
			              	  var  data = DialogUtil.getChildFrameWindow(index).customDialogSetting.getData();
			              	  if($.isEmpty(data))
			              		  return;
			              	  $("#settingobj").val(objectName);
		           		 	$("#displayfield").val(data.displayfield);
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
						window.location.href = __ctx+ '/platform/form/customDialog/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
