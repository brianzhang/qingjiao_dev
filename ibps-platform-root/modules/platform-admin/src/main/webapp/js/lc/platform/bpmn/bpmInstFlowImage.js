function showMore(instId, nodeId, approvalId){
	var url = __ctx+'/platform/bpmn/bpmTask/nodeExecutor.htm?instId='+instId+"&nodeId="+nodeId;
	if(undefined !== approvalId && 'undefined' !== approvalId){
		url += "&approvalId="+approvalId;
	}
	
	DialogUtil.dialog({
		title:"节点候选人列表",
		content: url,
		params: {},
		area:['66%','88%'],
		 btn:[
             {
            	label: '关闭',
            	iconCls:'btn btn-danger fa fa-cancel',
                action: function(dialog,index) {
                	DialogUtil.close(index);
                }
            }]
	});
}

$(function(){
		$("div.flowNode").each(function(e){
			var $el=$(this),data=$el.data(),
				nodeId=data.nodeId,
				nodeType = data.nodeType;
			if(nodeType=='userTask' || nodeType=='signTask'){
				$el.css('cursor','pointer');
				//只有用户任务和会签任务显示节点。
				showFlowDetails($el,data);
			}else if(nodeType=='callActivity'){
				$el.css('cursor','pointer');
				$el.click(function(){
					var conf = {nodeId:nodeId,processInstanceId:processInstanceId};
					viewSubFlow(conf);
				});
			}
		});	
			
			/** 
			 * 对日期进行格式化， 
			 * @param date 要格式化的日期 
			 * @param format 进行格式化的模式字符串
			 *     支持的模式字母有： 
			 *     y:年, 
			 *     M:年中的月份(1-12), 
			 *     d:月份中的天(1-31), 
			 *     H:小时(0-23), 
			 *     m:分(0-59), 
			 *     s:秒(0-59), 
			 *     S:毫秒(0-999),
			 *     q:季度(1-4)
			 * @return String
			 * @author yanis.wang
			 * @see	http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
			 */
			template.helper('dateFormat', function (date, format) {
				if($.isEmpty(date))
					return '';
			    date = new Date(date);

			    var map = {
			        "M": date.getMonth() + 1, //月份 
			        "d": date.getDate(), //日 
			        "H": date.getHours(), //小时 
			        "m": date.getMinutes(), //分 
			        "s": date.getSeconds(), //秒 
			        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
			        "S": date.getMilliseconds() //毫秒 
			    };
			    format = format.replace(/([yMdHmsqS])+/g, function(all, t){
			        var v = map[t];
			        if(v !== undefined){
			            if(all.length > 1){
			                v = '0' + v;
			                v = v.substr(v.length-2);
			            }
			            return v;
			        }
			        else if(t === 'y'){
			            return (date.getFullYear() + '').substr(4 - all.length);
			        }
			        return all;
			    });
			    return format;
			});
			//毫秒转换成 **天**小时**分**秒的格式
			template.helper('time', function (time, format) {
			
		        var day = (time / 1000 / 60 / 60 / 24) << 0
		        	hour = (time / 1000 / 60 /60) % 24 << 0,
		        	min = (time / 1000 / 60) % 60 << 0,
		            sec = Math.round((time / 1000) % 60),
		            result = [];
		        
		        if(day){
		        	result.push(day + '天');
		        }
		        if(hour){
		        	result.push(hour+'小时');
		        }
		        if(min){
		        	result.push(min+'分');
		        }
		        if(!isNaN(sec)&&sec){
		        	result.push(sec+'秒');
		        }
		        return result.join('');
			});
			
			function showFlowDetails($el,data){
				var setting = {
						content:{
							text:function(el,api){
								$.ajax({ url: __ctx + "/platform/bpmn/bpmTask/nodeApproval.htm",
									data:{instId:data.instId,nodeId:data.nodeId}
								})
				                .done(function(d) {
				        			var html = template('approvalTemplate', {d:d});
				                	
				                    api.set('content.text',html);
				                })
				                .fail(function(xhr, status, error) {
				                    api.set('content.text', status + ': ' + error);
				                })

				            return '加载中...';
							},
							title:'任务审批详情'
						},
						hide: {
							event:'mouseleave',
	   			        	leave: false,
	   			        	fixed:true,
	   			        	delay:200
				        }, 
						position: {
					        viewport: $(window),
					        my: 'center left',
					        at:'center right'
					    },
						style: {
							classes: 'qtip-default  qtip qtip-bootstrap qtip-shadow'
					    }
					  };
		//添加tooltip显示审批详情
				$el.qtip(setting);
			};
			
			/**
			 * 滚动
			 */
		    	$(".niceScroll").niceScroll({
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
		    	$(".niceScroll").getNiceScroll().resize();
		});