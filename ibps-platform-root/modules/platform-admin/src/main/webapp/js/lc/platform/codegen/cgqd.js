/**
 * t_purchasedetaillist
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:06
 *</pre>
 */
$(function() {
	cgqd  = new Cgqd();
	cgqd.init();
	
	formUrl = cgqd.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#cgqdGrid",// 列表对象
			PAGER : "#cgqdPager",// 列表分页
			FORM : '#cgqdForm',// 表单form
			FORMGET : '#cgqdFormGet'// 表单form
			
	};
	/**
	 * t_purchasedetaillist 对象
	 * @returns {Cgqd}
	 */
	Cgqd = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Cgqd.prototype = {
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
						url :  __ctx+'/platform/codegen/cgqd/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','外键','IP地址','创建人','创建时间','更新人','更新时间','采购项品目','采购项名称','采购数量','市场参考价','需求时间','说明','操作时间','操作人','小计','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'parentId',
				                	   index: 'PARENT_ID_'

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
				                 	   name:'purchaseItem',
				                	   index: 'PURCHASE_ITEM_'

				                	 					                	 	}, {
				                 	   name:'purItemName',
				                	   index: 'PUR_ITEM_NAME_'

				                	 					                	 	}, {
				                 	   name:'purchaseNumber',
				                	   index: 'PURCHASE_NUMBER_'

				                	 					                	 	}, {
				                 	   name:'marketRefePrice',
				                	   index: 'MARKET_REFE_PRICE_'

				                	 					                	 	}, {
				                 	   name:'demandDate',
				                	   index: 'DEMAND_DATE_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'description',
				                	   index: 'DESCRIPTION_'

				                	 					                	 	}, {
				                 	   name:'operateDate',
				                	   index: 'OPERATE_DATE_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'operator',
				                	   index: 'OPERATOR_'

				                	 					                	 	}, {
				                 	   name:'subtotal',
				                	   index: 'SUBTOTAL_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/codegen/cgqd/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/cgqd/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/cgqd/get.htm?id={id}'
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
						window.location.href = __ctx+'/platform/codegen/cgqd/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();