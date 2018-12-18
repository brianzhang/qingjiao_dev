
/**
 * t_dwgk
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 15:09:26
 *</pre>
 */
$(function() {
	danWeiGK  = new DanWeiGK();
	danWeiGK.init();
	
	formUrl = danWeiGK.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#danWeiGKGrid",// 列表对象
			PAGER : "#danWeiGKPager",// 列表分页
			FORM : '#danWeiGKForm',// 表单form
			FORMGET : '#danWeiGKFormGet'// 表单form
	};
	/**
	 * t_dwgk 对象
	 * @returns {DanWeiGK}
	 */
	DanWeiGK = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DanWeiGK.prototype = {
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
						url :  __ctx+'/lyzygl/DanWeiGK/danWeiGK/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','单位名称','土地总面积','经度','纬度','地处山系','地处水系','地处平原','平均海拔','平均气温','年积温','日照时数','主要土壤','植物种类','二类调查年度','录入年度','自然枯损率','综合生长率','林分类型','龄组','生长率','林地','林木','面积1','蓄积1','面积2','蓄积2','平均降水量','无霜期','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 		,hidden:true
				                	 					                	 	}, {
				                 	   name:'mingChen',
				                	   index: 'ming_chen_'

				                	 					                	 	}, {
				                 	   name:'mianJi',
				                	   index: 'mian_ji_'

				                	 					                	 	}, {
				                 	   name:'jingDu',
				                	   index: 'jing_du_'

				                	 					                	 	}, {
				                 	   name:'weiDuo',
				                	   index: 'wei_duo_'

				                	 					                	 	}, {
				                 	   name:'shanXi',
				                	   index: 'shan_xi_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'shuiXi',
				                	   index: 'shui_xi_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'pingYuan',
				                	   index: 'ping_yuan_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'haiBa',
				                	   index: 'hai_ba_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'qiWen',
				                	   index: 'qi_wen_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'nianJiWen',
				                	   index: 'nian_ji_wen_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'riZhaoShiShuo',
				                	   index: 'ri_zhao_shi_shuo_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'zhuYaoTuRang',
				                	   index: 'zhu_yao_tu_rang_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'zhiWuChongLei',
				                	   index: 'zhi_wu_chong_lei_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'tiaoZhaNianDuo',
				                	   index: 'tiao_zha_nian_duo_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'luRuNianDu',
				                	   index: 'lu_ru_nian_du_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'kuSunShuai',
				                	   index: 'ku_sun_shuai_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'shengChangLu',
				                	   index: 'sheng_chang_lu_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'linFenLeiXing',
				                	   index: 'lin_fen_lei_xing_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'lingZu',
				                	   index: 'ling_zu_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'shengZhangLu',
				                	   index: 'sheng_zhang_lu_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'linDe',
				                	   index: 'lin_de_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'linMu',
				                	   index: 'lin_mu_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'mianJi1',
				                	   index: 'mian_ji1_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'xuJi1',
				                	   index: 'xu_ji1_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'mianJi2',
				                	   index: 'mian_ji2_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'xuJi2',
				                	   index: 'xu_ji2_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'pingJun',
				                	   index: 'ping_jun_'
				                		   ,hidden:true

				                	 					                	 	}, {
				                 	   name:'wuShuangQi',
				                	   index: 'wu_shuang_qi_'
				                		   ,hidden:true

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/lyzygl/DanWeiGK/danWeiGK/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/lyzygl/DanWeiGK/danWeiGK/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/lyzygl/DanWeiGK/danWeiGK/get.htm?id={id}'
									},{
										label:'生长率',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/lyzygl/Shengzhanglv/shangzhanglv/list.htm?DWGKid={id}'
									},{
										label:'修正值',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/lyzygl/Xiuzheng/xiuzheng/list.htm?DWGKid={id}'
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
							window.location.href = __ctx+'/lyzygl/DanWeiGK/danWeiGK/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


