var dialog = frameElement.dialog;
var dlgLoad;
var bpmTaskToAgree;
$(function() {
	bpmTaskToAgree = new BpmTaskToAgree();
	bpmTaskToAgree.init();
});
(function() {
	BpmTaskToAgree = function(){
		
	};
	
	BpmTaskToAgree.prototype = {
		init:function(){
			this.initPath();
			this.initOpinion();
			this.initJumpType();
			this.initSave();
			this.initEvent();
		},
		initPath : function(){
			var me = this;
			$("input[name='jumpType']").on("change", function(){
				me.setJumpType(this);
			});
			
			if (hidePath == "true") {
				
			}
		},
		initOpinion : function(){
			if (hideOpinion == "true") {
				$("#opinionDiv").hide();
			}
		},
		initJumpType : function(){
			var jumpTypeArr = jumpType.split(",");
			var robj = $(":radio[value='" + jumpTypeArr[0] + "']");
			this.setJumpType(robj);
			if("common" == jumpType){
				$("#jumptbl").hide();
			}
		},
		initSave:function(){
		 var _this = this, json = dialog.params.data,
		 		frm = $('#agreeForm').form();
			frm.addHidden('data', JSON2.stringify(json));
			frm.addHidden('bpmFormId', dialog.params.bpmFormId);
			frm.addHidden('version', dialog.params.version);
			$("a.fa-save").click(function() {
				var nodeUser = _this.getNodeUser();
				$("#nodeUsers").val(nodeUser);
				frm.ajaxForm({
					success : function(responseText){
						_this.showResponse(responseText);
					}
				});
				dlgLoad = DialogUtil.load("加载中...");
				console.log("bpmn complete param: " + $("#agreeForm").serialize());
				frm.submit();
			});
		},
		showResponse : function (responseText) {
			DialogUtil.close(dlgLoad);
			var resultMessage = new com.lc.form.ResultMessage(responseText);
			if (resultMessage.isSuccess()) {
				DialogUtil.alert(resultMessage.getMessage(),function(){
					if(dialog && dialog.callback){
						dialog.callback();
					}else{
						DialogUtil.closeAll();
					}
				});
			} else {
				DialogUtil.error(resultMessage.getMessage(), resultMessage.getCause());
			}
		},
	  getNodeUser : function (){
			var jumpType = $("[name='jumpType']:visible:checked").val();
			if(undefined === jumpType || !jumpType || 'undefined' === jumpType){
				//return '[]';
				jumpType = "common";
			}
			
			var jpt = $("#jpt"+jumpType);
		 	var destination = jpt.find("[name='destination']").val();
		 	var userArray = [];
		 	var nodeUsers = [];
		 	
			var tbl = $("#pathTbl:visible");
			if(jumpType=='common' && tbl){
				var $tbody = $(tbl).find("tbody");
				$('tr', $tbody).each(function(){
					$(this).find("input[name='nodeUser']:visible:checked").each(function (){
						var strVal = $(this).val().split(",");
						var user = {
							id:strVal[0],
							name:strVal[1],
							type:strVal[2]
						};
						userArray.push(user);
					});
					destination = $(this).find("[name='destination']").val();
				 	var nodeUser ={
				 			jumpType:jumpType,
							nodeId:destination,
							executors:userArray
					};
				 	nodeUsers.push(nodeUser);
				});
			 	nodeUsers = JSON2.stringify(nodeUsers);
			 	
				return nodeUsers;
			}
			
			jpt.find("input[name='nodeUser']:visible:checked").each(function (){
				var strVal = $(this).val().split(",");
				var user = {
					id:strVal[0],
					name:strVal[1],
					type:strVal[2]
				};
				userArray.push(user);
			});
		 	var nodeUser ={
		 			jumpType:jumpType,
					nodeId:destination,
					executors:userArray
			};
		 	nodeUsers.push(nodeUser);
		 	nodeUsers = JSON2.stringify(nodeUsers);
		 	return nodeUsers;
		},
		setJumpType : function(robj){
			$(robj).attr("checked",true);
			var val = $(robj).val();
			var pathTbl = $("#pathTbl");
			var me = this;
			
			if(val=='common'){
				$("#jptselect").hide();
				$("#jptfree").hide();
				if(undefined != pathTbl && null != pathTbl && pathTbl && hidePath == "true"){
					$(pathTbl).hide();
				}else if(undefined != pathTbl && null != pathTbl && pathTbl && hidePath == "false"){
					$(pathTbl).show();
				}
			}else if(val=='select'){
				$("#jptselect").show();
				$("#jptfree").hide();
				if(undefined != pathTbl && null != pathTbl && pathTbl){
					$(pathTbl).hide();
				}

				me.selectNode('#jptselect', '#outgoingNodesUsersMap');
				$('#jptselect').find("[name='destination']").on("change", function(){
					me.selectNode('#jptselect', '#outgoingNodesUsersMap');
				});
			}else if(val=='free'){
				$("#jptselect").hide();
				$("#jptfree").show();
				if(undefined != pathTbl && null != pathTbl && pathTbl ){
					$(pathTbl).hide();
				}

				me.selectNode('#jptfree', '#allNodeDefUsersMap');
				$('#jptfree').find("[name='destination']").on("change", function(){
					me.selectNode('#jptfree', '#allNodeDefUsersMap');
				});
			}
		},
		selectNode:function(jptid, mapid){
			$(jptid).find("[name='nodeUserSpan']").html('');
			var destination = $(jptid).find("[name='destination']").val();
			var outgoingNodesUsersMapJson = JSON2.parse($(mapid).val());
			var userList = outgoingNodesUsersMapJson[destination];
			var html = '';
			for(var i = 0, len = userList.length; i < len; i++){
				html += '<label class="checkbox-inline">'
					+ '<input class="ibps" type="checkbox" name="nodeUser" checked="checked" '
					+ 'value="'+userList[i].id+','+userList[i].name+'"/>'
					+ '<span class="lbl">'+userList[i].name+'</span></label>';
			}
			$(jptid).find("[name='nodeUserSpan']").append(html);
		},
		setOpinion : function (approvalItem){
			var oldOpinion = $("#opinion").val();
			$("#opinion").val(oldOpinion+approvalItem);
		},
		choosePathUser:function (obj){
			var jumpType = "common";
			var jpt = $(obj).parents().filter("tr");
		 	var destination = jpt.find("[name='destination']").val();
			new PersonDialog({
				callback : function(userIds,fullNames) {
					var html = '';
					for(var idx=0;idx<userIds.length;idx++){
						html += '<label class="checkbox-inline">'
							+ '<input class="ibps" type="checkbox" name="nodeUser" checked="checked" '
							+ 'value="'+userIds[idx]+','+fullNames[idx]+'"/>'
							+ '<span class="lbl">'+fullNames[idx]+'</span></label>';
					}
					jpt.find("[name='nodeUserSpan']").append(html);
				}
			}).show();
		},
		chooseUser:function (){
			var jumpType = $("[name='jumpType']:checked").val();
			var jpt = $("#jpt"+jumpType);
		 	var destination = jpt.find("[name='destination']").val();
			new PersonDialog({
				callback : function(userIds,fullNames) {
					var html = '';
					for(var idx=0;idx<userIds.length;idx++){
						html += '<label class="checkbox-inline">'
							+ '<input class="ibps" type="checkbox" name="nodeUser" checked="checked" '
							+ 'value="'+userIds[idx]+','+fullNames[idx]+'"/>'
							+ '<span class="lbl">'+fullNames[idx]+'</span></label>';
					}
					$("#jpt"+jumpType).find("[name='nodeUserSpan']").append(html);
				}
			}).show();
		},
		rewrite:function(content){
			$("#opinion").text(content);
		},
		initEvent:function(){
			var me = this;
			$(".fa-commonStatment").on("click",function(){
				new StatmentDialog({
					callback:me.rewrite,
					action:actionName
				}).show();
			});
		}
	};
})();
