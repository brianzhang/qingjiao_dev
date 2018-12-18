/**
 * 用户密码安全设置
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：summer
 * 邮箱地址：1121813340@qq.com
 * 创建时间：2017-12-04 12:23:45
 *</pre>
 */
$(function() {
	userSecurity  = new UserSecurity();
	userSecurity.init();
	
	formUrl = userSecurity.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#userSecurityGrid",// 列表对象
			PAGER : "#userSecurityPager",// 列表分页
			FORM : '#userSecurityForm'// 表单form
	};
	/**
	 * 用户密码安全设置 对象
	 * @returns {UserSecurity}
	 */
	UserSecurity = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	UserSecurity.prototype = {
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
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/auth/userSecurity/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','是否启用复杂度策略','密码长度最小值','密码长度最大值','强制更改密码时间（天）','最长使用期限（天）','是否为系统默认','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'isUseComp',
				                	   index: 'is_use_comp_',
				                	   formatter: 'dataFormat',
			                            formatoptions: {
			                            	value : [{
												name:'Y',
												value:'启用',
												css:'green'
											},{
												name:'N',
												value:'禁用',
												css:'red'
											}
										]}
				                	 					                	 	},{
				                 	   name:'minLength',
				                	   index: 'min_length_'
				                	 					                	 	}, {
				                 	   name:'maxLength',
				                	   index: 'max_length_'
				                	 					                	 	}, {
				                 	   name:'updTlimit',
				                	   index: 'upd_tlimit_'
				                	 					                	 	}, {
				                 	   name:'timeLimit',
				                	   index: 'time_limit_'
				                	 					                	 	}, {
				                 	   name:'isDefault',
				                	   index: 'is_default_',
				                	   formatter: 'dataFormat',
			                            formatoptions: {
			                            	value : [{
												name:'Y',
												value:'是',
												css:'green'
											},{
												name:'N',
												value:'否'
											}
										]}
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'设置默认',
										classes:'btn btn-primary fa fa-play',
										action:'javascript:userSecurity._setDefault("{id}");',
										hidden : function(opts, rowData){
											if(rowData.isUseComp == 'N') return true;
											if(rowData.isDefault == 'Y') return true;
											return false;
										}
									},{
										label:'启用',
										classes:'btn btn-primary fa fa-toggle-on',
										action:'javascript:userSecurity._setUse("{id}","Y");',
										hidden : function(opts, rowData){
											if(rowData.isUseComp == 'Y') return true;
											return false;
										}
									},{
										label:'禁用',
										classes:'btn btn-primary fa fa-toggle-off',
										action:'javascript:userSecurity._setUse("{id}","N");',
										hidden : function(opts, rowData){
											if(rowData.isUseComp == 'N') return true;
											return false;
										}
									},{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/auth/userSecurity/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/auth/userSecurity/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/auth/userSecurity/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		_setDefault : function(id){
			var me = this, 
			url = __ctx + '/platform/auth/userSecurity/setDefault.htm';
			$.ajax({
				type : "POST",
				url : url,
				data : {id : id},
				success : function(responseText) {
					var msg = new com.lc.form.ResultMessage(responseText);
					if (msg.isSuccess()) {
						DialogUtil.toastr(msg.getMessage());
						window.location.reload(true);
					} else {
						DialogUtil.error(msg.getMessage());
					}
				},
				errror:function(){
					
				}
			});
		},
		_setUse : function(id, use){
			var me = this, 
			url = __ctx + '/platform/auth/userSecurity/setUse.htm';
			$.ajax({
				type : "POST",
				url : url,
				data : {id : id, use : use},
				success : function(responseText) {
					var msg = new com.lc.form.ResultMessage(responseText);
					if (msg.isSuccess()) {
						DialogUtil.toastr(msg.getMessage());
						window.location.reload(true);
					} else {
						DialogUtil.error(msg.getMessage());
					}
				},
				errror:function(){
					
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
			/*me.initCompData();
			$(document).on('click', 'input:radio', function() {
				me.initCompData();
			});*/
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading');
				formUrl.submit(me._showResponse, $el);
			});
		},
		initCompData:function(){
			var val= $("input:radio:checked").val();
			if(val=='N'){
				$("#complexityDiv").hide();
			}else if(val=='Y'){
				$("#complexityDiv").show();
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
						window.location.href = __ctx+'/platform/auth/userSecurity/list.htm';
					});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
