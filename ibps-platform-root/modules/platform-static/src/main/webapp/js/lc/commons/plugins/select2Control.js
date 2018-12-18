/**
 * 下拉框管理
 * <pre>
 * 作者：lvmiancan
 * 邮箱：550804606@qq.com
 * 日期：2018-04-02 09:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function(){
	select2Control = new select2Control();
	select2Control.init();  //初始化操作
});

(function() {
	select2Control = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	select2Control.prototype = {
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;

			this.initData();
		},
		initData:function(){
			var me = this;
			$('[data-toggle="select2"]').each(function() {
				var $el = $(this)
        		var multiple = $el.data("multiple")=='Y';
        		var linkdata = $el.data("linkdata");
        		var __linkText = $el.data("text");
        		var placeholder = $el.data("placeholder");
        		val = $el.data("value");
        		dataValue=$.isNotEmpty(val) ?val:[];
        		clear = true;
        		disabled=false;
        		url =  __ctx+ "/platform/data/dataTemplate/getLinkData.htm";
        		rows = 20;
        		var params = {
        				theme: "bootstrap",
        				language: "zh-CN",
        				multiple: multiple,
        				allowClear: clear,
        				disabled:disabled,
        				placeholder:placeholder,
        				formatSelection : function (item) {  // 选择结果中的显示
        					return item.text;
        				},
        	    		formatResult : function (item) {// 【搜索】列表中的显示
        					return (item != undefined && item.text != undefined)?item.text:"";  
        	    		},
        	    		createSearchChoice : function(term, data) {	// 创建搜索结果（使用户可以输入匹配值以外的其它值）
        			        return {id: term, text: term};
        			    },
        				escapeMarkup : function (markup) {
        					return markup;
        				},
        				initSelection:function (element, callback) {
    				       	return  callback(dataValue);
    		    		},
        	    		templateSelection:function(item){
        	    	    	if(!item || $.isEmpty(item.id))
        			    		return  placeholder;
        			    	return item? item.text:'';
        	    		},
        	    		templateResult: function (item) {
        				    if (!item || !item.id) { 
        				    	return "";
        				    }
        				    return item.text;
        				},
        				ajax : {
        					    url: url,
        					    dataType: 'json',
        					    delay: 250,
        					    data: function (_params) {
        					    	return {
        					    		queryValue:_params.term,// 查询
        					    		queryKey:__linkText,
        					    		key:linkdata,
        					    		page : _params.page|| 1,// 第几页，分页哦
        	                          rows : rows// 每页显示多少行
        					    	};
        					    }
        						,processResults: function (results,params) {
        							var data = [];
        							if(results.result){
        					     		data = results.data;
        					            // 重命名字段名
        					            for (var i = 0; i < data.length; i++){
        					            	var item =  data[i];
        					                data[i].id = item[__linkText];
        					                data[i].text = item[__linkText];
        					            }
        							}else{
        								DialogUtil.msg(results.msg);
        							}
        			
        				            params.page = params.page || 1;
        				            return {
        				                results: data,
        				                pagination : {
        	                                more :  (params.page * rows) < results.totalCount// 总页数为10，那么1-9页的时候都可以下拉刷新
        	                            }
        				            };
        						 },
        					     cache: true
        					}
        			};
        		$el.select2(params);
        		if(!$.isEmpty(dataValue)){
        			$el.append("<option selected value='"+dataValue+"'>"+dataValue+"</option>");
    			}

			});
		}
	};
})();
