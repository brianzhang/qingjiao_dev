
/**
 * t_p_byyqpjnrygc
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 14:28:47
 *</pre>
 */
$(function() {
	pJNRProcess  = new PJNRProcess();
	pJNRProcess.init();
	
	formUrl = pJNRProcess.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#pJNRProcessGrid",// 列表对象
			PAGER : "#pJNRProcessPager",// 列表分页
			FORM : '#pJNRProcessForm',// 表单form
			FORMGET : '#pJNRProcessFormGet'// 表单form
	};
	/**
	 * t_p_byyqpjnrygc 对象
	 * @returns {PJNRProcess}
	 */
	PJNRProcess = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PJNRProcess.prototype = {
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
						url :  __ctx+'/pg/PGData/pJNRProcess/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','支撑权重','考核方式','最近一次评价结果文档','毕业要求','指标点','相关教学活动','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'weight',
				                	   index: 'weight'

				                	 					                	 	}, {
				                 	   name:'inspection_way',
				                	   index: 'inspection_way'

				                	 					                	 	}, {
				                 	   name:'document',
				                	   index: 'document'

				                	 					                	 	}, {
				                 	   name:'biYeYaoQiu',
				                	   index: 'bi_ye_yao_qiu_'

				                	 					                	 	}, {
				                 	   name:'zhiBiaoDian',
				                	   index: 'zhi_biao_dian_'

				                	 					                	 	}, {
				                 	   name:'jiaoXueHuoDong',
				                	   index: 'jiao_xue_huo_dong_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/pJNRProcess/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/pJNRProcess/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/pJNRProcess/get.htm?id={id}'
									},{
										label:'查看表单',
										classes:'btn btn-primary fa fa-detail',
										action:'javascript:pJNRProcess.message()',
										action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=430737912930238464'
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
		message : function() {
			DialogUtil.dialog({
				title : '评价内容与过程',
				content : __ctx + '/platform/report/raqsoft/showReport.htm?reportId=430737912930238464',
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
							window.location.href = __ctx+'/pg/PGData/pJNRProcess/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


