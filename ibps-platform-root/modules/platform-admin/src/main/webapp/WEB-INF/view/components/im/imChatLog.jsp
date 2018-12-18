<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  	<%@include file="/commons/include/get.jsp" %>
	<title>聊天记录</title>
	<style>
        body{overflow-x: hidden}
        .layui-layer {
            text-align: left;
        }
        body .layim-chat-main{height: auto;}
    </style>
    <f:link href="layui/css/layui.css" />
    <script type="text/javascript" src="${ctx}/js/plugins/layui/layui.js"></script>
	<script type="text/javascript">
		var ref_id = "${id}";
		var ref_type = "${type}";
		var page_total = "${pageTotal}";
	</script>
	 <script type="text/javascript" src="${ctx}/js/lc/components/im/im.js"></script>
</head>
  	<body>
		    <div class="layim-chat-main"  >
			  	<ul id="LAY_view"></ul>
				</ul>
		    </div>
			<div id="LAY_page"  style="z-index: 99999;position: fixed;bottom: 0;margin: 0 10px"></div>
	</body>
	
	<textarea title="消息模版" id="LAY_tpl" style="display:none;">
		{{# layui.each(d.data, function(index, item){
		  if(item.id == parent.layui.layim.cache().mine.id){ }}
		    <li class="layim-chat-mine"><div class="layim-chat-user"><img src="{{ item.avatar }}"><cite><i>{{ layui.data.date(item.timestamp) }}</i>{{ item.username }}</cite></div><div class="layim-chat-text">{{ layui.layim.content(item.content) }}</div></li>
		  {{# } else { }}
		    <li><div class="layim-chat-user"><img src="{{ item.avatar }}"><cite>{{ item.username }}<i>{{ layui.data.date(item.timestamp) }}</i></cite></div><div class="layim-chat-text">{{ layui.layim.content(item.content) }}</div></li>
		  {{# }
		}); }}
		</textarea>
	

</html>