
/**
 * t_bzr_all
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 18:49:52
 *</pre>
 */
$(function() {
	baoZhengRenAll  = new BaoZhengRenAll();
	baoZhengRenAll.init();
	
	formUrl = baoZhengRenAll.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#baoZhengRenAllGrid",// 列表对象
			PAGER : "#baoZhengRenAllPager",// 列表分页
			FORM : '#baoZhengRenAllForm'// 表单form
	};
	/**
	 * t_bzr_all 对象
	 * @returns {BaoZhengRenAll}
	 */
	BaoZhengRenAll = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BaoZhengRenAll.prototype = {
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
						url :  __ctx+'/loanp/bzrAll/baoZhengRenAll/listJson.htm?jdid=${jdid}',
						pager :this.consts.PAGER,
						colNames: ['主键','担保类别','名称','证件类型','证件号码','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'dblb',
				                	   index: 'dblb'                      }, {
				                		   
				                		   
				                 	   name:'mc',
				                	   index: 'mc'

				                	 					                	 	}, {
				                 	   name:'zjlx',
				                	   index: 'zjlx'

				                	 					                	 	}, {
				                 	   name:'zjhm',
				                	   index: 'zjhm'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'填写',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/baoZhengRen/bZRXXB/edit.htm?id={id}&jdid={jdid}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/baoZhengRen/bZRXXB/get.htm?id={id}&jdid={jdid}'
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


