	


$(function(){
	formDefLinkage = new FormDefLinkage();
	formDefLinkage.init();
});

function getData(){
	return formDefLinkage.getValue();
}
		
(function() {
	/**
	 *数据联动 对象
	 * @returns {FormDefLinkage}
	 */
	FormDefLinkage = function() {
		
	};

	/**
	 * 方法
	 */
	FormDefLinkage.prototype = {
	init:function(){
		if (this.hasInit) // 是否已初始化
			return false;
		this.hasInit = true;
		
		var params =this.params=  frameElement.dialog.params;	
		
		this.bo= params.bo;
		
		this.linkageData= {};
     	
    	this.results = {};
		
		this.data = params.value;
	
		this.initDataSource();
		
		//
		this.initBoField();
		
		this.setValue();
		
		$("#curField").val(params.label);
	},
	initBoField :function(bo){
		var options =[];
		options.push('<option >-请选择对象字段-</option>');
		$.each(this.bo,function(i,n){
			options.push("<option value='"+n.key+"'>"+n.name+"</option>");
		});
		 
		 $("#boField").append(options.join(""));
	},
	initDataSource:function(){
		var $el =  $("#dataSource");
		var _this = this,
			$val = '',
			url =  __ctx+ "/platform/data/dataTemplate/getSelectorData.htm?type=valueSource",
			multiple = false,
			clear = false;
					
		var params = {
				placeholder:'请选择',
				theme: "bootstrap",
				language: "zh-CN",
				multiple: multiple,
				allowClear: clear,
				formatSelection : function (item) {
					return item.text;
				},  /*选择结果中的显示*/
	    		formatResult : function (item) {/*【搜索】列表中的显示*/
					return (item != undefined && item.text != undefined)?item.text:"";  
	    		},
	    		createSearchChoice : function(term, data) {
					/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
			        return {id: term, text: term};
			    },
				escapeMarkup : function (markup) {
					return markup;
				},

	    		initSelection:function (element, callback) {
	    			
	    			  $.ajax({
	  		            url: url, 
	  		            data: {"cascade": true},
	  		            dataType:'json',
	  		            async:true,
	  		            success: function (results) { 
	  		            	var data = results.data;
	  		            	var ret ={};
	  		                for (var d = 0; d < data.length; d++) {
	  		                    var item = data[d]; 
	  		                    if( item.key == _this.data.linkage)
	  		                    	ret = item;
	  		                }
	  		              ret.data = _this.data;
		  		          ret.id = ret.key;
		  		          ret.text = ret.name;
	  		              callback(ret);
	  		              
	  		            } 
	  		        }); 
			    	
	    		},
	    		templateSelection:function(item){
	    	    	if($.isEmpty(item.id))
			    		return "请选择数据来源";
	    	    	
			    	return item.text;
	    		},
	    		
	    		templateResult: function (item) {
				    if (!item || !item.id) { 
				    	return '';
				    }
				    return item.text;
				},
				ajax : {
    				    url: url,
    				    dataType: 'json',
    				    delay: 250,
    				    data: function (_params) {
    				    	var params = {};
    				    	params["queryName"] = _params.term;
    				    	params["cascade"] = true;
    				    	return params;
    				    }
    					,processResults: function (results) {
    			           		var data = results.data;
    					            //重命名字段名
    					            for (var i = 0; i < data.length; i++){
    					            	var item =  data[i];
    					                data[i].id = item.key;
    					                data[i].text = item.name;
    					                _this.results[item.key] = item;
    					            }
    					            return {
    					                results: data
    					            };
    					 },
    				     cache: true
    				}
			};
		
		$el.select2(params);
		
		$el.on("change", function (e,data) {
			var val = $el.val();
			if(val){
				var item =  _this.results[val];
				_this.changeLinkageData(item,data);
			}
			
         });
		 //再次加载默认值. 赋值. 
		if($.isNotEmpty(this.data)){
		     $.ajax({
		            url: url, 
		            data: {"cascade": true},
		            dataType:'json',
		            success: function (results) { 
		            	var data = results.data;
		       
		                for (var d = 0; d < data.length; d++) {
		                    var item = data[d]; 
		                    var option = new Option(item.name, item.key); 
		                    if( item.key == _this.data.dataSource)
		                    	  option.setAttribute("selected",true);
		                    $el.append(option);
		                    
		                    _this.results[item.key] = item;
		                }

		                $el.trigger('change',[_this.data]);//使用这个方法显示到select2上.
		              
		            } 
		        }); 
		}
	
		
	},
	changeLinkageData:function(item,data){
			if($.isEmpty(item))
				return;
			var queryColumns =  [],
				resultColumns =   [];
			if($.isNotEmpty(item.queryColumns)){
				queryColumns = JSON.parse(item.queryColumns);
			}
			if($.isNotEmpty(item.resultColumns)){
				resultColumns = JSON.parse(item.resultColumns);
			}
			
			var options =[];
				options.push("<option value=''>-关联数据字段-</option>");
			$.each(queryColumns,function(i,n){
				options.push("<option value='"+n.name+"'>"+n.label+"</option>");
			});
			$('#relyData').empty();
			$('#relyData').append(options.join(""));
			
			var options1 =[];
			options1.push("<option value=''>-关联数据字段-</option>");
			$.each(resultColumns,function(i,n){
				options1.push("<option value='"+n.name+"'>"+n.label+"</option>");
			});
			$('#dataField').empty();
			$('#dataField').append(options1.join(""));
			if(data){
		        $("#relyData").val(data.relyData);
				 $("#dataField").val(data.dataField);
			}
			
	},
	setValue:function(){
        $("#boField").val(this.data.field);	
	},
     getValue: function() {
    	 var dataSource = $("#dataSource").val();
    	 if($.isEmpty(dataSource)){
     		  DialogUtil.msg("请选择数据关联来源");
    		 return;
    	 }
    	var boField =  $("#boField").val();
      	 if($.isEmpty(boField)){
    		  DialogUtil.msg("请选择对象字段");
	   		 return;
	   	 }
    	var relyData =  $("#relyData").val();
     	 if($.isEmpty(relyData)){
   		  DialogUtil.msg("请选择关联数据字段");
	   		 return;
	   	 }
    	var dataField =  $("#dataField").val();
     	 if($.isEmpty(dataField)){
   		  DialogUtil.msg("请选择当前联动数据字段");
	   		 return;
	   	 }
    	
          return   {
 			 dataSource:dataSource,
			 field:boField,
			 relyData:relyData,
			 dataField:dataField
		};
     }
	}
})();