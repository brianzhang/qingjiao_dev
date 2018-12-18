
/**
 * t_xb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 16:05:58
 *</pre>
 */
$(function() {
	xiaoBan  = new XiaoBan();
	xiaoBan.init();
	
	formUrl = xiaoBan.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#xiaoBanGrid",// 列表对象
			PAGER : "#xiaoBanPager",// 列表分页
			FORM : '#xiaoBanForm',// 表单form
			FORMGET : '#xiaoBanFormGet'// 表单form
	};
	/**
	 * t_xb 对象
	 * @returns {XiaoBan}
	 */
	XiaoBan = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	XiaoBan.prototype = {
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
						url :  __ctx+'/lyzygl/XiaoBan/xiaoBan/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['id_','idd','林班号','小班号','二级林种','二级林种1','二级林种2','地类','地类1','地权','林权','起源','面积','株数','蓄积','龄组','林分类型','树种组成','郁闭度','经营措施','龄级','林龄','胸径','树高','地权使用权','林权使用权','工程类别','土壤','自然度','备注','群落结构','立地类型','优势木平均高','地貌','枯倒木蓄积量','主要下木','下木盖度','主要地被物','地被物盖度','坡向','坡位','坡度','A1层厚度','海拔','疏密度','抚育采伐年度','造林更新年度','公顷株数','公顷蓄积','公顷初植密度','人工林保存率','平均木单株材积','散生木株数','散生木蓄积','散生木平均胸径','导入校验','导入校验提示1','导入校验提示2','导入校验提示3','树种组成排序','GPS横坐标','GPS纵坐标','土壤Ab层厚度','生长率','枯损量','生长量','非正常消耗量','单位编号','散生木生长率','管护费亩标准','林下收入分成亩标准','性质年度','管护造林面积','管护抚育面积','可及度','地位级','事权','工程性质','保护等级','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'idd',
				                	   index: 'idd'
				                	   
				                	 					                	 	}, {
				                 	   name:'lbh',
				                	   index: 'lbh'

				                	 					                	 	}, {
				                 	   name:'xbh',
				                	   index: 'xbh'

				                	 					                	 	}, {
				                 	   name:'ejlz',
				                	   index: 'ejlz',hidden:true

				                	 					                	 	}, {
				                 	   name:'ejlz1',
				                	   index: 'ejlz1',hidden:true

				                	 					                	 	}, {
				                 	   name:'ejlz2',
				                	   index: 'ejlz2',hidden:true

				                	 					                	 	}, {
				                 	   name:'dl',
				                	   index: 'dl',hidden:true

				                	 					                	 	}, {
				                 	   name:'dl1',
				                	   index: 'dl1',hidden:true

				                	 					                	 	}, {
				                 	   name:'dq',
				                	   index: 'dq',hidden:true

				                	 					                	 	}, {
				                 	   name:'lq',
				                	   index: 'lq',hidden:true

				                	 					                	 	}, {
				                 	   name:'qy',
				                	   index: 'qy',hidden:true

				                	 					                	 	}, {
				                 	   name:'mj',
				                	   index: 'mj',hidden:true

				                	 					                	 	}, {
				                 	   name:'zs',
				                	   index: 'zs',hidden:true

				                	 					                	 	}, {
				                 	   name:'xj',
				                	   index: 'xj',hidden:true

				                	 					                	 	}, {
				                 	   name:'lz',
				                	   index: 'lz',hidden:true

				                	 					                	 	}, {
				                 	   name:'lflx',
				                	   index: 'lflx',hidden:true

				                	 					                	 	}, {
				                 	   name:'szzc',
				                	   index: 'szzc',hidden:true

				                	 					                	 	}, {
				                 	   name:'ybd',
				                	   index: 'ybd',hidden:true

				                	 					                	 	}, {
				                 	   name:'jycs',
				                	   index: 'jycs',hidden:true

				                	 					                	 	}, {
				                 	   name:'lj',
				                	   index: 'lj',hidden:true

				                	 					                	 	}, {
				                 	   name:'ll',
				                	   index: 'll',hidden:true

				                	 					                	 	}, {
				                 	   name:'xiongjing',
				                	   index: 'xiongjing',hidden:true

				                	 					                	 	}, {
				                 	   name:'sg',
				                	   index: 'sg',hidden:true

				                	 					                	 	}, {
				                 	   name:'dqsyq',
				                	   index: 'dqsyq',hidden:true

				                	 					                	 	}, {
				                 	   name:'lqsyq',
				                	   index: 'lqsyq',hidden:true

				                	 					                	 	}, {
				                 	   name:'gclb',
				                	   index: 'gclb',hidden:true

				                	 					                	 	}, {
				                 	   name:'tr',
				                	   index: 'tr',hidden:true

				                	 					                	 	}, {
				                 	   name:'zrd',
				                	   index: 'zrd',hidden:true

				                	 					                	 	}, {
				                 	   name:'bz',
				                	   index: 'bz',hidden:true

				                	 					                	 	}, {
				                 	   name:'qljg',
				                	   index: 'qljg',hidden:true

				                	 					                	 	}, {
				                 	   name:'ldlx',
				                	   index: 'ldlx',hidden:true

				                	 					                	 	}, {
				                 	   name:'ysspjg',
				                	   index: 'ysspjg',hidden:true

				                	 					                	 	}, {
				                 	   name:'dm',
				                	   index: 'dm',hidden:true

				                	 					                	 	}, {
				                 	   name:'kdmxjl',
				                	   index: 'kdmxjl',hidden:true

				                	 					                	 	}, {
				                 	   name:'zyxm',
				                	   index: 'zyxm',hidden:true

				                	 					                	 	}, {
				                 	   name:'xmgd',
				                	   index: 'xmgd',hidden:true

				                	 					                	 	}, {
				                 	   name:'zydbw',
				                	   index: 'zydbw',hidden:true

				                	 					                	 	}, {
				                 	   name:'dbwgd',
				                	   index: 'dbwgd',hidden:true

				                	 					                	 	}, {
				                 	   name:'px',
				                	   index: 'px',hidden:true

				                	 					                	 	}, {
				                 	   name:'pw',
				                	   index: 'pw',hidden:true

				                	 					                	 	}, {
				                 	   name:'pd',
				                	   index: 'pd',hidden:true

				                	 					                	 	}, {
				                 	   name:'a1chd',
				                	   index: 'a1chd',hidden:true

				                	 					                	 	}, {
				                 	   name:'hb',
				                	   index: 'hb',hidden:true

				                	 					                	 	}, {
				                 	   name:'smd',
				                	   index: 'smd',hidden:true

				                	 					                	 	}, {
				                 	   name:'fycfnd',
				                	   index: 'fycfnd',hidden:true

				                	 					                	 	}, {
				                 	   name:'zlgxnd',
				                	   index: 'zlgxnd',hidden:true

				                	 					                	 	}, {
				                 	   name:'gqzs',
				                	   index: 'gqzs',hidden:true

				                	 					                	 	}, {
				                 	   name:'gqxj',
				                	   index: 'gqxj',hidden:true

				                	 					                	 	}, {
				                 	   name:'gqczmd',
				                	   index: 'gqczmd',hidden:true

				                	 					                	 	}, {
				                 	   name:'rglbcl',
				                	   index: 'rglbcl',hidden:true

				                	 					                	 	}, {
				                 	   name:'pjmdzcj',
				                	   index: 'pjmdzcj',hidden:true

				                	 					                	 	}, {
				                 	   name:'ssmzs',
				                	   index: 'ssmzs',hidden:true

				                	 					                	 	}, {
				                 	   name:'ssmxj',
				                	   index: 'ssmxj',hidden:true

				                	 					                	 	}, {
				                 	   name:'ssmpjxj',
				                	   index: 'ssmpjxj',hidden:true

				                	 					                	 	}, {
				                 	   name:'drjy',
				                	   index: 'drjy',hidden:true

				                	 					                	 	}, {
				                 	   name:'drjyts1',
				                	   index: 'drjyts1',hidden:true

				                	 					                	 	}, {
				                 	   name:'drjyts2',
				                	   index: 'drjyts2',hidden:true

				                	 					                	 	}, {
				                 	   name:'drjyts3',
				                	   index: 'drjyts3',hidden:true

				                	 					                	 	}, {
				                 	   name:'szzcpx',
				                	   index: 'szzcpx',hidden:true

				                	 					                	 	}, {
				                 	   name:'gpshzb',
				                	   index: 'gpshzb',hidden:true

				                	 					                	 	}, {
				                 	   name:'gpszzb',
				                	   index: 'gpszzb',hidden:true

				                	 					                	 	}, {
				                 	   name:'trabchd',
				                	   index: 'trabchd',hidden:true

				                	 					                	 	}, {
				                 	   name:'szl',
				                	   index: 'szl',hidden:true

				                	 					                	 	}, {
				                 	   name:'ksl',
				                	   index: 'ksl',hidden:true

				                	 					                	 	}, {
				                 	   name:'szliang',
				                	   index: 'szliang',hidden:true

				                	 					                	 	}, {
				                 	   name:'fzcxhl',
				                	   index: 'fzcxhl',hidden:true

				                	 					                	 	}, {
				                 	   name:'dwbh',
				                	   index: 'dwbh',hidden:true

				                	 					                	 	}, {
				                 	   name:'ssmszl',
				                	   index: 'ssmszl',hidden:true

				                	 					                	 	}, {
				                 	   name:'ghfmbz',
				                	   index: 'ghfmbz',hidden:true

				                	 					                	 	}, {
				                 	   name:'lxsrfcmbz',
				                	   index: 'lxsrfcmbz',hidden:true

				                	 					                	 	}, {
				                 	   name:'xznd',
				                	   index: 'xznd',hidden:true

				                	 					                	 	}, {
				                 	   name:'ghzlmj',
				                	   index: 'ghzlmj',hidden:true

				                	 					                	 	}, {
				                 	   name:'ghfymj',
				                	   index: 'ghfymj',hidden:true

				                	 					                	 	}, {
				                 	   name:'kjd',
				                	   index: 'kjd',hidden:true

				                	 					                	 	}, {
				                 	   name:'dwj',
				                	   index: 'dwj',hidden:true

				                	 					                	 	}, {
				                 	   name:'sq',
				                	   index: 'sq',hidden:true

				                	 					                	 	}, {
				                 	   name:'gcxz',
				                	   index: 'gcxz',hidden:true

				                	 					                	 	}, {
				                 	   name:'bhdj',
				                	   index: 'bhdj',hidden:true

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/lyzygl/XiaoBan/xiaoBan/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/lyzygl/XiaoBan/xiaoBan/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/lyzygl/XiaoBan/xiaoBan/get.htm?id={id}'
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
							window.location.href = __ctx+'/lyzygl/XiaoBan/xiaoBan/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


