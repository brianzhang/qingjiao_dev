
/**
 * t_p_jbyqb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:18:42
 *</pre>
 */
$(function() {
	basicRequirements  = new BasicRequirements();
	basicRequirements.init();
	
	formUrl = basicRequirements.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#basicRequirementsGrid",// 列表对象
			PAGER : "#basicRequirementsPager",// 列表分页
			FORM : '#basicRequirementsForm',// 表单form
			FORMGET : '#basicRequirementsFormGet'// 表单form
	};
	/**
	 * t_p_jbyqb 对象
	 * @returns {BasicRequirements}
	 */
	BasicRequirements = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BasicRequirements.prototype = {
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
						url :  __ctx+'/pg/PGData/basicRequirements/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','难度1','分值1','难度2','分值2','测试','分值3','考勤','预习','操作','实验报告','分值4','PPT','文件','答辩','分值5','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'difficulty1',
				                	   index: 'difficulty1'

				                	 					                	 	}, {
				                 	   name:'score1',
				                	   index: 'score1'

				                	 					                	 	}, {
				                 	   name:'difficulty2',
				                	   index: 'difficulty2'

				                	 					                	 	}, {
				                 	   name:'score2',
				                	   index: 'score2'

				                	 					                	 	}, {
				                 	   name:'test',
				                	   index: 'test'

				                	 					                	 	}, {
				                 	   name:'score3',
				                	   index: 'score3'

				                	 					                	 	}, {
				                 	   name:'attendance',
				                	   index: 'attendance'

				                	 					                	 	}, {
				                 	   name:'prepare',
				                	   index: 'prepare'

				                	 					                	 	}, {
				                 	   name:'operate',
				                	   index: 'operate'

				                	 					                	 	}, {
				                 	   name:'report',
				                	   index: 'report'

				                	 					                	 	}, {
				                 	   name:'score4',
				                	   index: 'score4'

				                	 					                	 	}, {
				                 	   name:'ppt',
				                	   index: 'ppt'

				                	 					                	 	}, {
				                 	   name:'document',
				                	   index: 'document'

				                	 					                	 	}, {
				                 	   name:'presentation',
				                	   index: 'presentation'

				                	 					                	 	}, {
				                 	   name:'score5',
				                	   index: 'score5'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/basicRequirements/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/basicRequirements/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/basicRequirements/get.htm?id={id}'
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
							window.location.href = __ctx+'/pg/PGData/basicRequirements/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


