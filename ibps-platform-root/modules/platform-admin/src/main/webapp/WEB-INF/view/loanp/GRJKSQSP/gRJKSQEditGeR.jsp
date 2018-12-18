<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/GRJKSQSP/gRJKSQ.js"></script>
         <script type="text/javascript" src="${ctx}/js/lc/loanp/GTGSHXX/gTGSHXX.js"></script>
         <script type="text/javascript" src="${ctx}/js/lc/loanp/ZYXX/zYXXB.js"></script>
<script type="text/javascript"> 
 function Choose(){
	//var select1 = parent.document.getElementById("select1");
	var choose = $("#select1 option:selected");

 	if(choose.val() =='1')//个体工商户--是ChoosePoxx();
    document.getElementById("iframe1").src=__ctx + "/loanp/GTGSHXX/gTGSHXX/edit.htm?sfid="+$("#sfid").val();  
	if(choose.val() =='2') //职业信息  --否
		document.getElementById("iframe1").src=__ctx + "/loanp/ZYXX/zYXXB/edit.htm?sfid="+$("#sfid").val(); 
}   
 function ChoosePoxx(){
	 //配偶信息
		//var select1 = parent.document.getElementById("select1");
		var choose1 = $("#select2 option:selected");

	 	if(choose1.val() =='2')//个体工商户--是ChoosePoxx();
	    document.getElementById("iframe3").src=__ctx + "/loanp/POXX/pOXX/edit.htm?sfid="+$("#sfid").val();  
	}   
  function beforeSave(sfid1){
	 //alert("测试1"+sfid1);
	 iframe1.window.SaveGTgsh(sfid1);
	  /*
	   iframe1 为iframe的name属性值，
	   不能为id，因为在FireFox下id不能获取iframe对象
	  */
	// frames["iframe1"].document.getElementById("form").submit();
} 
  function beforeSaveGZ(sfid1){
		// alert("测试2"+sfid1);
		 iframe2.window.SaveGRGZLL(sfid1);
		  /*
		   iframe1 为iframe的name属性值，
		   不能为id，因为在FireFox下id不能获取iframe对象
		  */
		// frames["iframe1"].document.getElementById("form").submit();
	} 
  function beforeSavePOXX(sfid1){
		//alert("测试3"+sfid1);
		 iframe3.window.SavePOXX(sfid1);
		  /*
		   iframe1 为iframe的name属性值，
		   不能为id，因为在FireFox下id不能获取iframe对象
		  */
		// frames["iframe1"].document.getElementById("form").submit();
	} 
