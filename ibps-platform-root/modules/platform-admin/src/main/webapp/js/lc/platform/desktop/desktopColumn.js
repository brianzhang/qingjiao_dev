/**
 * 桌面栏目
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-21 21:39:21
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	desktopColumn = new DesktopColumn();
	desktopColumn.init();
});


(function() {
	// 定义常量
	var _consts = {
		GRID : "#desktopColumnGrid",// 列表对象
		PAGER : "#desktopColumnPager",// 列表分页
		FORM : '#desktopColumnForm'// 表单form
	};
	/**
	 * 桌面栏目 对象
	 * 
	 * @returns {DesktopColumn}
	 */
	DesktopColumn = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	DesktopColumn.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)// 列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)// 表单
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
										+ '/platform/desktop/desktopColumn/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', '名称', '别名','类型', '是否启用', '数据加载方式', '更多路径', '管理' ],
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
											name : 'colType',
											index : 'COL_TYPE_',
											formatter : 'dataFormat',
											formatoptions : {
												value : [{
													name:'0',
													value:'一般',
													css:'green'
												},{
													name:'1',
													value:'图表',
													css:'orange'
												},{
													name:'2',
													value:'日历',
													css:'pink'
												},{
													name:'3',
													value:'滚动',
													css:'grey'
												}]
											}
										},
										{
											name : 'isEnabled',
											index : 'IS_ENABLED_',
											formatter : 'dataFormat',
											formatoptions : {
												value : [ {
													name : 'Y',
													value : '启用',
													css : 'green'
												}, {
													name : 'N',
													value : '禁用',
													css : 'red'
												} ]
											}
										},
										{
											name : 'dataMode',
											index : 'DATA_MODE_',
											formatter : 'dataFormat',
											formatoptions : {
												value : [{
													name:'0',
													value:'SERVICE方法',
													css:'green'
												},{
													name:'1',
													value:'自定义查询',
													css:'red'
												}]
											}
										},
										{
											name : 'colUrl',
											index : 'COL_URL_'
										},
										{
											name : '__manage',
											width : 40,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [{
														label : '授权',
														classes : 'btn btn-primary fa fa-ra',
														hidden:function(opts, rowData){
															return rowData.isPublic;
														},
														action :'javascript:desktopColumn.rights("{id}")'
													},{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/desktop/desktopColumn/edit.htm?id={id}'
													},{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/desktop/desktopColumn/get.htm?id={id}'
													},{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														hidden: function (opts, rowData) {
						                                    return rowData.isEnabled=='Y';
						                                },
														action : __ctx
																+ '/platform/desktop/desktopColumn/remove.htm?id={id}'
													},{
														label:'启用',
														classes:'btn btn-primary fa fa-toggle-right',
														action:'javascript:desktopColumn.setEnable("{id}","Y");',
														hidden: function (opts, rowData) {
						                                    return rowData.isEnabled=='Y';
						                                }
													},{
														label:'禁用',
														classes:'btn btn-primary fa fa-stop',
														action:'javascript:desktopColumn.setEnable("{id}","N");',
														hidden: function (opts, rowData) {
						                                    return rowData.isEnabled=='N';
						                                }
													},{
														label : '预览',
														classes : 'btn btn-primary fa fa-detail',
														action : 'javascript:desktopColumn.previewTemplate("{id}","{name}")'
													} ]
										} ]

							});
			this.initTemplate();
		},
		initTemplate:function(){
			var me = this;
			$(document).on("click", "#initTemplate", function() {
				var action=$(this).attr("action");
				DialogUtil.confirm("确定初始化吗？","提示信息",function(rtn){
					if(rtn){
						$.post(action, function(responseText){
						    var resultMessage = new com.lc.form.ResultMessage(responseText);
						    if (resultMessage.isSuccess()) {
						    	$(me.consts.GRID).trigger('reloadGrid');
						    	DialogUtil.toastr(resultMessage.getMessage(),true);
						    } else {
						    	DialogUtil.toastr( resultMessage.getMessage(),true);
						    }
						});
					}
				});
			});
		},
		setEnable:function(id, isEnabled){
			var me = this;
			var url = __ctx+'/platform/desktop/desktopColumn/setEnable.htm';
			$.post(url, {id: id, isEnabled: isEnabled}, function (responseText) {
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					DialogUtil.msg(msg.getMessage());
				} else {
					DialogUtil.error(msg.getMessage());
				}
				$(me.consts.GRID).trigger('reloadGrid');
            });
		},
		previewTemplate:function(id,name){
			DialogUtil.dialog({
				title:"栏目预览："+name,
				content:	__ctx+"/platform/desktop/desktopColumn/preview.htm?id="+id,
			    area: ['50%', '80%'],
			});
		},
		rights:function(id){
			new RightsDefDialog({
				title:'栏目授权',
				key:'desktopColumn',
				entityId:id,
				isSave:true
			}).show();
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
				$("#templateHtml").val(me._editor.getValue());
				var dataFrom = "",dataMode =$("input[name='dataMode']:checked").val();
				if(dataMode ==0){
					dataFrom = $("#dataFromService").val();
				}else{
					dataFrom = $("#dataFromQuery").val();
				}
				$('#dataFrom').val(dataFrom);
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					},
					error: function(){
						$el.button('reset'); 
					}
				});
				if (frm.valid())
					form.submit();
				else{
					$el.button('reset');
				}
			});
			
			this.initCodeMirror();
			this.initDataMode();
			this.dataParamSetting();
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
								+ '/platform/desktop/desktopColumn/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		initCodeMirror:function(){
			var width = $("#templateHtml").width();
			var height = $("#templateHtml").height();
			this._editor = CodeMirror.fromTextArea(document.getElementById("templateHtml"), {
				mode: "text/html",
				tabMode: "indent",
				lineNumbers: true
			 });
			
			this._editor.setSize(width,height);
		},
		initDataMode:function(){
			$('[name="dataMode"]').on('change', function(e){
				var $this = $(e.currentTarget);
				if($this.val()==1){
					$("#queryAlias").show();
					$("#serviceMethod").hide();
				}else{
					$("#queryAlias").hide();
					$("#serviceMethod").show();
				}
			});
		},
		dataParamSetting:function(){
			$(document).on('click', '#setParam', function() {
				
				DialogUtil.dialog({
					title:'参数设置',
					content:__ctx+"/platform/desktop/desktopColumn/setParam.htm",
				    area: ['50%', '80%'],
				    params:$('#dataParam').val(),
				    btn:[{
		            	label: '确定',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		              	  var  data = DialogUtil.getChildFrameWindow().getData();
		              	  if($.isEmpty(data))
		              		  return;
		              	  $('#dataParam').val(data);
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
		}
	};
})();
