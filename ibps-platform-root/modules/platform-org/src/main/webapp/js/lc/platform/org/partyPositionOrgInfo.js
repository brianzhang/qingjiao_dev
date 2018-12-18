var passConf={roleJson:""}; 
$(function(){
	var $obj=$("a.btn.btn-primary.fa-add");
	var url =__ctx+"/platform/org/partyPosition/addAssignOrg.htm";
	$obj.unbind('click');
	$obj.bind('click',function(){
		new PartyOrgDialog({
			isSingle : true,
			callback : function(orgIds,orgNames) {
				var param = {
						id:id+'',
						orgId:orgIds+''
						};
				$.post(url,param,function(responseText){
					var msg=new com.lc.form.ResultMessage(responseText);
					if(msg.isSuccess()){
						DialogUtil.alert(msg.getMessage());
						window.location.reload(true);
					}else{
						DialogUtil.error(msg.getMessage(),"");
					}
				});
			}
		}).show();
	});
	
	var $obj_trash=$("a.btn.btn-primary.fa-trash-o");
	var url_ =__ctx+"/platform/org/partyPosition/removeOrg.htm";
	$obj_trash.unbind('click');
	$obj_trash.bind('click',function(){
		$.post(url_,{id:id+''},function(responseText){
			var msg=new com.lc.form.ResultMessage(responseText);
			if(msg.isSuccess()){
				DialogUtil.alert(msg.getMessage());
				window.location.reload(true);
			}else{
				DialogUtil.error(msg.getMessage(),"");
			}
		});
	});
});
			
