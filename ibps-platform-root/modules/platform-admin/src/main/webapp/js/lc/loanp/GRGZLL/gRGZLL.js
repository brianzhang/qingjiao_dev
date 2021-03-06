
/**
 * t_grll
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZEHNGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-24 00:43:01
 *</pre>
 */
$(function() {
	gRGZLL  = new GRGZLL();
	gRGZLL.init();
	
	formUrl = gRGZLL.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#gRGZLLGrid",// 列表对象
			PAGER : "#gRGZLLPager",// 列表分页
			FORM : '#gRGZLLForm'// 表单form
	};
	/**
	 * t_grll 对象
	 * @returns {GRGZLL}
	 */
	GRGZLL = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	GRGZLL.prototype = {
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
						url :  __ctx+'/loanp/GRGZLL/gRGZLL/listJson.htm?sfid='+$("#sfid").val(),
						pager :this.consts.PAGER,
						colNames: ['主键','客户号','客户名称','开始日期','所在单位','所在部门','结束日期','单位性质','从事行业描述','担任职务','单位邮编','单位电话','单位地址','月收入','备注','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'khh',
				                	   index: 'khh'

				                	 					                	 	}, {
				                 	   name:'khmc',
				                	   index: 'khmc'

				                	 					                	 	}, {
				                 	   name:'ksrq',
				                	   index: 'ksrq'

				                	 					                	 	}, {
				                 	   name:'szdw',
				                	   index: 'szdw'

				                	 					                	 	}, {
				                 	   name:'szbm',
				                	   index: 'szbm'

				                	 					                	 	}, {
				                 	   name:'jsrq',
				                	   index: 'jsrq'

				                	 					                	 	}, {
				                 	   name:'dwxz',
				                	   index: 'dwxz'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'机关事业'
												,'2':'国营企业'
												,'3':'金融企业'
												,'4':'军队'
												,'5':'私营企业'
												,'6':'个体经营户'
												,'7':'三资企业'
												,'8':'邮电通讯'
			                                }
				                        }
				                	 	}, {
				                 	   name:'csxyms',
				                	   index: 'csxyms'

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
				                 	   name:'dwyb',
				                	   index: 'dwyb'

				                	 					                	 	}, {
				                 	   name:'dwdh',
				                	   index: 'dwdh'

				                	 					                	 	}, {
				                 	   name:'dwdz',
				                	   index: 'dwdz'

				                	 					                	 	}, {
				                 	   name:'ysr',
				                	   index: 'ysr'

				                	 					                	 	}, {
				                 	   name:'bzz',
				                	   index: 'bzz'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/GRGZLL/gRGZLL/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/GRGZLL/gRGZLL/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/GRGZLL/gRGZLL/get.htm?id={id}'
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
							window.location.href = __ctx+'/loanp/GRGZLL/gRGZLL/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}*/
		}
	};
})();


