
/**
 * t_p_khhlxpj
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-21 16:01:36
 *</pre>
 */
$(function() {
	evaluate  = new Evaluate();
	evaluate.init();
	
	formUrl = evaluate.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#evaluateGrid",// 列表对象
			PAGER : "#evaluatePager",// 列表分页
			FORM : '#evaluateForm',// 表单form
			FORMGET : '#evaluateFormGet'// 表单form
	};
	/**
	 * t_p_khhlxpj 对象
	 * @returns {Evaluate}
	 */
	Evaluate = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Evaluate.prototype = {
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
						url :  __ctx+'/pg/PGData/evaluate/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','课程ID','教师','形式','比例1','比例2','比例3','合理性判定','其他','判定结果','弱项','负责人','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'crs_id',
				                	   index: 'crs_id'

				                	 					                	 	}, {
				                 	   name:'teacher',
				                	   index: 'teacher'

				                	 					                	 	}, {
				                 	   name:'forms',
				                	   index: 'forms'

				                	 					                	 	}, {
				                 	   name:'proportion1',
				                	   index: 'proportion1'

				                	 					                	 	}, {
				                 	   name:'proportion2',
				                	   index: 'proportion2'

				                	 					                	 	}, {
				                 	   name:'proportion3',
				                	   index: 'proportion3'

				                	 					                	 	}, {
				                 	   name:'decide',
				                	   index: 'decide'

				                	 					                	 	}, {
				                 	   name:'other',
				                	   index: 'other'

				                	 					                	 	}, {
				                 	   name:'result',
				                	   index: 'result'

				                	 					                	 	}, {
				                 	   name:'ws',
				                	   index: 'ws'

				                	 					                	 	}, {
				                 	   name:'principle',
				                	   index: 'principle'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/evaluate/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/evaluate/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/evaluate/get.htm?id={id}'
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
							window.location.href = __ctx+'/pg/PGData/evaluate/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


