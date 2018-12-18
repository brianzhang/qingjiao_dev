
/**
 * 报表定义
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-06-28 14:32:40
 *</pre>
 */
$(function() {
	reportDef  = new ReportDef();
	reportDef.init();
	
	formUrl = reportDef.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#reportDefGrid",// 列表对象
			PAGER : "#reportDefPager",// 列表分页
			TYPE_TREE : "#typeTree", //左分类树
			FORM : '#reportDefForm'// 表单form
	};
	/**
	 * 报表定义 对象
	 * @returns {ReportDef}
	 */
	ReportDef = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ReportDef.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.reportType = $("#reportType").val();
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				this._initBts();
			}
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
			if ($(this.consts.TYPE_TREE).length > 0)//分类树
				this._initTypeTree();
		},
		_initBts : function(){
			var me = this;
			$('a.fa-add').click(function(){
				DialogUtil.dialog({
					title:'上传报表文件',
					area: ['30%', '40%'],
					content:__ctx + '/platform/report/reportDef/import.htm?reportType='+me.reportType,
					btn:[{
		            	label: '上传',
		            	iconCls:'btn btn-primary fa fa-import',
		                action: function(dialog,index) {
		              	  	DialogUtil.getChildFrameWindow(index).upload(function(id){
		              	  		window.location.href = __ctx+'/platform/report/reportDef/list.htm?reportType='+me.reportType;
		              	  	});
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
			$("#initSysReport").on("click",function(){
				DialogUtil.confirm("是否初始化系统报表？", function(rt){
					if(rt){
						var ld = DialogUtil.load();
						var __url = __ctx + "/platform/report/reportDef/initSysReport.htm";
						$.ajax({
							type: 'POST',
							url: __url,
							data: {reportType:me.reportType},
							success: function(responseText){
								DialogUtil.close(ld);
								var msg = new com.lc.form.ResultMessage(responseText);
								if (msg.isSuccess()) {
									window.location.reload(true);
								} else {
									DialogUtil.error(msg.getMessage());
								}
							},
							error: function(){
								DialogUtil.close(ld);
								DialogUtil.error("初始化异常！");
							}
						});
					}
				});
			});
			
		},
		_initTypeTree:function(){
			var me = this;
			me.categoryKey ='REPORT_TYPE';
		  	var typeTree =  new TypeTree( $(this.consts.TYPE_TREE),{
			  	categoryKey: me.categoryKey,
				onClick:function(event, treeId, treeNode){
					var typeId =treeNode.id;
					if(treeNode.isRoot == 1)typeId = "";
					$("#typeId").val(typeId);
					$("a.btn.fa-search").click();
				},
				onRightClick:function(event, treeId, treeNode){
		  			if (!treeNode) 
		  				return false ;
		  		}
			}); 
		  	this._initLayout();
		},
		/**
		 * 初始化布局
		 */
		_initLayout:function(){
			var layout = $('body').layout({ applyDefaultStyles: true,
					onopen :function(){
						GridList.resizeGridSize();
					},
					onclose:function(){
						GridList.resizeGridSize();
					},
					onresize:function(){
						GridList.resizeGridSize();
					}
				});  
			layout.addPinBtn(".pinBtn", "west" );
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/report/reportDef/listJson.htm?reportType='+this.reportType,
						pager :this.consts.PAGER,
						colNames: ['ID','父报表','分类','标题','数据源','源文件','是否系统报表','创建人','创建时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_'
				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'parentId',
				                	   index: 'PARENT_ID_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'typeName',
				                	   index: 'TYPE_NAME_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'title',
				                	   index: 'TITLE_'
				                	 	}, {
				                 	   name:'dsName',
				                	   index: 'DS_NAME_'
				                	 	}, {
				                 	   name:'dir',
				                	   index: 'DIR_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'isSys',
				                	   index: 'IS_SYS_',
				                	   formatter: 'dataFormat',
			                            formatoptions: {
			                            	value : [{
												name:'Y',
												value:'是',
												css:'green'
											},{
												name:'N',
												value:'否'
											}
										]}
				                	 	}, {
						                 	   name:'creator',
						                	   index: 'CREATE_BY_'
				                	 	}, {
				                	 		name:'createTime',
				                	 		index: 'CREAATE_TIME_'
				                	 		,formatter : 'timestamp'
				                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'预览',
										classes:'btn btn-primary fa fa-preview',
										action:'javascript:reportDef.preview("{id}")'
									},{
										label:'添加到菜单资源',
										classes:'btn btn-primary fa fa-telegram',
										action:'javascript:reportDef.add2Resource("{id}")'
									},{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/report/reportDef/edit.htm?id={id}&reportType='+me.reportType
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/report/reportDef/remove.htm?id={id}&reportType='+me.reportType
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/report/reportDef/get.htm?id={id}&reportType='+me.reportType
									}]
								} ]
					});
		},
		/**
		 * 添加到菜单资源
		 * @param id
		 */
		add2Resource:function(id){
			var menuUrl='';
			if(this.reportType=='raqsoft'){
				menuUrl = "/platform/report/raqsoft/preview.htm?reportId="+id;
			}else if(this.reportType=='ireport'){
				menuUrl = "/platform/report/ireport/preview.htm?reportId="+id;
			}
			var url =  __ctx+ "/platform/auth/resources/addResource.htm?menuUrl="+menuUrl;
			DialogUtil.dialog({
				params:{},
				callback:function(rtn){
				},
				maxmin:false,
				title:false,
				area : [ '100%', '100%' ],
				content :url
			});
		},
		/**
		 * 预览报表
		 */
		preview:function(id){
			var url = '';
			if(this.reportType=='ireport'){
				url = __ctx+'/platform/report/ireport/preview.htm?reportId='+id;
			}else if(this.reportType=='raqsoft'){
				url = __ctx+'/platform/report/raqsoft/preview.htm?reportId='+id;
			}
			window.location.href = url;
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			me.formUrl.initSub('/platform/report');
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
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
			var msg = new com.lc.form.ResultMessage(responseText),me=this;
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/report/reportDef/list.htm?reportType='+me.reportType;
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


