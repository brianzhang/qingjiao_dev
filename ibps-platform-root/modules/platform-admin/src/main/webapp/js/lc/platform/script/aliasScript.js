/**
 * ibps_SCRIPT_ALIAS【别名脚本】
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-22 16:09:06
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var aliasScript = new AliasScript();
	aliasScript.init();
	$("select[name='className']").change(aliasScript._classNameChange).trigger(
			"change");
	$("select[name='type']").change(aliasScript._changeScriptType).trigger(
			"change");
});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#aliasScriptGrid",// 列表对象
		PAGER : "#aliasScriptPager",// 列表分页
		FORM : '#aliasScriptForm'// 表单form
	};
	/**
	 * ibps_SCRIPT_ALIAS【别名脚本】 对象
	 * 
	 * @returns {AliasScript}
	 */
	AliasScript = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	AliasScript.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)// 列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)// 表单
				this._initForm();
			this._initCodeMirror();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/platform/script/aliasScript/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', '脚本别名', '调用类路径', '调用类对象名',
										'调用方法名', '脚本类型', '是否禁用', '管理' ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'aliasName',
											index : 'alias_name_'
										},

										{
											name : 'className',
											index : 'class_name_'
										},
										{
											name : 'classInsName',
											index : 'class_ins_name_'
										},
										{
											name : 'methodName',
											index : 'method_name_'
										},
										{
											name : 'type',
											index : 'type_',
											formatter : function(cellvalue,
													options, row) {
												if (cellvalue == '1') {
													return '自定义';
												} else
													return '系统默认';
											}
										},
										{
											name : 'enable',
											index : 'enable_',
											formatter : function(cellvalue,
													options, row) {
												if (cellvalue == '1') {
													return '禁用';
												} else
													return '启用';
											}
										},
										{
											name : '__manage',
											width : 30,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/script/aliasScript/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/script/aliasScript/remove.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/script/aliasScript/get.htm?id={id}'
													} ]
										} ]

							});
		},
		
		// 类名选择事件
		_classNameChange : function() {
			var className = $(this).val();
			if (!className)
				return;

			var match = /^.*\.(\w*)$/.exec(className), name = '';
			if (match != null) {
				name = match[1];
			}
			if (!name)
				return;
			name = name.toLowerCase().split("", 1) + name.slice(1);
			$("input[name='classInsName']").val(name);
			var id = $("input[name='id']").val();
			var url = __ctx
					+ '/platform/script/aliasScript/getMethodsByClassName.htm?className='
					+ className + '&id=' + id;
			scriptEdit._getMethods(url);
		},
		// 脚本类型选择事件
		_changeScriptType : function() {
			var type = $(this).val();
			// 脚本类型（自定义：custom）
			if (type == 1) {
				 $('#scriptEditor').css("display","none");
				 $('#scriptEditor').toggle();
				$("div[name='defaultTbody']").css("display", "none");
				$("div[name='customTbody']").removeAttr("style");
				;
			} else {
				 $('#scriptEditor').toggle();
				$("div[name='defaultTbody']").removeAttr("style");
				$("div[name='customTbody']").css("display", "none");
			}

		},
		
		_initCodeMirror:function(){
			var height = $("#scriptContent").height();
			this._editor = CodeMirror.fromTextArea(document.getElementById("scriptContent"), {
				mode: "groovy",
				tabMode: "indent",
				lineNumbers: true
			 });
			
			this._editor.setSize("100%",height);
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
				$("#scriptContent").val(me._editor.getValue());
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
					var json = scriptEdit._getTrJson();
					json = JSON2.stringify(json);
					if (json == '[]') {
						json = '';
					}
					$("textarea[name='argument']").val(json);
					form.submit();
				}else{
					$el.button('reset'); 
				}
			});
			
			$(document).on('click', 'a.fa-edit', function() {
				var url = __ctx+'/platform/script/commonScript/dialog.htm';
				DialogUtil.dialog({
					title : '脚本编辑器',
					content : url,
				    area : ['60%', '80%'],
				    btn: [{
						   label:'验证表达式',
						   iconCls : 'btn btn-primary fa fa-ok',
						   action:function(dialog,index){
							  DialogUtil.getChildFrameWindow().initValid();
						   }
					   },{
						   label:'确定',
						   iconCls : 'btn btn-danger fa fa-cancel',
						   action:function(dialog,index){
							  var data = DialogUtil.getChildFrameWindow().initConfirm();
							  me._editor.setValue(data);
							  $("#script").val(data);
							  DialogUtil.close(index);
						   }
					   },
					   {
						   label:'取消',
						   classes:'fa fa-times-circle',
						   action:function(dialog,index){
							    DialogUtil.getChildFrameWindow().initCancle(
							    	function(rtn){
							    		if(rtn)
							    			DialogUtil.close(index);
							    	}
					    		);
						   }
					   }]
				});
			});
		},

		// 类名选择事件
		_classNameChange : function() {
			var className = $(this).val();
			if (!className)
				return;

			var match = /^.*\.(\w*)$/.exec(className), name = '';
			if (match != null) {
				name = match[1];
			}
			if (!name)
				return;
			name = name.toLowerCase().split("", 1) + name.slice(1);
			$("input[name='classInsName']").val(name);
			var id = $("input[name='id']").val();
			var url = __ctx
					+ '/platform/script/aliasScript/getMethodsByClassName.htm?className='
					+ className + '&id=' + id;
			scriptEdit._getMethods(url);
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/script/aliasScript/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
