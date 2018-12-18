

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/office/office.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/control/OfficePlugin.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/office/officeTemplateDialog.js"></script>
		<script type="text/javascript">
			$(function(){
				var obj = new OfficeControl({
					controlId: 'office',
					fileId:'${officeControl.id}',
					rights:'${empty officeControl.id?"e":"r"}',
				});
				obj.init();
				OfficePlugin.officeControlObj["office"] = obj;
			});
			
	</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12" style="width: 100%;height: 100%;">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
				<form class="form-horizontal" id="officeControlForm"  action="save.htm"   method="post" style="width: 100%;height: 100%;">
					<div>
						<div class="form-group">
	                        <label class="col-sm-2 control-label">文件名:</label>
	                        <div class="col-sm-10">
	                            <input type="text" class="form-control"  id="fileName" name="m:officeControl:fileName" value="${officeControl.fileName}"  validate="{required:false,maxlength:384}"/>
	                        </div>
	                    </div>
	                    <div class="form-group">
	                        <label class="col-sm-2 control-label">office:</label>
	                        <div class="col-sm-10">
	                           <div id="office" class="form-control" style="width: 100%;min-height:550px;"></div>
	                        </div>
	                    </div>

	                    <input type="hidden" name="m:officeControl:id" value="${officeControl.id}" />
					</div>
					
				</form>
				
			</div>
		</div>
		<script language="JScript" for="office_office" event="OnCustomMenuCmd2(menuPos,submenuPos,subsubmenuPos,menuCaption,menuID)">
				OfficePlugin.officeControlObj["office"].customMenuDeal(menuCaption);
		</script>   
	</body>
</html>