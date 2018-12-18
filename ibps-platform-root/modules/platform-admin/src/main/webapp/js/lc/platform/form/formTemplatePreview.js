

/**
 * 表单预览
 */
$(function(){
	var data ={}, id = $("#id").val(),mode= $("#mode").val();
	if(id != ""){
		data  = JSON.parse($("#data").val());
	}else{
		if(frameElement){
			data =  _.clone(frameElement.dialog.params);
		}
	}
	data.response = {
	};

	var fr = new FormRenderer($.extend(
			data,{
			
		      onReady: function(){
		        //console.log('Form is ready!');
		      }
		    }
		  ));

	 function format4popup(object) {
		  return JSON.stringify(object, null, 2).replace(/</g, '&lt;').replace(/>/g, '&gt;')
	}


	//预览数据
	$(document).on("click", "a.js-preview", function() {
			if(!fr.validate()){
				DialogUtil.toastr(fr.getErrorMsg());
				return;
			}
	
		DialogUtil.open({
			title:"预览数据",
		    area: ['500px', '400px'],
		    content:  '<pre class="code-popup">' + format4popup(fr.getValue()) + '</pre>',
		    //'<textarea class="form-control" width="100%" style="height:250px;">'+JSON.stringify(fr.getValue())+'</textarea>'
	        btn:[{
	        	label: '&#x786E;&#x5B9A;',
	            action: function(dialog,index) {
	            	DialogUtil.close(index);
	            }
	        }]
		});
		
		 // 
	});
	//关闭
	$(document).on("click", "a.fa-close", function() {
		if(frameElement){
			DialogUtil.close(frameElement.dialog.index);
		}else{
			window.opener = null;  
			window.close();  
		}
		  
	});
	
	$(document).on("click", "a.js-gen-template", function() {
		DialogUtil.dialog({
			content:__ctx+'/platform/form/formDef/genTemplate.htm?id='+id+'&mode='+mode,
			area: ['90%', '90%']
		})
	});
	



});




