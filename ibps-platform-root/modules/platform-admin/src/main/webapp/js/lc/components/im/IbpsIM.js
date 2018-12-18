/**
 * IBPS 即时通讯
 */
var WEB_SOCKET_SWF_LOCATION=__ctx+"/media/swf/webSocket/WebSocketMain.swf",WEB_SOCKET_DEBUG=!0,WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR=!0,IbpsIM={appName:__wsTitle?__wsTitle:"即时通讯",initUrl:__ctx+"/components/im/initJson.htm",sendMessageUrl:__ctx+"/components/im/sendMessage.htm",membersUrl:__ctx+"/components/im/membersJson.htm",memberIdsUrl:__ctx+"/components/im/memberIdsJson.htm",uploadImageUrl:__ctx+"/components/im/upload.htm",uploadFileUrl:__ctx+"/components/im/upload.htm",chatLogUrl:__ctx+"/components/im/im/chatLog.htm",signUrl:__ctx+"/components/im/changeSign.htm",bindUrl:__ctx+"/components/im/bind.htm",address:__wsUrl+__currentUserId,isMobile:!1,findUrl:!1,userInfo:null,inited:0,socket:null,jq:null,open:function(){"false"!=__wsSupport&&(this.inited||this.isIE6or7()||(this.jq||(this.jq=$),this.connectWebSocket(),this.inited=1))},isIE6or7:function(){var e=document.createElement("b")
return e.innerHTML="<!--[if IE 5]><i></i><![endif]--><!--[if IE 6]><i></i><![endif]--><!--[if IE 7]><i></i><![endif]-->",1===e.getElementsByTagName("i").length},connectWebSocket:function(){IbpsIM.socket=new WebSocket(IbpsIM.address),IbpsIM.socket.onopen=function(){IbpsIM.socket.send(JSON.stringify({type:"init",client_id:__currentUserId}))},IbpsIM.socket.onmessage=function(e){var i=JSON.parse(e.data)
if(i.message_type&&("init"==i.message_type||layui.layim))switch(i.message_type){case"init":return void IbpsIM.jq.post(IbpsIM.bindUrl,{client_id:i.client_id},function(e){1==e.result?IbpsIM.initIM(JSON.parse(e.message)):console.log("服务端返回失败："+e.msg)},"json")
case"addList":return 0==laychat.jq(".layim-friend"+i.data.id).length&&layui.layim.cache()&&layui.layim.cache().id!=i.data.id?layui.layim.addList&&layui.layim.addList(i.data):void("friend"==i.data.type&&layui.layim.setFriendStatus&&layui.layim.setFriendStatus(i.data.id,"online"))
case"chatMessage":return void("group"==i.data.type?i.data.from_id!=IbpsIM.userInfo.id&&layui.layim.getMessage(i.data):IbpsIM.userInfo.id!=i.data.id&&layui.layim.getMessage(i.data))
case"msgbox":return void(layui.layim.msgbox&&layui.layim.msgbox(i.count))
case"logout":case"hide":return layui.layim.setFriendStatus&&layui.layim.setFriendStatus(i.id,"offline")
case"online":return layui.layim.setFriendStatus&&layui.layim.setFriendStatus(i.id,"online")}},IbpsIM.socket.onclose=IbpsIM.connectWebSocket},sendHeartbeat:function(){this.socket&&1==this.socket.readyState&&this.socket.send(JSON.stringify({type:"ping"}))},initIM:function(e){var i=function(e){if(IbpsIM.jq.isArray(e.unread_message))for(var i in e.unread_message){layui.layim.getMessage(JSON.parse())
var s=e.unread_message[i]
"group"==s?uunreadMessage.from_id!=IbpsIM.userInfo.id&&layui.layim.getMessage(s):IbpsIM.userInfo.id!=s.id&&layim.getMessage(s)}e.unread_notice_count&&layui.layim.msgbox&&layui.layim.msgbox(e.unread_notice_count)},s=function(e){return IbpsIM.socket.send(JSON.stringify({type:e.status,id:e.id}))}
if(2==this.inited)return s(IbpsIM.userInfo),i(e)
this.inited=2,setInterval("IbpsIM.sendHeartbeat()",2e5)
var t=IbpsIM.isMobile?"mobile":"layim"
layui.use(t,function(t){if(IbpsIM.isMobile){var n=layui.mobile,t=n.layim,a=n.layer
layui.layim=t,layui.layer=a}t.on("ready",function(s){return i(e)}),t.on("sendMessage",function(e){var i=(new Date).getTime()
IbpsIM.jq.post(IbpsIM.sendMessageUrl,{timestamp:i,data:JSON.stringify(e)},function(s){1==s.result?IbpsIM.socket.send(JSON.stringify({type:"chatMessage",timestamp:i,data:e,members:s.memberIds})):layui.layer.msg(s.msg,{time:7e3})},"json")}),t.on("sign",function(e){IbpsIM.jq.post(IbpsIM.signUrl,{sign:e},function(e){1==e.result?IbpsIM.initIM(JSON.parse(e.message)):console.log("服务端返回失败："+e.msg)},"json")}),t.on("online",function(e){IbpsIM.socket.send(JSON.stringify({type:e,id:IbpsIM.userInfo.id}))}),t.on("ready",function(n){IbpsIM.userInfo=t.cache().mine,s(IbpsIM.userInfo),i(e)
var a=n.friend
for(var o in a){var r=a[o].list
for(var o in r){var l=r[o].id
layui.layim.setFriendStatus&&layui.layim.setFriendStatus(l,"offline")}}}),t.on("chatChange",function(e){}),t.config({init:{url:IbpsIM.initUrl},members:{url:IbpsIM.membersUrl},uploadImage:{url:IbpsIM.uploadImageUrl},uploadFile:{url:IbpsIM.uploadFileUrl},chatLog:IbpsIM.chatLogUrl,find:IbpsIM.findUrl,notice:!0,copyright:!0,min:!0,title:IbpsIM.appName})})}}
$(function(e){IbpsIM.open()})

