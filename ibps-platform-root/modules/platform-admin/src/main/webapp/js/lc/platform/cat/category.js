/**
 * 分类标识表
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-19 14:17:31
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var category  = new Category();
	category.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#categoryGrid",// 列表对象
			PAGER : "#categoryPager",// 列表分页
			FORM : '#categoryForm'// 表单form
	};
	/**
	 * 分类标识表 对象
	 * @returns {Category}
	 */
	Category = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Category.prototype = {
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
						url :  __ctx+'/platform/cat/category/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键ID','名称','业务主键','是否默认','结构类型','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
			                	 		name:'name',
			                	 		index: 'NAME_'
				                	 					                	 	}, {
			                		   name:'categoryKey',
				                	   index: 'CATEGORY_KEY_'
				                	 					                	 	}, {
				                 	   name:'flag',
				                	   index: 'FLAG_',
				                	   formatter:'select', 
						               formatoptions:{value:{ '1':'是','0':'否'}}
				                	 					                	 	}, {
				                 	   name:'type',
				                	   index: 'TYPE_',
				                	   formatter:'select', 
						               formatoptions:{value:{ '0':'平铺结构','1':'树型结构'}}
				                	 					                	 	},  {
									name : '__manage',
									width : 40,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										hidden:function(opts,rowData){
											return rowData.flag==1
										},
										action:__ctx+'/platform/cat/category/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										hidden:function(opts,rowData){
											return rowData.flag==1
										},
										action:__ctx+'/platform/cat/category/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/cat/category/get.htm?id={id}'
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
                    },
                    error: function(){
                    	$el.button('reset'); 
                    }
				});
				if (frm.valid()){
					form.submit();
				}else{
					$el.button('reset');
					DialogUtil.toastr("验证失败，请检查!");
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
							window.location.href = __ctx+'/platform/cat/category/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


