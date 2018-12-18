

/**
 * 采购需求
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
$(function() {
	purchaseDemand  = new PurchaseDemand();
	purchaseDemand.init();
	
	formUrl = purchaseDemand.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#purchaseDemandGrid",// 列表对象
			PAGER : "#purchaseDemandPager",// 列表分页
			FORM : '#purchaseDemandForm',// 表单form
			FORMGET : '#purchaseDemandFormGet'// 表单form
			
	};
	/**
	 * 采购需求 对象
	 * @returns {PurchaseDemand}
	 */
	PurchaseDemand = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PurchaseDemand.prototype = {
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
						url :  __ctx+'/platform/codegen/purchaseDemand/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','IP地址','创建人','创建时间','更新人','更新时间','项目名称','采购计划编号','登记日期','申报部门','采购执行部门','采购金额','采购预算指标','项目类型','投标人资格要求','备注','受理状态','审核状态','项目所属预算年度','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'ip',
				                	   index: 'ip_'

				                	 					                	 	}, {
				                 	   name:'createBy',
				                	   index: 'create_by_'

				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'updateBy',
				                	   index: 'update_by_'

				                	 					                	 	}, {
				                 	   name:'updateTime',
				                	   index: 'update_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'projectName',
				                	   index: 'project_name_'

				                	 					                	 	}, {
				                 	   name:'purchasePlanCode',
				                	   index: 'pur_plan_code_'

				                	 					                	 	}, {
				                 	   name:'registerDate',
				                	   index: 'register_date_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'declareDepart',
				                	   index: 'declare_depart_'

				                	 					                	 	}, {
				                 	   name:'purchaseOperateOrg',
				                	   index: 'pur_operate_org_'

				                	 					                	 	}, {
				                 	   name:'purchaseAmount',
				                	   index: 'purchase_amount_'

				                	 					                	 	}, {
				                 	   name:'purBudgetIndex',
				                	   index: 'pur_budget_index_'

				                	 					                	 	}, {
				                 	   name:'projectType',
				                	   index: 'project_type_'

				                	 					                	 	}, {
				                 	   name:'bidderQualiRequire',
				                	   index: 'bidder_require_'

				                	 					                	 	}, {
				                 	   name:'remark',
				                	   index: 'remark_'

				                	 					                	 	}, {
				                 	   name:'acceptStatus',
				                	   index: 'accept_status_'

				                	 					                	 	}, {
				                 	   name:'auditStatus',
				                	   index: 'audit_status_'

				                	 					                	 	}, {
				                 	   name:'budgetYear',
				                	   index: 'budget_year_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/codegen/purchaseDemand/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/purchaseDemand/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/purchaseDemand/get.htm?id={id}'
									}]
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
			me.formUrl.initSub('/platform/codegen');
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading');
				// office提交
        		OfficePlugin.submit();
				me.formUrl.submit(me._showResponse, $el);
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
						window.location.href = __ctx+'/platform/codegen/purchaseDemand/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


