/**
 * 新建表单
 * 
 * <pre>
 * 作者：guanxinyu
 * 邮箱：1@qq.com
 * 日期：2015-11-27 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	businessModelInit = new BusinessModelInit();
	businessModelInit.init();
});

(function() {
	// 定义常量
	var _consts = {
		FORM : '#businessModelInitForm'// 表单form
	};
	/**
	 * 业务模板初始化 对象
	 * 
	 * @returns {BusinessModelInit}
	 */
	BusinessModelInit = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	BusinessModelInit.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0){// 表单
				this._initForm();
			}
			this.initProps();
		},
	
		/**
		 * 获取下一步的信息
		 */
		getNextData : function() {
			var busId,code,form = $(this.consts.FORM), frm = form
					.form();
			if (!frm.valid()) {
				DialogUtil.msg("含有未填项!");
				return;
			}
			return {
				name : $('#name').val(),
				propModelId : $('#propModel').val()
			}
		},
		

		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			
			me.initMode();
			
			me._initData();
			// 触发表单验证
			frm.valid();
		},

		initProps:function(){
				var  me = this
					,$el = $('#propModel')
					,options = $el.data()
					,$val = options.value?options.value:''
					,$comment = options.comment
					,ajax = options.ajax
					,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
					,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
					,split = $.isEmpty(options.split)?',':options.split;
				
				var params = {
					placeholder:'请选择'
					,theme: "bootstrap"
					,language: "zh-CN"
					,multiple: multiple
					,allowClear: clear
					,separator: split
					,initSelection: function(element, callback) { // 初始化时设置默认值  
						callback({'id':$val,'text':$val,'comment':$comment});
				    }
					,formatSelection : function (item) {return item.id;}  /*选择结果中的显示*/
					,formatResult : function (item) {return item.id;}  /*搜索列表中的显示*/
					,escapeMarkup : function (markup) {return markup;}
					,createSearchChoice : function(term, data) {
						/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
				        return {id: term, text: term};
				    }
				};
				
				if(ajax){
					params.ajax = {
					    url: ajax,
					    dataType: 'json',
					    delay: 250,
					    data: function (_params) {
					    	return {propModelName: _params.term};
					    }
						,processResults: function (data) {
							return {
					          results: data
					        };
					     },
					     cache: true
					};
				}
				$el.select2(params);
				
				
		},
		_initData:function(){
			var data = frameElement.dialog.params;	
			if($.isEmpty(data))
				return;
			var mode = data.mode;
			$("#typeId").val(data.typeId);
			$("#typeName").val(data.typeName);
			$("#name").val(data.name);
			$("#key").val(data.key);
			$("#buildMode").val(data.buildMode);
			$("#mode").val(mode).trigger("change");
			//TODO  考虑
			if(mode == 'bo'){
				$('#boId').val(data.busId);
				 $('#boCode').val(data.code);
			}else if(mode == 'table'){
				$("#tableName").val(data.code);
			} else if(mode == 'codeGen'){
				$("#codeGenTableName").val(data.code);
			}
		},
		initMode:function(){
			var me =this;
			$(document).on("change","#mode",function() {
				var val =$(this).val();
				var hideVal1 ='',hideVal2='';
				if( val=='bo'){
					hideVal1 = 'table';
					hideVal2 = 'codeGen';
				}
				
				if( val=='table'){
					hideVal1 = 'bo';
					hideVal2 = 'codeGen';
				}
				
				if( val=='codeGen'){
					hideVal1 = 'bo';
					hideVal2 = 'table';
				}
				
				$("#"+val).removeClass("hidden");
				$("#"+hideVal1).addClass("hidden");
				$("#"+hideVal2).addClass("hidden");
				if(val=='table' || val=='codeGen'){
					me.initTable();
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/form/bpmForm/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();

