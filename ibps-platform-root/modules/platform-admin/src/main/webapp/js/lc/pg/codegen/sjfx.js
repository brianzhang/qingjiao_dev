
/**
 * 学院试卷分析报告
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-30 09:34:54
 *</pre>
 */
$(function() {
	sjfx  = new Sjfx();
	sjfx.init();
	
	formUrl = sjfx.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#sjfxGrid",// 列表对象
			PAGER : "#sjfxPager",// 列表分页
			FORM : '#sjfxForm',// 表单form
			FORMGET : '#sjfxFormGet'// 表单form
	};
	/**
	 * 学院试卷分析报告 对象
	 * @returns {Sjfx}
	 */
	Sjfx = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Sjfx.prototype = {
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
						url :  __ctx+'/pg/codegen/sjfx/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','课程名称','课程编号','课程性质','学分','任课教师','班级名称','考核形式','考试日期','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'keChengMingChen',
				                	   index: 'ke_cheng_ming_chen'

				                	 					                	 	}, {
				                 	   name:'keChengDaiMa',
				                	   index: 'ke_cheng_dai_ma_'

				                	 					                	 	}, {
				                 	   name:'keChengXingZhi',
				                	   index: 'ke_cheng_xing_zhi_'

				                	 					                	 	}, {
				                 	   name:'xueFen',
				                	   index: 'xue_fen_'

				                	 					                	 	}, {
				                 	   name:'renKeJiaoShi',
				                	   index: 'ren_ke_jiao_shi_'

				                	 					                	 	}, {
				                 	   name:'banJiMingCheng',
				                	   index: 'ban_ji_ming_cheng_'

				                	 					                	 	}, {
				                 	   name:'kaoHuXingShi',
				                	   index: 'kao_hu_xing_shi_'

				                	 					                	 	}, {
				                 	   name:'kaoShiRiQi',
				                	   index: 'kao_shi_ri_qi_'

				                	 					                	 	}, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/codegen/sjfx/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/codegen/sjfx/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/codegen/sjfx/get.htm?id={id}'
									},{
										label:'查看表单',
										classes:'btn btn-primary fa fa-detail',
										//action: __ctx+'/platform/report/raqsoft/showReport.htm?reportId=430683996427386880'
										//action : 'javascript:sjfx.message()'
										action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=430683996427386880&cname1=id&cval1={id}'
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
		message : function() {
			DialogUtil.dialog({
				title : '课程大纲',
				content :__ctx+'/platform/report/raqsoft/showReport.htm?reportId=430683996427386880',
				//content : __ctx + '/platform/report/raqsoft/preview.htm?reportId=403863483222851584&crs_num='+crsNum,
				index : 'edit',
				area : [ '70%', '90%' ],
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
							window.location.href = __ctx+'/pg/codegen/sjfx/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


