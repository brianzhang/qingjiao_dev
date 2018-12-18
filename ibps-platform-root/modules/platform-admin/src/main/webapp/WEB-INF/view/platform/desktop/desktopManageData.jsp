<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/platform/utils/SelectorDialog.js"></script>
		<title>桌面管理-保存数据</title>
	</head>
	<body>
				<div class="panel-form">
			<form class="form-horizontal" >
	      					<div class="form-group">
                                <label class="col-sm-3 control-label">布局名称<span class="required">*</span>:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control"  id="name" name="name" value="${desktopManage.name}"  validate="{required:true,maxlength:384}"/>
                                </div>
                            </div>
                            <div  class="form-group">
                                <label class="col-sm-3 control-label">布局描述:</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control"  id="memo" name="memo" value="${desktopManage.memo}" />
                                </div>
                            </div>
                            <div  class="form-group">
                                <label class="col-sm-3 control-label">所属组织:</label>
                                <div class="col-sm-9">
	                                <div class="input-group ">
										<input type="hidden" name="groupId"  id="groupId" value="${desktopManage.groupId}"/> 
		                               	<input type="text" class="form-control"  id="groupName" name="groupName" value="${desktopManage.groupName}" readonly="readonly"/>
		                           	  	<span class="input-group-btn">
		                           	  		<button type="button" class="btn  btn-info btn-mm"  
		                           	  			 data-toggle="selector"  data-type="org" data-single="true"  data-id="#groupId" data-name="#groupName" >
		                           	  			<i class="fa fa-user"></i></button> &nbsp;&nbsp;
		                           	  		<button type="button" class="btn btn-info btn-mm" 
				                               	 data-toggle="clear" data-id="#groupId" data-name="#groupName">
				                               	 <i class="fa fa-times"></i></button>
		                           	  	</span>
	                           	 	</div>
                                </div>
                            </div>
                            <div  class="form-group">
                               	<label class="col-sm-3 control-label">是否是默认:<span class="required">*</span>:</label>
                            	<div class="col-sm-9">
										<label class="radio-inline">
                                       	 	<input type="radio"  class="ibps"  value="Y" name="isDef"  <c:if test="${not empty desktopManage && desktopManage.isDef=='Y'}">checked="checked"</c:if>>
                                       	 	<span class="lbl">是</span>
                                        </label>
                                        <label class="radio-inline i-checks">
                                       	 	<input type="radio"  class="ibps"   value="N" name="isDef"  <c:if test="${empty desktopManage || desktopManage.isDef=='N'}">checked="checked"</c:if>>
                                       	 	<span class="lbl">否</span>
                                        </label>
                                </div>
                           </div>
                   </form>	
                  </div>
	
	</body>