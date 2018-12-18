/**
 * 消息模版
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-24 23:54:56
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var messageTemplate  = new MessageTemplate();
	messageTemplate.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#messageTemplateGrid",// 列表对象
			PAGER : "#messageTemplatePager",// 列表分页
			FORM : '#messageTemplateForm'// 表单form
	};
	/**
	 * 消息模版 对象
	 * @returns {MessageTemplate}
	 */
	MessageTemplate = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	MessageTemplate.prototype = {
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
			var me = this,msgTelTypeJson = $.parseJSON($('#msgTelTypeJson').val());
			$(this.consts.GRID).GridList({
						url :  __ctx+'/platform/msg/messageTemplate/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','名称','业务主键','模板分类','是否默认','管理'],
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
				                 	   name:'typeKey',
				                	   index: 'type_key_',
				                	  formatter:function(val, opts, rowData) {
					                		 if($.isEmpty(val) || msgTelTypeJson.length==0){
					                			 return "";
					                		 }  
					             			 for (var i = 0; i < msgTelTypeJson.length; i++) {
					             				 	if(val ==msgTelTypeJson[i].typeKey)
					             				 		return  msgTelTypeJson[i].name;
					             			 }
					                		 return val;
					                	   }
				                	},{
				                 	   name:'isDefault',
				                	   index: 'is_default_',
				                	   formatter : 'dataFormat',
				                	   formatoptions : {
				                	   value : [{
											name:false,
											value:'否',
											css:'red'
										},{
											name:true,
											value:'是',
											css:'green'
										}]
									}
									},{
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/msg/messageTemplate/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/msg/messageTemplate/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/msg/messageTemplate/get.htm?id={id}'
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
			this._initEditor();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				$('#html').val(  me.html.getContent());
				$('#plain').val(  me.html.getContentTxt());
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
		_initEditor:function(){
			var me = this;
	   	   me.html = UE.getEditor('editor');
	   	   me.html.addListener("ready",function(editor){
	   		  	me.html.setContent($('#html').val());
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
							window.location.href = __ctx+'/platform/msg/messageTemplate/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


