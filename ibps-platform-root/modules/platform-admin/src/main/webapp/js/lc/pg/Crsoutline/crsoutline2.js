/**
 * t_t_crs_outline
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-17 16:56:32
 * </pre>
 */
$(function() {
	crsoutline = new Crsoutline();
	crsoutline.init();

	formUrl = crsoutline.formUrl;
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#crsoutlineGrid",// 列表对象
		PAGER : "#crsoutlinePager",// 列表分页
		FORM : '#crsoutlineForm',// 表单form
		FORMGET : '#crsoutlineFormGet'// 表单form
	};
	/**
	 * t_t_crs_outline 对象
	 * 
	 * @returns {Crsoutline}
	 */
	Crsoutline = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	Crsoutline.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0) {// 列表
				this._initGridList();

			}
			if ($(this.consts.FORM).length > 0) {// 表单
				this._initForm();
				this._initData();
				this._initOffice('e');
			}
			if ($(this.consts.FORMGET).length > 0) {// 明细页面office控件初始化
				this._initOffice('r');
			}
		},
		_initOffice : function(_rights) {
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/pg/Crsoutline/crsoutline/listJson2.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', '课程编号', '中文名称',
										 '课程性质',
										 '管理',
										 ],
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


										},
										{
											name : 'name',
											index : 'name'

										},
										
										{
											name : 'crs_properties',
											index : 'crs_properties'

										},{
											name : '__manage',
											width : 30,
											sortable : false,
											classes : 'rowOps',
											
											formatter : 'manage',
											formatoptions : [
                                                {
                                                    label : ' 作业成绩雷达图',
                                                    classes : 'btn btn-primary fa fa-detail',
                                                    //action : 'javascript:crsStd.message("{crsTchId}")'
                                                    action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=442275128751947776&cname1=crsTchId&cval1=6019980025',

                                                }

													 ]
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
		message : function(num) {
			DialogUtil.dialog({
				title : '课程大纲',
				content : __ctx + '/platform/report/raqsoft/showReport.htm?reportId=439497329209245696&num='+"201422011",
				//content : __ctx + '/platform/report/raqsoft/preview.htm?reportId=403863483222851584&crs_num='+crsNum,
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
		message1 : function(num) {
			DialogUtil.dialog({
				title : '教学基本进度表',
				content : __ctx+'/platform/report/raqsoft/showReport.htm?reportId=439349557877276672&num='+num,
				//content : __ctx + '/platform/report/raqsoft/preview.htm?reportId=403863483222851584&crs_num='+crsNum,
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
		
		edit : function(crsName) {
			DialogUtil.dialog({
				title : '作业管理',
				content : __ctx + '/gradp/course/crsJob/list.htm? '+'&crsName=' + crsName,
				index : 'edit',
				area : [ '80%', '80%' ],
				btn : [ 
					{
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b);
					}
				} ]
			});
		},
		
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
								+ '/pg/Crsoutline/crsoutline/list2.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
