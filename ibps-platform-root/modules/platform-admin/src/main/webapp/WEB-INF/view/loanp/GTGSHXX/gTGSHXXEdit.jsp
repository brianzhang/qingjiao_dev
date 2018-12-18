<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/GTGSHXX/gTGSHXX.js"></script>
		<script type="text/javascript"> 

  function SaveGTgsh(sfid1){
	// alert("测试SaveGTgsh(){ ");
	 //alert("测试SaveGTgsh()"+sfid1);
	 $(document).ready(function(){
		 //alert("#sfid"+ $("#sfid").val());
		//  $("#intro").css("background-color","yellow");
		});
	 //document.getElementById("sfid").val() = sfid;
	// document.getElementById("zYXXBForm").submit();
		// alert("测试返回");
		 gTGSHXX._initForm();
	//  frames["iframe1"].document.getElementById("form").submit();
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
								<br>	<hr>
			<center><p style="font-size:24px;"><stronger>个体工商户信息</stronger></p></center>	<hr>
			<div class="">
				<form  class="fr-form"  id="gTGSHXXForm" action="save.htm?sfid=${sfid}" >
					<input type="hidden" name="m:gTGSHXX:id"  value="${sfid}"/><%-- ${gTGSHXX.id} --%>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">营业执照号码</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:yyzzhm" value="${gTGSHXX.yyzzhm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">营业执照年检时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:yyzznjsj" value="${gTGSHXX.yyzznjsj}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">成立时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:clsj" value="${gTGSHXX.clsj}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经营范围</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:jyfw" value="${gTGSHXX.jyfw}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经营方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:jyfs" value="${gTGSHXX.jyfs}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">门店字号 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:mdzh" value="${gTGSHXX.mdzh}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">门店地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:mddz" value="${gTGSHXX.mddz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经营规模</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:jygm" value="${gTGSHXX.jygm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">基本账号开户行</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:jbzhkhx" value="${gTGSHXX.jbzhkhx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">基本账号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:jbzh" value="${gTGSHXX.jbzh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经营面积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:jymj" value="${gTGSHXX.jymj}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">关联账户类型</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gTGSHXX:glzhlx"  value="${gTGSHXX.glzhlx}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gTGSHXX.glzhlx=='1'}">selected="selected"</c:if>>个人结算账户</option>
				    <option value="2" <c:if test="${gTGSHXX.glzhlx=='2'}">selected="selected"</c:if>>银行卡账户口</option>
				    <option value="3" <c:if test="${gTGSHXX.glzhlx=='3'}">selected="selected"</c:if>>其他账户</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">从业人数</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  name="m:gTGSHXX:cyrs"  value="${gTGSHXX.cyrs}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">组成形式</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gTGSHXX:zcxs"  value="${gTGSHXX.zcxs}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gTGSHXX.zcxs=='1'}">selected="selected"</c:if>>个人经营</option>
				    <option value="2" <c:if test="${gTGSHXX.zcxs=='2'}">selected="selected"</c:if>>家庭经营</option>
				    <option value="3" <c:if test="${gTGSHXX.zcxs=='3'}">selected="selected"</c:if>>合伙经营</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">营业用房</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gTGSHXX:yyyf"  value="${gTGSHXX.yyyf}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gTGSHXX.yyyf=='1'}">selected="selected"</c:if>>自置</option>
				    <option value="2" <c:if test="${gTGSHXX.yyyf=='2'}">selected="selected"</c:if>>租用</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">管户机构</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:ghjg" value="${gTGSHXX.ghjg}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:bz" value="${gTGSHXX.bz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">合伙人名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:hhrmc" value="${gTGSHXX.hhrmc}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件类型</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gTGSHXX:zjlx"  value="${gTGSHXX.zjlx}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gTGSHXX.zjlx=='1'}">selected="selected"</c:if>>身份证</option>
				    <option value="2" <c:if test="${gTGSHXX.zjlx=='2'}">selected="selected"</c:if>>军官证</option>
				    <option value="" <c:if test="${gTGSHXX.zjlx==''}">selected="selected"</c:if>>护照</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件有效期限</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:zjyxqx" value="${gTGSHXX.zjyxqx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"    name="m:gTGSHXX:zjhm" value="${gTGSHXX.zjhm}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">户籍地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:hjdz" value="${gTGSHXX.hjdz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户性别</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gTGSHXX:khxb"  value="${gTGSHXX.khxb}" validate="{required:false}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gTGSHXX.khxb=='1'}">selected="selected"</c:if>>男</option>
				    <option value="2" <c:if test="${gTGSHXX.khxb=='2'}">selected="selected"</c:if>>女</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">民族</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:mz" value="${gTGSHXX.mz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系电话</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id="phone"  onblur="checkNumber();"  name="m:gTGSHXX:lxdh" value="${gTGSHXX.lxdh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">合伙方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gTGSHXX:hhfs" value="${gTGSHXX.hhfs}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
				<input type="hidden"  id="sfid" value="${sfid}">
	</body>
</html>
