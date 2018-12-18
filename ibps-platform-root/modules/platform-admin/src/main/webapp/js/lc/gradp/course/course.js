/**
 * t_course
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-09-14 22:52:17
 * </pre>
 */
$(function() {
	course = new Course();
	course.init();

	formUrl = course.formUrl;
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#courseGrid",// 列表对象
		PAGER : "#coursePager",// 列表分页
		FORM : '#courseForm'// 表单form
	};
	/**
	 * t_course 对象
	 * 
	 * @returns {Course}
	 */
	Course = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	Course.prototype = {
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
			if ($(this.consts.FORM).length > 0) {// 表单
				this._initForm();
				this._initData();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$('.search-form input').on('keyup', function() {
				me.cg();
			});
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/gradp/course/course/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', center('课程编号'),
										center('课程名称'), center('学时'),
										center('学分'), center('性质'),
										center('考试性质'), center('开课院系'),
										center('授课情况') ],
								colModel : [
										{
											name : 'id',
											index : 'id_'

											,
											hidden : true,
											key : true
										},
										{
											name : 'num',
											index : 'num',
											align : 'center'

										},
										{
											name : 'name',
											index : 'name',
											align : 'center'

										},
										{
											name : 'period',
											index : 'period',
											align : 'center'

										},
										{
											name : 'credit',
											index : 'credit',
											align : 'center'

										},
										{
											name : 'category',
											index : 'category',
											align : 'center'

										},
										{
											name : 'testing',
											index : 'testing',
											align : 'center'
										},
										{
											name : 'college',
											index : 'college',
											align : 'center'
										},
										{
											name : '__manage',
											width : 150,
											sortable : false,
											classes : 'rowOps',
											align : "center",
											formatter : 'manage',
											formatoptions : [ {
												label : '课程明细',
												classes : 'btn btn-primary fa fa-detail',
												action : 'javascript:course.showMsg("{id}")',
											} ]
										} ],
								loadComplete : function() {
									try {
										$('.rowOps').each(function() {
											$(this).rowOps({
												showNum : 2
											});
										});
									} catch (e) {
										fa - save
									}
								}

							});

			$('#importCourse').on('click', function() {
				var url= __ctx +'/gradp/admin/data/imbort.htm?type=0';
				DialogUtil.dialog({
					title : '导入院系课程',
					content : url,
					index : 'edit',
					area : [ '70%', '70%' ],
					btn : [ {
						label : '关闭',
						iconCls : 'btn btn-success fa fa-cancel',
						action : function(a, b) {
							DialogUtil.close(b);
						}
					} ]
				});
			});
			$('#uniManage').on('click', function() {
				var ids=$("#courseGrid").jqGrid("getGridParam", "selarrrow"),content = __ctx + '/gradp/course/crsTch/uniView.htm?ids='+ids;
				if(ids.length == 0){
					DialogUtil.toastr("请至少选择一门!");
					return ;
				}
				DialogUtil.dialog({
					title : '院系统一管理作业',
					content,
					area : ['60%','60%'],
					params : {
						ids,
					},
					btn:[
						{
							label : '确定',
							iconCls : "btn btn-success fa fa-ok",
							action : function( a , b ){
								debugger;
								DialogUtil.getChildFrameWindow(b).uniManage();
							}
						},
						{
							label : '取消',
							iconCls : 'btn btn-danger fa fa-cancel',
							action : function(a , b){
								DialogUtil.close( b );
							}
						}
					]
				})
				
				
				
				
				
				
				
				
				
				
			});

		},
		showMsg : function(id) {
			var url = __ctx + '/gradp/course/course/get.htm?id=' + id;
			DialogUtil.dialog({
				title : '课程明细',
				content : url,
				index : 'edit',
				area : [ '60%', '60%' ],
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
				me.formUrl.submit(me._showResponse);
			});

		},
		/**
		 * 初始化数据
		 */
		_initData : function() {
			if (!$.isEmpty(frameElement) && !$.isEmpty(frameElement.dialog)
					&& !$.isEmpty(frameElement.dialog.params)
					&& !$.isEmpty(frameElement.dialog.params.data)) {
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/gradp/course/course/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		cg : function() {
			$('a.fa-search').click();
		}
	};
})();
center = function(s) {
	return '<div style="text-align:center;">' + s + '</div>';
}
