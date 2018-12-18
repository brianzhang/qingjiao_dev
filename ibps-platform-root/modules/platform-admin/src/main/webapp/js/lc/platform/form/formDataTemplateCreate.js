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
	formDataTemplateCreate = new FormDataTemplateCreate();
	formDataTemplateCreate.init();
});

(function() {
	// 定义常量
	var _consts = {
		FORM : '#formDataTemplateForm'// 表单form
	};
	/**
	 * 对象
	 * 
	 * @returns {FormDataTemplateCreate}
	 */
	FormDataTemplateCreate = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	FormDataTemplateCreate.prototype = {
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
			if ($.isEmpty($('#formKey').val())){
				DialogUtil.msg("请选择表单!");
				return;
			}
			

			return {
				id : $('#id').val(),
				name : $('#name').val(),
				typeId : $('#typeId').val(),
				typeName : $('#typeName').val(),
				dataSource : $('#dataSource').val(),
				formKey: $('#formKey').val(),
				formName :$('#formName').val()
			}
		},
		

		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			
			me._initData();
			me.initFormEvent();
			// 触发表单验证
			frm.valid();
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
					
					new FormDefDialog({
								pkKey:'key',
								isSingle : true,
								params : params,
								callback : function(data, index) {
									var form = data[0];
									selectList.find(".js-selector-empty").hide();
									selectList.find(".selector-list-item").removeClass("hidden");
									selectList.find(".selector-name").html(form.name);
									$('#formKey').val(form.key);
									$('#formName').val(form.name);
									DialogUtil.close(index);
								}
							}).show();
				});
			
			$(document).on("click",".js-remove-data",function() {
				var selectList =  $(this).closest(".selector-list");
				selectList.find(".js-selector-empty").show();
				selectList.find(".selector-list-item").addClass("hidden");
				$('#formKey').val('');
				$('#formName').val('');
			});
		}
	};
})();

