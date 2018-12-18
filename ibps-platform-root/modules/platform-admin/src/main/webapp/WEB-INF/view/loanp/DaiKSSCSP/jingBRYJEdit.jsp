<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/DaiKSSCSP/jingBRYJ.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="${ctx}/xinDai/liucheng/xinDaiLiuCheng/role.htm?id=${jingBRYJ.jdid}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<iframe id="listFrame" src="${ctx}/loanp/DaiKSSCSP/zhuDCRYJ/get.htm?jdid=${jingBRYJ.jdid}" frameborder="0" width="100%" height="800px"></iframe>
			<div class="">
				<form  class="fr-form"  id="jingBRYJForm" action="save.htm?jdid=${jdid}" >
					<input type="hidden" name="m:jingBRYJ:id"  value="${jingBRYJ.id}"/>
					<input type="hidden" name="m:jingBRYJ:jdid"  value="${jingBRYJ.jdid}"/>
					<input type="hidden" name="m:jingBRYJ:jbdcrid"  value="${jingBRYJ.jbdcrid}"/>
					<input type="hidden" class="fr-form-control" name="m:jingBRYJ:jksqr" value="${jingBRYJ.jksqr}" validate="{required:false"  style="width:auto;display:inline" readonly="true" /> 
			 
			<div class="fr_response_field col-sm-12" >
				 <div class ="panel panel-default">
				 <div class="fr_response_field col-sm-12" >
			<div class="panel-heading">
				 <div class="fr_response_field col-sm-12" >
			       <label class="fr-control-label" style="width:50%">贷款调查相关情况说明</label>
			 	</div>
			</div>
			</div>
				 	 <div class="panel-body">
				 	 	 <div class="fr_response_field col-sm-12" >
				 	 	 	 <p>
				 	 	 	       同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.jksqr}</label> &nbsp&nbsp&nbsp&nbsp  
				                	授信  <input type="text" class="fr-form-control" name="m:jingBRYJ:sxje" value="${jingBRYJ.sxje}" style="width:auto;display:inline" validate="{required:false"/>  元，
				                	授信期限 <input type="text" class="fr-form-control" name="m:jingBRYJ:sxqx" value="${jingBRYJ.sxqx}" validate="{required:false" style="width:auto;display:inline"/>  月。  </p>
				             <p>
 		  		 	 	 	  	 	同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${jingBRYJ.jksqr}</label> &nbsp&nbsp&nbsp&nbsp  
				                	发放  <input type="text" class="fr-form-control" name="m:jingBRYJ:dbfs" value="${jingBRYJ.dbfs}" validate="{required:false"style="width:auto;display:inline" /> 担保方式
				                	 <input type="text" class="fr-form-control" name="m:jingBRYJ:dklx" value="${jingBRYJ.dklx}" validate="{required:false" style="width:auto;display:inline" /> 贷款人民币   
				                	 <input type="number"  class="fr-form-control"  name="m:jingBRYJ:dkje"  value="${jingBRYJ.dkje}" validate="{required:false}" style="width:auto;display:inline" />万元，
				                	 期限 <input type="text" class="fr-form-control" name="m:jingBRYJ:dkqx" value="${jingBRYJ.dkqx}" validate="{required:false" style="width:auto;display:inline" />  个月，
				                	 月利率  <input type="number"  class="fr-form-control"  name="m:jingBRYJ:yll"  value="${jingBRYJ.yll}" validate="{required:false}" style="width:auto;display:inline" />  ‰，
				                	 以  <input type="text" class="fr-form-control" name="m:jingBRYJ:ghfs" value="${jingBRYJ.ghfs}"  validate="{required:false" style="width:auto;display:inline"  /> 方式归还。
				 	 	 	</p>
				 	 	 </div>
				 </div>
			</div>	
			</div>
			 	
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经办人签字</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:jingBRYJ:jbrqz" value="${jingBRYJ.jbrqz}"  readonly="true" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经办人签字时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:jingBRYJ:jbrqzsj"   value="<fmt:formatDate value="${jingBRYJ.jbrqzsj}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
