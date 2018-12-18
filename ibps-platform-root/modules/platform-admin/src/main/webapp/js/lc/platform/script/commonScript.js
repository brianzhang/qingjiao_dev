/**
 * ibps_SCRIPT_COMMON【常用脚本】
 * 
 * <pre>
 * 作者：xu qiang
 * 邮箱：819842974@qq.com
 * 日期：2015-12-16 09:29:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var commonScript ;
$(function() {
	commonScript  = new CommonScript();
	commonScript.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#commonScriptGrid",// 列表对象
			PAGER : "#commonScriptPager",// 列表分页
			FORM : '#commonScriptForm'// 表单form
	};
	/**
	 * ibps_SCRIPT_COMMON【常用脚本】 对象
	 * @returns {CommonScript}
	 */
	CommonScript = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CommonScript.prototype = {
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
						url :  __ctx+'/platform/script/commonScript/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','脚本名称','脚本','脚本分类','备注','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'script',
				                	   index: 'script_'
				                	 					                	 	}, {
				                 	   name:'category',
				                	   index: 'category_'
				                	 					                	 	}, {
				                 	   name:'memo',
				                	   index: 'memo_'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/script/commonScript/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/script/commonScript/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/script/commonScript/get.htm?id={id}'
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
				$("#script").val(me._editor.getValue());
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
						   iconCls : 'btn btn-primary fa fa-ok',
						   action:function(dialog,index){
							  var data = DialogUtil.getChildFrameWindow().initConfirm();
							  me._editor.setValue(data);
							  $("#script").val(data);
							  DialogUtil.close(index);
						   }
					   },
					   {
						   label:'取消',
						   iconCls : 'btn btn-danger fa fa-cancel',
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
			
			me._initCodeMirror();
		},
		_initCodeMirror:function(){
			var height = $("#script").height();
			this._editor = CodeMirror.fromTextArea(document.getElementById("script"), {
				mode: "groovy",
				tabMode: "indent",
				lineNumbers: true
			 });
			
			this._editor.setSize("100%",height);
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
							window.location.href = __ctx+'/platform/script/commonScript/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


