
/**
 * t_pydwb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 14:51:08
 *</pre>
 */
$(function() {
	dingWei  = new DingWei();
	dingWei.init();
	
	formUrl = dingWei.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#dingWeiGrid",// 列表对象
			PAGER : "#dingWeiPager",// 列表分页
			FORM : '#dingWeiForm',// 表单form
			FORMGET : '#dingWeiFormGet'// 表单form
	};
	/**
	 * t_pydwb 对象
	 * @returns {DingWei}
	 */
	DingWei = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DingWei.prototype = {
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
						url :  __ctx+'/pg/Location/dingWei/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','办学定位','专业定位','学科支撑','社会需求','方案ID','方案名称','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'banXueDingWei',
				                	   index: 'ban_xue_ding_wei_'

				                	 					                	 	}, {
				                 	   name:'zhuanYeDingWei',
				                	   index: 'zhuan_ye_ding_wei_'

				                	 					                	 	}, {
				                 	   name:'xueKeZhiCheng',
				                	   index: 'xue_ke_zhi_cheng_'

				                	 					                	 	}, {
				                 	   name:'sheHuiXuQiu',
				                	   index: 'she_hui_xu_qiu_'

				                	 					                	 	}, {
				                 	   name:'fangAnID',
				                	   index: 'fang_an_i_d_'

				                	 					                	 	}, {
				                 	   name:'fangMingCheng',
				                	   index: 'fang_ming_cheng_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/Location/dingWei/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/Location/dingWei/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/Location/dingWei/get.htm?id={id}'
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
							window.location.href = __ctx+'/pg/Location/dingWei/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


