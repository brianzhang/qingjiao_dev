/**
 * 权限定义对话框
 * 
 * <br>
 * 引入js	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/common/RightsDefDialog.js"></script>

 * 
	使用说明：
	<p>	new RightsDefDialog({
				title:'栏目授权',
				key:'desktopColumn',
				entityId:id
				}).show();
	</p>
	参数说：
	<p>	
	
		title【可选】 : 标题。类型：String，默认：'权限定义对话框'；
		key:【必选】 : 对应的Key，类型：String
		entityId：必选】 : 对应的实体ID，
		url 【可选】：地址。类型 : String，默认：；
		params【可选】:传递参数。类型 : String、Boolean、Object、Array，推荐用JSON 对象，默认：null；
		data【可选】:是回填的数据
	</p>
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-01-06-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var defaults = {
			title:'权限定义',
			url:__ctx+'/platform/rights/rightsDef/dialog.htm',
			isSave:false //是否保存数据
	};
	
	/**
	 * 权限定义
	 * @param options
	 * @returns
	 */
	RightsDefDialog= function(options){
		this.options = $.extend({}, defaults, options);
	};
	
	RightsDefDialog.prototype={
			/**
			 * 显示窗口
			 */
			show:function(){
				var me=  this,options=me.options,url=options.url,key =options.key,entityId=options.entityId,isSave=options.isSave ;
				if($.isEmpty(key)){
					DialogUtil.alert("传入参数不足！");
					return;
				}
				url+="?key="+key 
				if(entityId){
					url+="&entityId="+entityId;
				}
				DialogUtil.dialog({
					title:options.title,
					content:url,
					params: options,
					area:['600px','90%'],
					 btn:[{
			            	label: isSave?'保存':'确定',
			            	iconCls:'btn btn-primary fa fa-ok',
			                action: function(dialog,index) {
			              	  var  data= DialogUtil.getChildFrameWindow(index).rightsDef.getData();
			              	  if($.isEmpty(data)){
			              		  DialogUtil.toastr("请设置权限！");
			              		  return;
			              	  }
			            	  if(options.isSave){//需要保存
			            		 me.saveData(data,index);
			            	  }else{
			                	  if(!options.callback){
				              		 DialogUtil.toastr("传入参数必须包含【callback】");
				              		 return;
				              	  }
					             options.callback(data,index);
					       	  	DialogUtil.close(index);
			            	  }
			                }
			            }, {
			            	label: '取消',
			            	iconCls:'btn btn-danger fa fa-cancel',
			                action: function(dialog,index) {
			                	DialogUtil.close(index);
			                }
			            }]
				});
			},
			/**
			 * 保存数据
			 * @param rights
			 * @param index
			 */
			saveData:function(rights,index){
				var me=  this,options=me.options,	url = __ctx+'/platform/rights/rightsDef/save.htm';
				$.post(url,{entityType:options.key,entityId:options.entityId,rights:JSON.stringify(rights)},function(responseText){	
					var msg = new com.lc.form.ResultMessage(responseText);
					if (msg.isSuccess()) {
						var ind = DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
								function(rtn) {
								if(rtn)
									DialogUtil.close(ind);
								else
									DialogUtil.close(index);
								});
					} else {
						DialogUtil.error(msg.getMessage());
					}
				});
			}
		};
})();