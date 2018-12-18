
/**
 * t_bzrxxb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 03:01:18
 *</pre>
 */
$(function() {
	bZRXXB  = new BZRXXB();
	bZRXXB.init();
	
	formUrl = bZRXXB.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bZRXXBGrid",// 列表对象
			PAGER : "#bZRXXBPager",// 列表分页
			FORM : '#bZRXXBForm'// 表单form
	};
	/**
	 * t_bzrxxb 对象
	 * @returns {BZRXXB}
	 */
	BZRXXB = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BZRXXB.prototype = {
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
						url :  __ctx+'/loanp/baoZhengRen/bZRXXB/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','保证类型','保证人名称','保证人证件类型','证件号码','联系电话','是否保险公司保险','保证方式','保证金额','保证比例','与借款人关系','保证人配偶名称','保证人配偶证件类型','保证人配偶证件号码','实际居住地址','备注','联系人姓名','联系人与借款人关系','联系人联系电话','借贷Id','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'bzlx',
				                	   index: 'bzlx'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'自然人保证'
												,'2':'企业保证 '
												,'3':'政府保证'
												,'4':'下岗失业贷款担保中心'
												,'5':'国有商业银行及政策性银行保证'
												,'6':'其他银行保证'
												,'7':'非银行金融机构保证 '
												,'8':'外资和中外合资 '
												,'9':'非银行金融机构保证 '
												,'10':'组合保证'
												,'11':'其它保证'
			                                }
				                        }
				                	 	}, {
				                 	   name:'bzrmc',
				                	   index: 'bzrmc'

				                	 					                	 	}, {
				                 	   name:'bzrzjlx',
				                	   index: 'bzrzjlx'

				                	 					                	 	}, {
				                 	   name:'zjhm',
				                	   index: 'zjhm'

				                	 					                	 	}, {
				                 	   name:'lxdh',
				                	   index: 'lxdh'

				                	 					                	 	}, {
				                 	   name:'sfbxgsbx',
				                	   index: 'sfbxgsbx'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'是'
												,'2':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'bzfs',
				                	   index: 'bzfs'

				                	 					                	 	}, {
				                 	   name:'bzje',
				                	   index: 'bzje'

				                	 					                	 	}, {
				                 	   name:'bzbl',
				                	   index: 'bzbl'

				                	 					                	 	}, {
				                 	   name:'yjkrgx',
				                	   index: 'yjkrgx'

				                	 					                	 	}, {
				                 	   name:'bzrpomc',
				                	   index: 'bzrpomc'

				                	 					                	 	}, {
				                 	   name:'bzrpozjlx',
				                	   index: 'bzrpozjlx'

				                	 					                	 	}, {
				                 	   name:'bzrpozjhm',
				                	   index: 'bzrpozjhm'

				                	 					                	 	}, {
				                 	   name:'sjjzdz',
				                	   index: 'sjjzdz'

				                	 					                	 	}, {
				                 	   name:'bz',
				                	   index: 'bz'

				                	 					                	 	}, {
				                 	   name:'lxrxm',
				                	   index: 'lxrxm'

				                	 					                	 	}, {
				                 	   name:'lxryjkrgx',
				                	   index: 'lxryjkrgx'

				                	 											,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'1':'父母'
												,'2':'子女'
												,'3':'兄弟姐妹'
			                                }
				                        }
				                	 	}, {
				                 	   name:'lxrlxdh',
				                	   index: 'lxrlxdh'

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
										action:__ctx+'/loanp/baoZhengRen/bZRXXB/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/baoZhengRen/bZRXXB/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/baoZhengRen/bZRXXB/get.htm?id={id}'
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
							window.location.href = __ctx+'/loanp/bzrAll/baoZhengRenAll/list.htm?jdid='+msg.getMessage().split("@")[1];
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


