/**
 * 外部数据表管理。
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017-05-12 15:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function(){
	externalTableControl = new ExternalTableControl();
	externalTableControl.init();  //初始化操作
});


(function() { 	

	var paths  = [
                  "/js/plugins/underscore/underscore.min.js"
              ];
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ __ctx + pi +'"></script>');
    }

    ExternalTableControl = function() {
    	//定义属性
		this.addTemplate= '<label clsss="selector-empty-data">'+
								'<div class="plus">+</div>'+
								'<div class="selector-empty">请选择</div>'+
							'</label>';
		this.template = '<li class="selector-item" data-id="#id#">'+
							'<span>#name#</span>'+
							'<a class="btn btn-ms fr-selector-remove" data-toggle="exttbl-remove" title="移除" href="javascript:void(0);"><i class="fa fa-remove"></i></a>'+
						'</li>';
		this.readTemplate = '<li class="selector-item" >'+
								'<span>#name#</span>'+
							'</li>';
	};

	/**
	 * 方法
	 */
	ExternalTableControl.prototype = {
			
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
			initData:function(parent){
				var me = this;
				if(	$.isEmpty(parent))
					parent = $(".fr-exttbl");
				parent.each(function(){
					var self=$(this),
						  selector =$('textarea[data-control="exttbl"]',self),
						  bindId = self.data("bindId")?$("[name='"+self.data("bindId")+"']"):'';
						  rights = self.data("rights")?self.data("rights"):"e",
						  selectors= me.getSelectorVal(selector,bindId);
						  selectorList = self.find(".selector-list");
					me.insertHtml(selectorList,selectors,rights);
				});
			},
			initActions:function(){
				var me = this; 
			    
				//选择
			  	$(document).on("click", "[data-toggle='exttbl']", function() {
			  		var self = $(this),
			  			selector=  $('textarea[data-control="exttbl"]',self),
			  			rights = self.data("rights")?self.data("rights"):"e";
				  	
			  		if(selector.length == 0 || rights=='r')
				  		return;
			  		me.selectorDialog(self);
			  	});
			  	
			  	//删除
				$(document).on("click", "[data-toggle='exttbl-remove']", function(e) {
					e.preventDefault(); e.stopPropagation();
				    var selectors,
				    	 selectorItem = $(this).closest(".selector-item"),
				    	 frSelector = $(this).closest(".fr-exttbl"),
				    	 rights = frSelector.data("rights")?frSelector.data("rights"):"e",
				    	 selector =$('textarea[data-control="exttbl"]',frSelector),
				    	 selectorList = frSelector.find(".selector-list");
						 bindId = frSelector.data("bindId")?$("[name='"+frSelector.data("bindId")+"']"):'',
						 index = frSelector.find('.selector-item').index(selectorItem);

					//删除数据
					selectors = me.removeSelector(selector, bindId, index);
					//删除的选项
				    selectorItem.remove();
				    if(selectors.length == 0 && rights == 'e'){
				    	// 如果是空  要add模版 
						selectorList.append(me.addTemplate);
				    }
			  	});
			},
			
			/**
			 * 构建选择器数据
			 */
			buildSelects:function(ids, names){
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
			getSelectorVal:function(selector, bindId){
				var selectorVal = selector.val();
				if($.isEmpty(bindId)){
					return $.isEmpty(selectorVal)?[]: $.parseJSON(selectorVal);
				}else{
					var bindIdVal =$.isEmpty(bindId.val())?'': bindId.val(),
						ids= bindIdVal.split(","),
						names = selectorVal.split(",");
					
					if($.isEmpty(bindIdVal) &&$.isNotEmpty(selectorVal) ){
						ids = names;
					}
					
					return this.buildSelects(ids, names);
				}
			},
			/**
			 * 设置选择器数据
			 */
			setSelectorVal:function(selectors, selector, bindId){
				if($.isEmpty(bindId)){ //未绑定id
					selector.val(JSON.stringify(selectors));
				}else{
					selector.val(_.compact(_.pluck(selectors, 'name')).join(','));
					bindId.val(_.compact(_.pluck(selectors, 'id')).join(','));
				}
			},
			/**
			 * 删除选择器数据
			 */
			removeSelector:function(selector,bindId,idx){
				var selectors = this.getSelectorVal(selector, bindId);
				selectors =selectors.slice(0);
				selectors.splice(idx, 1);
				this.setSelectorVal(selectors, selector, bindId);
				return selectors;
			},
			insertHtml:function($selectorList,selectorVal,rights){
				if($.isEmpty(selectorVal)){
					if( rights == 'e') selectorList.append(this.addTemplate);
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
			getSelectorHtml:function(v, rights){
				var t  = rights == 'r'?this.readTemplate:this.template;
				return t.replaceAll("#id#", v.id).replaceAll("#name#",v.name);
			},
			/**
			 * 选择器窗口
			 */
			selectorDialog:function(self){
				var 	_this = this,
						selectorList = self.find(".selector-list");
				    	isSingle = self.data("single"),
				    	selector=  $('textarea[data-control="exttbl"]', self),
						bindId = self.data("bindId")?$("[name='"+self.data("bindId")+"']"):'';
						selectors =_this.getSelectorVal(selector, bindId);
		    	
				DialogUtil.dialog({
					title:'选择外部数据表',
					content:__ctx+'/platform/bo/boDef/externalTable.htm',
					btn:[{
		            	label: '确定',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		              	  	var data = DialogUtil.getChildFrameWindow(index).getData();
		              	  	if($.isEmpty(data))
		              	  		return;
		              	  
		              	  	datas = [JSON.stringify(data)];
		              	  	names = [data.tableDesc];
		              	  	_this.setSelectorData(datas, names, selector, bindId, selectorList);
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
			/**
			 * 设置数据
			 */
			setSelectorData:function(ids, names, selector, bindId, selectorList){
				var selectors = this.buildSelects(ids, names)
				this.setSelectorVal(selectors, selector, bindId);
				this.insertHtml(selectorList, selectors);
			},
			/**
			 *  生成个随机的ID
			 * @returns {String}
			 */
			guid : function() {
				var a = function() {
					return Math.floor(Math.random() * 0x10000).toString(16);
				};
				return (a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a());
			}
	};
})();
