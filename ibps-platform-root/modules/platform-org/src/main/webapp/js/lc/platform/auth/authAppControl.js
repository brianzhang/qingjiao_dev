/**
 * 应用管理
 * <div class="fr-selector" data-toggle="app-selector" data-single="false" data-bindKey="m:authAppApi:appKey">
 *	<ul class="selector-list"></ul>
 *	<textarea style="display: none" data-control="app-selector" name="m:authAppApi:appKey" >${authAppApi.appKey}</textarea>
 * </div>
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016-02-26 15:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function(){
	appControl = new AppControl();
	appControl.init();  //初始化操作
});

(function() {
	var paths  = [
                  "/js/lc/platform/auth/authAppDialog.js"
              ];
	
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ __ctx + pi +'"></script>');
    }

    AppControl = function() {
    	//定义属性
		this.addTemplate= '<label clsss="selector-empty-data">'+
							'<div class="plus">+</div>'+
							'<div class="selector-empty">请选择</div>'+
						'</label>';
		this.template = '<li class="selector-item" data-appKey="#appKey#">'+
							'<i class="fa fa-globe"></i><span>#appKey#</span>'+
							'<a class="btn btn-ms fr-selector-remove" data-toggle="selector-remove" title="移除" href="javascript:void(0);"><i class="fa fa-remove"></i></a>'+
						'</li>';
		this.readTemplate = '<li class="selector-item" >'+
								'<i class="fa fa-user"></i><span>#appKey#</span>'+
							'</li>';
	};

	/**
	 * 方法
	 */
	AppControl.prototype = {
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			this.initData();
			
			this.initActions();
		},
		/**
		 * 初始化数据
		 */
		initData:function(parent){
			var me = this;
			if(	$.isEmpty(parent))
				parent = $(".fr-selector");
			parent.each(function(){
				var self=$(this),
					  selector =$('textarea[data-control="app-selector"]',self),
					  bindKey = self.data("bindKey")?$("[name='"+self.data("bindKey")+"']"):'',
					  rights = self.data("rights")?self.data("rights"):"e",
					  selectors = me.getSelectorVal(selector,bindKey),
					  selectorList = self.find(".selector-list");
				
				me.insertHtml(selectorList,selectors,rights);
			});
		},
		/**
		 * 初始化操作事件
		 */
		initActions:function(){
			var me = this; 
		      //选择
		  	$(document).on("click", "[data-toggle='app-selector']", function() {
		  		var self = $(this),
		  			selector=  $('textarea[data-control="app-selector"]',self),
		  			rights = self.data("rights")?self.data("rights"):"e";
		  			
		  		if(selector.length == 0 || rights=='r')
		  			return ;
	  			me.selectorDialog(self);
		  	});
		  	//删除
			$(document).on("click", "[data-toggle='selector-remove']", function(e) {
				e.preventDefault(); e.stopPropagation();
			    var selectors,
			    	 selectorItem = $(this).closest(".selector-item"),
			    	 frSelector = $(this).closest(".fr-selector"),
			    	 rights = frSelector.data("rights")?frSelector.data("rights"):"e",
			    	 selector =$('textarea[data-control="app-selector"]',frSelector),
			    	 selectorList = frSelector.find(".selector-list"),
					 bindKey = frSelector.data("bindKey")?$("[name='"+frSelector.data("bindKey")+"']"):'',
					 index = frSelector.find('.selector-item').index(selectorItem);
					  
				//删除数据
				selectors = me.removeSelector(selector,bindKey,index);
				//删除的选项
			    selectorItem.remove();
			    if(selectors.length ==0 && rights=='e'){ // 如果是空  要add模版 
					selectorList.append(me.addTemplate);
			    }
		  	});
		},
		/**
		 * 获取选择器数据
		 */
		getSelectorVal:function(selector,bindKey){
			var selectorVal = selector.val();
			if($.isEmpty(bindKey)){
				return $.isEmpty(selectorVal)?[]: selectorVal.split(",");
			}else{
				var bindKeyVal =$.isEmpty(bindKey.val())?'': bindKey.val(),
					appKeys = selectorVal.split(",");
				return appKeys;
			}
		},
		/**
		 * 设置选择器数据
		 */
		setSelectorVal:function(selectors,selector,bindKey){
			if($.isEmpty(bindKey)){ //未绑定id
				selector.val(selectors.join(','));
			}else{
				selector.val(selectors.join(','));
				bindKey.val(selectors.join(','));
			}
		},
		/**
		 * 删除选择器数据
		 */
		removeSelector:function(selector,bindKey,idx){
			var  selectors =   this.getSelectorVal(selector,bindKey);
			selectors =selectors.slice(0);
			selectors.splice(idx, 1);
			this.setSelectorVal(selectors,selector,bindKey);
			return selectors;
		},
		insertHtml:function($selectorList,selectorVal,rights){
			if($.isEmpty(selectorVal)){
				if( rights=='e') selectorList.append(this.addTemplate);
				return;
			}
			var html = this.getHtml(selectorVal,rights);
			$selectorList.empty();
			if($.isEmpty(html)&& rights=='e'){//判断是有值
				selectorList.append(this.addTemplate);
			}else{
				if(!$.isEmpty(html)) $selectorList.append($(html));
			}
		},
		getHtml:function(data,rights){
			var str ="";
			for(var i=0,c;c=data[i++];){
				str+=this.getSelectorHtml(c,rights);
			}
			return str;
		},
		getSelectorHtml:function(v,rights){
			var t  = rights == 'r'?this.readTemplate:this.template;
			return t.replaceAll("#appKey#", v);
		},
		/**
		 * 选择器窗口
		 */
		selectorDialog:function(self){
			var 	_this = this,
					selectorList = self.find(".selector-list");
			    	isSingle = self.data("single"),
			    	selector=  $('textarea[data-control="app-selector"]',self),
					bindKey = self.data("bindKey")?$("[name='"+self.data("bindKey")+"']"):'',
					selectors =_this.getSelectorVal(selector,bindKey);
		    		
			new AuthAppDialog({
				isSingle:isSingle, // 是否单选
				params:_this.buildData(selectors),
				callback : function(appKeys, appNames) {
					_this.setSelectorData(appKeys, appNames,selector,bindKey,selectorList);
				}
			}).show();
		},
		buildData : function(appKeys){
			var _i,_len,selectors =[];
			if($.isEmpty(appKeys) || appKeys.length == 0){
				return selectors;
			}
			for (_i = 0, _len = appKeys.length; _i < _len; _i++) {
				if(!$.isEmpty(appKeys[_i])){
					selectors.push({
						appKey:appKeys[_i],
						appName:appKeys[_i]
					});
				}
			}
			return selectors;
		},
		/**
		 * 设置数据
		 */
		setSelectorData:function(appKeys,appNames,selector,bindKey,selectorList){
			var selectors = appKeys;
			this.setSelectorVal(selectors,selector,bindKey);
			this.insertHtml(selectorList,selectors);
		}
	};
})();
