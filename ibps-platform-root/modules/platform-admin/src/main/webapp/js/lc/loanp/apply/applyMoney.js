
/**
 * t_jiedai
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:52:31
 *</pre>
 */
$(function() {
	applyMoney  = new ApplyMoney();
	applyMoney.init();
	
	formUrl = applyMoney.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#applyMoneyGrid",// 列表对象
			PAGER : "#applyMoneyPager",// 列表分页
			FORM : '#applyMoneyForm'// 表单form
	};
	/**
	 * t_jiedai 对象
	 * @returns {ApplyMoney}
	 */
	ApplyMoney = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ApplyMoney.prototype = {
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
			    this._bindBtns();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
			if($('#tx').val()==0)this.openScanner();
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
            	var url = __ctx + "/loanp/apply/applyMoney/startFlow.htm"
                $.post(url, {'id': ids.join(','), 'flowKey':'Process_33qp8um8'}, function (responseText) {
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
			var me = this,  tx=$('#tx').val(),trueIfTxEqual1 = tx==0;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/loanp/apply/applyMoney/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','信用社','客户名','身份证号','贷款类别','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'xys',
				                	   index: 'xys'

				                	 					                	 	}, {
				                 	   name:'customer',
				                	   index: 'customer'

				                	 					                	 	}, {
				                 	   name:'sfid',
				                	   index: 'sfid'

				                	 					                	 	}, {
				                 	   name:'dklb',
				                	   index: 'dklb'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'基本信息',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/GRJKSQSP/gRJKSQ/get.htm?sfid={sfid}',
										hidden : !trueIfTxEqual1
										
									},{
										label:'贷款信息',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/daikuanInfo/daiKuanShenQingInfo/edit.htm?id={id}',
										hidden : !trueIfTxEqual1
										
									},{
										label:'抵押人信息',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/diyarenAll/dyr_All/list.htm?jdid={id}',
										hidden : !trueIfTxEqual1
									},{
										label:'质押人信息',
										classes:'btn btn-primary fa fa-edit', 
										action:__ctx+'/loanp/zhiyarenAll/zhiYaRenAll/list.htm?jdid={id}',
										hidden : !trueIfTxEqual1
									},{
										label:'保证人信息',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/bzrAll/baoZhengRenAll/list.htm?jdid={id}',
										hidden : !trueIfTxEqual1
									},{
										label:'担保公司信息',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/danbaoCompany_All/danBaoCompany_all/list.htm?jdid={id}',
										hidden : !trueIfTxEqual1
									},{
										label:'添加模板',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/demo/demoLoan/edit.htm?jdid={id}',
										hidden : !trueIfTxEqual1
									},{
										label:'文件查看',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/files/file/listss.htm?loanId={id}&ty=1',
										hidden : trueIfTxEqual1
									}]
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
							window.location.href = __ctx+'/loanp/apply/applyMoney/list.htm?tx=0';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


