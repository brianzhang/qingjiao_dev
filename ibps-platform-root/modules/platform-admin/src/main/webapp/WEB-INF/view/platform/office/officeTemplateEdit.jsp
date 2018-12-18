

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/office/officeTemplate.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficePlugin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/office/officeTemplateDialog.js"></script>
		<script type="text/javascript">
			$(function(){
				var obj = new OfficeControl({
					controlId: 'template',
					fileId:'${officeTemplate.id}',
					rights:'${empty officeTemplate.id?"e":"r"}',
					saveURL : __ctx + "/platform/office/officeTemplate/saveTemplate.htm",
					fileURL : __ctx + "/platform/office/officeTemplate/getFileById.htm?fileId=",
				});
				obj.init();
				OfficePlugin.officeControlObj["template"] = obj;
			});
			
	</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
				<form class="form-horizontal" id="officeTemplateForm"  action="save.htm"   method="post">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">模板名:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="name" name="m:officeTemplate:name" value="${officeTemplate.name}"  validate="{required:false,maxlength:384}"/>
	                        </div>
	                    </div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">模板类型:</label>
	                        <div class="col-sm-10">
	                        	<label class="radio-inline "> 
	                        		<input type="radio" value="plain" id="type" name="m:officeTemplate:type" class="ibps"
											<c:if test="${empty officeTemplate || empty officeTemplate.type|| officeTemplate.type =='plain'}">checked="checked"</c:if>>
											<span class="lbl">普通模板</span>
								</label> 
								<label class="radio-inline ">
										<input type="radio" value="red" id="type" name="m:officeTemplate:type"class="ibps"
												<c:if test="${officeTemplate.type=='red'}">checked="checked"</c:if>>
										<span class="lbl">套红模板</span>
								</label>
	                        </div>
	                    </div>
	                    
	                     <div class="form-group">
	                        <label class="col-sm-2 control-label">套红模板:</label>
	                        <div class="col-sm-10">
	                           <div id="template" class="form-control" style="width: 100%;min-height:500px;"></div>
	                        </div>
	                    </div>
						
	                    <input type="hidden" name="m:officeTemplate:id" value="${officeTemplate.id}" />
					</div>
					
				</form>
			</div>
		</div>
		<script language="JScript" for="office_template" event="OnCustomMenuCmd2(menuPos,submenuPos,subsubmenuPos,menuCaption,menuID)">
				OfficePlugin.officeControlObj["template"].customMenuDeal(menuCaption);
		</script> 
	</body>
</html>