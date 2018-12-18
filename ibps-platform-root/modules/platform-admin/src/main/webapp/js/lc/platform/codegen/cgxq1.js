/**
 * t_cgxq
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:24
 *</pre>
 */
$(function() {
	cgxq1  = new Cgxq1();
	cgxq1.init();
	
	formUrl = cgxq1.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#cgxq1Grid",// 列表对象
			PAGER : "#cgxq1Pager",// 列表分页
			FORM : '#cgxq1Form',// 表单form
			FORMGET : '#cgxq1FormGet'// 表单form
			
	};
	/**
	 * t_cgxq 对象
	 * @returns {Cgxq1}
	 */
	Cgxq1 = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Cgxq1.prototype = {
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
						url :  __ctx+'/platform/codegen/cgxq1/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','IP地址','更新人','更新时间','项目名称','采购计划编号','登记日期','申报部门','采购执行部门','采购金额','采购预算指标','项目类型','项目所属预算年度','投标人资格要求','备注','操作人','操作时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'ip',
				                	   index: 'ip_'

				                	 					                	 	}, {
				                 	   name:'updateBy',
				                	   index: 'update_by_'

				                	 					                	 	}, {
				                 	   name:'updateTime',
				                	   index: 'update_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'purProName',
				                	   index: 'pur_pro_name_'

				                	 					                	 	}, {
				                 	   name:'purPlanCode',
				                	   index: 'pur_plan_code_'

				                	 					                	 	}, {
				                 	   name:'purRegDate',
				                	   index: 'pur_reg_date_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'purApplyDept',
				                	   index: 'pur_apply_dept_'

				                	 					                	 	}, {
				                 	   name:'purOperaDept',
				                	   index: 'pur_opera_dept_'

				                	 					                	 	}, {
				                 	   name:'purAmount',
				                	   index: 'pur_amount_'

				                	 					                	 	}, {
				                 	   name:'purBuIndex',
				                	   index: 'pur_bu_index_'

				                	 					                	 	}, {
				                 	   name:'purProType',
				                	   index: 'pur_pro_type_'

				                	 					                	 	}, {
				                 	   name:'purProBudYear',
				                	   index: 'pur_pro_bud_year_'

				                	 					                	 	}, {
				                 	   name:'purZgRequire',
				                	   index: 'pur_zg_require_'

				                	 					                	 	}, {
				                 	   name:'purRemark',
				                	   index: 'pur_remark_'

				                	 					                	 	}, {
				                 	   name:'createBy',
				                	   index: 'create_by_'

				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
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
										action:__ctx+'/platform/codegen/cgxq1/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/cgxq1/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/cgxq1/get.htm?id={id}'
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
						window.location.href = __ctx+'/platform/codegen/cgxq1/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();