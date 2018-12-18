
/**
 * t_dbgs
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 18:38:26
 *</pre>
 */
$(function() {
	danBaoCompanyInfo  = new DanBaoCompanyInfo();
	danBaoCompanyInfo.init();
	
	formUrl = danBaoCompanyInfo.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#danBaoCompanyInfoGrid",// 列表对象
			PAGER : "#danBaoCompanyInfoPager",// 列表分页
			FORM : '#danBaoCompanyInfoForm'// 表单form
	};
	/**
	 * t_dbgs 对象
	 * @returns {DanBaoCompanyInfo}
	 */
	DanBaoCompanyInfo = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DanBaoCompanyInfo.prototype = {
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
						url :  __ctx+'/loanp/danBaoCompany/danBaoCompanyInfo/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','担保公司客户名称','担保性质','负责人','联系电话','担保经营资格许可证','保证金账号','保证金分账号','保证金金额','允许放大倍数','开办机构','生效日期','到期日期','借贷ID','担保公司客户号','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'dbgskhmc',
				                	   index: 'dbgskhmc'

				                	 					                	 	}, {
				                 	   name:'dbxz',
				                	   index: 'dbxz'

				                	 					                	 	}, {
				                 	   name:'fzr',
				                	   index: 'fzr'

				                	 					                	 	}, {
				                 	   name:'lxdh',
				                	   index: 'lxdh'

				                	 					                	 	}, {
				                 	   name:'dbjyzgxkz',
				                	   index: 'dbjyzgxkz'

				                	 					                	 	}, {
				                 	   name:'bzjzh',
				                	   index: 'bzjzh'

				                	 					                	 	}, {
				                 	   name:'bzjfzh',
				                	   index: 'bzjfzh'

				                	 					                	 	}, {
				                 	   name:'bzjje',
				                	   index: 'bzjje'

				                	 					                	 	}, {
				                 	   name:'yxfdbs',
				                	   index: 'yxfdbs'

				                	 					                	 	}, {
				                 	   name:'kbjg',
				                	   index: 'kbjg'

				                	 					                	 	}, {
				                 	   name:'sxrq',
				                	   index: 'sxrq'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'dqrq',
				                	   index: 'dqrq'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'jdid',
				                	   index: 'jdID'

				                	 					                	 	}, {
				                 	   name:'dbgskhh',
				                	   index: 'dbgskhh'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/danBaoCompany/danBaoCompanyInfo/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/danBaoCompany/danBaoCompanyInfo/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/danBaoCompany/danBaoCompanyInfo/get.htm?id={id}'
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