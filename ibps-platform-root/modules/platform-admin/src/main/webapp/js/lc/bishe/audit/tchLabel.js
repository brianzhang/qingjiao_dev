
/**
 * 教师标签表
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 12:50:32
 *</pre>
 */
$(function() {
	tchLabel  = new TchLabel();
	tchLabel.init();
	
	formUrl = tchLabel.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#tchLabelGrid",// 列表对象
			PAGER : "#tchLabelPager",// 列表分页
			FORM : '#tchLabelForm',// 表单form
			FORMGET : '#tchLabelFormGet'// 表单form
	};
	/**
	 * 教师标签表 对象
	 * @returns {TchLabel}
	 */
	TchLabel = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	TchLabel.prototype = {
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
						url :  __ctx+'/bishe/audit/tchLabel/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','姓名','标签','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                		 ,hidden:true,key:true
				                	 	}, 
				                	 {
					                	 name:'orgId',
					                	 index: 'orgId'

					                	 }, {
				                 	   name:'labelId',
				                	   index: 'label_id_'

				                	 					                	}, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[
							        {
							        	label:'清空标签',
										classes:'btn btn-primary fa fa-edit',
										action:'javascript:tchLabel.emptyLabelForStu("{id}")'
									},
										/*{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/bishe/audit/tchLabel/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/bishe/audit/tchLabel/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/bishe/audit/tchLabel/get.htm?id={id}'
									}*/]
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
		
		emptyLabelForStu : function(id){
			$.ajax({
				type: "POST",
				url : "/bishe/audit/labelDef/emptyLabelForTch.htm",
				data:{"id":id, "type":"admin"},
				dataType:"json",
				success : function(data) {
					debugger;
					if (data.isSuccess) {
						DialogUtil.msg(data.msg);
						window.location.href = __ctx+'/bishe/audit/tchLabel/list.htm';
					} else {
						DialogUtil.error(data.msg);
					}
				}
			})
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
				// office提交
        		OfficePlugin.submit();
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
							window.location.href = __ctx+'/bishe/audit/tchLabel/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


