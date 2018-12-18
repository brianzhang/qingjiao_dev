
/**
 * t_p_ysqk
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 13:55:55
 *</pre>
 */
$(function() {
	flaction  = new Flaction();
	flaction.init();
	
	formUrl = flaction.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#flactionGrid",// 列表对象
			PAGER : "#flactionPager",// 列表分页
			FORM : '#flactionForm',// 表单form
			FORMGET : '#flactionFormGet'// 表单form
	};
	/**
	 * t_p_ysqk 对象
	 * @returns {Flaction}
	 */
	Flaction = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Flaction.prototype = {
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
						url :  __ctx+'/pg/Report/flaction/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','课程编号','课程名称','课程目标 ','教学基本要求','参考指标点','教学基本要求项','考核形式','占总成绩比例','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'courseId',
				                	   index: 'course_id'

				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'name'

				                	 					                	 	}, {
				                 	   name:'objective',
				                	   index: 'objective'

				                	 					                	 	}, {
				                 	   name:'techRequirement',
				                	   index: 'tech_requirement'

				                	 					                	 	}, {
				                 	   name:'indexPoint',
				                	   index: 'index_point'

				                	 					                	 	}, {
				                 	   name:'teachRequirement',
				                	   index: 'teach_requirement'

				                	 					                	 	}, {
				                 	   name:'textForm',
				                	   index: 'text_form'

				                	 					                	 	}, {
				                 	   name:'account',
				                	   index: 'account'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/Report/flaction/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/Report/flaction/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/Report/flaction/get.htm?id={id}'
									},{
                                        label:'查看表单',
                                        classes:'btn btn-primary fa fa-detail',
                                        action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=430671916345327616&cname1=course_id&cval1={courseId}'
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
							window.location.href = __ctx+'/pg/Report/flaction/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


