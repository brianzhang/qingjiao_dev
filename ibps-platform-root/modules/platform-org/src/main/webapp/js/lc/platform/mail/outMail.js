/**
 * 外部邮件
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-05-06 10:57:11
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	 outMail  = new OutMail();
	outMail.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#outMailGrid",// 列表对象
			PAGER : "#outMailPager",// 列表分页
			FORM : '#outMailForm',// 表单form
			TREE:'#outMailTree',
			GETFORM:"#getFormData"
			
	};
	/**
	 * 外部邮件 对象
	 * @returns {OutMail}
	 */
	OutMail = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	OutMail.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.TREE).length > 0)// 树
				this._initTree();
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
			if ($(this.consts.GETFORM).length > 0)//表单
				this._initGetData();
		},
		/**
		 * 初始化树
		 */
		_initTree:function(){
			
			var me = this;
			//初始化布局
			this._initLayout();
			this._treeFrameResize();
			// 缩放时候计算高度
			$(window).resize(function(){  
				me._treeFrameResize();
			});
			this.loadTree();
	        //初始化滚动
	        this.initLeftScroll();
	        //初始化树的顶部按钮
			this.initTreeToolbar();

			//根据选择的用户，及时更新右侧数据
			$("select[id='setId']").change(function(){
				outMail.reFresh();
				var url=__ctx+"/platform/mail/outMail/list.htm?setId="+$("#setId").val()+"&types=inbox";
				$("#listFrame").attr("src",url);
			});
		},
		//初始化布局
		_initLayout:function(){
			var layout =   $('body').layout({ applyDefaultStyles: true});  
			layout.addPinBtn( ".pinBtn", "west" );
		},
		//初始化树的顶部按钮
		initTreeToolbar:function(){
			var me = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					me.loadTree();
				}else	if($(this).hasClass("fa-expand")){//展开
					me.resourcesTree.expandAll(true);
				} else	if($(this).hasClass("fa-compress")){//收缩
					me.resourcesTree.expandAll(false);	
				}else	if($(this).hasClass("fa-exchange")){//收取邮件
					me.sync();
				}
			});
		},
		sync:function(){
			var setId =  $("#setId").val();
			if($.isEmpty(setId)){
				DialogUtil.msg("请选择邮箱！");
				return;
			}
			var load =	DialogUtil.load("收取邮件中...");
			$.post(__ctx+'/platform/mail/outMail/sync.htm',{setId:$("#setId").val()}, function(responseText){
				DialogUtil.close(load);
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					var url=__ctx+"/platform/mail/outMail/list.htm?setId="+setId+"&types=inbox";
					$("#listFrame").attr("src",url);
					DialogUtil.msg(msg.getMessage());
				}else{
					DialogUtil.error(msg.getMessage(),msg.getCause());
				}
			});	
		},
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize:function (){
			$('.treeFrame').height( $(window).height()-20);
			$(this.consts.TREE).height( $(window).height()-140);
		},

		// 加载树
		loadTree:function (){
			var me = this;
			// 树
			this.outMailTree =null;
			this.setId=$("#setId").val();
			this.expandByDepth = 1;
			
			var setting = {
				async: {enable: false},
				data: {
					key:{name:"name"},
					simpleData: {
						idKey: "id",
						pIdKey: "parentId",
						rootPId:this.setId
					}
				},
				view: {
					selectedMulti: false,
					showIconFont:true
				},
				callback:{
					onClick: function(e, treeId, treeNode) {
						me.treeOnLeftClick(me,treeNode);	
					},
					onRightClick :function(e,treeId, treeNode) {
						me.treeOnRightClick(me,treeNode,e);
					}
				}
			};
			
			var url=__ctx+"/platform/mail/outMail/getTreeData.htm";
			
			$.post(url,{
				'setId':me.setId?me.setId:''
			},function(result){
				me.outMailTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
				me.outMailTree.expandAll(true);
				$(".ztree li span.button.roots_docu").addClass("fa-null");
			});

		},
		/**
		 * 重新加载树
		 */
		reFresh:function(){
			//刷新左边的树
			this.loadTree();
		},
		treeOnLeftClick:function(me, treeNode) {
			me.selectTreeNode = treeNode;
			var setId = me.setId, types  = treeNode.alias;
			var url=__ctx+"/platform/mail/outMail/list.htm?setId="+setId+"&types="+types;
			$("#listFrame").attr("src",url);
		},
		/**
		 * 右键菜单
		 * @param me
		 * @param treeNode
		 * @param e
		 */
		treeOnRightClick:function(me,treeNode,e){
			if (!treeNode) 
				return;
			me.outMailTree.selectNode(treeNode);
			var pId = treeNode.parentId, menu=$('#Menu');
			
			if(menu == null)
				return;
			
			menu.contextMenu(e,{
				onItem: function(context, ev) {
					var target =$(ev.target), 
					action = target.data("action");
				if (target.hasClass('disabled'))
					return false;
				switch (action) {
					case "node_add":// 新增节点
						me.addNode(treeNode);
						break;
					case "node_edit":// 编辑节点
						me.editNode(treeNode);
						break;
					case "node_del":// 删除节点
						me.delNode(treeNode);
						break;
					case "node_sort":// 节点排序
						me.sortNode(treeNode);
						break;
					case "node_move":// 节点排序
						me.moveNode(treeNode);
						break;
				}
				}
			});

		},
		
		/**
		 * 左侧菜单的滚动
		 */
		initLeftScroll:function(){
	    	$(_consts.TREE).niceScroll({
	    		horizrailenabled : false,
	    		cursorborder : "0",
	    		cursorwidth : "6px",
	    		cursorcolor : "#2A2A2A",
	    		zindex : "5555",
	    		autohidemode : true,
	    		bouncescroll : true,
	    		mousescrollstep : '40',
	    		scrollspeed : '100',
	    		background : "#999",
	    		cursoropacitymax : "0.6",
	    		cursorborderradius : "0"
	    	});
	    	$(_consts.TREE).getNiceScroll().resize();
		},
		
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this,
				setId=$("#setId").val();
				types=$("#types").val();
				title = "收件人";
				name = "receiverNames";//发件人或收件人
				index = "receiver_names_";//发件人或收件人
				if(types=="inbox"||types=="dustbin"){
					title = "发件人";
					name = "senderName";
					index = "sender_name_";
				}
				var manager = [{
					label:'编辑',
					classes:'btn btn-primary fa fa-edit',
					action:__ctx+'/platform/mail/outMail/edit.htm?id={id}',
					hidden : function(opts, rowData) {
						return rowData.types=='inbox';
					}
				},{
					label:'删除',
					classes:'btn btn-primary fa fa-remove',
					action:__ctx+'/platform/mail/outMail/deleted.htm?id={id}'
				},{
					label:'彻底删除',
					classes:'btn btn-primary fa fa-remove',
					action:__ctx+'/platform/mail/outMail/remove.htm?id={id}'
				},{
					label:'明细',
					classes:'btn btn-primary fa fa-detail',
					action: __ctx+'/platform/mail/outMail/get.htm?id={id}'
				}];
				if(types=="deleted"||types=="dustbin"){
					manager = [{
						label:'彻底删除',
						classes:'btn btn-primary fa fa-remove',
						action:__ctx+'/platform/mail/outMail/remove.htm?id={id}'
					},{
						label:'明细',
						classes:'btn btn-primary fa fa-detail',
						action: __ctx+'/platform/mail/outMail/get.htm?id={id}'
					},{
						label:'恢复',
						classes:'btn btn-primary fa fa-release',
						hidden : function(opts, rowData) {
							return rowData.types=='dustbin';
						},
						action:'javascript: outMail._recover("{id}");'
					}];
				}
				
			var __url = __ctx+'/platform/mail/outMail/listJson.htm?Q^set_Id_^S='+setId+"&Q^types_^S="+types,
				__url = encodeURI(__url);
				
			$(this.consts.GRID).GridList({
						url : __url,
						pager :this.consts.PAGER,
						colNames: ['主键','<i class="fa fa-envelope"  title="是否查看"></i>&nbsp;<i class="fa fa-link" title="附件"></i> ',title,'主题','时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	   hidden:true,
				                	   key:true
				                	 },{
				          				name:'isRead',
				          				index: 'is_read_',
				          				width:18,
				          				formatter:function(val, opts, rowData) {
				          					//判断是否有附件和是否查看
				          					var isRead = (val==false?"fa-envelope":"fa-envelope-o"),fileMsg="";
				          					if(!$.isEmpty(rowData.fileIds)){
				          						fileMsg = '&nbsp;<i class="fa fa-link" title="附件"></i>';
				          					}
				          					return '<i class="fa '+isRead+'" ></i>'+fileMsg;
				          				}
					          		}, {
					                 	name:name,
					                	index: index,
					                	width:70
					          		} ,{
				                 	   name:'title',
				                	   index: 'title_'
				                 	}, {
			                 	    name:'mailDate',
			                	    index: 'mail_date_',
			                	 	formatter: 'timestamp',
			                	 	formatoptions:'yyyy-MM-dd HH:mm:ss',
			                	 	width:75
		                	 	},  {
									name : '__manage',
									width : 20,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions : manager
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
				var loading = DialogUtil.load("保存中...");
				frm.ajaxForm({
					success : function(responseText){
						DialogUtil.close(loading);
                    	me._showResponse(responseText);
                    },
                    error: function(){
                    	DialogUtil.close(loading);
                    }
				});
				if (frm.valid()){
					$('#content').val(me.content.getContent());
					var flag = me._setData();
					if(flag==true)
						form.submit();
					else{
						DialogUtil.close(loading);
						DialogUtil.msg("收件人地址不能为空！");
					}
				}else{
					DialogUtil.close(loading);
				}
				
			});
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var loading = DialogUtil.load("保存中...");
				frm.ajaxForm({
					success : function(responseText){
						DialogUtil.close(loading);
                    	me._showResponse(responseText);
                    },
                    error: function(){
                    	DialogUtil.close(loading);
                    }
				});
				$("#types").val("drafts");
				$('#content').val(me.content.getContent());
				var flag = me._setData();
				if(flag==true)
					form.submit();
				else{
					DialogUtil.close(loading);
					DialogUtil.msg("收件人地址不能为空！");
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
					//这里去掉了点击确定按钮，刷新功能。
					//1.没必要刷新，
					//2.在谷歌浏览器中使用了window.location.reload(true)会修改父页面地址，
					//而其他浏览器则没修改，造成点击返回按钮时无法返回到相同的页面
						if(!rtn){
							var url = $("#returnUrl").attr("href");
							window.location.href = url;
							}
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		_initEditor:function(){
			var me = this;
	   	   me.content = UE.getEditor('editor');
	   	   me.content.addListener("ready",function(editor){
	   		  	me.content.setContent($('#content').val());
	   	   });
		},
		attachmentCallback:function(data){
			if($.isEmpty($("#subject").val()) && data.length >0){
				$("#subject").val(data[0].fileName);
			}
		},
		_mailFormat:function(address){
			var name = "";
			var mailAddr = "";
			var mail = [];
			var sendees = address.split(";");
			for(var i=0;i<sendees.length-1;i++){
				var addr = sendees[i].split("<");
				var str = "";
				if(addr.length>1){
					str = addr[1].substring(0,addr[1].length-1);
				}else str = addr[0];
				name = name + addr[0]+";";
				mailAddr = mailAddr + str+";";
			}
			mail.push(name);
			mail.push(mailAddr);
			return mail;
		},
		_initGetData:function(){
			toStr("sendee");
			toStr("ccp");
			toStr("bccp");
			toStr("sendp");
			function toStr(id){
				var p,name,arrayP,arrayN,result="";
				var str = $("#"+id);
				if(str.length>0){
					p = str[0].innerText;
					name = $("#"+id+"n").val();
					arrayP = p.split(";");
					arrayN = name.split(";");
					var length = arrayP.length;
					if(length>1){
						length = length-1;
					}
					for(var i=0;i<length;i++){
						result = result + arrayN[i]+"<"+arrayP[i]+">;"
					}
					str[0].innerText = result;
				}
			}
			
		},
		
		
		/**
		 * 恢复删除记录
		 */
		_recover:function(id){
			var me = this;
			DialogUtil.confirm('确认邮件恢复吗？',function(rtn){
				if(!rtn)
					return;
				var url = __ctx + '/platform/mail/outMail/recover.htm?id='+id;
				$.post(url,function(responseText){
					DialogUtil.close(index);
					var resultMessage=new com.lc.form.ResultMessage(responseText);
					if(resultMessage.isSuccess()){
						$(me.consts.GRID).trigger("reloadGrid"); // 重新载入
						DialogUtil.alert(resultMessage.getMessage());
					}else{
						DialogUtil.error(resultMessage.getMessage());
					}
			   });
			})
		},
		
		_setData:function(){
			var me = this;
			var sendee = $("#sendee")[0].textContent;
			if(sendee==""){
				sendee = $("#sendee").val();
				if(sendee == ""||sendee==undefined||sendee==null){
					return false;
				}
			}
			var sendeeArr = me._mailFormat(sendee);
			$("#receiverNames").val(sendeeArr[0]);
			$("#receiverAddresses").val(sendeeArr[1]);
			
			var ccDiv = $("#ccDiv")[0].style.display;
			if(ccDiv==''){
				var cc = $("#cc")[0].textContent;
				if(cc!=""){
					var ccArr = me._mailFormat(cc);
					$("#ccNames").val(ccArr[0]);
					$("#ccAddresses").val(ccArr[1]);
				}
			}
			var blindDiv = $("#blindDiv")[0].style.display;
			if(blindDiv==''){
				var blind = $("#blind")[0].textContent;
				if(blind!=""){
					var blindArr = me._mailFormat(blind);
					$("#bccNames").val(blindArr[0]);
					$("#bccAddresses").val(blindArr[1]);
				}
			}
			return true;
		}
	};
})();


