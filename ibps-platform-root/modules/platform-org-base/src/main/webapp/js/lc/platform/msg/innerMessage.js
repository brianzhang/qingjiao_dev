/**
 * 内部消息
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-26 15:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var innerMessage  = new InnerMessage();
	innerMessage.init();
});

(function() {
	//定义常量
	var 	_consts = {
			RECEIVE_GRID : "#innerMessageReceiveGrid",// 列表对象
			SENT_GRID : "#innerMessageSentGrid",// 列表对象
			PAGER : "#innerMessagePager",// 列表分页
			FORM : '#innerMessageReplyForm'// 表单form
	};
	/**
	 * 内部消息 对象
	 * @returns {InnerMessage}
	 */
	InnerMessage = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	InnerMessage.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.RECEIVE_GRID).length > 0)//列表
				this._initReceiveGridList();
			if ($(this.consts.SENT_GRID).length > 0)//列表
				this._initSentGridList();
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initReceiveGridList : function() {
			var me = this,receiveGrid= 	$(this.consts.RECEIVE_GRID);
			$(this.consts.RECEIVE_GRID).GridList(
					{
						url :  __ctx+'/platform/msg/innerMessage/receiveJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键',' ','主题','发送人','消息类型','发送时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				          			},{
				          				name:'receiverTime',
				          				width:30,
				          				formatter:function(val, opts, rowData) {
				          					//判断是否有附件和是否查看
				          					var isRead =$.isEmpty(val)?"fa-envelope":"fa-envelope-o",fileMsg="";
				          					if(!$.isEmpty(rowData.fileMsg)){
				          						fileMsg = '&nbsp;&nbsp;<i class="fa fa-link" title="附件"></i>';
				          					}
				          					return '<i class="fa '+isRead+'" ></i>'+fileMsg;
				          				}
				          			} ,{
				                 	   name:'subject',
				                	   index: 'subject_',
			                		 	formatter:function(val, opts, rowData){
				                	 		 return '<a href=" '+__ctx+'/platform/msg/innerMessage/get.htm?id='+rowData.id+'">'+val+'</a>';
				                	 	}
				          			},  {
				                 	   name:'owner',
				                	   index: 'owner_'
				          			}, {
				                 	   name:'messageType',
				                	   index: 'message_type_',
			                		   formatter : 'dataFormat',
				                	   formatoptions : {
				                	   value : [{
											name:'normal',
											value:'普通',
											css:'green'
										},{
											name:'system',
											value:'系统消息',
											css:'red'
										},{
											name:'bulletin',
											value:'公告',
											css:'red'
										}]
				                	   }
				          			}, {
				                 	   name:'createTime',
				                	   index: 'create_time_',
				                	   formatter: 'timestamp',
				                	   formatoptions:'yyyy-MM-dd HH:mm:ss'
				          			}, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'回复',
										classes:'btn btn-primary fa fa-reply-all',
										hidden:function(opts, rowData){
											if(rowData.canreply==1 ||  rowData.messageType =='system'  ||  rowData.messageType =='bulletin')
												return false;
											return true;
										},
										action:__ctx+'/platform/msg/innerMessage/reply.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/msg/innerMessage/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/msg/innerMessage/get.htm?id={id}'
									}]
								} ]
	
					});
			this._initButtons(receiveGrid);
		},
		
		/**
		 * 标记已读事件
		 */
		_initButtons:function(receiveGrid){
			$(document).on("click", "#mark", function(){
				var  ids = receiveGrid.jqGrid('getGridParam', 'selarrrow');
				if (ids == null || ids.length == 0) {
					DialogUtil.toastr('请选择记录!');
					return false;
				}
				$.post(__ctx+'/platform/msg/innerMessage/markRead.htm',{ids:ids.join(',')}, function(responseText){
					$('.fa-search').click();
				});
			})
		},
		
		/**
		 * 初始列表
		 */
		_initSentGridList : function() {
			var me = this;
			$(this.consts.SENT_GRID).GridList(
					{
						url :  __ctx+'/platform/msg/innerMessage/sentJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键',' ','主题','发送人','消息类型','发送时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				          			},{
				          				name:'receiverTime',
				          				width:30,
				          				formatter:function(val, opts, rowData) {
				          					//判断是否有附件和是否查看
				          					var isRead =$.isEmpty(val)?"fa-envelope-o":"fa-envelope",fileMsg="";
				          					if(!$.isEmpty(rowData.fileMsg)){
				          						fileMsg = '&nbsp;&nbsp;<i class="fa fa-link" title="附件"></i>';
				          					}
				          					return '<i class="fa '+isRead+'" ></i>'+fileMsg;
				          				}
				          			} ,{
				                 	   name:'subject',
				                	   index: 'subject_',
			                		 	formatter:function(val, opts, rowData){
				                	 		 return '<a href=" '+__ctx+'/platform/msg/innerMessage/get.htm?receive=true&id='+rowData.id+'">'+val+'</a>';
				                	 	}
				          			},  {
				                 	   name:'owner',
				                	   index: 'owner_'
				          			}, {
				                 	   name:'messageType',
				                	   index: 'message_type_',
				                	   formatter : 'dataFormat',
				                	   formatoptions : {
				                	   value : [{
											name:'normal',
											value:'普通',
											css:'green'
										},{
											name:'system',
											value:'系统消息',
											css:'red'
										},{
											name:'bulletin',
											value:'公告',
											css:'red'
										}]
									}
				          			}, {
				                 	   name:'createTime',
				                	   index: 'create_time_',
				                	   formatter: 'timestamp',
				                	   formatoptions:'yyyy-MM-dd HH:mm:ss'
				          			}, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/msg/innerMessage/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/msg/innerMessage/get.htm?receive=true&id={id}'
									}]
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
			// 处理表单保存
			$(document).on('click', 'a.fa-send', function() {
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
					$('#content').val(me.content.getContent());
					form.submit();
				}else{
					$el.button('reset'); 
				}
			});
		},
		
		/**
		 * 初始化加载富文本框事件
		 */
		_initEditor:function(){
			var me = this;
	   	   me.content = UE.getEditor('editor');
	   	   me.content.addListener("ready",function(editor){
	   		  	me.content.setContent($('#content').val());
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
				DialogUtil.alert(msg.getMessage() ,
						function(rtn) {
							window.location.href = $("#returnUrl").val();
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


