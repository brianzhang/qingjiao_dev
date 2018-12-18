
/**
 * t_gtgshxxb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-22 01:03:48
 *</pre>
 */
$(function() {
	gTGSHXX  = new GTGSHXX();
	gTGSHXX.init();
	
	formUrl = gTGSHXX.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#gTGSHXXGrid",// 列表对象
			PAGER : "#gTGSHXXPager",// 列表分页
			FORM : '#gTGSHXXForm'// 表单form
	};
	/**
	 * t_gtgshxxb 对象
	 * @returns {GTGSHXX}
	 */
	GTGSHXX = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	GTGSHXX.prototype = {
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
						url :  __ctx+'/loanp/GTGSHXX/gTGSHXX/listJson.htm?sfid='+$("#sfid").val(),
						pager :this.consts.PAGER,
						colNames: ['主键','营业执照号码','营业执照年检时间','成立时间','经营范围','经营方式','门店字号','门店地址','经营规模','基本账号开户行','基本账号','经营面积','关联账户类型','从业人数','组成形式','营业用房','管户机构','备注','合伙人名称','证件类型','证件有效期限','证件号码','户籍地址','客户性别','民族','联系电话','合伙方式','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'yyzzhm',
				                	   index: 'yyzzhm'

				                	 					                	 	}, {
				                 	   name:'yyzznjsj',
				                	   index: 'yyzznjsj'

				                	 					                	 	}, {
				                 	   name:'clsj',
				                	   index: 'clsj'

				                	 					                	 	}, {
				                 	   name:'jyfw',
				                	   index: 'jyfw'

				                	 					                	 	}, {
				                 	   name:'jyfs',
				                	   index: 'jyfs'

				                	 					                	 	}, {
				                 	   name:'mdzh',
				                	   index: 'mdzh'

				                	 					                	 	}, {
				                 	   name:'mddz',
				                	   index: 'mddz'

				                	 					                	 	}, {
				                 	   name:'jygm',
				                	   index: 'jygm'

				                	 					                	 	}, {
				                 	   name:'jbzhkhx',
				                	   index: 'jbzhkhx'

				                	 					                	 	}, {
				                 	   name:'jbzh',
				                	   index: 'jbzh'

				                	 					                	 	}, {
				                 	   name:'jymj',
				                	   index: 'jymj'

				                	 					                	 	}, {
				                 	   name:'glzhlx',
				                	   index: 'glzhlx'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'个人结算账户'
												,'2':'银行卡账户口'
												,'3':'其他账户'
			                                }
				                        }
				                	 	}, {
				                 	   name:'cyrs',
				                	   index: 'cyrs'

				                	 					                	 	}, {
				                 	   name:'zcxs',
				                	   index: 'zcxs'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'个人经营'
												,'2':'家庭经营'
												,'3':'合伙经营'
			                                }
				                        }
				                	 	}, {
				                 	   name:'yyyf',
				                	   index: 'yyyf'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'自置'
												,'2':'租用'
			                                }
				                        }
				                	 	}, {
				                 	   name:'ghjg',
				                	   index: 'ghjg'

				                	 					                	 	}, {
				                 	   name:'bz',
				                	   index: 'bz'

				                	 					                	 	}, {
				                 	   name:'hhrmc',
				                	   index: 'hhrmc'

				                	 					                	 	}, {
				                 	   name:'zjlx',
				                	   index: 'zjlx'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'身份证'
												,'2':'军官证'
												,'':'护照'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zjyxqx',
				                	   index: 'zjyxqx'

				                	 					                	 	}, {
				                 	   name:'zjhm',
				                	   index: 'zjhm'

				                	 					                	 	}, {
				                 	   name:'hjdz',
				                	   index: 'hjdz'

				                	 					                	 	}, {
				                 	   name:'khxb',
				                	   index: 'khxb'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'男'
												,'2':'女'
			                                }
				                        }
				                	 	}, {
				                 	   name:'mz',
				                	   index: 'mz'

				                	 					                	 	}, {
				                 	   name:'lxdh',
				                	   index: 'lxdh'

				                	 					                	 	}, {
				                 	   name:'hhfs',
				                	   index: 'hhfs'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/GTGSHXX/gTGSHXX/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/GTGSHXX/gTGSHXX/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/GTGSHXX/gTGSHXX/get.htm?id={id}'
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
			//$(document).on('click', 'a.fa-save', function() {
				me.formUrl.submit(me._showResponse);
			//});
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
/*			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/loanp/GTGSHXX/gTGSHXX/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}*/
		}
	};
})();


