
/**
 * t_dyr
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 00:16:31
 *</pre>
 */
$(function() {
	dyr  = new Dyr();
	dyr.init();
	
	formUrl = dyr.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#dyrGrid",// 列表对象
			PAGER : "#dyrPager",// 列表分页
			FORM : '#dyrForm'// 表单form
	};
	/**
	 * t_dyr 对象
	 * @returns {Dyr}
	 */
	Dyr = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Dyr.prototype = {
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
						url :  __ctx+'/loanp/dyrInfo/dyr/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','抵押人','是否有户籍证明','抵押人证件类型','抵押人证件号码','抵押人贷款卡号','抵押物是否共有','抵押物共有权人','共有方式','抵押物名称','抵押物位置','抵押物种类','房屋预登记','房屋结构','房产层数','房产所在层数','抵押物编号','抵押物是否拥有土地使用权证书','抵押物房产土地使用权人名称','抵押房产土地使用权证号','抵押房产土地使用权类型','抵押房产土地使用权面积','抵押房产土地使用权是否','抵押房产土地使用权抵押方式','抵押物详细描述','抵押物相关证明文件','购房合同/抵押物产权证号/使用权证号','发证机关','抵押物原置购置价','面积/数','建成/购置时间','抵押物使用年限','尚可使用年限','折旧率','抵押物是否评估','抵押物评估机构','评估方法','抵押物评估日期','评估结论使用有效期限','该抵押物贷款金额','评估价值','抵押率','抵押物是否进行抵押登记','抵押物登记机构','抵押登记文件号/他项权人','抵押价值','抵押登记日','抵押到期日','抵押物是否保险','保险机构名称','抵押物保险单号','保险金额','保险生效日','保险到期日','第一受益人名称','抵押物是否办理公证','公证机关','公证日期','公证书编号','备注','借贷id','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'dyr',
				                	   index: 'dyr'

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
				                 	   name:'dyrzjlx',
				                	   index: 'dyrzjlx'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'营业执照'
												,'2':'身份证'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dyrzjhm',
				                	   index: 'dyrzjhm'

				                	 					                	 	}, {
				                 	   name:'dyrdkkh',
				                	   index: 'dyrdkkh'

				                	 					                	 	}, {
				                 	   name:'dywsfgy',
				                	   index: 'dywsfgy'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dywgyqr',
				                	   index: 'dywgyqr'

				                	 					                	 	}, {
				                 	   name:'gyfs',
				                	   index: 'gyfs'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'共同共有比例'
												,'2':'（按份）共有'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dywmc',
				                	   index: 'dywmc'

				                	 					                	 	}, {
				                 	   name:'dywwz',
				                	   index: 'dywwz'

				                	 					                	 	}, {
				                 	   name:'dywzl',
				                	   index: 'dywzl'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'土地使用权'
												,'2':'住宅'
												,'3':'门市、商店、店铺、车库'
												,'4':'工业厂房、仓库'
												,'5':'办公用房、办公楼'
												,'6':'宾馆、酒店'
												,'7':'问题娱乐用房'
												,'8':'多功能建筑（综合楼宇）'
												,'9':'荒地等土地承包经营权抵押'
												,'10':'水域滩涂使用权'
												,'11':'林权抵押'
												,'12':'农机具等农用生产设备抵押'
												,'13':'交通运输工具抵押'
												,'14':'机器设备抵押'
												,'15':'原材料、半成品、产品抵押'
												,'16':'在建工程'
												,'17':'其他抵押'
			                                }
				                        }
				                	 	}, {
				                 	   name:'fwydj',
				                	   index: 'fwydj'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'fwjg',
				                	   index: 'fwjg'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'砖木结构'
												,'2':'砖混结构'
												,'3':'钢筋混凝土结构'
												,'4':'钢结构'
												,'5':'其他结构'
			                                }
				                        }
				                	 	}, {
				                 	   name:'fccs',
				                	   index: 'fccs'

				                	 					                	 	}, {
				                 	   name:'fcszcs',
				                	   index: 'fcszcs'

				                	 					                	 	}, {
				                 	   name:'dywbh',
				                	   index: 'dywbh'

				                	 					                	 	}, {
				                 	   name:'dywsfyytdsyqzs',
				                	   index: 'dywsfyytdsyqzs'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dywfctdsyqrmc',
				                	   index: 'dywfctdsyqrmc'

				                	 					                	 	}, {
				                 	   name:'dyfctdsyqzh',
				                	   index: 'dyfctdsyqzh'

				                	 					                	 	}, {
				                 	   name:'dyfctdsyqlx',
				                	   index: 'dyfctdsyqlx'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'出让'
												,'2':'划拨'
												,'3':'其他'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dyfctdsyqmj',
				                	   index: 'dyfctdsyqmj'

				                	 					                	 	}, {
				                 	   name:'dyfctdsyqsf',
				                	   index: 'dyfctdsyqsf'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dyfctdsyqdyfs',
				                	   index: 'dyfctdsyqdyfs'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'零价抵押'
												,'2':'有价值抵押'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dywxxms',
				                	   index: 'dywxxms'

				                	 					                	 	}, {
				                 	   name:'dywxgzmwj',
				                	   index: 'dywxgzmwj'

				                	 					                	 	}, {
				                 	   name:'gfhtDywcqzhSyqzh',
				                	   index: 'gfht_dywcqzh_syqzh'

				                	 					                	 	}, {
				                 	   name:'fzjg',
				                	   index: 'fzjg'

				                	 					                	 	}, {
				                 	   name:'dywyzgzj',
				                	   index: 'dywyzgzj'

				                	 					                	 	}, {
				                 	   name:'mjS',
				                	   index: 'mj_s'

				                	 					                	 	}, {
				                 	   name:'jcGzsj',
				                	   index: 'jc_gzsj'

				                	 					                	 	}, {
				                 	   name:'dywsynx',
				                	   index: 'dywsynx'

				                	 					                	 	}, {
				                 	   name:'sksynx',
				                	   index: 'sksynx'

				                	 					                	 	}, {
				                 	   name:'zjl',
				                	   index: 'zjl'

				                	 					                	 	}, {
				                 	   name:'dywsfpg',
				                	   index: 'dywsfpg'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dywpgjg',
				                	   index: 'dywpgjg'

				                	 					                	 	}, {
				                 	   name:'pgff',
				                	   index: 'pgff'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'重置成本法'
												,'2':'现值成本法'
												,'3':'现行市价法'
												,'4':'收益现值法'
												,'5':'其他方法'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dywpgrq',
				                	   index: 'dywpgrq'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'pgjlsyyxqx',
				                	   index: 'pgjlsyyxqx'

				                	 					                	 	}, {
				                 	   name:'gdywdkje',
				                	   index: 'gdywdkje'

				                	 					                	 	}, {
				                 	   name:'pgjz',
				                	   index: 'pgjz'

				                	 					                	 	}, {
				                 	   name:'dyl',
				                	   index: 'dyl'

				                	 					                	 	}, {
				                 	   name:'dywsfjxdydj',
				                	   index: 'dywsfjxdydj'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dywdjjg',
				                	   index: 'dywdjjg'

				                	 					                	 	}, {
				                 	   name:'dydjwjhTxqr',
				                	   index: 'dydjwjh_txqr'

				                	 					                	 	}, {
				                 	   name:'dyjz',
				                	   index: 'dyjz'

				                	 					                	 	}, {
				                 	   name:'dydjr',
				                	   index: 'dydjr'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'dydqr',
				                	   index: 'dydqr'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'dywsfbx',
				                	   index: 'dywsfbx'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'bxjgmc',
				                	   index: 'bxjgmc'

				                	 					                	 	}, {
				                 	   name:'dywbxdh',
				                	   index: 'dywbxdh'

				                	 					                	 	}, {
				                 	   name:'bxje',
				                	   index: 'bxje'

				                	 					                	 	}, {
				                 	   name:'bxsxr',
				                	   index: 'bxsxr'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'bxdqr',
				                	   index: 'bxdqr'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'dysyrmc',
				                	   index: 'dysyrmc'

				                	 					                	 	}, {
				                 	   name:'dywsfblgz',
				                	   index: 'dywsfblgz'

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
				                 	   name:'gzrq',
				                	   index: 'gzrq'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'gzsbh',
				                	   index: 'gzsbh'

				                	 					                	 	}, {
				                 	   name:'bz',
				                	   index: 'bz'

				                	 					                	 	}, {
				                 	   name:'jdid',
				                	   index: 'jdid'

				                	 	,hidden:true
				                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/dyrInfo/dyr/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/dyrInfo/dyr/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/dyrInfo/dyr/get.htm?id={id}'
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
							window.location.href = __ctx+'/loanp/diyarenAll/dyr_All/list.htm?jdid='+msg.getMessage().split("@")[1];
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


