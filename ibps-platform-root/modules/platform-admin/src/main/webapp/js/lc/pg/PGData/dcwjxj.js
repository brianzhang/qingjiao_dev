
/**
 * t_dcwjxj
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-05-04 17:37:35
 *</pre>
 */
$(function() {
	dcwjxj  = new Dcwjxj();
	dcwjxj.init();
	
	formUrl = dcwjxj.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#dcwjxjGrid",// 列表对象
			PAGER : "#dcwjxjPager",// 列表分页
			FORM : '#dcwjxjForm',// 表单form
			FORMGET : '#dcwjxjFormGet'// 表单form
	};
	/**
	 * t_dcwjxj 对象
	 * @returns {Dcwjxj}
	 */
	Dcwjxj = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Dcwjxj.prototype = {
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
		_bindBtns : function(){
			var me = this;
			
			$(document).on('click', 'a.fa-edits', function () {
            	var ids = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
            	if (ids == null || ids.length == 0) {
            		DialogUtil.toastr('请选择数据！');
            		return;
            	}
            	var url = __ctx + "/bishe/urlZhiYuant/urlZhiYuan/designatedAuditorTeam.htm?id="+ids;
            	var f = document.createElement("form");
            	document.body.appendChild(f);
            	f.action = url ;
            	f.method = 'POST';
            	f.submit();
            });
		},
		_initOffice : function(_rights){
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			var ques_kind= $("#ques_kind").val();
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/pg/PGData/dcwjxj/listJson.htm?ques_kind='+ques_kind,
						pager :this.consts.PAGER,
						colNames: ['主键','事件','人员','问卷名','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	,hidden:true,key:true
				                	 	}, {
				                 	   name:'shiJian',
				                	   index: 'shi_jian_'

				                	 					                	 	}, {
				                 	   name:'renYun',
				                	   index: 'ren_yun_'

				                	 					                	 	}, {
				                 	   name:'wenJuanMing',
				                	   index: 'wen_juan_ming_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/PGData/dcwjxj/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/PGData/dcwjxj/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
//										action: __ctx+'/pg/PGData/dcwjxj/get.htm?id={id}'
										action: __ctx+'/pg/PGData/wjDemo/list2.htm?ques_kind=' + ques_kind
									},{
										label:'qid',
										classes:'btn btn-primary fa fa-detail',
//										action: __ctx+'/pg/PGData/dcwjxj/get.htm?id={id}'
										action:'javascript:dcwjxj.qid("{id}")',
									},
									{
										label:'结果统计',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/PGData/wjDemo/list2.htm?ques_kind=' + ques_kind
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
		qid:function (id) {
			var me = this;
			var ids = id;
//        	var ids = $(me.consts.GRID).jqGrid('getGridParam','selarrrow');
        
        	if (ids == null || ids.length == 0) {
        		DialogUtil.toastr('请选择数据！');
        		return;
        	}
        	
        	var lid = DialogUtil.load();
        	var url = __ctx + "/pg/PGData/dcwjxj/startFlow.htm"
//            $.post(url, {'id': ids.join(','), 'flowKey':'Process_1a3mq4h8'}, function (responseText) {
            $.post(url, {'id':id, 'flowKey':'Process_1a3mq4h8'}, function (responseText) {

            	DialogUtil.close(lid);
            	var msg = new com.lc.form.ResultMessage(responseText);
    			if (msg.isSuccess()) {
    				DialogUtil.msg(msg.getMessage());
    				window.location.reload(true);
    			} else {
    				DialogUtil.error(msg.getMessage());
    			}
            });
        },
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
							window.location.href = __ctx+'/pg/PGData/dcwjxj/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


