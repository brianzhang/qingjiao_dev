/**
 * 选择器。
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-26 15:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function(){
	selectorControl = new SelectorControl();
	selectorControl.init();  //初始化操作
});

(function() {
		
	SelectorControl = function() {
		//定义属性
		this.addTemplate= '<label clsss="selector-empty-data">'+
										'<div class="plus">+</div>'+
										'<div class="selector-empty">请选择</div>'+
									'</label>';
		this.template = '<li class="selector-item" data-id="#id#">'+
									'<i class="fa fa-user"></i><span>#name#</span>'+
									'<a class="btn btn-ms fr-selector-remove" data-toggle="selector-remove" title="移除" href="javascript:void(0);"><i class="fa fa-remove"></i></a>'+
								'</li>';
		this.readTemplate = '<li class="selector-item" >'+
											'<i class="fa fa-user"></i><span>#name#</span>'+
										'</li>';
	};

	/**
	 * 方法
	 */
	SelectorControl.prototype = {
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
						  selector =$('textarea[data-control="selector"]',self),
						  bindId = self.data("bindId")?$("[name='"+self.data("bindId")+"']"):'';
						  type = self.data("type") ,
						  store=self.data("store");
						  rights = self.data("rights")?self.data("rights"):"e",
						  selectors= me.getSelectorVal(selector,bindId,type,store);
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
			  	$(document).on("click", "[data-toggle='selector']", function() {
			  		var self = $(this),
			  			selector=  $('textarea[data-control="selector"]',self),
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
				    	 selector =$('textarea[data-control="selector"]',frSelector),
				    	 selectorList = frSelector.find(".selector-list");
						 bindId = frSelector.data("bindId")?$("[name='"+frSelector.data("bindId")+"']"):'',
						 index = frSelector.find('.selector-item').index(selectorItem);
						  
					//删除数据
					selectors=   me.removeSelector(selector,bindId,index);
					//删除的选项
				    selectorItem.remove();
				    if(selectors.length ==0 && rights=='e'){ // 如果是空  要add模版 
						selectorList.append(me.addTemplate);
				    }
			  	});
			},
			/**
			 * 构建选择器数据
			 */
			buildSelects:function(ids,names){
				var _i,_len,selectors =[];
				if($.isEmpty(ids) || ids.length == 0){
					return selectors;
				}
				for (_i = 0, _len = ids.length; _i < _len; _i++) {
					if(!$.isEmpty(ids[_i])){
						selectors.push({
							id:ids[_i],
							name:names[_i]
						});
					}
				}
				return selectors;
			},
			/**
			 * 获取选择器数据
			 */
			getSelectorVal:function(selector,bindId,type,store){
				var selectorVal = selector.val();var names = [];var ids =[];
				if($.isNotEmpty(selectorVal)){
					switch (store) {
					case 'bind':
						var bindIdVal =$.isEmpty(bindId.val())?'': bindId.val(),
								ids= bindIdVal.split(","),
								names =selectorVal.split(",");
							if($.isEmpty(bindIdVal) &&$.isNotEmpty(selectorVal) ){
								ids = names;
							}
						break;
					case 'id':
						ids =selectorVal.split(",");
						if($.isNotEmpty(ids)){
							for (_i = 0, _len = ids.length; _i < _len; _i++) {
								name = this.getNameValue(type,ids[_i]);
								names.push(name);
							}
						}
					
						break;
					case 'json':
						jsonVal = $.parseJSON(selectorVal);
						for (_i = 0, _len = jsonVal.length; _i < _len; _i++) {
							if($.isEmpty(bindIdVal) ){
								ids.push(jsonVal[_i].id);
							}
							names.push(jsonVal[_i].name);
						}
					default:
					break;
					}	
				}
				return this.buildSelects(ids,names);
			},
			/**
			 * 根据id和type获得name
			 */
			getNameValue:function(type,id){
		    		$.ajax({
						  type: "GET",
						  url: __ctx+ "/platform/org/partyUser/getSelectorInfo.htm",
						  data:{
							  type:type,
				      	      id:id
						  },
						  dataType: "json",
						  async: false,
						  success: function(data){
							  name=data.name
						  }
			    	});
		    		 return name;
		    },
			/**
			 * 设置选择器数据
			 */
			setSelectorVal:function(selectors,selector,bindId,store){
				switch (store) {
				case 'bind':
					selector.val( _.compact(_.pluck(selectors, 'name')).join(','));
					bindId.val( _.compact(_.pluck(selectors, 'id')).join(','));
					break;
				case 'id':
					selector.val( _.compact(_.pluck(selectors, 'id')).join(','));
					break;
				case 'json':
					selector.val(JSON.stringify(selectors));
				default:
				break;
				}	
			},
			/**
			 * 删除选择器数据
			 */
			removeSelector:function(selector,bindId,idx){
				var  selectors =   this.getSelectorVal(selector,bindId);
				selectors =selectors.slice(0);
				selectors.splice(idx, 1);
				this.setSelectorVal(selectors,selector,bindId);
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
					if(!$.isEmpty(html))
						$selectorList.append($(html));
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
				return t.replaceAll("#id#", v.id).replaceAll("#name#",v.name);
			},
		
			/***
			 * 用户数据转换
			 */
			userDataConvert:function(selector){
		    	var params = [];
				if(selector.length  == 0)
					return [];
				for (_i = 0, _len = selector.length; _i < _len; _i++) {
					params.push({
						id:selector[_i].id,
						fullname:selector[_i].name
					});
				}
				return params;
			},
			/**
			 * 选择器窗口
			 */
			selectorDialog:function(self){
				var 	_this = this,
						selectorList = self.find(".selector-list");
						type = self.data("type") ,
				    	isSingle = self.data("single"),
				    	selector=  $('textarea[data-control="selector"]',self),
						bindId = self.data("bindId")?$("[name='"+self.data("bindId")+"']"):'';
						selectors =_this.getSelectorVal(selector,bindId);
		    	if(!type){
		    		DialogUtil.msg("请设置选择器类型!");
		    		return;
		    	}
			    		
				switch (type) {
					case 'user':
						new PersonDialog({
							isSingle:isSingle, // 是否单选
							params:this.userDataConvert(selectors),	
							callback : function(ids, names) {
								_this.setSelectorData(ids, names,self);
							}
						}).show();
						break;
					case 'role':
						new RoleDialog({
							isSingle:isSingle,
							params:selectors,	
							callback : function(ids,names) {
								_this.setSelectorData(ids, names,self);
							}
						}).show();
						break;
					case 'org':
						new OrgDialog({
							isSingle:isSingle,
							params:selectors,	
							callback : function(ids,names) {
								_this.setSelectorData(ids, names,self);
							}
						}).show();
						break;
					case 'position':
						new PositionDialog({
							isSingle:isSingle,
							params:selector,	
							callback : function(ids,names) {
								_this.setSelectorData(ids, names,self);
							}
						}).show();
						break;
					case 'party':
						new PartyDialog({
							isSingle:isSingle,
							partyType:options.partyType,
							params:selectors,	
							callback : function(ids,names) {
								_this.setSelectorData(ids, names,self);
							}
						}).show();
						break;
					case 'group':
						new GroupDialog({
							isSingle:isSingle,
							dimKey:options.dimKey,
							params:selectors,	
							callback : function(ids,names) {
								_this.setSelectorData(ids, names,self);
							}
						}).show();
						break;
					default:
						break;
				}
			},
			/**
			 * 设置数据
			 */
			setSelectorData:function(ids,names,self){
				selectorList = self.find(".selector-list");
				store=self.data("store")
		    	selector=  $('textarea[data-control="selector"]',self),
				bindId = self.data("bindId")?$("[name='"+self.data("bindId")+"']"):'';
				var selectors = this.buildSelects(ids,names)
				this.setSelectorVal(selectors,selector,bindId,store);
				this.insertHtml(selectorList,selectors);
			}
	};
})();