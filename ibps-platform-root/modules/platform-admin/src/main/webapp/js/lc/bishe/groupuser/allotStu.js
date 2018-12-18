
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
	allotStu  = new allotStu();
	allotStu.init();
	
	formUrl = allotStu.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#allotStuGrid",// 列表对象
			PAGER : "#allotStuPager",// 列表分页
			FORM : '#allotStuForm',// 表单form
			FORMGET : '#allotStuFormGet'// 表单form
	};
	/**
	 * t_group_user 对象
	 * @returns {allotStu}
	 */
	allotStu = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	allotStu.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				//this._initGridList();
				
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
			var typeFlag = $('#typeFlag').val();
			
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/bishe/groupuser/groupUser/listJsonForAllotStu.htm?typeFlag=' + typeFlag,
						pager :this.consts.PAGER,
						colNames: ['主键','学号','姓名','指导教师','小组','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	},{
				                 	   name:'xh',
				                	   index: 'xh'

				                	 					                	 	},{
				                	   name:'name',
				                	   index:"name"								},{
				                		   
					                   name:'finalteacher',
					                   index:"finalteacher"	
					                	   ,hidden:true							},{
				                		   
						                   name:'td1',
						                   index:"td1"						},{
					                		   
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'删除',
										classes:'btn btn-primary fa fa-aaaa',
										action:'javascript:allotStu.removeForAllotStu("{id}")'
									}]
								} ],
								loadComplete: function(){
									debugger
									try{
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									}catch(e){}
								}
	
					});
			 $(me.consts.GRID).jqGrid('setGridParam', {
					url : __ctx+'/bishe/groupuser/groupUser/listJsonForAllotStu.htm?typeFlag=' + typeFlag,
					page : 1
				}).trigger("reloadGrid"); // 重新载入
		},
		
		removeForAllotStu : function(id){
			var typeFlag = $('#typeFlag').val();
			url = __ctx+'/bishe/groupuser/groupUser/removeForAllotStu.htm';
			debugger
		    $.ajax({
	    		type: "POST",
	    		url: url,
	    		data:{"stuId": id, "typeFlag":typeFlag},
	    		async: false,
	    		dataType:"json",
	    		success:function (data) {
	    			debugger
					if (data.status) {
						allotStu._initGridList();
						DialogUtil.msg(data.msg);
					} else {
						DialogUtil.error(data.msg);
					}
	    		}
	    })
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
							window.location.href = __ctx+'/bishe/allotStu/allotStu/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


