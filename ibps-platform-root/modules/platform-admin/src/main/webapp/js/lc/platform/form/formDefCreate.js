/**
 * 新建表单
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-27 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	formDefCreate = new FormDefCreate();
	formDefCreate.init();
});

(function() {
	// 定义常量
	var _consts = {
		FORM : '#formDefForm'// 表单form
	};
	/**
	 * 设计表单 对象
	 * 
	 * @returns {FormDefCreate}
	 */
	FormDefCreate = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	FormDefCreate.prototype = {
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
				
		},
	
		/**
		 * 获取下一步的信息
		 */
		getNextData : function() {
			var busId,code,form = $(this.consts.FORM), frm = form
					.form();
			if (!frm.valid()) {
				DialogUtil.msg("请检查表单!");
				return;
			}
			var mode = $('#mode').val()
			if(mode == 'bo'){
				busId = $('#boId').val();
				code = $('#boCode').val();
				if ($.isEmpty(busId)) {
					DialogUtil.msg("请选择业务对象!");
					return;
				}
			}else if(mode == 'table'){
				code =$("#tableName").val();
				if ($.isEmpty(boCode)) {
					DialogUtil.msg("请选择表!");
					return;
				}
			} else if(mode == 'codeGen'){
				code =$("#codeGenTableName").val();
				if ($.isEmpty(boCode)) {
					DialogUtil.msg("请选择表!");
					return;
				}
			}


			return {
				typeId : $('#typeId').val(),
				typeName : $('#typeName').val(),
				id : $('#id').val(),
				name : $('#name').val(),
				key : $('#key').val(),
				mode: $('#mode').val(),
				busId : busId,//存入版本
				code : code,
				buildMode:$("#buildMode").val()
			}
		},
		

		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();

			me.initBo();
			
			me.initMode();
			
			me._initData();
			// 触发表单验证
			frm.valid();
		},

		initTable:function(){
			$('[data-toggle="select2"]').each(function() {
				var $el = $(this)
					,options = $el.data()
					,$val = options.value?options.value:''
					,ajax = options.ajax
					,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
					,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
					,split = $.isEmpty(options.split)?',':options.split;
				
				var params = {
					placeholder:'请选择'
					,theme: "bootstrap"
					,language: "zh-CN"
					,multiple: multiple
					,allowClear: true
					,separator: split
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
					    	var dataJson = {tableName: _params.term? _params.term:''};
					    	return dataJson;
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
				$el.append("<option value='"+$val+"' >"+$val+"</option>");
			});
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
		 * 选择业务对象
		 */
		initBo : function() {
			var me = this;
		      $(document).on("mouseenter", ".selector-list", function() {
		          return $(this).find(".selector-actions").removeClass("hidden");
		      } );
		      $(document).on("mouseleave", ".selector-list", function() {
		          return $(this).find(".selector-actions").addClass("hidden");
		      });
		      

			$(document).on("click",".js-selector-data",function() {
				var selectList =  $(this).closest(".selector-list");
					var params = [];
					
					new BoDefDialog({
								isSingle : true,
								params : params,
								callback : function(data, index) {
									var code = "",name="",id="";
									if(data&& data.length > 0){
										var	bo = data[0];
										code = bo.code;
										name = bo.name;
										id = bo.id;
									}
								
									selectList.find(".js-selector-empty").hide();
									selectList.find(".selector-list-item").removeClass("hidden");
									selectList.find(".selector-name").html(name);
									$('#boId').val(id);
									$('#boCode').val(code);
									$('#boName').val(name);
									DialogUtil.close(index);
								}
							}).show();
				});
			
			$(document).on("click",".js-remove-data",function() {
				var selectList =  $(this).closest(".selector-list");
				selectList.find(".js-selector-empty").show();
				selectList.find(".selector-list-item").addClass("hidden");
				$('#boId').val("");
				$('#boCode').val("");
				$('#boName').val("");
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

