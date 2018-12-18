<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/apply/applyMoney.js"></script>
		<script type="text/javascript">
		function  checkSfid(){
			  var sfid = window.document.getElementById("shenfenzheng");
			  var  sfcode = sfid.value; 
			  var  path = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			  if(!(path.test(sfcode)) ){ 
			        DialogUtil.msg("身份证号格式输入错误，请重新填写",
							function(rtn) {
			        	        sfid.focus(); 
							});  
			    }
			
		}
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
			<div class="">
				<form  class="fr-form"  id="applyMoneyForm" action="save.htm" >
					<input type="hidden" name="m:applyMoney:id"  value="${applyMoney.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">信用社</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:applyMoney:xys" value="${applyMoney.xys}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:applyMoney:customer" value="${applyMoney.customer}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">身份证号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="shenfenzheng"  name="m:applyMoney:sfid" value="${applyMoney.sfid}" validate="{required:ture}"  onblur="checkSfid();"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款类别</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:applyMoney:dklb" value="${applyMoney.dklb}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
