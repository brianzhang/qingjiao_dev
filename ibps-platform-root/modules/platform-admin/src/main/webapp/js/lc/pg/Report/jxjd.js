
/**
 * t_bkkcjxjdb
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-26 17:43:14
 *</pre>
 */
$(function() {
	jxjd  = new Jxjd();
	jxjd.init();
	
	formUrl = jxjd.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#jxjdGrid",// 列表对象
			PAGER : "#jxjdPager",// 列表分页
			FORM : '#jxjdForm',// 表单form
			FORMGET : '#jxjdFormGet'// 表单form
	};
	/**
	 * t_bkkcjxjdb 对象
	 * @returns {Jxjd}
	 */
	Jxjd = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Jxjd.prototype = {
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
						url :  __ctx+'/pg/Report/jxjd/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','创建时间','课程编号','课程名称','开课单位','撰写人','院（系）教学院长（主任）','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_'
				                	 	,formatter: 'timestamp'
				                	 					                	 	}, {
				                 	   name:'crs_id',
				                	   index: 'crs_id'

				                	 					                	 	}, {
				                	   name:'crs_name',
				                	   index: 'crs_name'

				                	 						                	}, {
				                 	   name:'crs_unit',
				                	   index: 'crs_unit'

				                	 					                	 	}, {
				                 	   name:'author',
				                	   index: 'author'

				                	 					                	 	}, {
				                 	   name:'sign',
				                	   index: 'sign'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/pg/Report/jxjd/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/pg/Report/jxjd/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/pg/Report/jxjd/get.htm?id={id}'
									},{
										label:'查看表单',
										classes:'btn btn-primary fa fa-detail',
										//action : 'javascript:jxjd.message("{crs_id}" )',
										action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=439349557877276672&cname1=crs_id&cval1={crs_id}'
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
		message : function(crs_id) {
			DialogUtil.dialog({
				title : '教学基本进度表',
				content : __ctx+'/platform/report/raqsoft/showReport.htm?reportId=439349557877276672&crs_id='+crs_id,
				//content : __ctx + '/platform/report/raqsoft/preview.htm?reportId=403863483222851584&crs_num='+crsNum,
				index : 'edit',
				area : [ '60%', '90%' ],
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
							window.location.href = __ctx+'/pg/Report/jxjd/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


