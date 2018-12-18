	


$(function(){
	formDefLinkdataConfig = new FormDefLinkdataConfig();
	formDefLinkdataConfig.init();
});

function getData(){
	return formDefLinkdataConfig.getValue();
}
		
(function() {
	/**
	 *数据联动 对象
	 * @returns {FormDefLinkdataConfig}
	 */
	FormDefLinkdataConfig = function() {
		
	};

	/**
	 * 方法
	 */
	FormDefLinkdataConfig.prototype = {
	init:function(){
		if (this.hasInit) // 是否已初始化
			return false;
		this.hasInit = true;
		
		var params =this.params=  frameElement.dialog.params;	
		this.resultColumns = params.resultColumns;
		this.data = params.data;

		this.initLinkDataId();
		this.initLinkDataText();
	
		this.setValue()
	},
	initLinkDataId :function(){
		var options =[];
		options.push('<option >-请选择字段-</option>');
		$.each(this.resultColumns,function(i,n){
			options.push("<option value='"+n.name+"'>"+n.label+"</option>");
		});
		 
		 $("#linkDataId").append(options.join(""));
	},
	initLinkDataText:function(){
		var options =[];
		options.push('<option >-请选择字段-</option>');
		$.each(this.resultColumns,function(i,n){
			options.push("<option value='"+n.name+"'>"+n.label+"</option>");
		});
		 
		 $("#linkDataText").append(options.join(""));
	},
	setValue:function(){
        $("#linkDataId").val(this.data.id);	
        $("#linkDataText").val(this.data.text);	
	},
     getValue: function() {
    	 var linkDataId = $("#linkDataId").val();
    	 if($.isEmpty(linkDataId)){
     		  DialogUtil.msg("请选择关联数据主键");
    		 return;
    	 }
    	var linkDataText =  $("#linkDataText").val();
      	 if($.isEmpty(linkDataText)){
    		  DialogUtil.msg("请选择关联数据显示值");
	   		 return;
	   	 }
   
          return   {
 			 id:linkDataId,
 			text:linkDataText
		};
     }
	}
})();