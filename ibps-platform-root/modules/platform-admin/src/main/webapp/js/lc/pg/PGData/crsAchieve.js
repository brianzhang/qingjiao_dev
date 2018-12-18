
/**
 * t_p_kcdcdhlxpj
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:09:43
 *</pre>
 */
$(function() {
	crsAchieve  = new CrsAchieve();
	crsAchieve.init();
	
	formUrl = crsAchieve.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#crsAchieveGrid",// 列表对象
			PAGER : "#crsAchievePager",// 列表分页
			FORM : '#crsAchieveForm',// 表单form
			FORMGET : '#crsAchieveFormGet'// 表单form
	};
	/**
	 * t_p_kcdcdhlxpj 对象
	 * @returns {CrsAchieve}
	 */
	CrsAchieve = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CrsAchieve.prototype = {
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
						url :  __ctx+'/pg/PGData/crsAchieve/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','合理','负责人','规范性','完整性','试卷分析','课程分析','备注','管理人员','判定结果','整改意见','负责人','覆盖','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'result1',
				                	   index: 'result1'

				                	 					                	 	}, {
				                 	   name:'principle1',
				                	   index: 'principle1'

				                	 					                	 	}, {
				                 	   name:'normative',
				                	   index: 'normative'

				                	 					                	 	}, {
				                 	   name:'integrity',
				                	   index: 'integrity'

				                	 					                	 	}, {
				                 	   name:'analyze1',
				                	   index: 'analyze1'

				                	 					                	 	}, {
				                 	   name:'analyze2',
				                	   index: 'analyze2'

				                	 					                	 	}, {
				                 	   name:'remark',
				                	   index: 'remark'

				                	 					                	 	}, {
				                 	   name:'manager',
				                	   index: 'manager'

				                	 					                	 	}, {
				                 	   name:'result2',
				                	   index: 'result2'

				                	 					                	 	}, {
				                 	   name:'opinion',
				                	   index: 'opinion'

				                	 					                	 	}, {
				                 	   name:'principle2',
				                	   index: 'principle2'

				                	 					                	 	}, {
				                 	   name:'cover',
				                	   index: 'cover'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/crsAchieve/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/crsAchieve/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/crsAchieve/get.htm?id={id}'
									},{
							             label:'调查问卷',
							             classes:'btn btn-primary fa fa-detail',
							             action:'javascript:crsAchieve.onlineForm( "{id}" )'	}]
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
							window.location.href = __ctx+'/pg/PGData/crsAchieve/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},onlineForm : function( id ){
			var reqUrl = __ctx + "/pg/PGData/crsAchieve/CrsAchievedata.htm";
			$.post(reqUrl,{'id':id},function(result){
				//alert(result);
				var obj = JSON.parse(result);
					OnlineForm.data =obj;
					OnlineForm.open("开题情况记录" , function( json ){
					//	alert("hah");
						var url = __ctx + "/pg/PGData/crsAchieve/CrsAchievegrad.htm";
		                $.post(url,{'id':id,'json':JSON.stringify(json)},function(){
		                	DialogUtil.alert("保存成功"); 	
		                });
					} , true);
				
				
            });
		}
	};
})();


