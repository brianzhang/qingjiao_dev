
/**
 * t_demo_loan_
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:00:46
 *</pre>
 */
$(function() {
	demoLoan  = new DemoLoan();
	demoLoan.init();
	
	formUrl = demoLoan.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#demoLoanGrid",// 列表对象
			PAGER : "#demoLoanPager",// 列表分页
			FORM : '#demoLoanForm'// 表单form
	};
	/**
	 * t_demo_loan_ 对象
	 * @returns {DemoLoan}
	 */
	DemoLoan = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DemoLoan.prototype = {
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
			try{
				this._initForm();
				this._initData();
				this.initTableSelect2();
			}catch(e){}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/loanp/demo/demoLoan/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','客户名称','管理'],
				        colModel: [{
				                 	   name:'jdid',
				                	   index: 'jdid'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'customer',
				                	   index: 'customer'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'文件扫描',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/files/file/list.htm?loanId={id}&ty=0'
									},{
										label:'文件审阅',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/files/file/list.htm?loanId={id}&ty=1'
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
				var modelId = $('#model').val();
				var id=$('#id').val();
				var name=$('#name').val();
				var jdid =$('#demoLoanForm').val();
				$.ajax({
					url : __ctx + '/loanp/demo/demoLoan/save.htm',
					data : {
						id :id,
						name : name,
						modelId : modelId,
						jdid:  jdid
					},
					method : 'POST',
					success : function(res){
						var msg = new com.lc.form.ResultMessage(res);
						if (msg.isSuccess()) {
							DialogUtil.confirm(msg.getMessage().split("@")[0] + ',是否继续操作',
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
				})
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
							window.location.href = __ctx+'/loanp/demo/demoLoan/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		initTableSelect2 : function(){
			
			var me = this
				,$el = $('#model')
				,options = $el.data()
				,$val = options.value
				,$comment = options.comment
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
				var params = {
						placeholder:'请选择'
						,theme: "bootstrap"
						,language: "zh-CN"
						,multiple: multiple
						,allowClear: clear
						,separator: split
						,initSelection: function(element, callback) { // 初始化时设置默认值  
							callback({'id':$val,'text':$val});
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
						    	return {tableName: _params.term};
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
				}
	};
})();


