
/**
 * t_grjksqspb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-21 20:14:51
 *</pre>
 */
$(function() {
	gRJKSQ  = new GRJKSQ();
	gRJKSQ.init();
	
	formUrl = gRJKSQ.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#gRJKSQGrid",// 列表对象
			PAGER : "#gRJKSQPager",// 列表分页
			FORM : '#gRJKSQForm'// 表单form
	};
	/**
	 * t_grjksqspb 对象
	 * @returns {GRJKSQ}
	 */
	GRJKSQ = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	GRJKSQ.prototype = {
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
						url :  __ctx+'/loanp/GRJKSQSP/gRJKSQ/listJson.htm?sfid='+$("#sfid").val(),
						pager :this.consts.PAGER,
						colNames: ['主键','客户类型','客户英文名','是否有户籍证明','民族','客户名称','客户曾用名','证件有效期限','客户性别','证件类别','证件号码','婚姻状况','最高学历','最高学位','个人健康状况','政治面貌','出生日期','行政区划（客户所属地区）','户口性质','户籍地址','是否户主','通信地址','是否本行股东','通信地址邮政编码','手机号码','其他联系方式','电子邮箱','专业特长','居住地址','居住状况','居住状态','居住地邮政编码','主要经营项目','主要经济来源','其他经济来源','个人综合年收入','家庭人均年收入','家庭年均支出','主要供养人口','与我社关系','是否个体工商户','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'khlx',
				                	   index: 'khlx'

				                	 					                	 	}, {
				                 	   name:'khywm',
				                	   index: 'khywm'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'sfyhjzm',
				                	   index: 'sfyhjzm'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'mz',
				                	   index: 'mz'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'阿昌族'
												,'2':'白族'
												,'3':'保安族'
												,'4':'布朗族'
												,'5':'布依族'
												,'6':'朝鲜族'
												,'7':'达斡尔族'
												,'8':'傣族'
												,'9':'德昂族'
												,'10':'东乡族'
												,'11':'侗族'
												,'12':'独龙族'
												,'13':'俄罗斯族'
												,'14':'鄂伦春族'
												,'15':'鄂伦春族'
												,'16':'高山族'
												,'17':'仡佬族'
												,'18':'哈尼族'
												,'19':'哈萨克族'
												,'20':'汉族'
												,'21':'赫哲族'
												,'22':'回族'
												,'23':'基诺族'
												,'24':'京族'
												,'25':'景颇族'
												,'26':'柯尔克孜族'
												,'27':'拉祜族'
												,'28':'黎族'
												,'29':'傈僳族'
												,'30':'珞巴族'
												,'31':'满族'
												,'32':'毛南族'
												,'33':'门巴族'
												,'34':'蒙古族'
												,'35':'苗族'
												,'36':'仫佬族'
												,'37':'纳西族'
												,'38':'怒族'
												,'39':'普米族'
												,'40':'羌族'
												,'41':'撒拉族'
												,'42':'畲族'
												,'43':'水族'
												,'44':'塔吉克族'
												,'45':'塔塔尔族'
												,'46':'土家族'
												,'47':'土族'
												,'48':'佤族'
												,'49':'维吾尔族'
												,'50':'乌孜别克族'
												,'51':'锡伯族'
												,'52':'瑶族'
												,'53':'彝族'
												,'54':'裕固族'
												,'55':'藏族'
												,'56':'壮族'
			                                }
				                        }
				                	 	}, {
				                 	   name:'khmc',
				                	   index: 'khmc'

				                	 					                	 	}, {
				                 	   name:'khcym',
				                	   index: 'khcym'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'zjyxqx',
				                	   index: 'zjyxqx'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'khxb',
				                	   index: 'khxb'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'男'
												,'2':'女'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zjlb',
				                	   index: 'zjlb'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'身份证'
												,'2':'军官证'
												,'3':'护照'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zjhm',
				                	   index: 'zjhm'

				                	 					                	 	}, {
				                 	   name:'hyzk',
				                	   index: 'hyzk'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'未婚'
												,'2':'已婚'
												,'3':'丧偶'
												,'4':'离婚'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zgxl',
				                	   index: 'zgxl'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'研究生'
												,'2':'大学本科'
												,'3':'大学专科或专科学校'
												,'4':'中等专业学校或者中等技术学校'
												,'5':'技术学校'
												,'6':'高中'
												,'7':'初中'
												,'8':'小学'
												,'9':'文盲或者半文盲'
												,'10':'未知'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zgxw',
				                	   index: 'zgxw'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'其它'
												,'2':'名誉博士'
												,'3':'博士'
												,'4':'硕士'
												,'5':'学士'
												,'6':'未知'
			                                }
				                        }
				                	 	}, {
				                 	   name:'grjkzk',
				                	   index: 'grjkzk'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'良好'
												,'2':'一般'
												,'3':'较差'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zzmm',
				                	   index: 'zzmm'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'群众'
												,'2':'中共党员'
			                                }
				                        }
				                	 	}, {
				                 	   name:'csrq',
				                	   index: 'csrq'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'xzqh',
				                	   index: 'xzqh'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'hkxz',
				                	   index: 'hkxz'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'本省'
												,'2':'外省'
			                                }
				                        }
				                	 	}, {
				                 	   name:'hjdz',
				                	   index: 'hjdz'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'sfhz',
				                	   index: 'sfhz'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'txdz',
				                	   index: 'txdz'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'sfbxgd',
				                	   index: 'sfbxgd'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'txdzyzbm',
				                	   index: 'txdzyzbm'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'sjhm',
				                	   index: 'sjhm'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'qtlxfs',
				                	   index: 'qtlxfs'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'dzyx',
				                	   index: 'dzyx'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'zytz',
				                	   index: 'zytz'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'无'
												,'2':'种粮'
												,'3':'养殖'
												,'4':'木工'
												,'5':'瓦工'
												,'6':'电器维修'
												,'7':'汽车维修'
												,'8':'经商'
												,'9':'运输'
												,'10':'其它'
			                                }
				                        }
				                	 	}, {
				                 	   name:'jzdz',
				                	   index: 'jzdz'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'jzzk',
				                	   index: 'jzzk'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'自置'
												,'2':'按揭'
												,'3':'亲属楼宇'
												,'4':'集体宿舍'
												,'5':'租房'
												,'6':'共有住宅'
												,'7':'其它'
												,'8':'未知'
			                                }
				                        }
				                	 	}, {
				                 	   name:'jzzt',
				                	   index: 'jzzt'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'长住'
												,'2':'选临时'
			                                }
				                        }
				                	 	}, {
				                 	   name:'jzdyzbm',
				                	   index: 'jzdyzbm'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'zyjyxm',
				                	   index: 'zyjyxm'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'zyjjly',
				                	   index: 'zyjjly'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'qtjjly',
				                	   index: 'qtjjly'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'grzhnsr',
				                	   index: 'grzhnsr'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'jtrjnsr',
				                	   index: 'jtrjnsr'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'jtnjzc',
				                	   index: 'jtnjzc'
				                		   ,hidden:true
				                	 					                	 	}, {
				                 	   name:'zygyrk',
				                	   index: 'zygyrk'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'0人'
												,'2':'1人'
												,'3':'2人'
												,'4':'3人'
												,'5':'4人以上'
			                                }
				                        }
				                	 	}, {
				                 	   name:'ywsgx',
				                	   index: 'ywsgx'
				                		   ,hidden:true
				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'密切'
												,'2':'一般'
												,'3':'较少'
			                                }
				                        }
				                	 	}, {
				                 	   name:'sfgtgsh',
				                	   index: 'sfgtgsh'
				                		   ,hidden:true
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
										action:__ctx+'/loanp/GRJKSQSP/gRJKSQ/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/GRJKSQSP/gRJKSQ/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/GRJKSQSP/gRJKSQ/get.htm?id={id}'
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
				var sfid1 = $("#sfid").val();
				beforeSave(sfid1);
				beforeSaveGZ(sfid1);
				beforeSavePOXX(sfid1);
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
							window.location.href = __ctx+'/loanp/GRJKSQSP/gRJKSQ/get.htm?sfid='+$("#sfid").val();
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


