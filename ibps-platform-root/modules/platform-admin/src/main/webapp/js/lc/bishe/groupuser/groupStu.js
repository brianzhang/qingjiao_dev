
/**
 * t_group_user
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-20 13:27:42
 *</pre>
 */
$(function() {
	groupStu  = new groupStu();
	groupStu.init();
	
	formUrl = groupStu.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#groupStuGrid",// 列表对象
			PAGER : "#groupStuPager",// 列表分页
			FORM : '#groupStuForm',// 表单form
			FORMGET : '#groupStuFormGet'// 表单form
	};
	/**
	 * t_group_user 对象
	 * @returns {groupStu}
	 */
	groupStu = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	groupStu.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			localStorage.removeItem("tour_end");
			localStorage.setItem("tour_current_step", 0);
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
			debugger;
			var me = this;
			var groupId = $('#groupId').val();
			var type = $('#type').val();
			var role = $('#role').val();
			if(role == "leader"){
				$(this.consts.GRID).GridList(
						{
							url : __ctx+'/bishe/groupuser/groupUser/listJsonForLeaderManageStu.htm?groupId=' + groupId,
							pager :this.consts.PAGER,
							colNames: ['主键','班级','学号','姓名','课题','所属教师','管理'],
					        colModel: [{
					                 	   name:'id',
					                	   index: 'id_'

					                	 	,hidden:true,key:true
					                	 	}, {
									               name:'classr',
									               index: 'classr'

									                	 					                }, {
							               name:'xh',
							               index: 'xh'

							                	 					                }, {
							               name:'name',
							               index: 'name'

							                	 					                }, {
							                name:'tmmc',
							                index: 'tmmc'
							                								        },{
							               name:'finalteacher',
							               index: 'finalteacher'
							               ,hidden:true
							                							                			 }, {
							           name : '__manage',
							           width : 30,
							           sortable:false,
							          classes:'rowOps',
							          formatter : 'manage',
									  formatoptions :[{
							             label: type + "情况记录",
							             classes:'btn btn-primary fa fa ktqkjl',
							             action:'javascript:groupStu.onlineForm( "{id}" )'
							            						                								}]
							                															}],
									loadComplete: function(){
										
										try{
											$('.rowOps').each(function() {
												$(this).rowOps();
												
											});
										}catch(e){}
									}
		
						});
			}
		},
		

		
		onlineForm : function( id ){
			debugger
			var reqUrl = __ctx + "/bishe/groupuser/groupUser/data.htm";
			$.post(reqUrl,{'id':id},function(result){
				var obj = JSON.parse(result);

					/*var json = JSON.parse(result); */
					OnlineForm.data =obj;
					OnlineForm.open("中期情况记录" , function( json ){
						var url = __ctx + "/bishe/groupuser/groupUser/grad.htm";
		                $.post(url,{'id':id,'json':JSON.stringify(json)},function(){
		                	DialogUtil.alert("保存成功"); 	
		                });
					} , true);
/*					OnlineForm.lastOpt =function(thedoucument){
						var inputs = thedoucument.getElementsByTagName("input");
						for(j = 0,len=inputs.length; j < len; j++) {
							inputs[j].disabled = true;
						}	
					};
					OnlineForm.open("中期情况记录", false,true);*/			
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
							window.location.href = __ctx+'/bishe/groupStu/groupStu/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


