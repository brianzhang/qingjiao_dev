
/**
 * t_zyxxb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-22 01:02:49
 *</pre>
 */
$(function() {
	zYXXB  = new ZYXXB();
	zYXXB.init();
	
	formUrl = zYXXB.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#zYXXBGrid",// 列表对象
			PAGER : "#zYXXBPager",// 列表分页
			FORM : '#zYXXBForm'// 表单form
	};
	/**
	 * t_zyxxb 对象
	 * @returns {ZYXXB}
	 */
	ZYXXB = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ZYXXB.prototype = {
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
						url :  __ctx+'/loanp/ZYXX/zYXXB/listJson.htm?sfid='+$("#sfid").val(),
						pager :this.consts.PAGER,
						colNames: ['主键','职业','年收入','是否本行员工','首次合作时间','首次合作金额','工作单位名称','单位地址','单位邮编','单位所属行业','单位性质','职务','职称','月收入','岗位性质','单位电话','本单位工作起始年月','工资账号','工资账号开户行','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'zynsr',
				                	   index: 'zynsr'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'国家机关，党群组织，企业，事业单位负责人'
												,'2':'专业技术人员'
												,'3':'办事人员和有关人员'
												,'4':'商业，服务业人员'
												,'5':'农林牧渔水利业生产人员'
												,'6':'生产，运输设备操作人员及有关人员'
												,'7':'军人'
												,'8':'不便分类的其他从业人员'
												,'9':'未知'
			                                }
				                        }
				                	 	}, {
				                 	   name:'nsr',
				                	   index: 'nsr'

				                	 					                	 	}, {
				                 	   name:'sfbxyg',
				                	   index: 'sfbxyg'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'schzsj',
				                	   index: 'schzsj'

				                	 					                	 	}, {
				                 	   name:'schzje',
				                	   index: 'schzje'

				                	 					                	 	}, {
				                 	   name:'gzdwmc',
				                	   index: 'gzdwmc'

				                	 					                	 	}, {
				                 	   name:'dwdz',
				                	   index: 'dwdz'

				                	 					                	 	}, {
				                 	   name:'dwyb',
				                	   index: 'dwyb'

				                	 					                	 	}, {
				                 	   name:'dwssxy',
				                	   index: 'dwssxy'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'农林牧渔'
												,'2':'采掘业'
												,'3':'制造业'
												,'4':'电力，燃气，水的生产和供应业'
												,'5':'建筑业'
												,'6':'交通运输，仓储，邮政业'
												,'7':'信息传输，计算机服务，软件业'
												,'8':'批发零售业'
												,'9':'住宿，餐饮业'
												,'10':'金融业'
												,'11':'房地产业'
												,'12':'租赁，商务服务业'
												,'13':'科学研究，技术服务和地质勘察业'
												,'14':'水利，环境，公共设施管理业'
												,'15':'居民服务和其他服务业'
												,'16':'教育'
												,'17':'卫生，社会保障和社会福利业'
												,'18':'文化，体育，娱乐业'
												,'19':'公共管理和社会组织'
												,'20':'国际组织'
												,'21':'其他'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dwxz',
				                	   index: 'dwxz'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'机关事业'
												,'2':'国营企业'
												,'3':'军队'
												,'4':'金融企业'
												,'5':'私营企业'
												,'6':'个体经营户'
												,'7':'三资企业'
												,'8':'邮电通讯'
												,'9':'其他'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zw',
				                	   index: 'zw'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'高级领导'
												,'2':'中级领导'
												,'3':'一般员工'
												,'4':'其他'
			                                }
				                        }
				                	 	}, {
				                 	   name:'zc',
				                	   index: 'zc'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'无'
												,'2':'高级'
												,'3':'中级'
												,'4':'初级'
			                                }
				                        }
				                	 	}, {
				                 	   name:'ysr',
				                	   index: 'ysr'

				                	 					                	 	}, {
				                 	   name:'gwxz',
				                	   index: 'gwxz'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'厅局级以上'
												,'2':'副处级以上'
												,'3':'副科级以上'
												,'4':'一般职务'
												,'5':'其他'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dwdh',
				                	   index: 'dwdh'

				                	 					                	 	}, {
				                 	   name:'bdwgzqsny',
				                	   index: 'bdwgzqsny'

				                	 					                	 	}, {
				                 	   name:'gzzh',
				                	   index: 'gzzh'

				                	 					                	 	}, {
				                 	   name:'gzzhkhx',
				                	   index: 'gzzhkhx'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/ZYXX/zYXXB/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/ZYXX/zYXXB/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/ZYXX/zYXXB/get.htm?id={id}'
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
		//	});
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
							window.location.href = __ctx+'/loanp/ZYXX/zYXXB/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}*/
		}
	};
})();


