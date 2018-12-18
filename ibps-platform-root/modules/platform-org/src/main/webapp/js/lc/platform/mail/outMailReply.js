/**
 * 外部邮件回复
 * 
 * <pre>
 * 作者：huangchunyan
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
	var _consts = {
			FORM : '#outMailForm'// 表单form
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
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
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
					var flag = me._setData();
					if(flag==true)
						form.submit();
					else{
						$el.button('reset'); 
						DialogUtil.msg("收件人地址不能为空！");
					}
				}else{
					$el.button('reset'); 
				}
				
			});
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
				$("#types").val("drafts");
				$('#content').val(me.content.getContent());
				var flag = me._setData();
				if(flag==true)
					form.submit();
				else{
					$el.button('reset'); 
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
			var setID = $("#setId").val();
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
					//这里去掉了点击确定按钮，刷新功能。
					//1.没必要刷新，
					//2.在谷歌浏览器中使用了window.location.reload(true)会修改父页面地址，
					//而其他浏览器则没修改，造成点击返回按钮时无法返回到相同的页面
						if(!rtn){
							var url = __ctx+'/platform/mail/outMail/list.htm?setId='+setID+'&types=inbox';
							window.location.href = url;
							}
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		
		//加载富文本框显示
		_initEditor:function(){
			var me = this;
	   	   me.content = UE.getEditor('editor');
	   	   me.content.addListener("ready",function(editor){
	   		  	me.content.setContent($('#content').val());
	   	   });
		},
		
		//上传附件回调函数
		attachmentCallback:function(data){
			if($.isEmpty($("#subject").val()) && data.length >0){
				$("#subject").val(data[0].fileName);
			}
		},
		
		//根据设置邮件地址;截取
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
		
		//设置收件人，抄送人，密送人的约束必填
		_setData:function(){
			var me = this;
			var sendee = $("#sendee").val();
			//收件人是否有值
			if(sendee == ""||sendee==undefined||sendee==null){
				return false;
			}
			var sendeeArr = me._mailFormat(sendee);
			$("#receiverNames").val(sendeeArr[0]);
			$("#receiverAddresses").val(sendeeArr[1]);
			return true;
		}
	};
})();


