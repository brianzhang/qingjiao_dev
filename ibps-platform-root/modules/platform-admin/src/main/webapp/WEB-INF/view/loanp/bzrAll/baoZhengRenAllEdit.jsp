<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/bzrAll/baoZhengRenAll.js"></script>
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
				<form  class="fr-form"  id="baoZhengRenAllForm" action="save.htm?jdid=${jdid}" >
					<input type="hidden" name="m:baoZhengRenAll:id"  value="${baoZhengRenAll.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担保类别</label>
				  	<div class="fr-form-block">
				<input type="text"  class="fr-form-control" name="m:baoZhengRenAll:dblb"  value="保证人" validate="{required:false}" disabled="true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:baoZhengRenAll:mc" value="${baoZhengRenAll.mc}" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件类型</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:baoZhengRenAll:zjlx"  value="${baoZhengRenAll.zjlx}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="营业执照" <c:if test="${dyr.dyrzjlx=='1'}">selected="selected"</c:if>>营业执照</option>
				    <option value="身份证" <c:if test="${dyr.dyrzjlx=='2'}">selected="selected"</c:if>>身份证</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  name="m:baoZhengRenAll:zjhm" value="${baoZhengRenAll.zjhm}" validate="{required:true} "/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
