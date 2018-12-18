/**
 * 下拉框管理
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017-03-22 09:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function(){
	select2Ext = new Select2Ext();
	select2Ext.init();  //初始化操作
});

(function() {
	/*
	 * <f:link href="select2/select2.min.css"/>
	 * <script type="text/javascript" src="${ctx}/js/plugins/select2/select2.min.js"></script>
	 * 
	 */
	
	/*
	cssPaths = [
	             "select2/select2.min.css"
	         ];
	scriptPaths = [
               "/js/plugins/select2/select2.min.js"
           ];
	for (var i=0,pi;pi = cssPaths[i++];) {
		document.write('<f:link href="'+ pi +'"/>');
	}
	for (var i=0,pi;pi = scriptPaths[i++];) {
		document.write('<script type="text/javascript" src="'+ __ctx + pi +'"></script>');
	}
	*/
	
	Select2Ext = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Select2Ext.prototype = {
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
					,options = $el.data()
					,ajax = options.ajax
					,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
					,split = $.isEmpty(options.split)?',':options.split
					;
				
				var params = {
					placeholder:'请选择'
					,language: "zh-CN"
					,multiple: multiple
					,allowClear: true
					//,minimumInputLength : 1
					,separator: split
					,formatSelection : function (item) {return item.id;}  /*选择结果中的显示*/
					,formatResult : function (item) {return item.id;}  /*搜索列表中的显示*/
					,escapeMarkup : function (markup) {return markup;}
					,createSearchChoice : function(term, data) {
						/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
				        return {id: term, text: term};
				    }
				};
				
				if(ajax){
					params.ajax = {
					    url: ajax,
					    dataType: 'json',
					    delay: 250,
					    data: function (_params) {
					    	return {
					    		tableName: _params.term // search term
					    	};
					    }
						,processResults: function (data) {
							return {
					          results: data
					        };
					     },
					     cache: true
					};
				}
				
				$el.select2(params);
				
				$el.on('select2:select', function (evt) {
					console.log("--->select2:select");
					var data = $el.select2("data");
					$("#tableComment").val(data.comment);
					
				});
			});
		}
	};
})();
