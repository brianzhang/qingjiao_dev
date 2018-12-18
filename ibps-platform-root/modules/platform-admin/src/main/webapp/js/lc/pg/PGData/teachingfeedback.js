
/**
 * t_p_xxaqzyktjxfkb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:47:02
 *</pre>
 */
$(function() {
	teachingfeedback  = new Teachingfeedback();
	teachingfeedback.init();
	
	formUrl = teachingfeedback.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#teachingfeedbackGrid",// 列表对象
			PAGER : "#teachingfeedbackPager",// 列表分页
			FORM : '#teachingfeedbackForm',// 表单form
			FORMGET : '#teachingfeedbackFormGet'// 表单form
	};
	/**
	 * t_p_xxaqzyktjxfkb 对象
	 * @returns {Teachingfeedback}
	 */
	Teachingfeedback = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Teachingfeedback.prototype = {
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
						url :  __ctx+'/pg/PGData/teachingfeedback/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','课程编号','课程名称','授课教师','评价人','管理'],
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
				                 	   name:'course_name',
				                	   index: 'course_name'

				                	 					                	 	}, {
				                 	   name:'teacher',
				                	   index: 'teacher'

				                	 					                	 	}, {
				                 	   name:'evalution_name',
				                	   index: 'evalution_name'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/teachingfeedback/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/teachingfeedback/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/teachingfeedback/get.htm?id={id}'
									},{
										label:'查看表单',
										classes:'btn btn-primary fa fa-detail',
										//action :'javascript:teachingfeedback.demand("{course_id}")',//传递参数
										action:__ctx+'/platform/report/raqsoft/preview2.htm?reportId=429307120169517056&cname1=course_id&cval1={course_id}'//不用传递参数
									}]   //尚未实现参数传递
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
				title : '课堂教学反馈表',
				content :__ctx+'/platform/report/raqsoft/showReport.htm?reportId=429307120169517056&course_id='+course_id,
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
							window.location.href = __ctx+'/pg/PGData/teachingfeedback/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


