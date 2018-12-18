
/**
 * t_p_khhlxjxpjbyyqpj
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:07:41
 *</pre>
 */
$(function() {
	measure  = new Measure();
	measure.init();
	
	formUrl = measure.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#measureGrid",// 列表对象
			PAGER : "#measurePager",// 列表分页
			FORM : '#measureForm',// 表单form
			FORMGET : '#measureFormGet'// 表单form
	};
	/**
	 * t_p_khhlxjxpjbyyqpj 对象
	 * @returns {Measure}
	 */
	Measure = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Measure.prototype = {
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
						url :  __ctx+'/pg/Report/measure/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','评价内容1','评价内容2','组织者','评价结果','评价方式','实施者','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'content1',
				                	   index: 'content1'

				                	 					                	 	}, {
				                 	   name:'content2',
				                	   index: 'content2'

				                	 					                	 	}, {
				                 	   name:'organizer',
				                	   index: 'organizer'

				                	 					                	 	}, {
				                 	   name:'evalutionResult',
				                	   index: 'evalution_result'

				                	 					                	 	}, {
				                 	   name:'evalutionWay',
				                	   index: 'evalution_way'

				                	 					                	 	}, {
				                 	   name:'executor',
				                	   index: 'executor'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/Report/measure/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/Report/measure/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/Report/measure/get.htm?id={id}'
									},{
										label:'查看表单',
										classes:'btn btn-primary fa fa-detail',
										//action:__ctx+'/platform/report/raqsoft/showReport.htm?reportId=430668785309974528&id_='
										//action : 'javascript:measure.message()',
										action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=430668785309974528'
									}
									]
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
		
		message : function(){
			DialogUtil.dialog({
				title : '考核合理性、教学评价、毕业要求评价实施',
				content :__ctx+'/platform/report/raqsoft/showReport.htm?reportId=430668785309974528',
				//content : __ctx + '/platform/report/raqsoft/preview.htm?reportId=403863483222851584&crs_num='+crsNum,
				index : 'edit',
				area : [ '60%', '50%' ],
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
							window.location.href = __ctx+'/pg/Report/measure/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


