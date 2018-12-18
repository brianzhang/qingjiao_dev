<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>添加会签任务</title>
	<%@include file="/commons/include/get.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
	<script type="text/javascript">
	var dialog = frameElement.dialog;
	$(function(){
			var frm = $('#addSignTaskForm').form();
			$("a.fa-save").click(function(){
				var addSignTaskUserId = $("input[name='addSignTaskUserId']").val();
				if(undefined == addSignTaskUserId || '' == addSignTaskUserId){
					DialogUtil.warn("请选择补签人员！");
					return;
				}
				frm.ajaxForm({success:showResponse});
				if(frm.valid()){
					frm.submit();
				}
			});
		});
	
		function showResponse(responseText) {
			var resultMessage = new com.lc.form.ResultMessage(responseText);
			if (resultMessage.isSuccess()) {
				DialogUtil.alert(resultMessage.getMessage(),function(){
					if(dialog && dialog.callback){
						dialog.callback(dialog.index);
					}else{
						DialogUtil.closeDialog();
					}
				});
			} else {
				DialogUtil.error(resultMessage.getMessage(), resultMessage.getCause());
			}
		}
		
		function selectUser(obj){
			var me =$(obj), id =me .attr("selectorId"),
				name = me.attr("selectorName");;
			
			new PersonDialog(
				{callback : function(userIds,fullNames){
						$("input[name='"+id+"']").val(userIds.join(","));
						$("textarea[name='"+name+"']").val(fullNames.join(","));
					}
				}).show();
		}
	</script>
</head>
<body>
	<div class="container-fluid">
		<div class="toolbar-panel col-md-13 ">
			<div class="buttons">
				<a href="#" class="btn btn-primary fa fa-save">确定</a> 
				<a href="#" onclick="javascript:DialogUtil.close(frameElement.dialog.index);" class="btn btn-primary fa fa-back">取消</a>
			</div>
		</div>

		<form id="addSignTaskForm" action="doAddSignTask.htm" method="post">
			<input type="hidden" name="taskId" value="${taskId}">
			<table cellspacing="0" class="form-table w95">
				<tr>
					<th width="20%">补签人员:</th>
					<td colspan="3"><input type="hidden" name="addSignTaskUserId" />
						<textarea name="addSignTaskUserName" rows="2" cols="50"
							class="inputText" style="width: 270px; height: 30px; margin: 5px"
							readonly="readonly" validate="{required:true}"></textarea> <a
						onclick="selectUser(this)" selectorId="addSignTaskUserId"
						selectorName="addSignTaskUserName"
						class="btn btn-default fa fa-add">选择人员</a></td>
				</tr>
				<tr>
					<th width="20%">提醒消息:</th>
					<td colspan="3">
						<label class="checkbox-inline">
							<input class="ibps" type="checkbox" name="messageType" value="inner" checked="checked">
							<span class="lbl">内部消息</span>
					</label> <label class="checkbox-inline"> 
							<input class="ibps" type="checkbox" name="messageType" value="mail">
							<span class="lbl">邮件</span>
					</label> <label class="checkbox-inline"> <input class="ibps"
							type="checkbox" name="messageType" value="sms">
							<span class="lbl" >短信</span>
					</label></td>
				</tr>
				<tr>
					<th width="20%">补签原因:</th>
					<td colspan="3"><textarea class="form-control"
							name="addReason" rows="3"></textarea></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>