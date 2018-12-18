/**
 * 自定义对话框。
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-26 15:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function(){
	customDialogControl = new CustomDialogControl();
	customDialogControl.init();  // 初始化操作
});

(function() {
	
	CustomDialogControl = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	CustomDialogControl.prototype = {
			/**
			 * 初始化
			 */
			init : function() {
				if (this.hasInit) // 是否已初始化
					return false;
				this.hasInit = true;
				
				this.initActions();
			},
			initActions:function(){
				
			  	$(document).on("click", "[data-toggle='customdialog']", function() {
			  		var _this =$(this),
			  			dialogType =	_this.data("type") || 'custom',
			  			dialogKey =	_this.data("dialog"),
			  			keyName =_this.data("name");
			    	if(dialogType =='custom' ){// 自定义对话框
			    		var bind = 	 _this.data("bind");	// 绑定的字段
			    		if($.isEmpty(bind)){
			    			DialogUtil.msg("未绑定字段");
			    			return ;
			    		}
			    		
			    		var	bindObj =  eval('(' + bind + ')');
			    		if(!bindObj || bindObj.length ==0 ){
			    			DialogUtil.msg("未绑定字段");
			    			return;
			    		}
			    		
				    	CustomDialogUtil.open(dialogKey,function(data){
				    		if(!data &&data.length == 0)
				    			return;
				    		_.each(bindObj,function(obj,i){
				    			var name = obj.name,field = obj.fieldName;
				    			if($.isEmpty(name) || $.isEmpty(field))
				    				return true;
				    			// // 设置指定的值 ,不同类型设置的值也是不同的，现在只有主表
				    			$("[name='"+keyName+name+"']").val(_.pluck(data,field).join(","));
				    		});
				    	});
			    	}else if(dialogType =='dialog' ){// 新自定义对话框
			    		var isSingle = _this.data("single") == 'false'?false :true;
			    		var curObj = $("input[name]",_this);
			    		
			    		DataTemplateUtil.open(dialogKey,{
			    		 	isSingle : isSingle,
			    			callback:function(data){
					    		if(!data &&data.length == 0)
					    			return true;
					    		curObj.val( _.compact(_.pluck(data, '#title#')).join(','));
					    		//设置当前值
					    		if(!bindObj || bindObj.length ==0 ){
					    			return true;
					    		}
					    		_.each(bindObj,function(obj,i){
					    			var name = obj.name,field = obj.fieldName;
					    			if($.isEmpty(name) || $.isEmpty(field))
					    				return true;
					    			// // 设置指定的值 ,不同类型设置的值也是不同的，现在只有主表
					    			$("[name='"+keyName+name+"']").val(_.pluck(data,field).join(","));
					    		});
			    			}
			    		});
			    	}else{// URL 方式
			    		
			    	}
			    	
			  	});
			}
	}
})();