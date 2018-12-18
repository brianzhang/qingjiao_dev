/**
 * 【附件】
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-23 17:19:05
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var attachment
$(function() {
	attachment  = new Attachment();
	attachment.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#attachmentGrid",// 列表对象
			PAGER : "#attachmentPager",// 列表分页
			FORM : '#attachmentForm',// 表单form
			GET :' #attachmentGet'//get页面
	};
	/**
	 * 【附件】 对象
	 * @returns {Attachment}
	 */
	Attachment = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Attachment.prototype = {
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
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
			if($(this.consts.GET).length>0)
				this._initGet();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/file/attachment/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['id','文件名', '附件类型', '创建时间', '扩展名', '总字节数', '上传者','管理'],
				        colModel: [{
	                        name: 'id',
	                        index: 'ID_',
	                        hidden:true,
	                        key:true
			             }, {
			                name: 'fileName',
			                index: 'FILE_NAME_',
			                width: 60
			            },{
			                name: 'fileType',
			                index: 'FILE_TYPE_',
			                width: 90,
			                formatter:'select', 
			                formatoptions:{value:{ 'mail':'邮件附件','user':'用户信息附件'}}
			            },{
			                name: 'createTime',
			                index: 'CREATE_TIME_',
			                width: 80,
			                sorttype: "timestamp",
			                formatter: "timestamp"
			            }, {
			                name: 'ext',
			                index: 'EXT_',
			                width: 80
			            }, {
			                name: 'totalBytes',
			                index: 'TOTAL_BYTES_',
			                width: 80
			            }, {
			                name: 'creatorName',
			                index: 'creator_name_',
			                width: 40
			            } ,{
							name : '__manage',
							label:'管理',
							sortable:false,
							width : 30,
							classes:"rowOps",
							formatter : 'manage',
							formatoptions :[{
								label:"预览",
								classes:'btn btn-primary fa fa-eye',
								action : 'javascript:attachment.openFile("{id}","{ext}")',
								hidden: function (opts, rowData) {
									var ft = ["doc","docx","ppt","pptx","xls","xlsx"];
                                    return $.inArray(rowData.ext, ft) < 0;
                                }
							},/*{
								label:"预览",
								classes:'btn btn-primary fa fa-eye',
								action : 'javascript:attachment.preview("{id}","{ext}")',
								hidden: function (opts, rowData) {
									var ft = ["bmp", "gif", "jpg", "jpeg", "png"];
                                    return $.inArray(rowData.ext, ft) < 0;
                                }
							},*/{
								label:"修改文件名",
								classes:'btn btn-primary fa fa-eraser',
								action : 'javascript:attachment.modifyName("{id}","{fileName}")',
							},{
								label:"明细",
								classes:'btn btn-primary fa fa-detail',
								action: __ctx+'/platform/file/attachment/get.htm?id={id}'
							},{
								label:"下载",
								classes:'btn btn-primary fa fa-download',
								action:__ctx+'/components/upload/download.htm?downloadId={id}'
								
							},{
								label:"删除",
								classes:'btn btn-primary fa fa-remove',
								action: __ctx+'/components/upload/delete.htm?deleteIds={id}'
							}]
			            }]
	
					});
			
			$("#uploadAdd").on("click",function(){
				 new UploadDialog({
					 callback:function(data){
						 GridList.search('#search');
					 }
				 }).show();
			});
		},
		
		openFile : function(id,ext){
			var ft = ["doc","docx","ppt","pptx","xls","xlsx"];
			if($.inArray(ext, ft) < 0){
				DialogUtil.alert("不是office文档");
				return;
			}
				
			new OfficeDialog({
				fileId 	: id,
				rights 	: "r",
				btns	: [],
				title 	: "附件预览"
			 }).show();
		},
		
		preview : function(id,ext){
			var ft = ["bmp", "gif", "jpg", "jpeg", "png"];
			if($.inArray(ext, ft) < 0){
				DialogUtil.alert("不是图片！");
				return;
			}
			
			var url = __ctx + '/platform/common/image/preview.htm';
			DialogUtil.dialog({
				content : url,
				title : "图片预览",
				area : [ '100%', '100%' ],
				params : {id:[id]}
			});
		},
		modifyName:function(id,name){
			 DialogUtil.prompt({
				  value: name,
				  title: '修改文件名',
				},function(val,index){
					$.ajax({
						url :  __ctx+'/platform/file/attachment/modifyName.htm',
						type : 'post',
						data : {
							id : id,
							name:val
						},
						success : function(data) {
							DialogUtil.msg("修改名字成功");
							GridList.search('#search');
							DialogUtil.close(index);
						}
					});

			});
		},
		
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading'); 
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					},
					error: function(){
						$el.button('reset'); 
					}
				});
				if (frm.valid()){
					form.submit();
				}else{
					$el.button('reset');
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/file/attachment/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		_initGet:function(){
			var id = $("#attachmentId").val();
			var a = $("#download");
			var action =__ctx+'/components/upload/download.htm?downloadId='+id;
			var href="javascript:;" ;
			 a.attr("action",action);
			 a.attr("href",action);
			 
		}
	};
})();