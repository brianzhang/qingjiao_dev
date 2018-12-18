<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/DaiKSSCSP/shenCRYJ.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="${ctx}/xinDai/liucheng/xinDaiLiuCheng/fuzhuren.htm?id=${shenCRYJ.jdid}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<iframe id="ZhuFrame" src="${ctx}/loanp/DaiKSSCSP/zhuDCRYJ/get.htm?jdid=${shenCRYJ.jdid}" frameborder="0" width="100%" height="800px"></iframe>
			<iframe id="JingFrame" src="${ctx}/loanp/DaiKSSCSP/jingBRYJ/get.htm?jdid=${shenCRYJ.jdid}" frameborder="0" width="100%" height="250px"></iframe>
			<div class="">
				<form  class="fr-form"  id="shenCRYJForm" action="save.htm?jdid=${jdid}" >
					<input type="hidden" name="m:shenCRYJ:id"  value="${shenCRYJ.id}"/>
					<input type="hidden" name="m:shenCRYJ:jdid"  value="${shenCRYJ.jdid}"/>
					<input type="hidden" name="m:shenCRYJ:scrid"  value="${shenCRYJ.scrid}"/>
					<input type="hidden" class="fr-form-control" name="m:shenCRYJ:jksqr" value="${shenCRYJ.jksqr}" validate="{required:false" readonly="true'"/>
			<div class="fr_response_field col-sm-12" >
			<div class ="panel panel-default">
			<div class="fr_response_field col-sm-12" >
			<div class="panel-heading">
				 <div class="fr_response_field col-sm-12" >
			       <label class="fr-control-label" style="width:50%">审查结论</label>
			 	</div>
			</div>
			</div>
			<div class="panel-body">	
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">1.贷款申请资料和内部运作资料齐备、真实、有效：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:shenCRYJ:sqzlsfyx" class="ibps" value="是"   <c:if test="${shenCRYJ.sqzlsfyx=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:shenCRYJ:sqzlsfyx" class="ibps" value="否"   <c:if test="${shenCRYJ.sqzlsfyx=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">2.借款申请人具有完全民事行为能力和偿还贷款本息的能力：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:shenCRYJ:jksqrchnl" class="ibps" value="是"   <c:if test="${shenCRYJ.jksqrchnl=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:shenCRYJ:jksqrchnl" class="ibps" value="否"   <c:if test="${shenCRYJ.jksqrchnl=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">3.借款申请人收入明、房产证明核实：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:shenCRYJ:jksqrsrhs" class="ibps" value="是"   <c:if test="${shenCRYJ.jksqrsrhs=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:shenCRYJ:jksqrsrhs" class="ibps" value="否"   <c:if test="${shenCRYJ.jksqrsrhs=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">4.担保人身份资料、担保资料：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:shenCRYJ:dbrsfhs" class="ibps" value="是"   <c:if test="${shenCRYJ.dbrsfhs=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:shenCRYJ:dbrsfhs" class="ibps" value="否"   <c:if test="${shenCRYJ.dbrsfhs=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">5.担保人具备担保能力：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:shenCRYJ:dbrdbnl" class="ibps" value="是"   <c:if test="${shenCRYJ.dbrdbnl=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:shenCRYJ:dbrdbnl" class="ibps" value="否"   <c:if test="${shenCRYJ.dbrdbnl=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>

			<div class="fr_response_field col-sm-12" >
				 <div class ="panel panel-default">
				 	 <div class="panel-body">
				 	 	 <div class="fr_response_field col-sm-12" >
				 	 	 	 <p>
				 	 	 	       同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.jksqr}</label> &nbsp&nbsp&nbsp&nbsp  
				                	授信  <input type="text" class="fr-form-control" name="m:shenCRYJ:sxje"  style="width:auto;display:inline" value="${shenCRYJ.sxje}" validate="{required:false"/> 元，
				                	授信期限 <input type="text" class="fr-form-control" name="m:shenCRYJ:sxqx" style="width:auto;display:inline" value="${shenCRYJ.sxqx}" validate="{required:false"/>月。  </p>
				             <p>
 		  		 	 	 	  	 	同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${shenCRYJ.jksqr}</label> &nbsp&nbsp&nbsp&nbsp  
				                	发放  <input type="text" class="fr-form-control" name="m:shenCRYJ:dbfs" value="${shenCRYJ.dbfs}" validate="{required:false"style="width:auto;display:inline" /> 担保方式
				                	 <input type="text" class="fr-form-control" name="m:shenCRYJ:dklb" value="${shenCRYJ.dklb}"  validate="{required:false" style="width:auto;display:inline"/> 贷款人民币   
				                	 <input type="number"  class="fr-form-control"  name="m:shenCRYJ:dkje"  value="${shenCRYJ.dkje}"  validate="{required:false}" style="width:auto;display:inline" />万元，
				                	 期限 <input type="text" class="fr-form-control" name="m:shenCRYJ:dkqx" value="${shenCRYJ.dkqx}"  validate="{required:false" style="width:auto;display:inline" />  个月，
				                	 月利率  <input type="number"  class="fr-form-control"  name="m:shenCRYJ:yll"  value="${shenCRYJ.yll}" validate="{required:false}" style="width:auto;display:inline" />  ‰，
				                	 以  <input type="text" class="fr-form-control" name="m:shenCRYJ:ghfs" value="${shenCRYJ.ghfs}"  validate="{required:false" style="width:auto;display:inline" /> 方式归还。
				 	 	 	</p>
				 	 	 </div>
				 </div>
			</div>	
			</div>
			</div>
			</div>
			</div>			 	
				
       	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审查人签字</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:shenCRYJ:scrqz" value="${shenCRYJ.scrqz}" readonly="ture" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审查人签字时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:shenCRYJ:scrqzsj"   value="<fmt:formatDate value="${shenCRYJ.scrqzsj}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
