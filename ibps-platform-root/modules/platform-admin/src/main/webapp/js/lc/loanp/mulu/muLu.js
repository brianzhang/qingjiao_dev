
/**
 * t_mlsl
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:36:42
 *</pre>
 */
$(function() {
	muLu  = new MuLu();
	muLu.init();
	
	formUrl = muLu.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#muLuGrid",// 列表对象
			PAGER : "#muLuPager",// 列表分页
			FORM : '#muLuForm'// 表单form
	};
	/**
	 * t_mlsl 对象
	 * @returns {MuLu}
	 */
	MuLu = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	MuLu.prototype = {
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
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/loanp/mulu/muLu/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','材料类别','材料名称','企业','二手房','个人生产经营','商业用房','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'cllb',
				                	   index: 'cllb'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'借款人提供材料'
												,'2':'担保人提供材料'
												,'3':'担保企业提供材料'
												,'4':'贷款审批材料'
												,'5':'合同签订及放款材料'
												,'6':'贷后材料'
												,'7':'其他'
												,'8':'担保公司提供材料'
			                                }
				                        }
				                	 	}, {
				                 	   name:'clmc',
				                	   index: 'clmc'

				                	 					                	 	}, {
				                 	   name:'qy',
				                	   index: 'qy'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'esf',
				                	   index: 'esf'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'grscjy',
				                	   index: 'grscjy'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'syyf',
				                	   index: 'syyf'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/mulu/muLu/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/mulu/muLu/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/mulu/muLu/get.htm?id={id}'
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
							window.location.href = __ctx+'/loanp/mulu/muLu/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


