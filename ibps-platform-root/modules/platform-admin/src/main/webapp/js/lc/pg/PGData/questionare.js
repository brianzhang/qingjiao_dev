
/**
 * t_dcwj
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 10:38:45
 *</pre>
 */
$(function() {
	questionare  = new Questionare();
	questionare.init();
	
	formUrl = questionare.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#questionareGrid",// 列表对象
			PAGER : "#questionarePager",// 列表分页
			FORM : '#questionareForm',// 表单form
			FORMGET : '#questionareFormGet'// 表单form
	};
	/**
	 * t_dcwj 对象
	 * @returns {Questionare}
	 */
	Questionare = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Questionare.prototype = {
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
						url :  __ctx+'/pg/PGData/questionare/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','问卷号','问卷种类','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, 
//				                	 	{
//				                 	   name:'createTime',
//				                	   index: 'create_time_'
//				                	 	,formatter: 'timestamp'
//				                	 					                	 	},
				                	 					                	 	{
				                 	   name:'ques_id',
				                	   index: 'ques_id'

				                	 					                	 	}, {
				                 	   name:'ques_kind',
				                	   index: 'ques_kind'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[
										{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/questionare/edit.htm?id={id}'
									},
									{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/questionare/remove.htm?id={id}'
									},{
										label:'选择调查对象',
										classes:'btn btn-primary fa fa-select',
										action:__ctx+'/platform/org/partyEmployee/list2.htm?ques_kind={ques_kind}'
									},
									
//									{
//										label:'问卷分配',
//										classes:'btn btn-primary fa fa-detail',
//										action: __ctx+'/gradp/course/crsJob/list.htm?crsTchId=2014liuxibysj&crsName=2014%E7%BA%A7%E6%AF%95%E4%B8%9A%E8%AE%BE%E8%AE%A1'
//									}, 
//									{
//										label : '调查问卷详情',
//										classes : 'btn btn-primary fa fa-detail',
//										action : 'javascript:questionare.xiangqing("{ques_kind}")',
//									} 
									]
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
				// office提交
        		OfficePlugin.submit();
				me.formUrl.submit(me._showResponse);
			});
		},
		xiangqing : function(ques_kind) {
			DialogUtil.dialog({
				title : '调查问卷详情',
//				content : __ctx + '/pg/PGData/wjDemo/list2.htm?ques_kind=' + ques_kind,
				content : __ctx + '/pg/PGData/dcwjxj/list.htm?ques_kind=' + ques_kind,
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
							window.location.href = __ctx+'/pg/PGData/questionare/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


