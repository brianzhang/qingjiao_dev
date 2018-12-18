
/**
 * t_danbaocompany_all
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：liato
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 21:33:29
 *</pre>
 */
$(function() {
	danBaoCompany_all  = new DanBaoCompany_all();
	danBaoCompany_all.init();
	
	formUrl = danBaoCompany_all.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#danBaoCompany_allGrid",// 列表对象
			PAGER : "#danBaoCompany_allPager",// 列表分页
			FORM : '#danBaoCompany_allForm'// 表单form
	};
	/**
	 * t_danbaocompany_all 对象
	 * @returns {DanBaoCompany_all}
	 */
	DanBaoCompany_all = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DanBaoCompany_all.prototype = {
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
						url :  __ctx+'/loanp/danbaoCompany_All/danBaoCompany_all/listJson.htm?jdid=${jdid}',
						pager :this.consts.PAGER,
						colNames: ['主键','担保类别','公司名称','公司法定代表人','法人证件类型','法人身份证号','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'dblb',
				                	   index: 'dblb'

				                	 					                	 	}, {
				                 	   name:'gsmc',
				                	   index: 'gsmc'

				                	 					                	 	}, {
				                 	   name:'gsfddbr',
				                	   index: 'gsfddbr'

				                	 					                	 	}, {
				                 	   name:'frzjlx',
				                	   index: 'frzjlx'

				                	 					                	 	}, {
				                 	   name:'frsfzh',
				                	   index: 'frsfzh'

				                	 					                	 	}, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'填写',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/danBaoCompany/danBaoCompanyInfo/edit.htm?id={id}&jdid={jdid}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/danBaoCompany/danBaoCompanyInfo/get.htm?id={id}&jdid={jdid}'
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
				DialogUtil.confirm(msg.getMessage().split("@")[0] + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/loanp/danbaoCompany_All/danBaoCompany_all/list.htm?jdid='+msg.getMessage().split("@")[1];
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


