/**
 * 表单控件帮助类
 * <pre>
 * 作者:eddy
 * 邮箱:1546077710@qq.com
 * 日期:2017-03-14-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
FormControlUtil = {
		
	/**
	 * 控件初始化
	 * 
	 * @param $me	页面js对象
	 * @param json	Array or Object
	 * 			[{id:'content',name:'',control:'editor'}] or {id:'content',name:'',control:'editor'}
	 */
	initControl: function($me, json) {
		var me = this;
		if($.isEmptyObject(json)){
			return;
		}
		
		if($.isArray(json)){
			$(json).each(function(){
				switch(this.control){
				case 'editor':
					me._initEditorByName($me, this.name);
				}
			});
		}else if($.isPlainObject(json)){
			switch(json.control){
			case 'editor':
				me._initEditorByName($me, json.name);
			}
		}else{
			console.warn('the param "json" is not an Array or Object.-->'+json);
		}
	}
	/**
	 * 控件数据回写
	 * 
	 * @param $me	页面js对象
	 * @param json	Array or Object
	 * 			[{id:'content',name:'',control:'editor'}] or {id:'content',name:'',control:'editor'}
	 */
	,writeControlData:function($me, json){
		var me = this;
		if($.isEmptyObject(json)){
			return;
		}
		
		if($.isArray(json)){
			$(json).each(function(){
				switch(this.control){
				case 'editor':
					me._writeEditorDataByName($me, this.name);
				}
			});
		}else if($.isPlainObject(json)){
			switch(json.control){
			case 'editor':
				me._writeEditorDataByName($me, json.name);
			}
		}else{
			console.warn('the param "json" is not an Array or Object.-->'+json);
		}
	}
	/**
	 * 富文本框初始化
	 * 
	 * @param $me		页面js对象
	 * @param controlId	页面控件id
	 */
	,_initEditorById:function($me, controlId){
		var me = this;
		$me[controlId] = UE.getEditor('editor');
		$me[controlId].addListener("ready",function(editor){
			$me[controlId].setContent($('#'+controlId).val());
   	   });
	}
	/**
	 * 富文本框数据回写
	 * 
	 * @param $me	页面js对象
	 */
	,_writeEditorDataById:function($me, controlId){
		$('#'+controlId).val($me[controlId].getContent());
	}
	/**
	 * 富文本框初始化
	 * 
	 * @param $me		页面js对象
	 * @param controlId	页面控件id
	 */
	,_initEditorByName:function($me, controlName){
		var me = this;
		$me[controlName] = UE.getEditor('editor');
		$me[controlName].addListener("ready",function(editor){
			$me[controlName].setContent($('textarea[name="'+controlName +'"]').val());
		});
	}
	/**
	 * 富文本框数据回写
	 * 
	 * @param $me	页面js对象
	 */
	,_writeEditorDataByName:function($me, controlName){
		$('textarea[name="'+controlName +'"]').val($me[controlName].getContent());
	}
};
