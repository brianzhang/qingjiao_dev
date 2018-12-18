
/**
 * t_zyr
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-24 03:02:25
 *</pre>
 */
$(function() {
	zhiYaPerson  = new ZhiYaPerson();
	zhiYaPerson.init();
	
	formUrl = zhiYaPerson.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#zhiYaPersonGrid",// 列表对象
			PAGER : "#zhiYaPersonPager",// 列表分页
			FORM : '#zhiYaPersonForm'// 表单form
	};
	/**
	 * t_zyr 对象
	 * @returns {ZhiYaPerson}
	 */
	ZhiYaPerson = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ZhiYaPerson.prototype = {
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
						url :  __ctx+'/loanp/zhiyaRInfo/zhiYaPerson/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','质押物所有人名称','是否有户籍证明','质押人证件类型','质押人证件号码','质押物是否共有','质物共有权人','共有方式','质押物种类','债券、单、折、票据等证号','债单、票据、债券金额','是否办理核押止付','本行存单（折）账号','债单/票据/债券开始时间','债单/票据/债券 截止时间','止付单位','币种','质押物数量','质押物是否已评估','评估机构','评估方法','评估日期','评估结论有效期限','该质押物贷款金额','评估价值','质押率','是否进行质押登记','质押物是否保证险','保险机构','保险金额','第一受益人名称','质押物是否办理公证','公证机关','借贷Id','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'zywsyrmc',
				                	   index: 'zywsyrmc'

				                	 					                	 	}, {
				                 	   name:'sfyhjzm',
				                	   index: 'sfyhjzm'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zyrzjlx',
				                	   index: 'zyrzjlx'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'营业执照'
												,'2':'身份证'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zyrzjhm',
				                	   index: 'zyrzjhm'

				                	 					                	 	}, {
				                 	   name:'zywsfgy',
				                	   index: 'zywsfgy'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zwgyqr',
				                	   index: 'zwgyqr'

				                	 					                	 	}, {
				                 	   name:'gyfs',
				                	   index: 'gyfs'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'共同共有比例 '
												,'2':'（按份）共有'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zywzl',
				                	   index: 'zywzl'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'本行存单（折）质押'
												,'2':'他行存单（折）质押'
												,'3':'国债质押 '
												,'4':'金融债券质押 '
												,'5':'其他有价证券质押'
												,'6':'保险单质押'
												,'7':'银行承兑汇票质押'
												,'8':'商业承兑汇票质押'
												,'9':'支票质押'
												,'10':'可转让股权、股票质押'
												,'11':'可转让基金份额质押'
												,'12':'应收账款质押'
												,'13':'粮补账户质押 '
												,'14':'出口退税权质押'
												,'15':'收费权质押 '
												,'16':'经营权、运营权利质押'
												,'17':'仓单，提单质押'
												,'18':'存货质押'
												,'19':'其他动产质押'
												,'20':'知识产权质押'
												,'21':'理财产品收益权质押'
												,'22':'其他质押'
			                                }
				                        }
				                	 	}, {
				                 	   name:'pjdzh',
				                	   index: 'pjdzh'

				                	 					                	 	}, {
				                 	   name:'zqje',
				                	   index: 'zqje'

				                	 					                	 	}, {
				                 	   name:'sfblhyzf',
				                	   index: 'sfblhyzf'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'bxcdzh',
				                	   index: 'bxcdzh'

				                	 					                	 	}, {
				                 	   name:'zqkssj',
				                	   index: 'zqkssj'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'zqjzsj',
				                	   index: 'zqjzsj'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'zfdw',
				                	   index: 'zfdw'

				                	 					                	 	}, {
				                 	   name:'bz',
				                	   index: 'bz'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'人民币'
												,'2':'外币'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zywsl',
				                	   index: 'zywsl'

				                	 					                	 	}, {
				                 	   name:'zywsfypg',
				                	   index: 'zywsfypg'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'pgjg',
				                	   index: 'pgjg'

				                	 					                	 	}, {
				                 	   name:'pgff',
				                	   index: 'pgff'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'重置成本法'
												,'2':'现值成本法 '
												,'3':'现行市价法'
												,'4':'收益现值法'
												,'5':'其他方法'
			                                }
				                        }
				                	 	}, {
				                 	   name:'pgrq',
				                	   index: 'pgrq'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'pgjlyxqx',
				                	   index: 'pgjlyxqx'

				                	 					                	 	}, {
				                 	   name:'gzywdkje',
				                	   index: 'gzywdkje'

				                	 					                	 	}, {
				                 	   name:'pgjz',
				                	   index: 'pgjz'

				                	 					                	 	}, {
				                 	   name:'zyl',
				                	   index: 'zyl'

				                	 					                	 	}, {
				                 	   name:'sfjxzydj',
				                	   index: 'sfjxzydj'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zywsfbzx',
				                	   index: 'zywsfbzx'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'bxjg',
				                	   index: 'bxjg'

				                	 					                	 	}, {
				                 	   name:'bxje',
				                	   index: 'bxje'

				                	 					                	 	}, {
				                 	   name:'dysyrmc',
				                	   index: 'dysyrmc'

				                	 					                	 	}, {
				                 	   name:'zywsfblgz',
				                	   index: 'zywsfblgz'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'gzjg',
				                	   index: 'gzjg'

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
										action:__ctx+'/loanp/zhiyaRInfo/zhiYaPerson/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/zhiyaRInfo/zhiYaPerson/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/zhiyaRInfo/zhiYaPerson/get.htm?id={id}'
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
				DialogUtil.confirm(msg.getMessage().split("@")[0] + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/loanp/zhiyarenAll/zhiYaRenAll/list.htm?jdid='+msg.getMessage().split("@")[1];
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


