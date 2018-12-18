
/**
 * t_p_wjdc_test
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2018-04-18 17:28:15
 *</pre>
 */

$(function() {
	wjDemo  = new WjDemo();
	wjDemo.init();
	
	formUrl = wjDemo.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#wjDemoGrid",// 列表对象
			PAGER : "#wjDemoPager",// 列表分页
			FORM : '#wjDemoForm'// 表单form
	};
	/**
	 * t_p_wjdc_test 对象
	 * @returns {WjDemo}
	 */
	WjDemo = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	WjDemo.prototype = {
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
			var ques_kind= $("#ques_kind").val();
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/pg/PGData/wjDemo/listJson2.htm?ques_kind='+ques_kind,
						pager :this.consts.PAGER,
						colNames: ['主键','专家号/学号','问卷类别','用户姓名','身份','事件','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, 
//				                	 	{
//				                 	   name:'updateTime',
//				                	   index: 'update_time_'
//				                	 	,formatter: 'timestamp'
//				                	 					                	 	}, 
				                	 					                	 	{
				                 	   name:'userid',
				                	   index: 'userid'

				                	 					                	 	}, {
				                 	   name:'wjtype',
				                	   index: 'wjtype'

				                	 					                	 	}, {
				                 	   name:'username',
				                	   index: 'username'

				                	 					                	 	},{
				                	 	name:'identy',
				                	 	index: 'identy'

				                	 						                	}, {
				                	 	name:'event',
				                	 	index: 'event'

				                	 						                	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/wjDemo/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/wjDemo/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/wjDemo/get.htm?id={id}'
									},{
										label:'问卷详情',
										classes:'btn btn-primary fa fa-detail',
										action:'javascript:wjDemo.onlineForm( "{id}","{wjtype}" )'
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/pg/PGData/wjDemo/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		onlineForm : function( id ,wjtype){
			var reqUrl = __ctx + "/pg/PGData/wjDemo/WjDemoData.htm";
			$.post(reqUrl,{'id':id},function(result){
				//alert("123");
				
				var obj = JSON.parse(result);
					OnlineForm.data =obj;
					OnlineForm.open(wjtype , function( json ){
						alert("hah");
						var url = __ctx + "/pg/PGData/wjDemo/WjDemograd.htm";
		                $.post(url,{'id':id,'json':JSON.stringify(json)},function(){
		                	DialogUtil.alert("保存成功"); 	
		                });
					} , true);
				
				
            });
		
		}
	};
})();


