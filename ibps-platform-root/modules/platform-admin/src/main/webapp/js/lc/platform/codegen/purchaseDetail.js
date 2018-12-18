

/**
 * t_purchasedetaillist
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:50
 *</pre>
 */
$(function() {
	purchaseDetail  = new PurchaseDetail();
	purchaseDetail.init();
	
	formUrl = purchaseDetail.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#purchaseDetailGrid",// 列表对象
			PAGER : "#purchaseDetailPager",// 列表分页
			FORM : '#purchaseDetailForm',// 表单form
			FORMGET : '#purchaseDetailFormGet'// 表单form
			
	};
	/**
	 * t_purchasedetaillist 对象
	 * @returns {PurchaseDetail}
	 */
	PurchaseDetail = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PurchaseDetail.prototype = {
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
						url :  __ctx+'/platform/codegen/purchaseDetail/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','外键','IP地址','创建人','创建时间','更新人','更新时间','采购项品目','采购项名称','采购数量','市场参考价','需求时间','说明','操作时间','操作人','小计','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'parentId',
				                	   index: 'parent_id_'

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
				                 	   name:'purchaseItem',
				                	   index: 'purchase_item_'

				                	 					                	 	}, {
				                 	   name:'purItemName',
				                	   index: 'pur_item_name_'

				                	 					                	 	}, {
				                 	   name:'purchaseNumber',
				                	   index: 'purchase_number_'

				                	 					                	 	}, {
				                 	   name:'marketRefePrice',
				                	   index: 'market_refe_price_'

				                	 					                	 	}, {
				                 	   name:'demandDate',
				                	   index: 'demand_date_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'description',
				                	   index: 'description_'

				                	 					                	 	}, {
				                 	   name:'operateDate',
				                	   index: 'operate_date_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'operator',
				                	   index: 'operator_'

				                	 					                	 	}, {
				                 	   name:'subtotal',
				                	   index: 'subtotal_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/codegen/purchaseDetail/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/purchaseDetail/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/purchaseDetail/get.htm?id={id}'
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
						window.location.href = __ctx+'/platform/codegen/purchaseDetail/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