</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<%-- <a href="get.htm?sfid=${sfid}" class="btn btn-primary fa fa-back" ><span>返回</span></a> --%>
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
				        			<br><hr>
			<center><p style="font-size:24px;"><stronger>个人基本信息</stronger></p></center>	<hr>
			<div class="">
				<form  class="fr-form"  id="gRJKSQForm" action="save.htm?sfid=${sfid}" >
					<input type="hidden" name="m:gRJKSQ:id"  value="${sfid}"/>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户类型 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:khlx" value="${gRJKSQ.khlx}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户英文名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:khywm" value="${gRJKSQ.khywm}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有户籍证明</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:sfyhjzm"  value="${gRJKSQ.sfyhjzm}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.sfyhjzm=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${gRJKSQ.sfyhjzm=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">民族 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:mz"  value="${gRJKSQ.mz}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.mz=='1'}">selected="selected"</c:if>>阿昌族</option>
				    <option value="2" <c:if test="${gRJKSQ.mz=='2'}">selected="selected"</c:if>>白族</option>
				    <option value="3" <c:if test="${gRJKSQ.mz=='3'}">selected="selected"</c:if>>保安族</option>
				    <option value="4" <c:if test="${gRJKSQ.mz=='4'}">selected="selected"</c:if>>布朗族</option>
				    <option value="5" <c:if test="${gRJKSQ.mz=='5'}">selected="selected"</c:if>>布依族</option>
				    <option value="6" <c:if test="${gRJKSQ.mz=='6'}">selected="selected"</c:if>>朝鲜族</option>
				    <option value="7" <c:if test="${gRJKSQ.mz=='7'}">selected="selected"</c:if>>达斡尔族</option>
				    <option value="8" <c:if test="${gRJKSQ.mz=='8'}">selected="selected"</c:if>>傣族</option>
				    <option value="9" <c:if test="${gRJKSQ.mz=='9'}">selected="selected"</c:if>>德昂族</option>
				    <option value="10" <c:if test="${gRJKSQ.mz=='10'}">selected="selected"</c:if>>东乡族</option>
				    <option value="11" <c:if test="${gRJKSQ.mz=='11'}">selected="selected"</c:if>>侗族</option>
				    <option value="12" <c:if test="${gRJKSQ.mz=='12'}">selected="selected"</c:if>>独龙族</option>
				    <option value="13" <c:if test="${gRJKSQ.mz=='13'}">selected="selected"</c:if>>俄罗斯族</option>
				    <option value="14" <c:if test="${gRJKSQ.mz=='14'}">selected="selected"</c:if>>鄂伦春族</option>
				    <option value="15" <c:if test="${gRJKSQ.mz=='15'}">selected="selected"</c:if>>鄂伦春族</option>
				    <option value="16" <c:if test="${gRJKSQ.mz=='16'}">selected="selected"</c:if>>高山族</option>
				    <option value="17" <c:if test="${gRJKSQ.mz=='17'}">selected="selected"</c:if>>仡佬族</option>
				    <option value="18" <c:if test="${gRJKSQ.mz=='18'}">selected="selected"</c:if>>哈尼族</option>
				    <option value="19" <c:if test="${gRJKSQ.mz=='19'}">selected="selected"</c:if>>哈萨克族</option>
				    <option value="20" <c:if test="${gRJKSQ.mz=='20'}">selected="selected"</c:if>>汉族</option>
				    <option value="21" <c:if test="${gRJKSQ.mz=='21'}">selected="selected"</c:if>>赫哲族</option>
				    <option value="22" <c:if test="${gRJKSQ.mz=='22'}">selected="selected"</c:if>>回族</option>
				    <option value="23" <c:if test="${gRJKSQ.mz=='23'}">selected="selected"</c:if>>基诺族</option>
				    <option value="24" <c:if test="${gRJKSQ.mz=='24'}">selected="selected"</c:if>>京族</option>
				    <option value="25" <c:if test="${gRJKSQ.mz=='25'}">selected="selected"</c:if>>景颇族</option>
				    <option value="26" <c:if test="${gRJKSQ.mz=='26'}">selected="selected"</c:if>>柯尔克孜族</option>
				    <option value="27" <c:if test="${gRJKSQ.mz=='27'}">selected="selected"</c:if>>拉祜族</option>
				    <option value="28" <c:if test="${gRJKSQ.mz=='28'}">selected="selected"</c:if>>黎族</option>
				    <option value="29" <c:if test="${gRJKSQ.mz=='29'}">selected="selected"</c:if>>傈僳族</option>
				    <option value="30" <c:if test="${gRJKSQ.mz=='30'}">selected="selected"</c:if>>珞巴族</option>
				    <option value="31" <c:if test="${gRJKSQ.mz=='31'}">selected="selected"</c:if>>满族</option>
				    <option value="32" <c:if test="${gRJKSQ.mz=='32'}">selected="selected"</c:if>>毛南族</option>
				    <option value="33" <c:if test="${gRJKSQ.mz=='33'}">selected="selected"</c:if>>门巴族</option>
				    <option value="34" <c:if test="${gRJKSQ.mz=='34'}">selected="selected"</c:if>>蒙古族</option>
				    <option value="35" <c:if test="${gRJKSQ.mz=='35'}">selected="selected"</c:if>>苗族</option>
				    <option value="36" <c:if test="${gRJKSQ.mz=='36'}">selected="selected"</c:if>>仫佬族</option>
				    <option value="37" <c:if test="${gRJKSQ.mz=='37'}">selected="selected"</c:if>>纳西族</option>
				    <option value="38" <c:if test="${gRJKSQ.mz=='38'}">selected="selected"</c:if>>怒族</option>
				    <option value="39" <c:if test="${gRJKSQ.mz=='39'}">selected="selected"</c:if>>普米族</option>
				    <option value="40" <c:if test="${gRJKSQ.mz=='40'}">selected="selected"</c:if>>羌族</option>
				    <option value="41" <c:if test="${gRJKSQ.mz=='41'}">selected="selected"</c:if>>撒拉族</option>
				    <option value="42" <c:if test="${gRJKSQ.mz=='42'}">selected="selected"</c:if>>畲族</option>
				    <option value="43" <c:if test="${gRJKSQ.mz=='43'}">selected="selected"</c:if>>水族</option>
				    <option value="44" <c:if test="${gRJKSQ.mz=='44'}">selected="selected"</c:if>>塔吉克族</option>
				    <option value="45" <c:if test="${gRJKSQ.mz=='45'}">selected="selected"</c:if>>塔塔尔族</option>
				    <option value="46" <c:if test="${gRJKSQ.mz=='46'}">selected="selected"</c:if>>土家族</option>
				    <option value="47" <c:if test="${gRJKSQ.mz=='47'}">selected="selected"</c:if>>土族</option>
				    <option value="48" <c:if test="${gRJKSQ.mz=='48'}">selected="selected"</c:if>>佤族</option>
				    <option value="49" <c:if test="${gRJKSQ.mz=='49'}">selected="selected"</c:if>>维吾尔族</option>
				    <option value="50" <c:if test="${gRJKSQ.mz=='50'}">selected="selected"</c:if>>乌孜别克族</option>
				    <option value="51" <c:if test="${gRJKSQ.mz=='51'}">selected="selected"</c:if>>锡伯族</option>
				    <option value="52" <c:if test="${gRJKSQ.mz=='52'}">selected="selected"</c:if>>瑶族</option>
				    <option value="53" <c:if test="${gRJKSQ.mz=='53'}">selected="selected"</c:if>>彝族</option>
				    <option value="54" <c:if test="${gRJKSQ.mz=='54'}">selected="selected"</c:if>>裕固族</option>
				    <option value="55" <c:if test="${gRJKSQ.mz=='55'}">selected="selected"</c:if>>藏族</option>
				    <option value="56" <c:if test="${gRJKSQ.mz=='56'}">selected="selected"</c:if>>壮族</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户名称 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:khmc" value="${gRJKSQ.khmc}" validate="{required:true" />
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户曾用名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:khcym" value="${gRJKSQ.khcym}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件有效期限</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:zjyxqx" value="${gRJKSQ.zjyxqx}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户性别 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:khxb"  value="${gRJKSQ.khxb}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.khxb=='1'}">selected="selected"</c:if>>男</option>
				    <option value="2" <c:if test="${gRJKSQ.khxb=='2'}">selected="selected"</c:if>>女</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件类别 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:zjlb"  value="${gRJKSQ.zjlb}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.zjlb=='1'}">selected="selected"</c:if>>身份证</option>
				    <option value="2" <c:if test="${gRJKSQ.zjlb=='2'}">selected="selected"</c:if>>军官证</option>
				    <option value="3" <c:if test="${gRJKSQ.zjlb=='3'}">selected="selected"</c:if>>护照</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:zjhm" value="${sfid}" validate="{required:true" readonly/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">婚姻状况 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" id ="select2" name="m:gRJKSQ:hyzk"  value="${gRJKSQ.hyzk}" validate="{required:true}" onchange="ChoosePoxx();">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.hyzk=='1'}">selected="selected"</c:if>>未婚</option>
				    <option value="2" <c:if test="${gRJKSQ.hyzk=='2'}">selected="selected"</c:if>>已婚</option>
				    <option value="3" <c:if test="${gRJKSQ.hyzk=='3'}">selected="selected"</c:if>>丧偶</option>
				    <option value="4" <c:if test="${gRJKSQ.hyzk=='4'}">selected="selected"</c:if>>离婚</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">最高学历 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:zgxl"  value="${gRJKSQ.zgxl}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.zgxl=='1'}">selected="selected"</c:if>>研究生</option>
				    <option value="2" <c:if test="${gRJKSQ.zgxl=='2'}">selected="selected"</c:if>>大学本科</option>
				    <option value="3" <c:if test="${gRJKSQ.zgxl=='3'}">selected="selected"</c:if>>大学专科或专科学校</option>
				    <option value="4" <c:if test="${gRJKSQ.zgxl=='4'}">selected="selected"</c:if>>中等专业学校或者中等技术学校</option>
				    <option value="5" <c:if test="${gRJKSQ.zgxl=='5'}">selected="selected"</c:if>>技术学校</option>
				    <option value="6" <c:if test="${gRJKSQ.zgxl=='6'}">selected="selected"</c:if>>高中</option>
				    <option value="7" <c:if test="${gRJKSQ.zgxl=='7'}">selected="selected"</c:if>>初中</option>
				    <option value="8" <c:if test="${gRJKSQ.zgxl=='8'}">selected="selected"</c:if>>小学</option>
				    <option value="9" <c:if test="${gRJKSQ.zgxl=='9'}">selected="selected"</c:if>>文盲或者半文盲</option>
				    <option value="10" <c:if test="${gRJKSQ.zgxl=='10'}">selected="selected"</c:if>>未知</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">最高学位 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:zgxw"  value="${gRJKSQ.zgxw}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.zgxw=='1'}">selected="selected"</c:if>>其它</option>
				    <option value="2" <c:if test="${gRJKSQ.zgxw=='2'}">selected="selected"</c:if>>名誉博士</option>
				    <option value="3" <c:if test="${gRJKSQ.zgxw=='3'}">selected="selected"</c:if>>博士</option>
				    <option value="4" <c:if test="${gRJKSQ.zgxw=='4'}">selected="selected"</c:if>>硕士</option>
				    <option value="5" <c:if test="${gRJKSQ.zgxw=='5'}">selected="selected"</c:if>>学士</option>
				    <option value="6" <c:if test="${gRJKSQ.zgxw=='6'}">selected="selected"</c:if>>未知</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人健康状况 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:grjkzk"  value="${gRJKSQ.grjkzk}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.grjkzk=='1'}">selected="selected"</c:if>>良好</option>
				    <option value="2" <c:if test="${gRJKSQ.grjkzk=='2'}">selected="selected"</c:if>>一般</option>
				    <option value="3" <c:if test="${gRJKSQ.grjkzk=='3'}">selected="selected"</c:if>>较差</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">政治面貌 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:zzmm"  value="${gRJKSQ.zzmm}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.zzmm=='1'}">selected="selected"</c:if>>群众</option>
				    <option value="2" <c:if test="${gRJKSQ.zzmm=='2'}">selected="selected"</c:if>>中共党员</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">出生日期</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:csrq" value="${gRJKSQ.csrq}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">行政区划（客户所属地区） *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:xzqh" value="${gRJKSQ.xzqh}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">户口性质 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:hkxz"  value="${gRJKSQ.hkxz}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.hkxz=='1'}">selected="selected"</c:if>>本省</option>
				    <option value="2" <c:if test="${gRJKSQ.hkxz=='2'}">selected="selected"</c:if>>外省</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">户籍地址 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:hjdz" value="${gRJKSQ.hjdz}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否户主 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:sfhz"  value="${gRJKSQ.sfhz}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.sfhz=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${gRJKSQ.sfhz=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通信地址 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:txdz" value="${gRJKSQ.txdz}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否本行股东 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:sfbxgd"  value="${gRJKSQ.sfbxgd}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.sfbxgd=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${gRJKSQ.sfbxgd=='2'}">selected="selected"</c:if>>否</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通信地址邮政编码 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:txdzyzbm" value="${gRJKSQ.txdzyzbm}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">手机号码 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:sjhm" value="${gRJKSQ.sjhm}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">其他联系方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:qtlxfs" value="${gRJKSQ.qtlxfs}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">电子邮箱</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:dzyx" value="${gRJKSQ.dzyx}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">专业特长</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:zytz"  value="${gRJKSQ.zytz}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.zytz=='1'}">selected="selected"</c:if>>无</option>
				    <option value="2" <c:if test="${gRJKSQ.zytz=='2'}">selected="selected"</c:if>>种粮</option>
				    <option value="3" <c:if test="${gRJKSQ.zytz=='3'}">selected="selected"</c:if>>养殖</option>
				    <option value="4" <c:if test="${gRJKSQ.zytz=='4'}">selected="selected"</c:if>>木工</option>
				    <option value="5" <c:if test="${gRJKSQ.zytz=='5'}">selected="selected"</c:if>>瓦工</option>
				    <option value="6" <c:if test="${gRJKSQ.zytz=='6'}">selected="selected"</c:if>>电器维修</option>
				    <option value="7" <c:if test="${gRJKSQ.zytz=='7'}">selected="selected"</c:if>>汽车维修</option>
				    <option value="8" <c:if test="${gRJKSQ.zytz=='8'}">selected="selected"</c:if>>经商</option>
				    <option value="9" <c:if test="${gRJKSQ.zytz=='9'}">selected="selected"</c:if>>运输</option>
				    <option value="10" <c:if test="${gRJKSQ.zytz=='10'}">selected="selected"</c:if>>其它</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-9" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">居住地址 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:jzdz" value="${gRJKSQ.jzdz}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">居住状况 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:jzzk"  value="${gRJKSQ.jzzk}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.jzzk=='1'}">selected="selected"</c:if>>自置</option>
				    <option value="2" <c:if test="${gRJKSQ.jzzk=='2'}">selected="selected"</c:if>>按揭</option>
				    <option value="3" <c:if test="${gRJKSQ.jzzk=='3'}">selected="selected"</c:if>>亲属楼宇</option>
				    <option value="4" <c:if test="${gRJKSQ.jzzk=='4'}">selected="selected"</c:if>>集体宿舍</option>
				    <option value="5" <c:if test="${gRJKSQ.jzzk=='5'}">selected="selected"</c:if>>租房</option>
				    <option value="6" <c:if test="${gRJKSQ.jzzk=='6'}">selected="selected"</c:if>>共有住宅</option>
				    <option value="7" <c:if test="${gRJKSQ.jzzk=='7'}">selected="selected"</c:if>>其它</option>
				    <option value="8" <c:if test="${gRJKSQ.jzzk=='8'}">selected="selected"</c:if>>未知</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">居住状态 *</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:jzzt"  value="${gRJKSQ.jzzt}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.jzzt=='1'}">selected="selected"</c:if>>长住</option>
				    <option value="2" <c:if test="${gRJKSQ.jzzt=='2'}">selected="selected"</c:if>>选临时</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">居住地邮政编码 *</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:jzdyzbm" value="${gRJKSQ.jzdyzbm}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要经营项目</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:zyjyxm" value="${gRJKSQ.zyjyxm}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要经济来源</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:zyjjly" value="${gRJKSQ.zyjjly}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">其他经济来源</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:qtjjly" value="${gRJKSQ.qtjjly}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人综合年收入</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:grzhnsr" value="${gRJKSQ.grzhnsr}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">家庭人均年收入</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:jtrjnsr" value="${gRJKSQ.jtrjnsr}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">家庭年均支出</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:gRJKSQ:jtnjzc" value="${gRJKSQ.jtnjzc}" validate="{required:true"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要供养人口</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:zygyrk"  value="${gRJKSQ.zygyrk}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.zygyrk=='1'}">selected="selected"</c:if>>0人</option>
				    <option value="2" <c:if test="${gRJKSQ.zygyrk=='2'}">selected="selected"</c:if>>1人</option>
				    <option value="3" <c:if test="${gRJKSQ.zygyrk=='3'}">selected="selected"</c:if>>2人</option>
				    <option value="4" <c:if test="${gRJKSQ.zygyrk=='4'}">selected="selected"</c:if>>3人</option>
				    <option value="5" <c:if test="${gRJKSQ.zygyrk=='5'}">selected="selected"</c:if>>4人以上</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">与我社关系</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control" name="m:gRJKSQ:ywsgx"  value="${gRJKSQ.ywsgx}" validate="{required:true}">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.ywsgx=='1'}">selected="selected"</c:if>>密切</option>
				    <option value="2" <c:if test="${gRJKSQ.ywsgx=='2'}">selected="selected"</c:if>>一般</option>
				    <option value="3" <c:if test="${gRJKSQ.ywsgx=='3'}">selected="selected"</c:if>>较少</option>
				</select>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否个体工商户</label>
				  	<div class="fr-form-block">
				<select class="fr-form-control"  id ="select1" name="m:gRJKSQ:sfgtgsh"  value="${gRJKSQ.sfgtgsh}" validate="{required:true}" onchange="Choose();">
					 <option value="">请选择</option>
				    <option value="1" <c:if test="${gRJKSQ.sfgtgsh=='1'}">selected="selected"</c:if>>是</option>
				    <option value="2" <c:if test="${gRJKSQ.sfgtgsh=='2'}">selected="selected"</c:if>>否</option>
				</select>
				  
				 	</div>
			  	</div>
			</div>
	 
	
</form>

			</div>

            <div class="">
			<!-- 职业信息or个体工商户 -->
				           <iframe id="iframe1"  name="iframe1"  width="100%" height="330px" frameborder=no  border=0  marginwidth=0  marginheight=0  scrolling=no></iframe>			
	        </div>

	        			<br><hr>
			<center><p style="font-size:24px;"><stronger>个人工作履历信息</stronger></p></center>	<hr>
 		    <div class="">
			<!--个人工作履历-->
				          <iframe id="iframe2"  name="iframe2"  width="100%" height="200px" frameborder=no  border=0  marginwidth=0  marginheight=0  scrolling=no src="${ctx}/loanp/GRGZLL/gRGZLL/edit.htm?sfid=${sfid}"></iframe>			
	        </div> 
           

            	<!--配偶信息-->
                          <iframe id="iframe3"  name="iframe3"  width="100%" height="400px" frameborder=no  border=0  marginwidth=0  marginheight=0  scrolling=no ></iframe>			
            </div>
		</div>
		<input type="hidden"  id="sfid" value="${sfid}">
			<input type="hidden"  id="id" value="${id}">
	</body>
</html>
