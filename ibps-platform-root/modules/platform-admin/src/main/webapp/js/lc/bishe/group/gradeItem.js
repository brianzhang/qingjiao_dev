
/**
 * t_grad_group
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:35
 *</pre>
 */
$(function() {
	gradeItem  = new gradeItem();
	gradeItem.init();
	
	formUrl = gradeItem.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#gradeItemGrid",// 列表对象
			PAGER : "#gradeItemPager",// 列表分页
			FORM : '#gradeItemForm',// 表单form
			FORMGET : '#gradeItemFormGet'// 表单form
	};
	/**
	 * t_grad_group 对象
	 * @returns {gradeItem}
	 */
	gradeItem = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	gradeItem.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			debugger
			var a = this;
			localStorage.removeItem("tour_end");
			localStorage.setItem("tour_current_step", 0);
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				this._bindExportBtns();
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
		
		
		_bindExportBtns : function(){
			var me = this;
			$(document).on('click', 'a.fa-export', function () {
            	var url = __ctx + "/bishe/group/gradGroup/exportGradeItem.htm" ;
            	$('a.fa-export').attr('href',url);
            });
		},
		
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			debugger
			var me = this;
			var typeFlag = $('#typeFlag').val();
			var formkey= $('#formkey').val();
			$(this.consts.GRID).GridList(
					{
						//url :  __ctx+'/bishe/group/gradGroup/listJsonForGradeItem.htm?typeFlag=' + typeFlag,
						url :  __ctx+'/bishe/group/gradGroup/listJsonForGradeItem.htm?formkey='+formkey,
						pager :this.consts.PAGER,
						colNames: ['名称','A人数','A含义','B人数','B含义','C人数','C含义','D人数','D含义','问题学生人数'],
				        colModel: [{
				                 	   name:'itemName',
				                 	   sortable: false

				                	 					                	 	}, {
				                 	   name:'aNum',
				                 	   sortable: false
				                	 					                	 	},{
				                	   name:'aMean',
				                	   sortable: false						                	 		
				                	 						                    }, {
				                 	   name:'bNum',
				                 	   sortable: false
				                	 					                	 	}, {
				                	   name:'bMean',
				                	  sortable: false					                	 					                	 		
				                	 						             		},{
				                 	   name:'cNum',
				                 	   sortable: false
				                	 					                	 	},{
				                	 name:'cMean',
				                	 sortable: false					                	 		
				                	 						                	},{
				                	   name:'dNum',
				                	   sortable: false
				                	 					                	 	},{
				                	 name:'dMean',
				                	 sortable: false						                	 		
				                	 						                	},{
				                	   name:'problemNum',
				                	   sortable: false				                	 		
				                	 					                	 	}],
								loadComplete: function(){
								    debugger
								    $.ajax({
								    	type: "POST",
								    	dataType:"json",
								    	url: __ctx+'/bishe/group/gradGroup/problemStu.htm',
								   		async: false,
										success:function (data) {
											debugger
											$('#problemStu').val(data.data);
								    	}
								    });
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
//		_showResponse : function(responseText) {
//			var typeFlag = $('#typeFlag').val();
//			var msg = new com.lc.form.ResultMessage(responseText);
//			if (msg.isSuccess()) {
//				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
//						function(rtn) {
//						if(rtn)
//							window.location.reload(true);
//						else
//							window.location.href = __ctx+'/bishe/group/gradGroup/listJsonForGradeItem.htm?typeFlag='+typeFlag;
//						});
//			} else {
//				DialogUtil.error(msg.getMessage());
//			}
//		},
		_showResponse : function(responseText) {
			var formkey = $('#formkey').val();
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/bishe/group/gradGroup/listJsonForGradeItem.htm?formkey='+formkey;
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


