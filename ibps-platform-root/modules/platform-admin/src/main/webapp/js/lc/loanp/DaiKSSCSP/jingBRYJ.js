
/**
 * t_jbdcryj
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin1996@163.com
 * 创建时间：2017-07-31 22:34:52
 *</pre>
 */
$(function() {
	jingBRYJ  = new JingBRYJ();
	jingBRYJ.init();
	
	formUrl = jingBRYJ.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#jingBRYJGrid",// 列表对象
			PAGER : "#jingBRYJPager",// 列表分页
			FORM : '#jingBRYJForm'// 表单form
	};
	/**
	 * t_jbdcryj 对象
	 * @returns {JingBRYJ}
	 */
	JingBRYJ = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	JingBRYJ.prototype = {
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
						url :  __ctx+'/loanp/DaiKSSCSP/jingBRYJ/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','借款申请人',' 授信金额','授信期限','担保方式',' 贷款类型','贷款金额','贷款期限','月利率','归还方式','借贷Id','经办调查人Id','经办人签字','经办人签字时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'jksqr',
				                	   index: 'jksqr'

				                	 					                	 	}, {
				                 	   name:'sxje',
				                	   index: 'sxje'

				                	 					                	 	}, {
				                 	   name:'sxqx',
				                	   index: 'sxqx'

				                	 					                	 	}, {
				                 	   name:'dbfs',
				                	   index: 'dbfs'
				                	                                          	}, {
				                 	   name:'dklx',
				                	   index: 'dklx'
				                	                                           	}, {
				                 	   name:'dkje',
				                	   index: 'dkje'

				                	 					                	 	}, {
				                 	   name:'dkqx',
				                	   index: 'dkqx'

				                	 					                	 	}, {
				                 	   name:'yll',
				                	   index: 'yll'

				                	 					                	 	}, {
				                 	   name:'ghfs',
				                	   index: 'ghfs'
				                	                                         	}, {
				                 	   name:'jdid',
				                	   index: 'jdId'

				                	 					                	 	}, {
				                 	   name:'jbdcrid',
				                	   index: 'jbdcrId'

				                	 					                	 	}, {
				                 	   name:'jbrqz',
				                	   index: 'jbrqz'

				                	 					                	 	}, {
				                 	   name:'jbrqzsj',
				                	   index: 'jbrqzsj'
				                	 	,formatter: 'timestamp'
				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/DaiKSSCSP/jingBRYJ/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/DaiKSSCSP/jingBRYJ/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/DaiKSSCSP/jingBRYJ/get.htm?id={id}'
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
							window.location.href = __ctx+'/xinDai/liucheng/xinDaiLiuCheng/role.htm?jdid='+msg.getMessage().split("@")[1];
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


