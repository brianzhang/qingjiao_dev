<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
					<form  class="fr-form"  id="urlFormForm" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">文本框</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${urlForm.text}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">文本域</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${urlForm.textarea}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数字</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${urlForm.number}</p>
				 	</div>
			  	</div>
			</div>
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">日期</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${urlForm.time}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">富文本</label>
				  	<div class="fr-form-block">
			${urlForm.editor}
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单选</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${urlForm.radio=='1'}">选项一</c:if><c:if test="${urlForm.radio=='2'}">选项二</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">多选</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${fn:contains(urlForm.checkBox, '1')}">选项一&nbsp;</c:if><c:if test="${fn:contains(urlForm.checkBox, '2')}">选项二&nbsp;</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">下拉</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${urlForm.select=='1'}">选项一</c:if><c:if test="${urlForm.select=='2'}">选项二</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">数据字典</label>
				  	<div class="fr-form-block">
			 <p class="form-control-static">${f:getDictLabel(urlForm.dic,'tableSource', 'key', '')}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">自动编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${urlForm.autoNum}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">附件</label>
				  	<div class="fr-form-block">
			<div name="div_attachment_container" data-rights="r">
				<div class="fr-files" ></div>
				<textarea style="display: none"   data-control="attachment"  name="m:urlForm:att" >${urlForm.att}</textarea>
			</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">选择器</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:urlForm:selector"  data-rights="r">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:urlForm:selector" >${urlForm.selector}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">自定义对话框</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${urlForm.customDialog}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${urlForm.add}</p>
				 	</div>
			  	</div>
			</div>
	  
		<table name="s:urlFormSub2" class="table table-bordered table-hover table-condensed">
			<caption>
				<div class="fr-table-header-label">子表例子</div>
			</caption>
			<thead>
				<tr>
	       			 <th>KEY</th>
	       			 <th>NAME</th>
	       			 <th>AGE</th>
		    </tr>
			</thead>
			<tbody>	
				<c:forEach varStatus="stat" var="urlFormSub2" items="${urlForm.urlFormSub2PoList}">	
					<tr>	
				 		<td>
			<p class="form-control-static">${urlFormSub2.key}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${urlFormSub2.name}</p>
						</td>	
				 		<td>
			<p class="form-control-static">${urlFormSub2.age}</p>
						</td>	
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</form>

			</div>
		</div>
	</body>
</html>
