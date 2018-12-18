<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/ZYXX/zYXXB.js"></script>
			<script type="text/javascript"> 

  function SaveGTgsh(sfid1){
	 //alert("测试SaveZYxx()"+sfid1);
	 $(document).ready(function(){
		// alert("#sfid"+ $("#sfid").val());
		//  $("#intro").css("background-color","yellow");
		});
	 //document.getElementById("sfid").val() = sfid;
	// document.getElementById("zYXXBForm").submit();
		// alert("测试返回");
		 zYXXB._initForm();
	//   frames["iframe1"].document.getElementById("form").submit();
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
			<center><p style="font-size:24px;"><stronger>职业信息</stronger></p></center>	<hr>
			<div class="">
				<form  class="fr-form"  id="zYXXBForm" action="save.htm?sfid=${sfid}" >
					<input type="hidden" name="m:zYXXB:id"  value="${sfid}"/><%-- ${zYXXB.id} --%>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">职业 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zYXXB:zynsr"  value="${zYXXB.zynsr}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zYXXB.zynsr=='1'}">selected="selected"</c:if>>国家机关，党群组织，企业，事业单位负责人</option>
				    <option value="2" <c:if test="${zYXXB.zynsr=='2'}">selected="selected"</c:if>>专业技术人员</option>
				    <option value="3" <c:if test="${zYXXB.zynsr=='3'}">selected="selected"</c:if>>办事人员和有关人员</option>
				    <option value="4" <c:if test="${zYXXB.zynsr=='4'}">selected="selected"</c:if>>商业，服务业人员</option>
				    <option value="5" <c:if test="${zYXXB.zynsr=='5'}">selected="selected"</c:if>>农林牧渔水利业生产人员</option>
				    <option value="6" <c:if test="${zYXXB.zynsr=='6'}">selected="selected"</c:if>>生产，运输设备操作人员及有关人员</option>
				    <option value="7" <c:if test="${zYXXB.zynsr=='7'}">selected="selected"</c:if>>军人</option>
				    <option value="8" <c:if test="${zYXXB.zynsr=='8'}">selected="selected"</c:if>>不便分类的其他从业人员</option>
				    <option value="9" <c:if test="${zYXXB.zynsr=='9'}">selected="selected"</c:if>>未知</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">年收入</label>
				  	<div class="fr-form-block">
				<input type="number"  class="fr-form-control"  id="money"  onblur="checkMoneys('money');" name="m:zYXXB:nsr"  value="${zYXXB.nsr}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否本行员工 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zYXXB:sfbxyg"  value="${zYXXB.sfbxyg}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zYXXB.sfbxyg=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${zYXXB.sfbxyg=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">首次合作时间</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zYXXB:schzsj" value="${zYXXB.schzsj}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">首次合作金额</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"   id="moneyss"  onblur="checkMoneys('moneyss');" name="m:zYXXB:schzje" value="${zYXXB.schzje}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工作单位名称 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zYXXB:gzdwmc" value="${zYXXB.gzdwmc}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位地址 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zYXXB:dwdz" value="${zYXXB.dwdz}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位邮编 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"  id="postcode"  onblur="checkPostcode();"  name="m:zYXXB:dwyb" value="${zYXXB.dwyb}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位所属行业 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zYXXB:dwssxy"  value="${zYXXB.dwssxy}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zYXXB.dwssxy=='1'}">selected="selected"</c:if>>农林牧渔</option>
				    <option value="2" <c:if test="${zYXXB.dwssxy=='2'}">selected="selected"</c:if>>采掘业</option>
				    <option value="3" <c:if test="${zYXXB.dwssxy=='3'}">selected="selected"</c:if>>制造业</option>
				    <option value="4" <c:if test="${zYXXB.dwssxy=='4'}">selected="selected"</c:if>>电力，燃气，水的生产和供应业</option>
				    <option value="5" <c:if test="${zYXXB.dwssxy=='5'}">selected="selected"</c:if>>建筑业</option>
				    <option value="6" <c:if test="${zYXXB.dwssxy=='6'}">selected="selected"</c:if>>交通运输，仓储，邮政业</option>
				    <option value="7" <c:if test="${zYXXB.dwssxy=='7'}">selected="selected"</c:if>>信息传输，计算机服务，软件业</option>
				    <option value="8" <c:if test="${zYXXB.dwssxy=='8'}">selected="selected"</c:if>>批发零售业</option>
				    <option value="9" <c:if test="${zYXXB.dwssxy=='9'}">selected="selected"</c:if>>住宿，餐饮业</option>
				    <option value="10" <c:if test="${zYXXB.dwssxy=='10'}">selected="selected"</c:if>>金融业</option>
				    <option value="11" <c:if test="${zYXXB.dwssxy=='11'}">selected="selected"</c:if>>房地产业</option>
				    <option value="12" <c:if test="${zYXXB.dwssxy=='12'}">selected="selected"</c:if>>租赁，商务服务业</option>
				    <option value="13" <c:if test="${zYXXB.dwssxy=='13'}">selected="selected"</c:if>>科学研究，技术服务和地质勘察业</option>
				    <option value="14" <c:if test="${zYXXB.dwssxy=='14'}">selected="selected"</c:if>>水利，环境，公共设施管理业</option>
				    <option value="15" <c:if test="${zYXXB.dwssxy=='15'}">selected="selected"</c:if>>居民服务和其他服务业</option>
				    <option value="16" <c:if test="${zYXXB.dwssxy=='16'}">selected="selected"</c:if>>教育</option>
				    <option value="17" <c:if test="${zYXXB.dwssxy=='17'}">selected="selected"</c:if>>卫生，社会保障和社会福利业</option>
				    <option value="18" <c:if test="${zYXXB.dwssxy=='18'}">selected="selected"</c:if>>文化，体育，娱乐业</option>
				    <option value="19" <c:if test="${zYXXB.dwssxy=='19'}">selected="selected"</c:if>>公共管理和社会组织</option>
				    <option value="20" <c:if test="${zYXXB.dwssxy=='20'}">selected="selected"</c:if>>国际组织</option>
				    <option value="21" <c:if test="${zYXXB.dwssxy=='21'}">selected="selected"</c:if>>其他</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位性质 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zYXXB:dwxz"  value="${zYXXB.dwxz}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zYXXB.dwxz=='1'}">selected="selected"</c:if>>机关事业</option>
				    <option value="2" <c:if test="${zYXXB.dwxz=='2'}">selected="selected"</c:if>>国营企业</option>
				    <option value="3" <c:if test="${zYXXB.dwxz=='3'}">selected="selected"</c:if>>军队</option>
				    <option value="4" <c:if test="${zYXXB.dwxz=='4'}">selected="selected"</c:if>>金融企业</option>
				    <option value="5" <c:if test="${zYXXB.dwxz=='5'}">selected="selected"</c:if>>私营企业</option>
				    <option value="6" <c:if test="${zYXXB.dwxz=='6'}">selected="selected"</c:if>>个体经营户</option>
				    <option value="7" <c:if test="${zYXXB.dwxz=='7'}">selected="selected"</c:if>>三资企业</option>
				    <option value="8" <c:if test="${zYXXB.dwxz=='8'}">selected="selected"</c:if>>邮电通讯</option>
				    <option value="9" <c:if test="${zYXXB.dwxz=='9'}">selected="selected"</c:if>>其他</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">职务 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zYXXB:zw"  value="${zYXXB.zw}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zYXXB.zw=='1'}">selected="selected"</c:if>>高级领导</option>
				    <option value="2" <c:if test="${zYXXB.zw=='2'}">selected="selected"</c:if>>中级领导</option>
				    <option value="3" <c:if test="${zYXXB.zw=='3'}">selected="selected"</c:if>>一般员工</option>
				    <option value="4" <c:if test="${zYXXB.zw=='4'}">selected="selected"</c:if>>其他</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">职称 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zYXXB:zc"  value="${zYXXB.zc}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zYXXB.zc=='1'}">selected="selected"</c:if>>无</option>
				    <option value="2" <c:if test="${zYXXB.zc=='2'}">selected="selected"</c:if>>高级</option>
				    <option value="3" <c:if test="${zYXXB.zc=='3'}">selected="selected"</c:if>>中级</option>
				    <option value="4" <c:if test="${zYXXB.zc=='4'}">selected="selected"</c:if>>初级</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">月收入</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control"   id="money"  onblur="checkMoneys('money');"name="m:zYXXB:ysr" value="${zYXXB.ysr}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">岗位性质 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:zYXXB:gwxz"  value="${zYXXB.gwxz}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${zYXXB.gwxz=='1'}">selected="selected"</c:if>>厅局级以上</option>
				    <option value="2" <c:if test="${zYXXB.gwxz=='2'}">selected="selected"</c:if>>副处级以上</option>
				    <option value="3" <c:if test="${zYXXB.gwxz=='3'}">selected="selected"</c:if>>副科级以上</option>
				    <option value="4" <c:if test="${zYXXB.gwxz=='4'}">selected="selected"</c:if>>一般职务</option>
				    <option value="5" <c:if test="${zYXXB.gwxz=='5'}">selected="selected"</c:if>>其他</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位电话</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" id="phone"  onblur="checkNumber();" name="m:zYXXB:dwdh" value="${zYXXB.dwdh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">本单位工作起始年月 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zYXXB:bdwgzqsny" value="${zYXXB.bdwgzqsny}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工资账号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zYXXB:gzzh" value="${zYXXB.gzzh}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工资账号开户行</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zYXXB:gzzhkhx" value="${zYXXB.gzzhkhx}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
				<input type="hidden"  id="sfid" value="${sfid}">
	</body>
</html>
