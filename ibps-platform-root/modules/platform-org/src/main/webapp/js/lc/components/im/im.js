/**
 * IM【即时通讯】
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016-11-19 14:19:05
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var im  = new IM();
	im.init();
});

(function() {
	//定义常量
	var 	_consts = {
			
	};
	/**
	 * IM【即时通讯】 对象
	 * @returns {IM}
	 */
	IM = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	IM.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.initChatLog();
		}
		/**
		 * 初始化消息内容
		 */
		,initChatLog : function(){
			var me = this;
			layui.use(['layim', 'laydate', 'laypage', 'layer'], function(){
				me.layim = layui.layim;
				me.laydate = layui.laydate;
				me. layer = layui.layer;
				me. laypage = layui.laypage;
				me.laytpl= layui.laytpl;
				me.render();
		        });
	
		}
		/**
		 * 数据渲染
		 */
		,render : function(params){
			if(!params){
				params ={};
			}
			params.page =params.page||1; 
			params.type =ref_type;
			params.refId=ref_id;
			var me = this
				,html = ''
				,url = __ctx + "/components/im/chatLogJson.htm";
			$('#LAY_view').html(html);
			$.post(url,params
            	,function (result) {
            		var data = result.rows;
            		for(var i = data.length -1; i >= 0; i --){
	    	            var item = JSON.parse(data[i].content);
	    	            var sendtime = parent.layui.data.date(item.timestamp, "YYYY-MM-DD hh:mm:ss");
	    	  		  if(item.id == parent.layui.layim.cache().mine.id){
	    	  			html += '<li class="layim-chat-mine">'+
	    	  							'<div class="layim-chat-user"><img src="'+item.avatar+'"><cite><i>'+sendtime+'</i>'+item.username+'</cite></div>'+
	    	  							'<div class="layim-chat-text">'+me.layim.content(item.content)+'</div>'+
	    	  						'</li>';
	    	  		  }else{
	    	  	     	  html += '<li>'+
	    	  	     	  					'<div class="layim-chat-user">'+
	    	  	     	  						'<img src="'+item.avatar+'"><cite>'+item.username+'<i>'+sendtime+'</i></cite>'+
	    	  	     	  					'</div>'+
	    	  	     	  					'<div class="layim-chat-text">'+me.layim.content(item.content)+'</div>'+
	    	  	     	  				'</li>';
	    	  		  }
	    		  }
	        /*        var html = me.laytpl(LAY_tpl.value).render({
	                    data: result.rows
	                  });*/
	            	$('#LAY_view').html(html);
	    	        // 分页
	            	me.laypage({
			            cont: 'LAY_page', //页码展示div的ID
		                pages: result.total, //通过后台拿到的总页数
		                curr: 	params.page, //当前页
			            groups: 5, //连续显示分页数
			            jump: function(obj, first){ //分页按钮事件
			            	   if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
			            		   params.page =obj.curr;
			            		   me.render(params);
			            	   }
			            }
			        });
            	}
            );
		}
	};
})();


