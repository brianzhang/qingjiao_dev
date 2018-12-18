
/**
 * t_schoolboy
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 12:03:02
 *</pre>
 */
$(function() {
	schoolBoy  = new SchoolBoy();
	schoolBoy.init();
	
	formUrl = schoolBoy.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#schoolBoyGrid",// 列表对象
			PAGER : "#schoolBoyPager",// 列表分页
			FORM : '#schoolBoyForm',// 表单form
			FORMGET : '#schoolBoyFormGet'// 表单form
	};
	/**
	 * t_schoolboy 对象
	 * @returns {SchoolBoy}
	 */
	SchoolBoy = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	SchoolBoy.prototype = {
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
						url :  __ctx+'/patrolp/schoolboy/schoolBoy/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','姓名','入学时间','毕业时间','班级职务','班主任','高中','大学','工作单位','个人在校照片','近照','毕业照','个人荣誉','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'xing_ming_'

				                	 					                	 	}, {
				                 	   name:'startTime',
				                	   index: 'ru_xue_shi_jian_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'finishTime',
				                	   index: 'bi_ye_shi_jian_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'classJob',
				                	   index: 'ban_ji_zhi_wu_'

				                	 					                	 	}, {
				                 	   name:'teacher',
				                	   index: 'ban_zhu_ren_'

				                	 					                	 	}, {
				                 	   name:'highSchool',
				                	   index: 'gao_zhong_'

				                	 					                	 	}, {
				                 	   name:'daXue',
				                	   index: 'da_xue_'

				                	 					                	 	}, {
				                 	   name:'job',
				                	   index: 'gong_zuo_dan_wei_'

				                	 					                	 	}, {
				                 	   name:'atSchool',
				                	   index: 'ge_ren_zai_xiao_'

				                	 					                	 	}, {
				                 	   name:'jinZhao',
				                	   index: 'jin_zhao_'

				                	 					                	 	}, {
				                 	   name:'biYeZhao',
				                	   index: 'bi_ye_zhao_'

				                	 					                	 	}, {
				                 	   name:'geRenRongYu',
				                	   index: 'ge_ren_rong_yu_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/patrolp/schoolboy/schoolBoy/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/patrolp/schoolboy/schoolBoy/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/patrolp/schoolboy/schoolBoy/get.htm?id={id}'
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
							window.location.href = __ctx+'/patrolp/schoolboy/schoolBoy/edit.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


