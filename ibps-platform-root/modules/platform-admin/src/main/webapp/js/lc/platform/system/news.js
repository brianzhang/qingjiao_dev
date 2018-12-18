/**
 * ibps_news
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：chunyan huang
 * 邮箱地址：370653110@qq.com
 * 创建时间：2016-11-22 17:19:54
 *</pre>
 */
$(function() {
	var news = new News();
	news.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#newsGrid",// 列表对象
		PAGER : "#newsPager",// 列表分页
		FORM : '#newsForm'// 表单form
	};
	/**
	 * ibps_news 对象
	 * @returns {News}
	 */
	News = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	News.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/platform/system/news/listJson.htm',
								pager : this.consts.PAGER,
								colNames : ['ID', '发布选项','类型','标题', '发布人','发布时间',
										'失效时间','是否公共', '发布状态', '发布范围','管理' ],
								colModel : [{
									name : 'id',
									index : 'ID_',
									hidden : true,
									key : true
								},
										{
											name : 'publicItem',
											index : 'PUBLIC_ITEM_',
											formatter: 'select',
				                            formatoptions: {
				                                value: {
				                                	'notices': '发布公告',
				                                    'important': '重要公告,需关注'
				                                }
				                            }
										},

										{
											name : 'type',
											index : 'TYPE_'
										},
										{
											name : 'title',
											index : 'TITLE_'
										},
										{
											name : 'userName',
											index : 'USER_NAME_'
										},
										{
											name : 'publicDate',
											index : 'PUBLIC_DATE_',
											width:'100',
											formatter : 'timestamp'

										},
										{
											name : 'loseDate',
											index : 'LOSE_DATE_',
											width:'100',
											formatter : 'timestamp'

										},
										
										{
											name : 'isPublic',
											index : 'IS_PUBLIC_',
											formatter: 'select',
											width:'100',
				                            formatoptions: {
				                                value: {
				                                	'yes': '是',
				                                    'no': '否'
				                                }
				                            }
											
										},
									
										{
											name : 'status',
											index : 'STATUS_',
											formatter: 'select',
											width:'100',
											formatter: 'dataFormat',
										    formatoptions: {
				                            	value : [{
													name:'publish',
													value:'已发布',
													css:'red'
												},{
													name:'drafts',
													value:'草稿',
													css:'blue'
												},{
													name:'expired',
													value:'已过期',
													css:'gray'
												}
											]}
										},
										
										{
											name : 'depName',
											index : 'DEP_NAME_',
												width:'200'
										},
										
										{
											name : '__manage',
											width : 60,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/system/news/edit.htm?id={id}',
														hidden: function (opts, rowData) {
						                                    return rowData.status=='publish';
						                                }
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/system/news/remove.htm?id={id}',
														hidden: function (opts, rowData) {
						                                    return rowData.status=='publish';
						                                }
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/system/news/get.htm?id={id}'
													} ]
										} ]

							});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me._initEditor();
			// 触发表单验证
			frm.valid();
			
			// 处理表单保存为发布
			$(document).on('click', 'a.fa-send', function() {
				var $el = $(this);
				$el.button('loading');
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					},error:function(){
		            	$el.button('reset');
		            }
				});
				$("input[name='status']").val("publish");
				$('#content').val(me.content.getContent());
				var isExec = me._validData();
				if(!isExec){
					$el.button('reset');
					return;
				}
				if (frm.valid()){
					form.submit();
				}else{
					$el.button('reset');
				}
				
			});
			
			// 处理表单保存为草稿
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading');
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					},error:function(){
		            	$el.button('reset');
		            }
				});
				$("input[name='status']").val("drafts");
				$('#content').val(me.content.getContent());
				var isExec = me._validData();
				if(!isExec){
					return;
				}
				if (frm.valid())
					form.submit();
				else{
					$el.button('reset');
				}
			});
			me._changeRights();
		},
		
		_validData :function(){
			var publicDate = $("input[name='publicDate']").val();
			var loseDate = $("input[name='loseDate']").val();
			if(!loseDate){
				return true;
			}
			if($.isNotEmpty(publicDate) && $.isNotEmpty(loseDate)){
				var effectiveDate = new Date(publicDate);
				var expiryDate = new Date(loseDate);
				if(effectiveDate > expiryDate){
					DialogUtil.warn("日期范围不合法！");
					return false;
				}
			}
			return true;
		},
			
		_initEditor:function(){
			var me = this;
	   	   	me.content = UE.getEditor('editor');
	   	   	me.content.addListener("ready",function(editor){
	   		me.content.setContent($('#content').val());
	   		
	   		//获取是否公共
	   		var v = $("input[name='isPublic']").val();
	   		if(v=="yes"){
	   			$("#fbRights").css('display','none');
	   		}else{
	   			$("#fbRights").css('display','block'); 
	   		}
	   	  });
		},
		
		/**
		 * 是否公共：否则显示发布范围，否则不显示
		 */
		_changeRights:function(){
			var me = this;
			$(document).on("change", "input[name='isPublic']", function(){
					var v = $(this).val();
					if(v=='no'){
						$("#fbRights").css('display','block'); 
					}else{
						$("#fbRights").css('display','none'); 
					}
			});
		},
		
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/system/news/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();

//图片上传 begin
function addPic(){
	new UploadDialog({
		uploadType: 'picture',
		fileFormates :'bmp, gif, jpg, jpeg, png',
		callback:picCallBack
	}).show();
}

/**
 * 删除图片
 */
function delPic(){
	$("#photo").val("");
	$("#newsPic").attr("src",__ctx+"/styles/default/images/webupload/image.png");
};

function picCallBack(ary){
	if(!ary) return;
	var id = ary[0].id;
	var path= __ctx + "/platform/file/attachment/getFileById.htm?fileId=" + id;
	$("#picture").val("/platform/file/attachment/getFileById.htm?fileId=" + id);
	$("#newsPic").attr("src",path);
};
