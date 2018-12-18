
/**
 * t_p_xyjxyzxwyhtlqkjl
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:10:51
 *</pre>
 */
$(function() {
	targetConfRecord  = new TargetConfRecord();
	targetConfRecord.init();
	
	formUrl = targetConfRecord.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#targetConfRecordGrid",// 列表对象
			PAGER : "#targetConfRecordPager",// 列表分页
			FORM : '#targetConfRecordForm',// 表单form
			FORMGET : '#targetConfRecordFormGet'// 表单form
	};
	/**
	 * t_p_xyjxyzxwyhtlqkjl 对象
	 * @returns {TargetConfRecord}
	 */
	TargetConfRecord = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	TargetConfRecord.prototype = {
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
						url :  __ctx+'/pg/PGData/targetConfRecord/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','委员会','时间','结果','备注','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	},  {
				                 	   name:'committee',
				                	   index: 'committee'

				                	 					                	 	}, {
				                	   name:'time',
				                	 index: 'time'

				                	 },  {
				                 	   name:'result',
				                	   index: 'result'

				                	 					                	 	}, {
				                 	   name:'remark',
				                	   index: 'remark'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/targetConfRecord/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/targetConfRecord/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/targetConfRecord/get.htm?id={id}'
									},{
										label:'查看表单',
										classes:'btn btn-primary fa fa-detail',
										//action :'javascript:targetConfRecord.demand()',//传递参数
										action:__ctx+'/platform/report/raqsoft/preview2.htm?reportId=430683568360914944'//不用传递参数
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
		demand : function() {
			DialogUtil.dialog({
				//title : '课程大纲',
				content : __ctx+'/platform/report/raqsoft/showReport.htm?reportId=430683568360914944',
				//content : __ctx + '/platform/report/raqsoft/preview.htm?reportId=403863483222851584&crs_num='+crsNum,
				index : 'edit',
				area : [ '90%', '90%' ],
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
							window.location.href = __ctx+'/pg/PGData/targetConfRecord/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


