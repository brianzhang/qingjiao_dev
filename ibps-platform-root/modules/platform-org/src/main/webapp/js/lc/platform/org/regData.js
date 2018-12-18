
/**
 * 用户注册信息
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 20:21:43
 *</pre>
 */
$(function() {
	regData  = new RegData();
	regData.init();
	
	formUrl = regData.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#regDataGrid",// 列表对象
			PAGER : "#regDataPager",// 列表分页
			FORM : '#regDataForm'// 表单form
	};
	/**
	 * 用户注册信息 对象
	 * @returns {RegData}
	 */
	RegData = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	RegData.prototype = {
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
						url :  __ctx+'/platform/org/regData/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','姓名','性别','手机','密码','公司名称','区域','校验码','创建时间','关联账号','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'fullName',
				                	   index: 'full_name_'

				                	 					                	 	}, {
				                 	   name:'gender',
				                	   index: 'gender_',
										formatter: 'select',
			                            formatoptions: {
			                                value: {
			                                    'male': '男',
			                                    'female': '女'
			                                }
			                            }
				                	 	}, {
				                 	   name:'mobile',
				                	   index: 'mobile_'

				                	 					                	 	}, {
				                 	   name:'passWd',
				                	   index: 'pass_wd_'

				                	 	,hidden:true
				                	 	}, {
				                 	   name:'company',
				                	   index: 'company_'

				                	 					                	 	}, {
				                 	   name:'area',
				                	   index: 'area_'

				                	 					                	 	}, {
				                 	   name:'dataChk',
				                	   index: 'data_chk_'

				                	 	,hidden:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 	,formatoptions:'yyyy-MM-dd HH:mm:ss'
				                	 					                	 	}, {
				                 	   name:'relAccount',
				                	   index: 'rel_account_'

				                	 	,hidden:true
				                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/org/regData/get.htm?id={id}'
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
				formUrl.submit(me._showResponse, $el);
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) && !$.isEmpty(frameElement.dialog)){
				var params = frameElement.dialog.params;
				var data = params.data;
				this.formUrl.setData("[name^='m:']", data);
				this.formUrl.validate();
			}
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
							window.location.href = __ctx+'/platform/org/regData/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


