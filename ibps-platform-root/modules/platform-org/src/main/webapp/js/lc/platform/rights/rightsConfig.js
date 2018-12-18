/**
 * 权限配置
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-01-20 10:20:31
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var rightsConfig  = new RightsConfig();
	rightsConfig.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#rightsConfigGrid",// 列表对象
			PAGER : "#rightsConfigPager",// 列表分页
			FORM : '#rightsConfigForm'// 表单form
	};
	/**
	 * 权限配置 对象
	 * @returns {RightsConfig}
	 */
	RightsConfig = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	RightsConfig.prototype = {
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
			var me = this,rightsTypes = $.parseJSON($('#rightsTypes').val());

			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/rights/rightsConfig/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['ID','名称','业务主键','实体表名 ','ID的KEY','拥有的权限','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
					                 	   name:'name',
					                	   index: 'name_'
				                		}, {
					                 	   name:'key',
					                	   index: 'key_'
				                		}, {
					                 	   name:'entityType',
					                	   index: 'entity_type_'
				                		}, {
					                 	   name:'entityIdKey',
					                	   index: 'entity_id_key_'
				                		 }, {
					                 	   name:'ownRights',
					                	   index: 'own_rights_',
					                	   formatter:function(val, opts, rowData) {
					                		 if($.isEmpty(val)){
					                			 return "所有权限";
					                		 }  
					                		 var r = val.split(","), v ="";
					             			 for (var i = 0; i < r.length; i++) {
					             				 for (var j = 0; j < rightsTypes.length; j++) {
						            				 if(r[i] ==rightsTypes[j].key )
						            					 v +=rightsTypes[j].label +",";
						            			}
					             			 }
					                		 return v;
					                	   }
				                		},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/rights/rightsConfig/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/rights/rightsConfig/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/rights/rightsConfig/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();

			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading'); 
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					}
				});
				if (frm.valid()){
					form.submit();
				}else{
					$el.button('reset');
				}
			});
			$('#ownRightsSelect').multiselect({
				nonSelectedText: "所有权限",
				allSelectedText: "全选",
		        uncheckAllText: '全不选',
		        nSelectedText:'已选择'
			});
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
							window.location.href = __ctx+'/platform/rights/rightsConfig/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


