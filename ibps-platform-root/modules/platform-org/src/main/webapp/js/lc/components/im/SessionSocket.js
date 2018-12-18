/**
 *  IBPS 即时通讯
 */
// Let the library know where WebSocketMain.swf is:
var WEB_SOCKET_SWF_LOCATION = __ctx+"/media/swf/webSocket/WebSocketMain.swf";
var WEB_SOCKET_DEBUG = true;
var WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;
var SessionWs = {
	//设置最小化后标题 
//    appName     :    __wsTitle? __wsTitle:'即时通讯', 
    // 初始化数据接口
//    initUrl           :  __ctx + '/components/im/initJson.htm',
//    //发送消息接口
//    sendMessageUrl    :__ctx + '/components/im/sendMessage.htm',
//    //获取成员接口
//    membersUrl        :__ctx + '/components/im/membersJson.htm',
//    //获取成员ids接口
//    memberIdsUrl        :__ctx + '/components/im/memberIdsJson.htm',
//    //上传图片
//    uploadImageUrl  : __ctx + '/components/im/upload.htm' ,
//    //上传记录
//    uploadFileUrl     :  __ctx + '/components/im/upload.htm',
//    //聊天记录
//    chatLogUrl        : __ctx + '/components/im/im/chatLog.htm',
//    //修改个性签名
//    signUrl		:	 __ctx + '/components/im/changeSign.htm',
//    
//    bindUrl           :  __ctx + '/components/im/bind.htm',
    address           : __wSessionUrl+__currentUserId,
    isMobile          : false,
    findUrl           : false,
    userInfo          : null,
    inited            : 0,
    socket            : null,
    jq                : null,
    open              : function() {
    	if(__wsSupport == 'false') return;
        if (this.inited) return;
        if(this.isIE6or7()) return;
        if(!this.jq) this.jq = $;
        this.connectWebSocket();
        this.inited = 1;
    },
    isIE6or7 : function(){
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE 5]><i></i><![endif]--><!--[if IE 6]><i></i><![endif]--><!--[if IE 7]><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    },
    connectWebSocket : function() {
    	SessionWs.socket        = new WebSocket(SessionWs.address);
    	SessionWs.socket.onopen = function(){
    		SessionWs.socket.send(JSON.stringify({type: 'init',client_id:__currentUserId}));
        };

        SessionWs.socket.onmessage = function(e){
            var msg = JSON.parse(e.data);
            // 如果layim还没有初始化就收到消息则忽略（init消息除外）
            if(!msg.message_type) return;
            switch(msg.message_type) {
                case 'init':
                    SessionWs.initSessionWs();
                    return;
                case 'close':
//                	SessionWs.socket.close();
        			$.post(__kickoutUrl,{}
        	            	,function (result) {
        	            		
        	            	}
        	            );
                    return;
            }
        }
    },
    sendHeartbeat : function() {
        if(SessionWs.socket && SessionWs.socket.readyState == 1) {
        	SessionWs.socket.send(JSON.stringify({type :'ping'}));
        }
    },
    initSessionWs : function(){

        // 心跳数据，用来保持长链接，避免socket链接长时间不通讯被路由节点防火墙关闭
        setInterval('SessionWs.sendHeartbeat()', 2000);
        
    }
};

$(function(window) {
	SessionWs.open();
});
