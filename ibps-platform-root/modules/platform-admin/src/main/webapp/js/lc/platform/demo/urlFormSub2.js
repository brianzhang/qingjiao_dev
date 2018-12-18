
/**
 * 子表例子
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
$(function() {
	urlFormSub2  = new UrlFormSub2();
	urlFormSub2.init();
	
	formUrl = urlFormSub2.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#urlFormSub2Grid",// 列表对象
			PAGER : "#urlFormSub2Pager",// 列表分页
			FORM : '#urlFormSub2Form'// 表单form
	};
	/**
	 * 子表例子 对象
	 * @returns {UrlFormSub2}
	 */
	UrlFormSub2 = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	UrlFormSub2.prototype = {
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
						url :  __ctx+'/platform/demo/urlFormSub2/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['ID','KEY','NAME','AGE','PARENTID','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'key',
				                	   index: 'key_'

				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'

				                	 					                	 	}, {
				                 	   name:'age',
				                	   index: 'age_'

				                	 					                	 	}, {
				                 	   name:'parentId',
				                	   index: 'parent_id_'

				                	 	,hidden:true
				                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/demo/urlFormSub2/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/demo/urlFormSub2/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/demo/urlFormSub2/get.htm?id={id}'
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
				formUrl.submit(me._showResponse);
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
							window.location.href = __ctx+'/platform/demo/urlFormSub2/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


