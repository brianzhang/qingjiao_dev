
/**
 * t_sxsq
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 04:11:06
 *</pre>
 */
$(function() {
	daiKuanShenQingInfo  = new DaiKuanShenQingInfo();
	daiKuanShenQingInfo.init();
	
	formUrl = daiKuanShenQingInfo.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#daiKuanShenQingInfoGrid",// 列表对象
			PAGER : "#daiKuanShenQingInfoPager",// 列表分页
			FORM : '#daiKuanShenQingInfoForm'// 表单form
	};
	/**
	 * t_sxsq 对象
	 * @returns {DaiKuanShenQingInfo}
	 */
	DaiKuanShenQingInfo = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DaiKuanShenQingInfo.prototype = {
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
						url :  __ctx+'/loanp/daikuanInfo/daiKuanShenQingInfo/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','申请授信额度','申请授信期限','授信总额','客户名称','产品名称','申请金额','贷款形式','期限类别','担保方式','合同性质','行（社）定利率','执行利率','基准利率','是否优惠','利率调整方式','浮动比例','结息方式','还款来源','是否有还款计划','是否政府承诺还款','是否合作项目贷款','是否涉农贷款','涉农贷款类别','涉农贷款用途','贷款投向','贷款用途','贷款用途明细','是否接受短息通','联系人名称','联系人手机号','支付方式','是否自动扣款','自动扣款账号','还款方式','借贷Id','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'sqsxed',
				                	   index: 'sqsxed'

				                	 					                	 	}, {
				                 	   name:'sqsxqx',
				                	   index: 'sqsxqx'

				                	 					                	 	}, {
				                 	   name:'sxze',
				                	   index: 'sxze'

				                	 					                	 	}, {
				                 	   name:'khmc',
				                	   index: 'khmc'

				                	 					                	 	}, {
				                 	   name:'cpmc',
				                	   index: 'cpmc'

				                	 					                	 	}, {
				                 	   name:'sqje',
				                	   index: 'sqje'

				                	 					                	 	}, {
				                 	   name:'dkxs',
				                	   index: 'dkxs'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'新增'
												,'2':'收回再贷'
												,'3':'借新换旧'
												,'4':'重组'
			                                }
				                        }
				                	 	}, {
				                 	   name:'qxlb',
				                	   index: 'qxlb'

				                	 					                	 	}, {
				                	 					                	 		
				                	   name:'dkqx',
				                       index: 'dkqx'

				                	 						                	 },{
				                 	   name:'dbfs',
				                	   index: 'dbfs'

				                	 											,formatter: function(value,row,index){
											if(value){
												var chkJson = {};
												chkJson['1']='质押';
												chkJson['2']='抵押';
												chkJson['3']='保证';
												chkJson['4']='信用';
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
				                 	   name:'htxz',
				                	   index: 'htxz'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'非高额合同'
												,'2':'一般高额合同'
												,'3':'循环高额合同'
			                                }
				                        }
				                	 	}, {
				                 	   name:'xdll',
				                	   index: 'xdll'

				                	 					                	 	}, {
				                 	   name:'zxll',
				                	   index: 'zxll'

				                	 					                	 	}, {
				                 	   name:'jzll',
				                	   index: 'jzll'

				                	 					                	 	}, {
				                 	   name:'sfyh',
				                	   index: 'sfyh'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'lldzfs',
				                	   index: 'lldzfs'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'月调（对月一号'
												,'2':'月调（对月对日）'
												,'3':'季调（对月一号'
												,'4':'季调（对月对日）'
												,'5':'年调（一月一号）'
												,'6':'年调（对年对月对日）'
												,'7':'立即调整'
												,'8':'固定'
			                                }
				                        }
				                	 	}, {
				                 	   name:'fdbl',
				                	   index: 'fdbl'

				                	 					                	 	}, {
				                 	   name:'jxfs',
				                	   index: 'jxfs'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'利随本清'
												,'2':'每月20日结息'
												,'3':'每季末20日结息'
												,'4':'每年12月20日结息'
			                                }
				                        }
				                	 	}, {
				                 	   name:'hkly',
				                	   index: 'hkly'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'薪酬收入'
												,'2':'生产经营收入'
												,'3':'补贴收入'
												,'4':'其他收入'
			                                }
				                        }
				                	 	}, {
				                 	   name:'sfyhkjh',
				                	   index: 'sfyhkjh'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'sfzfcnhk',
				                	   index: 'sfzfcnhk'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'sfhzxmdk',
				                	   index: 'sfhzxmdk'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'sfsndk',
				                	   index: 'sfsndk'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'sndklb',
				                	   index: 'sndklb'

				                	 					                	 	}, {
				                 	   name:'sndkyt',
				                	   index: 'sndkyt'

				                	 					                	 	}, {
				                 	   name:'dktx',
				                	   index: 'dktx'

				                	 					                	 	}, {
				                 	   name:'dkyt',
				                	   index: 'dkyt'

				                	 					                	 	}, {
				                 	   name:'dkytmx',
				                	   index: 'dkytmx'

				                	 					                	 	}, {
				                 	   name:'sfjsdxt',
				                	   index: 'sfjsdxt'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'lxrmc',
				                	   index: 'lxrmc'

				                	 					                	 	}, {
				                 	   name:'lxrsjh',
				                	   index: 'lxrsjh'

				                	 					                	 	}, {
				                 	   name:'zffs',
				                	   index: 'zffs'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'自主支付'
												,'2':'受托支付'
			                                }
				                        }
				                	 	}, {
				                 	   name:'sfzdkk',
				                	   index: 'sfzdkk'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zdkkzh',
				                	   index: 'zdkkzh'

				                	 					                	 	}, {
				                 	   name:'hkfs',
				                	   index: 'hkfs'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'按计划还本、按季结息法'
												,'2':'按计划还本按月结息法'
												,'3':'按计划还本、利随本清'
												,'4':'按季结息（20日）到期一次性还本法'
												,'5':'按年结息（12月20日）到期一次性还本法'
												,'6':'按月等额本金还款法'
												,'7':'按月等额本息还款法'
												,'8':'按月结息（20日）、到期一次性还本发'
												,'9':'利随本清'
												
			                                }
				                        }
				                	 	}, {
				                 	   name:'jdid',
				                	   index: 'jdId'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/daikuanInfo/daiKuanShenQingInfo/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/daikuanInfo/daiKuanShenQingInfo/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/daikuanInfo/daiKuanShenQingInfo/get.htm?id={id}'
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


