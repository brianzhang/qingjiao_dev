

/**
 * 地理区域
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-02-25 10:36:32
 *</pre>
 */
$(function() {
	area  = new Area();
	area.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#areaGrid",// 列表对象
			PAGER : "#areaPager",// 列表分页
			FORM : '#areaForm'// 表单form
	};
	/**
	 * 地理区域 对象
	 * @returns {Area}
	 */
	Area = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Area.prototype = {
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
						url :  __ctx+'/platform/cat/area/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','类型ID','区域代码,唯一','区域名称','父ID','排序','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'typeId',
				                	   index: 'type_id_'
				                	 					                	 	}, {
				                 	   name:'key',
				                	   index: 'key_'
				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'parentId',
				                	   index: 'parent_id_'
				                	 					                	 	}, {
				                 	   name:'sn',
				                	   index: 'sn_'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/cat/area/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/cat/area/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/cat/area/get.htm?id={id}'
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
				if (frm.valid())
					form.submit();
				else
					$el.button('reset'); 
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
				if(parent.areaManage)parent.areaManage._loadTree();
				window.location.reload(true);
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


