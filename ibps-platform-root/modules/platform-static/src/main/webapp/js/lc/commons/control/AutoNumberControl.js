/**
 * 自动编号控件。
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-26 15:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function(){
	autoNumberControl = new AutoNumberControl();
	autoNumberControl.init();  //初始化操作
});

(function() {
	

	AutoNumberControl = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	AutoNumberControl.prototype = {
			/**
			 * 初始化
			 */
			init : function() {
				if (this.hasInit) // 是否已初始化
					return false;
				this.hasInit = true;
	
				this.initData();
			},
			initData:function(parent){
				var me = this;
				if(	$.isEmpty(parent))
					parent = $("[data-toggle='autoNumber']");
				parent.each(function(){
		    	  	var $this=$(this),
		    	  		init = ($this.data("init") == "true" ||  $this.data("init"))?true:false,
		    	  		identity =$this.data("identity");
		    	  	
		    		if($.isEmpty(identity)){
	        			alert("未绑定编号");
	        			return true;
	        		}
		    		if(!init && $.isNotEmpty($this.val()))
		    			return true
		    	    $.get(  __ctx+ "/platform/system/identity/getNextIdByAlias.htm",{
		    	    	alias:identity
		    	    	},function(data){
		    	    		var rtn = eval('(' + data + ')');
		    	    		if(rtn.result == 1){
		    	    			$this.val(rtn.message);
		    	    		}
		    	    		else{
		    	    			alert(rtn.message);
		    	    		}
		    	    
		    	    });
		    
		    	});
			}
	}
})();