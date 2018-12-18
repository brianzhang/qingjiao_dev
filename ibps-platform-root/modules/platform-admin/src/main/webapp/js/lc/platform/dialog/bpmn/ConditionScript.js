/**
 * demo:
 * conf={};
 * conf.defId="10000019440143";//流程id
 * conf.nodeId="UserTask2";//任务节点
 * ConditionScript.showDialog(conf,function(data,dialog){
 * 		alert("返回结果："+data);//data为脚本string
 * 		dialog.dialog('close');//关闭弹出框
 * });
 */
//var ConditionScript={
//		showDialog:function(conf,method){
//			if(conf==null){
//				conf={};
//				conf.defId="10000019440143";//流程id
//				//conf.nodeId="UserTask2";//任务节点
//			}
//			if(method==null){
//				method = function(data){
//					alert("返回脚本："+data);
//				}
//			}
//			
//			var dialog;
//			var def = {
//			        passConf:null,title:"条件脚本选择器",width:800,height:600, modal:true,resizable:true,
//			        buttonsAlign:'center',
//					buttons:[{
//						text:'确定',
//						iconCls:'btn btn-primary fa-check-circle',
//						handler:function(e){
//								var win=dialog.innerWin;//获取自定义对话框   				
//								var data = win.getResult();//调用自定义对话框的jsp里面的方法获取结果
//								method(data,dialog);
//								dialog.dialog('close');
//						}
//					},{
//						text:'关闭',
//						iconCls:'btn btn-default fa-times-circle',
//						handler:function(){dialog.dialog('close');
//						}
//					}]
//			};
//			var url=__ctx+'/system/conditionScript/setting?defId='+conf.defId;
//			if(conf.nodeId!=null){
//				url+="&nodeId="+conf.nodeId;
//			}
//			dialog = $.topCall.dialog({
//				src:url,
//				base:def
//			});
//		}
//}

/**
 *  常用脚本选择框  
 *  调用方式
 *  new ConditionScript(function(script){ }).show();
 * 
 * <pre>
 * 作者：caixy
 * 邮箱：3286168767@qq.com
 * 日期：2016-1-7 17:47:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var defaults = {
			title:'常用脚本选择框',
			modal:true,
			resizable:true
	};
	
	/**
	 * 业务对象选择
	 * @param options
	 * @returns
	 */
	ConditionScript= function(options){
		this.opts = $.extend({}, defaults, options);
	};
	
	ConditionScript.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this;
				var url = __ctx+'/system/conditionScript/setting?defId='+this.opts.defId;
				if(this.opts.nodeId!=null){
					url+="&nodeId="+me.opts.nodeId;
				}
				DialogUtil.dialog({
					title:this.opts.title,
					content:url,
					params: me.opts.params,
					area:['75%','80%'],
					btn:[{
		            	label: ' 选择',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		              	  	var  data = DialogUtil.getChildFrameWindow(index).getData();
		              	  	if($.isEmpty(data)){
		              	  		DialogUtil.toastr("请选择数据！");
		              	  		return;
		              	  	}
		              	  	me.options.callback(data,index);
		              	  	DialogUtil.close(index);
		                }
		            }, {
		            	label: '取消',
		            	iconCls:'btn btn-danger fa fa-cancel',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		                }
		            }]
				});
			}
		};
})();


