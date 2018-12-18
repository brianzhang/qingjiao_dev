
/**
 * url表单例子
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
$(function() {
	urlForm  = new UrlForm();
	urlForm.init();
	
	formUrl = urlForm.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#urlFormGrid",// 列表对象
			PAGER : "#urlFormPager",// 列表分页
			FORM : '#urlFormForm'// 表单form
	};
	/**
	 * url表单例子 对象
	 * @returns {UrlForm}
	 */
	UrlForm = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	UrlForm.prototype = {
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
				this._bindBtns();
			}
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
            	var url = __ctx + "/platform/demo/urlForm/startFlow.htm"
                $.post(url, {'id': ids.join(','), 'defKey':'Process_1fq45br'}, function (responseText) {
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
						url :  __ctx+'/platform/demo/urlForm/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键标识','文本框','文本域','数字','隐藏域','日期','富文本','单选','多选','下拉','数据字典','自动编号','附件','选择器','自定义对话框','地址','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'text',
				                	   index: 'text_'

				                	 					                	 	}, {
				                 	   name:'textarea',
				                	   index: 'textarea_'

				                	 					                	 	}, {
				                 	   name:'number',
				                	   index: 'number_'

				                	 					                	 	}, {
				                 	   name:'hide',
				                	   index: 'hide_'

				                	 					                	 	}, {
				                 	   name:'time',
				                	   index: 'time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'editor',
				                	   index: 'editor_'

				                	 					                	 	}, {
				                 	   name:'radio',
				                	   index: 'radio_'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'选项一'
												,'2':'选项二'
			                                }
				                        }
				                	 	}, {
				                 	   name:'checkBox',
				                	   index: 'check_box_'

				                	 											,formatter: function(value,row,index){
											if(value){
												var chkJson = {};
												chkJson['1']='选项一';
												chkJson['2']='选项二';
												var valArr = value.split(',');
												for(var i = 0,len = valArr.length; i < len; i ++){
													valArr[i]=chkJson[valArr[i]];
												}
												
										    	return valArr.join(',');
											}else{ 
										    	return '';
										    }
										}
				                	 	}, {
				                 	   name:'select',
				                	   index: 'select_'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'选项一'
												,'2':'选项二'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dic',
				                	   index: 'dic_'

				                	 					                	 	}, {
				                 	   name:'autoNum',
				                	   index: 'auto_num_'

				                	 					                	 	}, {
				                 	   name:'att',
				                	   index: 'att_'

				                	 					                	 	}, {
				                 	   name:'selector',
				                	   index: 'selector_'

				                	 					                	 	}, {
				                 	   name:'customDialog',
				                	   index: 'custom_dialog_'

				                	 					                	 	}, {
				                 	   name:'add',
				                	   index: 'add_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/demo/urlForm/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/demo/urlForm/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/demo/urlForm/get.htm?id={id}'
									}]
								} ]
	
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
			me.formUrl.initSub('/platform/demo');
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				formUrl.submit(me._showResponse);
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) && !$.isEmpty(frameElement.dialog)){
				var params = frameElement.dialog.params;
				var data = params.data;
				this.formUrl.setData("[name^='m:']", data);
				this.formUrl.validate();
			}
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
							window.location.href = __ctx+'/platform/demo/urlForm/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


