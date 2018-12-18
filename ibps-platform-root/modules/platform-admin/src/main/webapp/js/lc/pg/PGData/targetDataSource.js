
/**
 * t_p_pymbhlxpjsjly
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 10:16:11
 *</pre>
 */
$(function() {
	targetDataSource  = new TargetDataSource();
	targetDataSource.init();
	
	formUrl = targetDataSource.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#targetDataSourceGrid",// 列表对象
			PAGER : "#targetDataSourcePager",// 列表分页
			FORM : '#targetDataSourceForm',// 表单form
			FORMGET : '#targetDataSourceFormGet'// 表单form
	};
	/**
	 * t_p_pymbhlxpjsjly 对象
	 * @returns {TargetDataSource}
	 */
	TargetDataSource = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	TargetDataSource.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
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
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/pg/PGData/targetDataSource/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','类型','来源','内容','形式','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'type',
				                	   index: 'type'

				                	 					                	 	}, {
				                 	   name:'source',
				                	   index: 'source'

				                	 					                	 	}, {
				                 	   name:'content',
				                	   index: 'content'

				                	 					                	 	}, {
				                 	   name:'form',
				                	   index: 'form'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/targetDataSource/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/targetDataSource/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/targetDataSource/get.htm?id={id}'
									},{
										label:'查看表单',
										classes:'btn btn-primary fa fa-detail',
										//action: __ctx+'/platform/report/raqsoft/showReport.htm?reportId=430673338302464000'
										action : 'javascript:targetDataSource.message()',
									},{
							             label:'调查问卷',
							             classes:'btn btn-primary fa fa-detail',
							             action:'javascript:targetDataSource.onlineForm( "{id}" )'	}]
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
		message : function() {
			DialogUtil.dialog({
				title : '培养目标数据来源',
				//content : __ctx+'/platform/report/raqsoft/showReport.htm?reportId=430673338302464000',
				content : __ctx+'/platform/report/raqsoft/preview2.htm?reportId=430673338302464000',
				index : 'edit',
				area : [ '60%', '90%' ],
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b);
					}
				} ]
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
							window.location.href = __ctx+'/pg/PGData/targetDataSource/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},onlineForm : function( id ){
			var reqUrl = __ctx + "/pg/PGData/targetDataSource/targetdata.htm";
			$.post(reqUrl,{'id':id},function(result){
				//alert(result);
				var obj = JSON.parse(result);
					OnlineForm.data =obj;
					OnlineForm.open("新生调查问卷" , function( json ){
					//	alert("hah");
						var url = __ctx + "/pg/PGData/targetDataSource/targetgrad.htm";
		                $.post(url,{'id':id,'json':JSON.stringify(json)},function(){
		                	DialogUtil.alert("保存成功"); 	
		                });
					} , true);
				
				
            });

			
		}
	};
})();


