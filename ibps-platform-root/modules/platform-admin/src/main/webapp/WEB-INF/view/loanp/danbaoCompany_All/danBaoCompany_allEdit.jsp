<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/danbaoCompany_All/danBaoCompany_all.js"></script>
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
					<a href="list.htm?jdid=${jdid}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="danBaoCompany_allForm" action="save.htm?jdid=${jdid}" >
					<input type="hidden" name="m:danBaoCompany_all:id"  value="${danBaoCompany_all.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保类别</label>
				  	<div class="fr-form-block">
				    <input type="text" class="fr-form-control" name="m:danBaoCompany_all:dblb" value="担保公司" validate="{required:false"  disabled="true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公司名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompany_all:gsmc" value="${danBaoCompany_all.gsmc}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公司法定代表人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompany_all:gsfddbr" value="${danBaoCompany_all.gsfddbr}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">法人证件类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompany_all:frzjlx" value="身份证" validate="{required:false" disabled="true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">法人身份证号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:danBaoCompany_all:frsfzh"  id="shenfenzheng"  onblur="checkSfid();" value="${danBaoCompany_all.frsfzh}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
