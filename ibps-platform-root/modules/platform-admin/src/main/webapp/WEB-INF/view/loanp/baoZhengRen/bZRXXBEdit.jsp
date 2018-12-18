<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/baoZhengRen/bZRXXB.js"></script>
		<script type="text/javascript">
		function  checkSfid(){
			  var sfid = window.document.getElementById("shenfenzheng");
			  var  sfcode = sfid.value; 
			  var  path = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			  if(!(path.test(sfcode)) ){ 
			        DialogUtil.msg("身份证号格式输入错误，请重新填写",
							function(rtn) {
							});  
			    }
			
		}
		function checkNumber(){
		  	  var  lianxi = window.document.getElementById("phone");
		  	   var  lianxicode = lianxi.value;
		  	   var  path2 = /^[0-9]*$|\s /;
		  	   if(!(path2.test(lianxicode))){ 
		  		   DialogUtil.msg("请填写正确的号码",
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
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a class="btn btn-primary fa fa-back"   href="${ctx}/loanp/bzrAll/baoZhengRenAll/list.htm?jdid=${jdid}" ><span>返回</span></a>	
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="bZRXXBForm" action="save.htm?Jdid=${Jdid}" >
					<input type="hidden" name="m:bZRXXB:id"  value="${bZRXXB.id}"/>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证类型</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:bZRXXB:bzlx"  value="${bZRXXB.bzlx}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${bZRXXB.bzlx=='1'}">selected="selected"</c:if>>自然人保证</option>
				    <option value="2" <c:if test="${bZRXXB.bzlx=='2'}">selected="selected"</c:if>>企业保证 </option>
				    <option value="3" <c:if test="${bZRXXB.bzlx=='3'}">selected="selected"</c:if>>政府保证</option>
				    <option value="4" <c:if test="${bZRXXB.bzlx=='4'}">selected="selected"</c:if>>下岗失业贷款担保中心</option>
				    <option value="5" <c:if test="${bZRXXB.bzlx=='5'}">selected="selected"</c:if>>国有商业银行及政策性银行保证</option>
				    <option value="6" <c:if test="${bZRXXB.bzlx=='6'}">selected="selected"</c:if>>其他银行保证</option>
				    <option value="7" <c:if test="${bZRXXB.bzlx=='7'}">selected="selected"</c:if>>非银行金融机构保证 </option>
				    <option value="8" <c:if test="${bZRXXB.bzlx=='8'}">selected="selected"</c:if>>外资和中外合资 </option>
				    <option value="9" <c:if test="${bZRXXB.bzlx=='9'}">selected="selected"</c:if>>非银行金融机构保证 </option>
				    <option value="10" <c:if test="${bZRXXB.bzlx=='10'}">selected="selected"</c:if>>组合保证</option>
				    <option value="11" <c:if test="${bZRXXB.bzlx=='11'}">selected="selected"</c:if>>其它保证</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人名称 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bZRXXB:bzrmc" value="${bZRXXB.bzrmc}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人证件类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bZRXXB:bzrzjlx" value="${bZRXXB.bzrzjlx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"   name="m:bZRXXB:zjhm" value="${bZRXXB.zjhm}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系电话</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="phone"  onblur="checkNumber();"  name="m:bZRXXB:lxdh" value="${bZRXXB.lxdh}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否保险公司保险</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:bZRXXB:sfbxgsbx"  value="${bZRXXB.sfbxgsbx}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${bZRXXB.sfbxgsbx=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${bZRXXB.sfbxgsbx=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bZRXXB:bzfs" value="${bZRXXB.bzfs}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证金额</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id = "comein"  onblur="checkMoneys('comein');"   name="m:bZRXXB:bzje" value="${bZRXXB.bzje}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证比例</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bZRXXB:bzbl" value="${bZRXXB.bzbl}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">与借款人关系</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bZRXXB:yjkrgx" value="${bZRXXB.yjkrgx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人配偶名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bZRXXB:bzrpomc" value="${bZRXXB.bzrpomc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人配偶证件类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bZRXXB:bzrpozjlx" value="${bZRXXB.bzrpozjlx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保证人配偶证件号码</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id="shenfenzheng"  onblur="checkSfid();"  name="m:bZRXXB:bzrpozjhm" value="${bZRXXB.bzrpozjhm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">实际居住地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bZRXXB:sjjzdz" value="${bZRXXB.sjjzdz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bZRXXB:bz" value="${bZRXXB.bz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label >若您未婚，请您提供一位联系人的基本信息，以便在必要情况下，及时保持联系联系人，必须年满18周岁</label>
				 	<div class="fr-form-block">
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系人姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bZRXXB:lxrxm" value="${bZRXXB.lxrxm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系人与借款人关系</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:bZRXXB:lxryjkrgx"  value="${bZRXXB.lxryjkrgx}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${bZRXXB.lxryjkrgx=='1'}">selected="selected"</c:if>>父母</option>
				    <option value="2" <c:if test="${bZRXXB.lxryjkrgx=='2'}">selected="selected"</c:if>>子女</option>
				    <option value="3" <c:if test="${bZRXXB.lxryjkrgx=='3'}">selected="selected"</c:if>>兄弟姐妹</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系人联系电话</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id="phone"   onblur="checkNumber();" name="m:bZRXXB:lxrlxdh" value="${bZRXXB.lxrlxdh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
