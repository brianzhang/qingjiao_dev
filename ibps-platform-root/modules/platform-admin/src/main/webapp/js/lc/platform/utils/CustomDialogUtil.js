/**
 * 自定义对话框
 */
CustomDialogUtil = {
		/**
		* 	alias:对话框别名
		*	params：查询参数 如果是function 则是回调方法；
		*	callback: 回调方法 ;
		*/
		open: function(alias,params,callback){
			var me = this,options={};
			if($.isEmpty(alias)){
				DialogUtil.alert("别名不能为空");
				return;
			}
			if (typeof (params) == "function") 
				options.callback = params;
			if(callback) options.callback = callback;
			if (typeof (params) == "object" && params != "") options.params = params;
			var url = __ctx+'/platform/form/customDialog/getByAlias.htm';
			
			$.post(url,{"alias":alias},function(data){
				me.preview(data,options);
			});
		},
		preview:function(data,options){
			var url =__ctx+'/platform/form/customDialog/show.htm?id='+data.id+'&style='+data.style;
			if(options.params)
				data.params = options.params;
			var width = data.width,height = data.height; 
			
				width =$.isEmpty(width)?'80%':((width<=100)?width+"%":width+"px");
				height =$.isEmpty(height)?'80%':((height<=100)?height+"%":height+"px");
			
			DialogUtil.dialog({
				title:options.title?options.title:data.name,
				content:url,
				params:data,//传递参数
				area:[width,height],
				btn:[{
		            	label: '确定',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		                	  var  d = DialogUtil.getChildFrameWindow(index).customDialogShow.getData();
		                	  if(!options.isClose)
		                		  DialogUtil.close(index);
		                	  if(options.callback)
		                		  options.callback(d,index);
		                }
				 	},{
		            	label: '清空',
		            	iconCls:' btn btn-success fa fa-clean',
		                action: function(dialog,index) {
		                	  if(!options.isClose)
		                		  DialogUtil.close(index);
		                	  if(options.callback)
		                		  options.callback([],index);
		                }
				 	},{
		            	label: '取消',
		            	iconCls:'btn btn-danger fa fa-cancel',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		                }
		            }]
			});
		},
		dialog:function(options){
			if(!options){
				DialogUtil.alert("请设置有效的参数！");
				return;
			}
			var width =options.width,height = options.height; 
				width =$.isEmpty(width)?'80%':((width<=100)?width+"%":width+"px");
				height =$.isEmpty(height)?'80%':((height<=100)?height+"%":height+"px");
		DialogUtil.dialog({
			title:options.title?options.title:"对话框",
			content:options.url,
			params:options.params?options.params:{},//传递参数
			area:[width,height],
			btn:[{
	            	label: '确定',
	            	iconCls:'btn btn-primary fa fa-ok',
	                action: function(dialog,index) {
	                	var  urlDialog = DialogUtil.getChildFrameWindow(index).UrlDialog;
	                	if(!urlDialog ){
	                		DialogUtil.alert("请在自定义对话框添加UrlDialog的getData()方法！");
	                		return;
	                	}
	                	var  d = urlDialog.getData();
	                	 
	                	  if(!options.isClose)
	                		  DialogUtil.close(index);
	                	  if(options.callback)
	                		  options.callback(d,index);
	                }
			 	},{
	            	label: '清空',
	            	iconCls:' btn btn-success fa fa-clean',
	                action: function(dialog,index) {
	                	  if(!o.isClose)
	                		  DialogUtil.close(index);
	                	  if(o.callback)
	                		  o.callback([],index);
	                }
			 	},{
	            	label: '取消',
	            	iconCls:'btn btn-danger fa fa-cancel',
	                action: function(dialog,index) {
	                	DialogUtil.close(index);
	                }
	            }]
		});
		}
}