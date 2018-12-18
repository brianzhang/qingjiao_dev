/**
 * t_budgetapply2018
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-23 10:03:59
 *</pre>
 */
$(function() {
	budgetApply  = new BudgetApply();
	budgetApply.init();
	
	formUrl = budgetApply.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#budgetApplyGrid",// 列表对象
			PAGER : "#budgetApplyPager",// 列表分页
			FORM : '#budgetApplyForm',// 表单form
			FORMGET : '#budgetApplyFormGet'// 表单form
			
	};
	/**
	 * t_budgetapply2018 对象
	 * @returns {BudgetApply}
	 */
	BudgetApply = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BudgetApply.prototype = {
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
						url :  __ctx+'/platform/codegen/budgetApply/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','IP地址','创建人','创建时间','更新人','更新时间','申请人','申请人名称','申请部门','申请人部门名称','申请时间','产品','市场范围','所属区域','办事处','预算金额','事项描述','备注','上级领导审批','管理'],
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
				                 	   name:'proposer',
				                	   index: 'proposer_'

				                	 					                	 	}, {
				                 	   name:'proposerName',
				                	   index: 'proposer_name_'

				                	 					                	 	}, {
				                 	   name:'applyDept',
				                	   index: 'apply_dept_'

				                	 					                	 	}, {
				                 	   name:'applyDeptName',
				                	   index: 'apply_dept_name_'

				                	 					                	 	}, {
				                 	   name:'applyTime',
				                	   index: 'apply_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'product',
				                	   index: 'product_'

				                	 					                	 	}, {
				                 	   name:'marketArea',
				                	   index: 'market_area_'

				                	 					                	 	}, {
				                 	   name:'area',
				                	   index: 'area_'

				                	 					                	 	}, {
				                 	   name:'office',
				                	   index: 'office_'

				                	 					                	 	}, {
				                 	   name:'budgetAmount',
				                	   index: 'budget_amount_'

				                	 					                	 	}, {
				                 	   name:'eventDesc',
				                	   index: 'event_desc_'

				                	 					                	 	}, {
				                 	   name:'remark',
				                	   index: 'remark_'

				                	 					                	 	}, {
				                 	   name:'leaderAppoval',
				                	   index: 'leader_appoval_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/codegen/budgetApply/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/budgetApply/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/budgetApply/get.htm?id={id}'
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
						window.location.href = __ctx+'/platform/codegen/budgetApply/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();