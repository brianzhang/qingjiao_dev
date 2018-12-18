
/**
 * t_byyq
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 14:51:47
 *</pre>
 */
$(function() {
	byyq  = new Byyq();
	byyq.init();
	
	formUrl = byyq.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#byyqGrid",// 列表对象
			PAGER : "#byyqPager",// 列表分页
			FORM : '#byyqForm',// 表单form
			FORMGET : '#byyqFormGet'// 表单form
	};
	/**
	 * t_byyq 对象
	 * @returns {Byyq}
	 */
	Byyq = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Byyq.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				
			}
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
				this._initOffice('e');
			}
			if ($(this.consts.FORMGET).length > 0){// 明细页面office控件初始化
				this._initOffice('r');
			}
		},
		_initOffice : function(_rights){
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url : __ctx+ '/pg/Byyq/byyq/listJson.htm?majorId='+majorId,
						pager : this.consts.PAGER,
						colNames : [ '主键','专业id','条款',
								'需求标题', '要求内容', '管理' ],
						colModel : [
								{
									name : 'id',
									index : 'id_',
									hidden : true,
									key : true
								},
								{
									name : 'pro_id',
									index : 'pro_id',
									hidden : true
								},
								{
									name : 'num',
									index : 'num',
									width:10,
									
								},
								{
									width:20,
									name : 'demand_title',
									index : 'demand_title'

								},
								{
									name : 'content',
									index : 'content'

								},
								{
									name : '__manage',
									width : 25,
									align : 'center',
									sortable : false,
									classes : 'rowOps',
									formatter : 'manage',
									formatoptions : [
											{
												label : '详细要求',
												classes : 'btn btn-primary fa fa-detail',
												action :'javascript:byyq.demand("{id}","{pro_id}")',
											},
											
													{
												label : '评价与过程',
												classes : 'btn btn-primary fa fa-detail',
												//action :'javascript:byyq.demand2("{id}")',
												//action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=403656672561594368&cname1=id&cval1={id}'
												action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=403656672561594368&cname1=id_&cval1={id}'
											}
											]
								} ],
						loadComplete : function() {
							try {
								$('.rowOps').each(function() {
									$(this).rowOps({
										showNum : 2
									});
								});
							} catch (e) {
							}
						}
	
					});
		},
		demand : function(id, pro_id) {
		
			DialogUtil.dialog({
				title : '指标点',
				content :  __ctx+ '/pg/Zbd/zbd/list.htm?id='+id+'&major='+major+'&majorId='+pro_id,
				index : 'edit',
				area : [ '80%', '80%' ],
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b);
					}
				} ]
			});
		},
		demand2 : function(id) {
			
			DialogUtil.dialog({
				title : '评价与过程',
				content : __ctx+'/platform/report/raqsoft/preview2.htm?reportId=403656672561594368&cname1=id&cval1'+id,
				index : 'edit',
				area : [ '80%', '80%' ],
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b);
					}
				} ]
			});
		},
		
		
		
		
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			
			var me = this, form = $(this.consts.FORM), frm = form.form();
		
		
			me.formUrl = new com.lc.form.FormData(form);
//			console.log(form);
//			console.log(frm);
//			console.log(me.formUrl);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				
				// office提交
        		OfficePlugin.submit();
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
							window.location.href = __ctx+'/pg/Byyq/byyq/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


