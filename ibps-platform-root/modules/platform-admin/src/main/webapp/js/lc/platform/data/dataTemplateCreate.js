/**
 * 新建数据模版
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-27 16:17:10
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	dataTemplateCreate = new DataTemplateCreate();
	dataTemplateCreate.init();
});

(function() {
	// 定义常量
	var _consts = {
		FORM : '#dataTemplateForm'// 表单form
	};
	/**
	 * 对象
	 * 
	 * @returns {DataTemplateCreate}
	 */
	DataTemplateCreate = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	DataTemplateCreate.prototype = {
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
			var form = $(this.consts.FORM), frm = form
					.form();
			if (!frm.valid()) {
				DialogUtil.msg("请检查表单!");
				return;
			}
			var showType = $('#showType').val(),
				datasetKey = $('#datasetKey').val();
			if (showType !='compose' && $.isEmpty(datasetKey)){
				DialogUtil.msg("请选择数据集!");
				return;
			}
			if(	showType =='compose' )
				datasetKey ="";
			

			return {
				name : $('#name').val(),
				key : $('#key').val(),
				typeId : $('#typeId').val(),
				typeName : $('#typeName').val(),
				type : $('#type').val(),
				showType : showType,
				composeType : $('#composeType').val(),
				datasetKey: datasetKey,
				datasetName :$('#datasetName').val()
			}
		},
		

		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM);
			this.frm =   form.form();
			me._initData();
			me.initFormEvent();
			// 触发表单验证
			this.frm.valid();
		},

		_initData:function(){
			var data = frameElement.dialog.params;	
			if($.isEmpty(data))
				return;
		},
		/**
		 * 选择表单
		 */
		initFormEvent : function() {
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
					
					new DatasetDialog({
								pkKey:'key',
								isSingle : true,
								params : params,
								callback : function(data, index) {
									var name="",key="";
									if($.isNotEmpty(data)){
										var d = data[0];
										name = d.name;
										key = d.key;
										selectList.find(".js-selector-empty").hide();
										selectList.find(".selector-list-item").removeClass("hidden");
									}else{
										selectList.find(".js-selector-empty").show();
										selectList.find(".selector-list-item").addClass("hidden");
									}
								
									selectList.find(".selector-name").html(name);
									$('#datasetKey').val(key);
									$('#datasetName').val(name);
									
									DialogUtil.close(index);
								}
							}).show();
				});
			
			$(document).on("click",".js-remove-data",function() {
				var selectList =  $(this).closest(".selector-list");
				selectList.find(".js-selector-empty").show();
				selectList.find(".selector-list-item").addClass("hidden");
				$('#datasetKey').val('');
				$('#datasetName').val('');
			});
			
			$(document).on("change","#type",function() {
				var val = $(this).val();
				if(val == 'default' ||  val == 'dialog'){
					$("#showTypeGroup").show();
					$("#composeTypeGroup").hide();
					$("#showType").trigger("change");
				}
				else if(val == 'valueSource'){
					$("#showTypeGroup").hide();
					$("#composeTypeGroup").hide();
				}
			});
			
			$(document).on("change","#showType",function() {
				var val = $(this).val();
				if(val == 'compose' ){
					$("#composeTypeGroup").show();
					$("#datasetGroup").hide();
					me.frm.valid();
				}else{
					$("#composeTypeGroup").hide();
					$("#datasetGroup").show();
				}
			});
		}
	};
})();

