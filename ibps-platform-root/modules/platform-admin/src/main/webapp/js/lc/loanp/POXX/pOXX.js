
/**
 * t_poxxb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-24 02:14:28
 *</pre>
 */
$(function() {
	pOXX  = new POXX();
	pOXX.init();
	
	formUrl = pOXX.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#pOXXGrid",// 列表对象
			PAGER : "#pOXXPager",// 列表分页
			FORM : '#pOXXForm'// 表单form
	};
	/**
	 * t_poxxb 对象
	 * @returns {POXX}
	 */
	POXX = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	POXX.prototype = {
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
						url :  __ctx+'/loanp/POXX/pOXX/listJson.htm?sfid='+$("#sfid").val(),
						pager :this.consts.PAGER,
						colNames: ['主键','开始日期','客户名称','家庭成员姓名','性别','证件类型','证件号码','工作单位','个人健康状况','备注','客户号','与客户关系','所在单位','所在部门','结束日期','担任职务','从事行业描述','单位性质','单位电话','单位邮编','单位地址','月收入','备注（其他）','是否有户籍证','联系电话','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'ksrq',
				                	   index: 'ksrq'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'khmc',
				                	   index: 'khmc'

				                	 					                	 	}, {
				                 	   name:'jtcyxm',
				                	   index: 'jtcyxm'

				                	 					                	 	}, {
				                 	   name:'xb',
				                	   index: 'xb'

				                	 					                	 	}, {
				                 	   name:'zjlx',
				                	   index: 'zjlx'

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
				                 	   name:'gzdw',
				                	   index: 'gzdw'

				                	 					                	 	}, {
				                 	   name:'grjkzk',
				                	   index: 'grjkzk'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'良好'
												,'2':'一般'
												,'3':'较差'
			                                }
				                        }
				                	 	}, {
				                 	   name:'bz',
				                	   index: 'bz'

				                	 					                	 	}, {
				                 	   name:'khh',
				                	   index: 'khh'

				                	 					                	 	}, {
				                 	   name:'ykhgx',
				                	   index: 'ykhgx'

				                	 					                	 	}, {
				                 	   name:'szdw',
				                	   index: 'szdw'

				                	 					                	 	}, {
				                 	   name:'szbm',
				                	   index: 'szbm'

				                	 					                	 	}, {
				                 	   name:'jsrq',
				                	   index: 'jsrq'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'drzw',
				                	   index: 'drzw'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'高级领导'
												,'2':'中级领导'
												,'3':'一般员工'
												,'4':'其他'
												,'5':'未知'
			                                }
				                        }
				                	 	}, {
				                 	   name:'csxyms',
				                	   index: 'csxyms'

				                	 					                	 	}, {
				                 	   name:'dwxz',
				                	   index: 'dwxz'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'机关事业'
												,'2':'国营企业'
												,'3':'私营企业'
												,'4':'金融企业'
												,'5':'军队'
												,'6':'个体经营户'
												,'7':'三资企业'
												,'8':'邮电通讯'
			                                }
				                        }
				                	 	}, {
				                 	   name:'dwdh',
				                	   index: 'dwdh'

				                	 					                	 	}, {
				                 	   name:'dwyb',
				                	   index: 'dwyb'

				                	 					                	 	}, {
				                 	   name:'dwdz',
				                	   index: 'dwdz'

				                	 					                	 	}, {
				                 	   name:'ysr',
				                	   index: 'ysr'

				                	 					                	 	}, {
				                 	   name:'bz1',
				                	   index: 'bz1'

				                	 					                	 	}, {
				                 	   name:'sfyhjz',
				                	   index: 'sfyhjz'

				                	 					                	 	}, {
				                 	   name:'lxdh',
				                	   index: 'lxdh'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/POXX/pOXX/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/POXX/pOXX/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/POXX/pOXX/get.htm?id={id}'
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
			//alert("测试初始化");
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
							window.location.href = __ctx+'/loanp/POXX/pOXX/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}*/
		}
	};
})();


