
/**
 * t_tddsxs
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-20 23:31:07
 *</pre>
 */
$(function() {
	teacherAndStudent  = new TeacherAndStudent();
	teacherAndStudent.init();
	
	formUrl = teacherAndStudent.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#teacherAndStudentGrid",// 列表对象
			PAGER : "#teacherAndStudentPager",// 列表分页
			FORM : '#teacherAndStudentForm'// 表单form
	};
	/**
	 * t_tddsxs 对象
	 * @returns {TeacherAndStudent}
	 */
	TeacherAndStudent = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	TeacherAndStudent.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/bishe/teacherAndStudent/teacherAndStudent/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','团队','剩余学生名额'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	},  {
				                 	   name:'team',
				                	   index: 'team'

				                	 					                	 	}, {
				                 	   name:'amount',
				                	   index: 'amount'

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
							window.location.href = __ctx+'/bishe/teacherAndStudent/teacherAndStudent/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


