
/**
 * t_jsskb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-25 11:53:18
 *</pre>
 */
$(function() {
	SchedulePo  = new SchedulePo();
	SchedulePo.init();
	
	formUrl = SchedulePo.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#SchedulePoGrid",// 列表对象
			PAGER : "#SchedulePoPager",// 列表分页
	};
	/**
	 * t_jsskb 对象
	 * @returns {SchedulePo}
	 */
	SchedulePo = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	SchedulePo.prototype = {
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
			var me = this;
			var ida =  $('#classId').val();
			var usefulSchduleIds =  $('#usefulSchduleIds').val();
/*			alert(usefulSchduleIds);*/
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/patrolp/data/classxxInfo/classSchedule.htm?id='+ida + "&usefulSchduleIds="+usefulSchduleIds,
						pager :this.consts.PAGER,
						colNames: [
						           	'<div style="text-align:center;">周一</div>',
						           	'<div style="text-align:center;">周二</div>',
						           	'<div style="text-align:center;">周三</div>',
						           	'<div style="text-align:center;">周四</div>',
						           	'<div style="text-align:center;">周五</div>'],
						multiselect: false,
				        colModel: [{
				                 	   name:'first',
				                 	   align:'center'

				                	 					                	 	}, {
				                 	   name:'second',
				                 	   align:'center'

				                	 					                	 	}, {
				                 	   name:'third',
				                 	   align:'center'

				                	 					                	 	}, {
				                 	   name:'fourth',
				                 	   align:'center'

				                	 					                	 	}, {
				                 	   name:'fifth',
				                 	   align:'center'

				                	 					                	 	}],
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
							window.location.href = __ctx+'/patrolp/data/teachInfo/lookclass.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


