<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/POXX/pOXX.js"></script>
		<script type="text/javascript"> 
  function SavePOXX(sfid1){
	//alert("测试SavePOXX()"+sfid1);
	 $(document).ready(function(){
		// alert("#sfid"+ $("#sfid").val());
		//  $("#intro").css("background-color","yellow");
		});
	 //document.getElementById("sfid").val() = sfid;
	// document.getElementById("zYXXBForm").submit();
		// alert("测试返回");
		 pOXX._initForm();
	//   frames["iframe1"].document.getElementById("form").submit();
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
function checkNumber(){
  	  var  lianxi = window.document.getElementById("phone");
  	   var  lianxicode = lianxi.value;
  	   var  path2 = /^[0-9]*$|\s /;
  	   if(!(path2.test(lianxicode))){ 
  		   DialogUtil.msg("请填写正确的电话号码",
  					function(rtn) { 
  					});
  	    }
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

function checkRate(){
  	  var  lianxi = window.document.getElementById("rate");
  	   var  lianxicode = lianxi.value;
  	   var  path2 = /^(0|([1-9]\d*))(\.\d{3})(‰)$/;
  	   if(!(path2.test(lianxicode))){ 
  		   DialogUtil.msg("请正确填写利率",
  					function(rtn) { 
  					});
  	    }
    }

function  checkSfid(){
	  var sfid = window.document.getElementById("shenfenzheng");
	  var  sfcode = sfid.value; 
	  var  path = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
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
<!-- 			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div> -->
			           	<br>		<hr>
			<center><p style="font-size:24px;"><stronger>配偶的个人工作履历信息</stronger></p></center>	<hr> <div class="">
			<div class="">
				<form  class="fr-form"  id="pOXXForm" action="save.htm?sfid=${sfid}" >
					<input type="hidden" name="m:pOXX:id"  value="${sfid}"/>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:khmc" value="${pOXX.khmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:khh" value="${pOXX.khh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">与客户关系 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:ykhgx" value="${pOXX.ykhgx}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有户籍证</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:sfyhjz" value="${pOXX.sfyhjz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">家庭成员姓名 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:jtcyxm" value="${pOXX.jtcyxm}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">性别 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:xb" value="${pOXX.xb}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件类型 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:pOXX:zjlx"  value="${pOXX.zjlx}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${pOXX.zjlx=='1'}">selected="selected"</c:if>>身份证</option>
				    <option value="2" <c:if test="${pOXX.zjlx=='2'}">selected="selected"</c:if>>军官证</option>
				    <option value="3" <c:if test="${pOXX.zjlx=='3'}">selected="selected"</c:if>>护照</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id="shenfenzheng"  onblur="checkSfid();" name="m:pOXX:zjhm" value="${pOXX.zjhm}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系电话 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="phone"   onblur="checkNumber();"  name="m:pOXX:lxdh" value="${pOXX.lxdh}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工作单位</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:gzdw" value="${pOXX.gzdw}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人健康状况</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:pOXX:grjkzk"  value="${pOXX.grjkzk}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${pOXX.grjkzk=='1'}">selected="selected"</c:if>>良好</option>
				    <option value="2" <c:if test="${pOXX.grjkzk=='2'}">selected="selected"</c:if>>一般</option>
				    <option value="3" <c:if test="${pOXX.grjkzk=='3'}">selected="selected"</c:if>>较差</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-9" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:bz" value="${pOXX.bz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开始日期 *</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:pOXX:ksrq"   value="<fmt:formatDate value="${pOXX.ksrq}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所在单位 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:szdw" value="${pOXX.szdw}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">所在部门</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:szbm" value="${pOXX.szbm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">结束日期 *</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:pOXX:jsrq"   value="<fmt:formatDate value="${pOXX.jsrq}"  pattern="yyyy-MM-dd"/>" validate="{required:true}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">担任职务 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:pOXX:drzw"  value="${pOXX.drzw}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${pOXX.drzw=='1'}">selected="selected"</c:if>>高级领导</option>
				    <option value="2" <c:if test="${pOXX.drzw=='2'}">selected="selected"</c:if>>中级领导</option>
				    <option value="3" <c:if test="${pOXX.drzw=='3'}">selected="selected"</c:if>>一般员工</option>
				    <option value="4" <c:if test="${pOXX.drzw=='4'}">selected="selected"</c:if>>其他</option>
				    <option value="5" <c:if test="${pOXX.drzw=='5'}">selected="selected"</c:if>>未知</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-9" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">从事行业描述</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:csxyms" value="${pOXX.csxyms}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位性质</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:pOXX:dwxz"  value="${pOXX.dwxz}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${pOXX.dwxz=='1'}">selected="selected"</c:if>>机关事业</option>
				    <option value="2" <c:if test="${pOXX.dwxz=='2'}">selected="selected"</c:if>>国营企业</option>
				    <option value="3" <c:if test="${pOXX.dwxz=='3'}">selected="selected"</c:if>>私营企业</option>
				    <option value="4" <c:if test="${pOXX.dwxz=='4'}">selected="selected"</c:if>>金融企业</option>
				    <option value="5" <c:if test="${pOXX.dwxz=='5'}">selected="selected"</c:if>>军队</option>
				    <option value="6" <c:if test="${pOXX.dwxz=='6'}">selected="selected"</c:if>>个体经营户</option>
				    <option value="7" <c:if test="${pOXX.dwxz=='7'}">selected="selected"</c:if>>三资企业</option>
				    <option value="8" <c:if test="${pOXX.dwxz=='8'}">selected="selected"</c:if>>邮电通讯</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位邮编</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="postcode"  onblur="checkPostcode();"  name="m:pOXX:dwyb" value="${pOXX.dwyb}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位电话</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="phone"  onblur="checkNumber();"  name="m:pOXX:dwdh" value="${pOXX.dwdh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:pOXX:dwdz" value="${pOXX.dwdz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">月收入</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="comein"  onblur="checkMoneys('comein');"  name="m:pOXX:ysr" value="${pOXX.ysr}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
	 		 	<div class="fr_response_field col-sm-9" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注（其他）</label>
				  	<div class="fr-form-block">
				   <input type="text" class="fr-form-control" name="m:pOXX:bz1" value="${pOXX.bz1}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div> 
</form>

			</div>
		</div>
				<input type="hidden"  id="sfid" value="${sfid}">
	</body>
</html>
