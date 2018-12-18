
/**
 * t_p_pjgc
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:42:09
 *</pre>
 */
$(function() {
	pJProcess  = new PJProcess();
	pJProcess.init();
	
	formUrl = pJProcess.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#pJProcessGrid",// 列表对象
			PAGER : "#pJProcessPager",// 列表分页
			FORM : '#pJProcessForm',// 表单form
			FORMGET : '#pJProcessFormGet'// 表单form
	};
	/**
	 * t_p_pjgc 对象
	 * @returns {PJProcess}
	 */
	PJProcess = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PJProcess.prototype = {
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
						url :  __ctx+'/pg/PGData/pJProcess/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','课程编号','课程名称','评价学期','评价对象','目标值','评价值','评价','评价日期','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'course_id',
				                	   index: 'course_id'

				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'name'

				                	 					                	 	}, {
				                 	   name:'evaluation_term',
				                	   index: 'evaluation_term'

				                	 					                	 	}, {
				                 	   name:'evaluation_object',
				                	   index: 'evaluation_object'

				                	 					                	 	}, {
				                 	   name:'aim_figure',
				                	   index: 'aim_figure'

				                	 					                	 	}, {
				                 	   name:'evaluation_figure',
				                	   index: 'evaluation_figure'

				                	 					                	 	}, {
				                 	   name:'evaluation',
				                	   index: 'evaluation'

				                	 					                	 	}, {
				                 	   name:'evaluation_time',
				                	   index: 'evaluation_time'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'基于数据分析报告',
										classes:'btn btn-primary fa fa-detail',
										//action:'javascript:pJProcess.demand( "{course_id}" )'
										action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=436558944836517888&cname1=course_id&cval1={course_id}'	
									},{
                                        label:'分析结果整合报告',
                                        classes:'btn btn-primary fa fa-detail',

                                        action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=430672219811610624&cname1=course_id&cval1={course_id}'
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
		demand : function(course_id) {
			DialogUtil.dialog({
				title : '课程对指标点评价表单',
				content :__ctx+'/platform/report/raqsoft/showReport.htm?reportId=436558944836517888&course_id='+course_id,
				index : 'edit',
				area : [ '50%', '90%' ],
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
							window.location.href = __ctx+'/pg/PGData/pJProcess/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


