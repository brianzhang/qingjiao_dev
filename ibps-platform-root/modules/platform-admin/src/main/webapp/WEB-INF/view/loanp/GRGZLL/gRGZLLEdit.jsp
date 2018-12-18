<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/GRGZLL/gRGZLL.js"></script>
				<script type="text/javascript"> 

  function SaveGRGZLL(sfid1){
	 //alert("测试SaveZYxx()"+sfid1);
	 $(document).ready(function(){
		// alert("#sfid"+ $("#sfid").val());
		//  $("#intro").css("background-color","yellow");
		});
	 //document.getElementById("sfid").val() = sfid;
	// document.getElementById("zYXXBForm").submit();
		// alert("测试返回");
		 gRGZLL._initForm();
	//   frames["iframe1"].document.getElementById("form").submit();
} 
  
  function checkPostcode(){
	  var post = window.document.getElementById("postcode");
	  //alert(post.value);
	  var  postcode = post.value; 
	  var  path = /^\d{6}$/;
	  if(!(path.test(postcode)) ){ 
	        DialogUtil.msg("邮编为6位数字，请重新填写",
					function(rtn) {
					});  
	    }; 
  }
  
  function checkNumber(){
  	  var  lianxi = window.document.getElementById("phone");
  	   var  lianxicode = lianxi.value;
  	   var  path2 = /^[0-9]*$|\s /;
  	   if(!(path2.test(lianxicode))){ 
  		   DialogUtil.msg("请填写正确的联系方式",
  					function(rtn) { 
  					});
  	    }
    }

  
  function checkMoney(tid){
	  var  money1 = window.document.getElementById(tid);
	   var  moneyValue1 = money1.value;
	   if(moneyValue1==null||moneyValue1==""){
		   return;
	   }
	   var rule = /^([0-9](\.\d{2}))$/;
	   
	  if (!(rule.test(moneyValue1))){
		 // alert("not 个位");
		  var  rule1 = /^([1-9]\d{0,2})(\,\d{3})*(\.\d{2})$/;  
  	      if(!(rule1.test(moneyValue1))){
  		   DialogUtil.msg("请填写正确格式的金额",
  					function(rtn) { 
  			              
  					});
  		   return;
  	       }         
		   }   
    } 
  function checkMoneys(tid){
	   var  money1 = window.document.getElementById(tid);
	   var  moneyValue1 = money1.value;
	   var  rule1 = /^([1-9]\d*)(\.\d{2})$/;   
      if(!(rule1.test(moneyValue1))){
     		   DialogUtil.msg("请填写正确格式的金额",
     					function(rtn) { 
     			              
     					});
      }
}
</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
<!-- 			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div> -->
			<div class="">
				<form  class="fr-form"  id="gRGZLLForm" action="save.htm?sfid=${sfid}" >
					<input type="hidden" name="m:gRGZLL:id"  value="${sfid}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRGZLL:khh" value="${gRGZLL.khh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRGZLL:khmc" value="${gRGZLL.khmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开始日期 *</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:gRGZLL:ksrq"   value="${gRGZLL.ksrq}" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所在单位 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRGZLL:szdw" value="${gRGZLL.szdw}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所在部门</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRGZLL:szbm" value="${gRGZLL.szbm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">结束日期 *</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:gRGZLL:jsrq"   value="${gRGZLL.jsrq}" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位性质</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRGZLL:dwxz"  value="${gRGZLL.dwxz}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRGZLL.dwxz=='1'}">selected="selected"</c:if>>机关事业</option>
				    <option value="2" <c:if test="${gRGZLL.dwxz=='2'}">selected="selected"</c:if>>国营企业</option>
				    <option value="3" <c:if test="${gRGZLL.dwxz=='3'}">selected="selected"</c:if>>金融企业</option>
				    <option value="4" <c:if test="${gRGZLL.dwxz=='4'}">selected="selected"</c:if>>军队</option>
				    <option value="5" <c:if test="${gRGZLL.dwxz=='5'}">selected="selected"</c:if>>私营企业</option>
				    <option value="6" <c:if test="${gRGZLL.dwxz=='6'}">selected="selected"</c:if>>个体经营户</option>
				    <option value="7" <c:if test="${gRGZLL.dwxz=='7'}">selected="selected"</c:if>>三资企业</option>
				    <option value="8" <c:if test="${gRGZLL.dwxz=='8'}">selected="selected"</c:if>>邮电通讯</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">从事行业描述</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRGZLL:csxyms" value="${gRGZLL.csxyms}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担任职务 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRGZLL:drzw"  value="${gRGZLL.drzw}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRGZLL.drzw=='1'}">selected="selected"</c:if>>高级领导</option>
				    <option value="2" <c:if test="${gRGZLL.drzw=='2'}">selected="selected"</c:if>>中级领导</option>
				    <option value="3" <c:if test="${gRGZLL.drzw=='3'}">selected="selected"</c:if>>一般员工</option>
				    <option value="4" <c:if test="${gRGZLL.drzw=='4'}">selected="selected"</c:if>>其他</option>
				    <option value="5" <c:if test="${gRGZLL.drzw=='5'}">selected="selected"</c:if>>未知</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位邮编 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="postcode"  name="m:gRGZLL:dwyb" value="${gRGZLL.dwyb}"  onblur="checkPostcode();" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位电话 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id = "phone" name="m:gRGZLL:dwdh" value="${gRGZLL.dwdh}" onblur ="checkNumber();" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRGZLL:dwdz" value="${gRGZLL.dwdz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">月收入*</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id = "comein"  name="m:gRGZLL:ysr" value="${gRGZLL.ysr}" onblur="checkMoneys('comein')" validate="{required:true}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRGZLL:bzz" value="${gRGZLL.bzz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
		<input type="hidden"  id="sfid" value="${sfid}">
	</body>
</html>
