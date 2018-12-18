
/**
 * t_p_zykcdcdhlxpj
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:20:41
 *</pre>
 */
$(function() {
	crsDegree  = new CrsDegree();
	crsDegree.init();
	
	formUrl = crsDegree.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#crsDegreeGrid",// 列表对象
			PAGER : "#crsDegreePager",// 列表分页
			FORM : '#crsDegreeForm',// 表单form
			FORMGET : '#crsDegreeFormGet'// 表单form
	};
	/**
	 * t_p_zykcdcdhlxpj 对象
	 * @returns {CrsDegree}
	 */
	CrsDegree = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CrsDegree.prototype = {
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
						url :  __ctx+'/pg/PGData/crsDegree/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','课程ID','课程负责人','教学管理员','专业负责人','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'course_id',
				                	   index: 'course_id'

				                	 					                	 	}, {
				                 	   name:'course_principal',
				                	   index: 'course_principal'

				                	 					                	 	}, {
				                 	   name:'education_manager',
				                	   index: 'education_manager'

				                	 					                	 	},  {
				                 	   name:'major_principal',
				                	   index: 'major_principal'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/crsDegree/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/crsDegree/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/crsDegree/get.htm?id={id}'
									},{
										label:'查看表单',
										classes:'btn btn-primary fa fa-detail',
										action: 'javascript:crsDegree.message("{course_id}")',
										action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=431125815871143936&cname1=course_id&cval1={course_id}'
									},{
							             label:'调查问卷',
							             classes:'btn btn-primary fa fa-detail',
							             action:'javascript:crsDegree.onlineForm( "{id}" )'	}]
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
		message : function(course_id) {
			DialogUtil.dialog({
				title : ' 信息安全专业课程达成度合理性评价表',
				content : __ctx + '/platform/report/raqsoft/showReport.htm?reportId=431125815871143936&course_id='+course_id,
				//content : __ctx + '/platform/report/raqsoft/preview.htm?reportId=403863483222851584&crs_num='+crsNum,
				index : 'edit',
				area : [ '50%', '90%' ],
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
							window.location.href = __ctx+'/pg/PGData/crsDegree/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},onlineForm : function( id ){
			var reqUrl = __ctx + "/pg/PGData/crsDegree/CrsDegreeData.htm";
			$.post(reqUrl,{'id':id},function(result){
				//alert(result);
				var obj = JSON.parse(result);
					OnlineForm.data =obj;
					OnlineForm.open("开题情况记录" , function( json ){
					//	alert("hah");
						var url = __ctx + "/pg/PGData/crsDegree/CrsDegreegrad.htm";
		                $.post(url,{'id':id,'json':JSON.stringify(json)},function(){
		                	DialogUtil.alert("保存成功"); 	
		                });
					} , true);
				
				
            });

			
		}
	};
})();

