
/**
 * t_litishu
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-10-07 00:13:43
 *</pre>
 */
$(function() {
	liTiShu  = new LiTiShu();
	liTiShu.init();
	
	formUrl = liTiShu.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#liTiShuGrid",// 列表对象
			PAGER : "#liTiShuPager",// 列表分页
			FORM : '#liTiShuForm'// 表单form
	};
	/**
	 * t_litishu 对象
	 * @returns {LiTiShu}
	 */
	LiTiShu = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	LiTiShu.prototype = {
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
			this._bindBtns();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
		},
		_bindBtns : function(){
			var me = this;
			$(document).on('click', 'a.fa-caret-square-o-right', function () {
            	var ids = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
            	if (ids == null || ids.length == 0) {
            		DialogUtil.toastr('请选择数据！');
            		return;
            	}
            	
            	var lid = DialogUtil.load();
            	var url = __ctx + "/bishe/litishu/liTiShu/startFlow.htm"
                $.post(url, {'id': ids.join(','), 'flowKey':'Process_1a3mq4h'}, function (responseText) {
                	DialogUtil.close(lid);
                	var msg = new com.lc.form.ResultMessage(responseText);
        			if (msg.isSuccess()) {
        				DialogUtil.msg(msg.getMessage());
        				window.location.reload(true);
        			} else {
        				DialogUtil.error(msg.getMessage());
        			}
                });
            });
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/bishe/litishu/liTiShu/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','教师','教师员工号','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'js',
				                	   index: 'js'

				                	 					                	 	}, {
				                 	   name:'account',
				                	   index: 'account'

				                	 					                	 	}, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/bishe/litishu/liTiShu/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/bishe/litishu/liTiShu/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/bishe/litishu/liTiShu/get.htm?id={id}'
									}]
								} ],
								loadComplete: function(){
									try{
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									}catch(e){}
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
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				me.formUrl.submit(me._showResponse);
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
							window.location.href = __ctx+'/bishe/litishu/liTiShu/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


