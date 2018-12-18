
/**
 * t_p_pjdx
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:55:18
 *</pre>
 */
$(function() {
	pJObject  = new PJObject();
	pJObject.init();
	
	formUrl = pJObject.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#pJObjectGrid",// 列表对象
			PAGER : "#pJObjectPager",// 列表分页
			FORM : '#pJObjectForm',// 表单form
			FORMGET : '#pJObjectFormGet'// 表单form
	};
	/**
	 * t_p_pjdx 对象
	 * @returns {PJObject}
	 */
	PJObject = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PJObject.prototype = {
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
						url :  __ctx+'/pg/PGData/pJObject/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','学号','姓名','班级','期末试卷1','期末试卷2','期末试卷3','期末试卷4','实验','专题报告','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'school_number',
				                	   index: 'school_number'

				                	 					                	 	}, {
				                 	   name:'std_name',
				                	   index: 'std_name'

				                	 					                	 	}, {
				                 	   name:'classnum',
				                	   index: 'class'

				                	 					                	 	}, {
				                 	   name:'final_paper1',
				                	   index: 'final_paper1'

				                	 					                	 	}, {
				                	 	name:'final_paper2',
				                	 	index: 'final_paper2'

				                	 						                	},{
				                	 name:'final_paper3',
				                	 index: 'final_paper3'

				                	 						                	}, {
				                	 name:'final_paper4',
				                	 index: 'final_paper4'

				                	 						                	},{
				                 	   name:'experiment',
				                	   index: 'experiment'

				                	 					                	 	}, {
				                 	   name:'subject_present',
				                	   index: 'subject_present'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/pJObject/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/pJObject/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/pJObject/get.htm?id={id}'
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
							window.location.href = __ctx+'/pg/PGData/pJObject/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


