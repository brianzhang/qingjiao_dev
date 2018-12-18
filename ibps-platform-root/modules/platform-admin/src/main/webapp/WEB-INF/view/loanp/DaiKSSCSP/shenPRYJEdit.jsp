<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/DaiKSSCSP/shenPRYJ.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="${ctx}/xinDai/liucheng/xinDaiLiuCheng/zhuren.htm?id=${shenPRYJ.jdid}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<iframe id="ZhuFrame" src="${ctx}/loanp/DaiKSSCSP/zhuDCRYJ/get.htm?jdid=${shenPRYJ.jdid}" frameborder="0" width="100%" height="800px"></iframe>
			<iframe id="JingFrame" src="${ctx}/loanp/DaiKSSCSP/jingBRYJ/get.htm?jdid=${shenPRYJ.jdid}" frameborder="0" width="100%" height="250px"></iframe>
			<iframe id="ShenFrame" src="${ctx}/loanp/DaiKSSCSP/shenCRYJ/get.htm?jdid=${shenPRYJ.jdid}" frameborder="0" width="100%" height="500px"></iframe>
			<div class="">
				<form  class="fr-form"  id="shenPRYJForm" action="save.htm?jdid=${jdid}" >
					<input type="hidden" name="m:shenPRYJ:id"  value="${shenPRYJ.id}"/>
					<input type="hidden" name="m:shenPRYJ:jdid"  value="${shenPRYJ.jdid}"/>
					<input type="hidden" name="m:shenPRYJ:sprid"  value="${shenPRYJ.sprid}"/>
					<input type="hidden" class="fr-form-control" name="m:shenPRYJ:jksqr" value="${shenPRYJ.jksqr}" validate="{required:false"/>
					<div class="fr_response_field col-sm-12" >
				 <div class ="panel panel-default">
				 <div class="fr_response_field col-sm-12" >
			<div class="panel-heading">
				 <div class="fr_response_field col-sm-12" >
			       <label class="fr-control-label" style="width:50%">审批结论</label>
			 	</div>
			</div>
			</div>
				 	 <div class="panel-body">
				 	 	 <div class="fr_response_field col-sm-12" >
				 	 	 	 <p>
				 	 	 	       同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenPRYJ.jksqr} </label> &nbsp&nbsp&nbsp&nbsp  
				                	授信 <input type="text" class="fr-form-control" name="m:shenPRYJ:sxje"  style="width:auto;display:inline" value="${shenPRYJ.sxje}" validate="{required:false"/>元，
				                	授信期限 <input type="text" class="fr-form-control" name="m:shenPRYJ:sxqx" style="width:auto;display:inline" value="${shenPRYJ.sxqx}" validate="{required:false"/>  月。  </p>
				             <p>
 		  		 	 	 	  	 	同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenPRYJ.jksqr} </label> &nbsp&nbsp&nbsp&nbsp  
				                	发放  <input type="text" class="fr-form-control" name="m:shenPRYJ:dbfs" value="${shenPRYJ.dbfs}" validate="{required:false"style="width:auto;display:inline" /> 担保方式
				                	 <input type="text" class="fr-form-control" name="m:shenPRYJ:dklb" value="${shenPRYJ.dklb}" validate="{required:false" style="width:auto;display:inline" /> 贷款人民币   
				                	 <input type="number"  class="fr-form-control"  name="m:shenPRYJ:dkje"  value="${shenPRYJ.dkje}" validate="{required:false}" style="width:auto;display:inline" />万元，
				                	 期限 <input type="text" class="fr-form-control" name="m:shenPRYJ:dkqx" value="${shenPRYJ.dkqx}"  validate="{required:false" style="width:auto;display:inline" />  个月，
				                	 月利率  <input type="number"  class="fr-form-control"  name="m:shenPRYJ:yll"  value="${shenPRYJ.yll}"  validate="{required:false}" style="width:auto;display:inline" />  ‰，
				                	 以  <input type="text" class="fr-form-control" name="m:shenPRYJ:ghfs" value="${shenPRYJ.ghfs}"   validate="{required:false" style="width:auto;display:inline"  /> 方式归还。
				 	 	 	</p>
				 	 	 </div>
				 </div>
			</div>	
			</div>
			

			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审批人签名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:shenPRYJ:sprqm" readonly="true" value="${shenPRYJ.sprqm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审批人签字时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:shenPRYJ:sprqzsj"   value="<fmt:formatDate value="${shenPRYJ.sprqzsj}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
