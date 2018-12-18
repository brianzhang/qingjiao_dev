/**
 * 采购需求
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:04
 *</pre>
 */
$(function() {
	cgxq  = new Cgxq();
	cgxq.init();
	
	formUrl = cgxq.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#cgxqGrid",// 列表对象
			PAGER : "#cgxqPager",// 列表分页
			FORM : '#cgxqForm',// 表单form
			FORMGET : '#cgxqFormGet'// 表单form
			
	};
	/**
	 * 采购需求 对象
	 * @returns {Cgxq}
	 */
	Cgxq = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Cgxq.prototype = {
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
						url :  __ctx+'/platform/codegen/cgxq/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','IP地址','创建人','创建时间','更新人','更新时间','项目名称','采购计划编号','登记日期','申报部门','采购执行部门','采购金额','采购预算指标','项目类型','投标人资格要求','备注','受理状态','审核状态','项目所属预算年度','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'ip',
				                	   index: 'IP_'

				                	 					                	 	}, {
				                 	   name:'createBy',
				                	   index: 'CREATE_BY_'

				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'CREATE_TIME_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'updateBy',
				                	   index: 'UPDATE_BY_'

				                	 					                	 	}, {
				                 	   name:'updateTime',
				                	   index: 'UPDATE_TIME_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'projectName',
				                	   index: 'PROJECT_NAME_'

				                	 					                	 	}, {
				                 	   name:'purchasePlanCode',
				                	   index: 'PUR_PLAN_CODE_'

				                	 					                	 	}, {
				                 	   name:'registerDate',
				                	   index: 'REGISTER_DATE_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'declareDepart',
				                	   index: 'DECLARE_DEPART_'

				                	 					                	 	}, {
				                 	   name:'purchaseOperateOrg',
				                	   index: 'PUR_OPERATE_ORG_'

				                	 					                	 	}, {
				                 	   name:'purchaseAmount',
				                	   index: 'PURCHASE_AMOUNT_'

				                	 					                	 	}, {
				                 	   name:'purBudgetIndex',
				                	   index: 'PUR_BUDGET_INDEX_'

				                	 					                	 	}, {
				                 	   name:'projectType',
				                	   index: 'PROJECT_TYPE_'

				                	 					                	 	}, {
				                 	   name:'bidderQualiRequire',
				                	   index: 'BIDDER_REQUIRE_'

				                	 					                	 	}, {
				                 	   name:'remark',
				                	   index: 'REMARK_'

				                	 					                	 	}, {
				                 	   name:'acceptStatus',
				                	   index: 'ACCEPT_STATUS_'

				                	 					                	 	}, {
				                 	   name:'auditStatus',
				                	   index: 'AUDIT_STATUS_'

				                	 					                	 	}, {
				                 	   name:'budgetYear',
				                	   index: 'BUDGET_YEAR_'
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
										action:__ctx+'/platform/codegen/cgxq/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/cgxq/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/cgxq/get.htm?id={id}'
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
						window.location.href = __ctx+'/platform/codegen/cgxq/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();