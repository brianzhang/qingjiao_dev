

/**
 * 表单预览
 */
var fr;
$(function(){
	var data ={};
	
	if(frameElement){
		data =  frameElement.dialog.params;
	}

	fr = new FormRenderer($.extend(
		data,{
	      onReady: function(){
	        //console.log('Form is ready!');
	      }
	    }
	  ));
	


});

function getData(){
	if(!fr.validate()){
		DialogUtil.toastr(fr.getErrorMsg());
		return false;
	}
	return fr.getValue();
}




