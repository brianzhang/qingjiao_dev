/**
 * t_demo_file_
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:05:10
 * </pre>
 */
$(function() {
	demoFile = new DemoFile();
	demoFile.init();

	formUrl = demoFile.formUrl;
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#demoFileGrid",// 列表对象
		PAGER : "#demoFilePager",// 列表分页
		FORM : '#demoFileForm'// 表单form
	};
	/**
	 * t_demo_file_ 对象
	 * 
	 * @returns {DemoFile}
	 */
	DemoFile = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	DemoFile.prototype = {
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
			if($('#ty').val()==0)Open();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this, loanId = $('#loanId').val() , ty=$('#ty').val(),ifTyEqual0IsScan=ty==0;
			$(this.consts.GRID).GridList(
					{
						url : __ctx
								+ '/loanp/demo/demoFile/listJson.htm?loanId='
								+ loanId,
						pager : this.consts.PAGER,
						colNames : [ '主键', '文件名', '所属贷款', '文件路径', '管理' ],
						colModel : [ {
							name : 'id',
							index : 'id_'

							,
							hidden : !0,
							key : !0
						}, {
							name : 'name',
							index : 'name'

						}, {
							name : 'loanid',
							index : 'loanId',
							hidden : !0

						}, {
							name : 'file',
							index : 'file',
							hidden : !0

						}, {
							name : '__manage',
							width : 30,
							sortable : 0,
							classes : 'rowOps',
							formatter : 'manage',
							formatoptions : [ {
								label : '扫描文件',
								classes : 'btn btn-primary fa fa-detail',
								action : 'javascript:Scan("{id}","{name}","{loanid}")',
								hidden : !ifTyEqual0IsScan
							},{
								label : '审阅',
								classes : 'btn btn-primary fa fa-detail',
								action : 'javascript:review("{id}","{name}","{file}")',
								hidden : ifTyEqual0IsScan
							} ]
						} ],
						loadComplete : function() {
							try {
								$('.rowOps').each(function() {
									$(this).rowOps();
								});
							} catch (e) {
							}
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
								+ '/loanp/demo/demoFile/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}

	};
})();
review = function(a,b,c){
	var url = '/loanp/demo/demoFile/review.htm?file='+c;
	DialogUtil.dialog({
		content : url,
		area : ['100%','100%'],
		btn:[{
			label:'保存',
			iconCls:'btn btn-success fa fa-ok',
			action:function(dialog,index){
				
			}
		},{
			label:'取消',
			iconCls:'btn btn-success fa fa-cancel',
			action:function(dialog,index){
				DialogUtil.close(index);
			}
			
		}
		]
	})
}