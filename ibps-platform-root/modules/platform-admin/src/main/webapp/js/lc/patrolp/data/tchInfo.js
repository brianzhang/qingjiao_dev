
/**
 * t_tch_inf
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:49:19
 *</pre>
 */
$(function() {
	tchInfo  = new TchInfo();
	tchInfo.init();
	
	formUrl = tchInfo.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#tchInfoGrid",// 列表对象
			PAGER : "#tchInfoPager",// 列表分页
			FORM : '#tchInfoForm',// 表单form
			FORMGET : '#tchInfoFormGet'// 表单form
	};
	/**
	 * t_tch_inf 对象
	 * @returns {TchInfo}
	 */
	TchInfo = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	TchInfo.prototype = {
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
				this._bindExportBtns();
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
		
		_bindExportBtns : function(){
			var me = this;
			$(document).on('click', 'a.fa-export', function () {
            	var ids = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
//            	alert(ids);
            	if (ids == null || ids.length == 0) {
            		DialogUtil.toastr('请选择数据！');
            		return;
            	}

            	var url = __ctx + "/patrolp/data/tchInfo/exportSchedule.htm?id="+ids ;
            	$('a.fa-export').attr('href',url);
//            	alert("导出教师课表");
//            	 $.post(url, {'id': ids.join(',')}) 	
            });
		},
		
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/patrolp/data/tchInfo/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键',
							'<div style="text-align:center;">教师姓名</div>',
							'<div style="text-align:center;">教师工号</div>',
							'<div style="text-align:center;">科目</div>',
							'<div style="text-align:center;">管理</div>'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	},{
				                 	   name:'tchName',
				                	   index: 'tch_name_',
				                	   align:'center'

				                	 					                	 	}, {
				                 	   name:'tchNum',
				                	   index: 'tch_num_',
				                	   align:'center'

				                	 					                	 	}, {
				                 	   name:'subject',
				                	   index: 'subject_',
				                	   align:'center'

				                	 					                	 	},  {
									name : '__manage',
									align:'center',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									align:'center',
									formatoptions :[{
										label:'查看课表',										
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/patrolp/data/tchInfo/lookteacher.htm?id={id}'
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
							window.location.href = __ctx+'/patrolp/data/tchInfo/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


