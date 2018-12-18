/**
 * 桌面布局管理
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-21 21:39:21
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	desktopManage  = new DesktopManage();
	desktopManage.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#desktopManageGrid",// 列表对象
			PAGER : "#desktopManagePager",// 列表分页
			FORM : '#desktopManageForm',// 表单form
			SELECT_GRID : "#desktopManageSelectGrid"// 列表对象
			
	};
	/**
	 * 桌面布局管理 对象
	 * @returns {DesktopManage}
	 */
	DesktopManage = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DesktopManage.prototype = {
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
			if ($(this.consts.SELECT_GRID).length > 0)//列表
				this._initSelectGridList();
			
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/desktop/desktopManage/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','布局名称','布局描述','所属组织','是否默认','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_',
				                	 	hidden:true,
				                	 	key:true
				                	}, {
				                 	   name:'name',
				                	   index: 'NAME_'
				                	 }, {
				                 	   name:'memo',
				                	   index: 'MEMO_'
				                	}, {
				                 	   name:'groupName',
				                	   index: 'GROUP_NAME_'
				                	}, {
				                 	   name:'isDef',
				                	   index: 'IS_DEF_',
			                		   formatter : 'dataFormat',
									   formatoptions : {
											value : [{
												name:'Y',
												value:'是',
												css:'green'
											},{
												name:'N',
												value:'否',
												css:'orange'
											}]
										}
				                	}, {
									name : '__manage',
									width : 20,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[ {
										label : '模板授权',
										classes : 'btn btn-primary fa fa-ra',
										action :	'javascript:desktopManage.rights("{id}")',
										hidden : function(){
											return !__isSuper || 'false' == __isSuper;
										}
									},{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/desktop/desktopManage/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/desktop/desktopManage/remove.htm?id={id}'
									}]
								} ]
	
					});
		},
		rights:function(id){
			new RightsDefDialog({
				title:'栏目桌面授权',
				key:'desktopManage',
				entityId:id,
				isSave:true
			}).show();
		},
		/**
		 * 初始列表
		 */
		_initSelectGridList : function() {
			var me = this;
			$(this.consts.SELECT_GRID).GridList({
						url :  __ctx+'/platform/desktop/desktopManage/selectListJson.htm',
						pager :this.consts.PAGER,
						multiboxonly:true,
						colNames: ['主键','布局名称','布局描述','是否默认','designHtml'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_',
				                	 	hidden:true,
				                	 	key:true
				                	}, {
				                 	   name:'name',
				                	   index: 'NAME_'
				                	 }, {
				                 	   name:'memo',
				                	   index: 'MEMO_'
				                	}, {
				                 	   name:'isDef',
				                	   index: 'IS_DEF_',
				                	   formatter : 'dataFormat',
									   formatoptions : {
											value : [{
												name:'Y',
												value:'是',
												css:'green'
											},{
												name:'N',
												value:'否',
												css:'orange'
											}]
										}
				                	},{
				                		name:'designHtml',
				                  	 	hidden:true,
				                	}],
				                	loadBeforeSend : function() {
											$('#cb_desktopManageSelectGrid').hide();
									}
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
					},
					error: function(){
						$el.button('reset'); 
					}
				});
				if (frm.valid())
					form.submit();
				else{
					$el.button('reset');
				}
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
							window.location.href = __ctx+'/platform/desktop/desktopManage/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


