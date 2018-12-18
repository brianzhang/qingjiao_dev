
/**
 * 应用API
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-15 11:36:13
 *</pre>
 */
$(function() {
	authAppApi  = new AuthAppApi();
	authAppApi.init();
	
	formUrl = authAppApi.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#authAppApiGrid",// 列表对象
			PAGER : "#authAppApiPager",// 列表分页
			FORM : '#authAppApiForm',// 表单form
			FORMGET : '#authAppApiFormGet'// 表单form
			
	};
	/**
	 * 应用API 对象
	 * @returns {AuthAppApi}
	 */
	AuthAppApi = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	AuthAppApi.prototype = {
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
						url :  __ctx+'/platform/auth/authAppApi/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','应用key','API标识','API名称','API地址','作用域','频次','测试频次','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'appKey',
				                	   index: 'app_key_'

				                	 					                	 	}, {
				                 	   name:'apiKey',
				                	   index: 'api_key_'

				                	 					                	 	}, {
				                 	   name:'apiName',
				                	   index: 'api_name_'

				                	 					                	 	}, {
				                 	   name:'apiUri',
				                	   index: 'api_uri_'

				                	 					                	 	}, {
				                 	   name:'scope',
				                	   index: 'scope_',
				                	   formatter: function(value,row,index){
											if(value)
										    	return value.replace("anonymous","匿名调用").replace("auth","授权调用");
										    else 
										    	return '';
										}

				                	 					                	 	}, {
				                 	   name:'limit',
				                	   index: 'limit_'

				                	 					                	 	}, {
				                 	   name:'testLimit',
				                	   index: 'test_limit_'

				                	 					                	 	},  {
									name : '__manage',
									width : 50,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/auth/authAppApi/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/auth/authAppApi/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/auth/authAppApi/get.htm?id={id}'
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
				var sl = $("[name='m:authAppApi:scope']:checked").length;
				if(sl < 1){
					DialogUtil.warn("请选择作用域！");
					return;
				}
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
						window.location.href = __ctx+'/platform/auth/authAppApi/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


