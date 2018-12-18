
/**
 * t_zdcryj
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:46
 *</pre>
 */

    
$(function() {
	$("input[name='diaochafangshi']").change(function(){
        var result="";
        $("input[name='diaochafangshi']:checked").each(function(){
               result+=$(this).val()+',';
        });
        if(result!=""){
              result=result.substring(0,result.lastIndexOf(',')); 
        }
        $("#qita").val(result);    
    });
	$("input[name='heshidanbaowu']").change(function(){
        var result="";
        $("input[name='heshidanbaowu']:checked").each(function(){
               result+=$(this).val()+',';
        });
        if(result!=""){
              result=result.substring(0,result.lastIndexOf(',')); 
        }
        $("#qita2").val(result);    
    });
	
	zhuDCRYJ  = new ZhuDCRYJ();
	zhuDCRYJ.init();
	
	formUrl = zhuDCRYJ.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#zhuDCRYJGrid",// 列表对象
			PAGER : "#zhuDCRYJPager",// 列表分页
			FORM : '#zhuDCRYJForm'// 表单form
	};
	/**
	 * t_zdcryj 对象
	 * @returns {ZhuDCRYJ}
	 */
	ZhuDCRYJ = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ZhuDCRYJ.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/loanp/DaiKSSCSP/zhuDCRYJ/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','借款人名称','借款人信用等级/得分','抵押物现值','质押物现值','信用系统查询时间','信贷系统管理系统查询','人民银行个人征信数据库查询','贷前调查方式','资料齐备真实','申请人住所已核实','申请人住所地址','申请人收入已核实','月均收入','借款人联系方式','借款人配偶联系方式','担保人联系方式','担保人配偶联系方式','共有人联系方式','核实担保物方式','担保人是否面签','贷款相关情况说明','风险预测','拟采取的风险控制措施','授信金额','授信期限','担保方式','贷款方式','贷款金额','贷款期限','月利率','归还方式','主调查人签名','主调查人签字时间','借贷Id','主调查人Id','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'jkrmc',
				                	   index: 'jkrmc'

				                	 					                	 	}, {
				                 	   name:'jkrxydj',
				                	   index: 'jkrxydj'

				                	 					                	 	}, {
				                 	   name:'dywxz',
				                	   index: 'dywxz'

				                	 					                	 	}, {
				                 	   name:'zywxz',
				                	   index: 'zywxz'

				                	 					                	 	}, {
				                 	   name:'xyxtcxsj',
				                	   index: 'xyxtcxsj'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'xdxtglxtcx',
				                	   index: 'xdxtglxtcx'

				                	 	}, {
				                 	   name:'rmyxgrzxsjkcx',
				                	   index: 'rmyxgrzxsjkcx'
				                	 	}, {
				                 	   name:'dqdcfs',
				                	   index: 'dqdcfs'
				                	 	}, {
				                 	   name:'zlqbzs',
				                	   index: 'zlqbzs'
				                	 	}, {
				                 	   name:'sqrzsyhs',
				                	   index: 'sqrzsyhs'
				                	 	}, {
				                 	   name:'sqrzsdz',
				                	   index: 'sqrzsdz'

				                	 					                	 	}, {
				                 	   name:'sqrsryhs',
				                	   index: 'sqrsryhs'
				                	 	}, {
				                 	   name:'yjsr',
				                	   index: 'yjsr'

				                	 					                	 	}, {
				                 	   name:'jkrlxfs',
				                	   index: 'jkrlxfs'

				                	 					                	 	}, {
				                 	   name:'jkrpolxfs',
				                	   index: 'jkrpolxfs'

				                	 					                	 	}, {
				                 	   name:'dbrlxfs',
				                	   index: 'dbrlxfs'

				                	 					                	 	}, {
				                 	   name:'dbrpolxfs',
				                	   index: 'dbrpolxfs'

				                	 					                	 	}, {
				                 	   name:'gyrlxfs',
				                	   index: 'gyrlxfs'

				                	 					                	 	}, {
				                 	   name:'hsdbwfs',
				                	   index: 'hsdbwfs'
				                	 	}, {
				                 	   name:'dbrsfmq',
				                	   index: 'dbrsfmq'
				                	 	}, {
				                 	   name:'dkxgqksm',
				                	   index: 'dkxgqksm'

				                	 					                	 	}, {
				                 	   name:'fxyc',
				                	   index: 'fxyc'

				                	 					                	 	}, {
				                 	   name:'ncqdfxkzcs',
				                	   index: 'ncqdfxkzcs'

				                	 					                	 	}, {
				                 	   name:'sxje',
				                	   index: 'sxje'

				                	 					                	 	}, {
				                 	   name:'sxqx',
				                	   index: 'sxqx'

				                	 					                	 	}, {
				                 	   name:'dbfs',
				                	   index: 'dbfs'
				                	 	}, {
				                 	   name:'dkfs',
				                	   index: 'dkfs'
				                	 	}, {
				                 	   name:'dkje',
				                	   index: 'dkje'

				                	 					                	 	}, {
				                 	   name:'dkqx',
				                	   index: 'dkqx'

				                	 					                	 	}, {
				                 	   name:'yll',
				                	   index: 'yll'

				                	 					                	 	}, {
				                 	   name:'ghfs',
				                	   index: 'ghfs'
				                	 	}, {
				                 	   name:'zdcrqm',
				                	   index: 'zdcrqm'

				                	 					                	 	}, {
				                 	   name:'zdcrqzsj',
				                	   index: 'zdcrqzsj'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'jdid',
				                	   index: 'jdId'

				                	 					                	 	}, {
				                 	   name:'zdcrid',
				                	   index: 'zdcrId'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/DaiKSSCSP/zhuDCRYJ/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/DaiKSSCSP/zhuDCRYJ/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/DaiKSSCSP/zhuDCRYJ/get.htm?id={id}'
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
				DialogUtil.confirm(msg.getMessage().split("@")[0] + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/xinDai/liucheng/xinDaiLiuCheng/edit.htm?jdid='+msg.getMessage().split("@")[1];
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


