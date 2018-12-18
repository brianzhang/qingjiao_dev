<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/DaiKSSCSP/zhuDCRYJ.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="${ctx}/xinDai/liucheng/xinDaiLiuCheng/edit.htm?id=${zhuDCRYJ.jdid}" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="zhuDCRYJForm" action="save.htm?jdid=${jdid} " >
					<input type="hidden" name="m:zhuDCRYJ:id"  value="${zhuDCRYJ.id}"/>
					<input type="hidden" name="m:zhuDCRYJ:jdid"  value="${zhuDCRYJ.jdid}"/>
					<input type="hidden" name="m:zhuDCRYJ:zdcrid"  value="${zhuDCRYJ.zdcrid}"/>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">借款人名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:jkrmc" value="${zhuDCRYJ.jkrmc}" validate="{required:false"  readonly="true" />
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">借款人信用等级</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:jkrxydj" value="${zhuDCRYJ.jkrxydj}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">抵押物现值</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:dywxz" value="${zhuDCRYJ.dywxz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">质押物现值</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:zywxz" value="${zhuDCRYJ.zywxz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			<div class ="panel panel-default">
			<div class="fr_response_field col-sm-12" >
			<div class="panel-heading">
				 <div class="fr_response_field col-sm-12" >
			       <label class="fr-control-label" style="width:50%">信用系统查询情况</label>
			 	</div>
			</div>
			</div>
			<div class="panel-body">
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"   style="width:auto">信用系统查询时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:zhuDCRYJ:xyxtcxsj"   value="<fmt:formatDate value="${zhuDCRYJ.xyxtcxsj}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">信贷系统管理系统查询是否有不良信用记录</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:xdxtglxtcx" class="ibps" value="是"   <c:if test="${zhuDCRYJ.xdxtglxtcx=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:xdxtglxtcx" class="ibps" value="否"   <c:if test="${zhuDCRYJ.xdxtglxtcx=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="width:auto">人民银行个人征信数据库查询是否有不良信用记录</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:rmyxgrzxsjkcx" class="ibps" value="是"   <c:if test="${zhuDCRYJ.rmyxgrzxsjkcx=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:rmyxgrzxsjkcx" class="ibps" value="否"   <c:if test="${zhuDCRYJ.rmyxgrzxsjkcx=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			</div>
			</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	 <div class ="panel panel-default">
			 		 <div class="fr_response_field col-sm-12" >
		 	 		 	<div class="panel-heading">
			 	 		 	 <div class="fr_response_field col-sm-12" >
			       		 	  <label class="fr-control-label" style="width:50%">调查结论</label>
					 	  	</div>
			 		   </div>
		     	    </div>
			<div class="panel-body">
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">1. 采取以下方式进行贷前调查：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="diaochafangshi" class="ibps" value="约见面谈"  validate="{required:false}"/>
					   	<span class="lbl">约见面谈</span>
				  </label>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="diaochafangshi" class="ibps" value="电话访谈"  validate="{required:false}"/>
					   	<span class="lbl">电话访谈</span>
				  </label>
				  <label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="diaochafangshi" class="ibps" value="上门走访"  validate="{required:false}"/>
					   	<span class="lbl">上门走访</span>
				  </label>
				  <label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="diaochafangshi" class="ibps" value="数据库和网络查询"  validate="{required:false}"/>
					   	<span class="lbl">数据库和网络查询</span>
				  </label>
				  <label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="diaochafangshi" class="ibps" value="实地考察"  validate="{required:false}"/>
					   	<span class="lbl">实地考察</span>
				  </label>
				   <label class="fr-control-option checkbox-inline">
					    <input type="checkbox"  name="diaochafangshi" class="ibps"  value=""  validate="{required:false}"/>
					   	<span class="lbl">其它</span> 
				  </label>
				  <label class="fr-control-option checkbox-inline">
				  <input type="text" id="qita" class="fr-form-control" name="m:zhuDCRYJ:dqdcfs"  value="${zhuDCRYJ.dqdcfs}" validate="{required:false" style="width:auto"/>
				 </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">2. 借款申请人所提供贷款申请资料齐备、真实、有效：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:zlqbzs" class="ibps" value="是"   <c:if test="${zhuDCRYJ.zlqbzs=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:zlqbzs" class="ibps" value="否"   <c:if test="${zhuDCRYJ.zlqbzs=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">3. 是否已核实申请人住所：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:sqrzsyhs" class="ibps" value="是"   <c:if test="${zhuDCRYJ.sqrzsyhs=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:sqrzsyhs" class="ibps" value="否"   <c:if test="${zhuDCRYJ.sqrzsyhs=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">申请人住所地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:sqrzsdz" value="${zhuDCRYJ.sqrzsdz}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">4. 是否已核实申请人收入：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:sqrsryhs" class="ibps" value="是"   <c:if test="${zhuDCRYJ.sqrsryhs=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:sqrsryhs" class="ibps" value="否"   <c:if test="${zhuDCRYJ.sqrsryhs=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">月均收入</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:yjsr" value="${zhuDCRYJ.yjsr}" validate="{required:false" />
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<label class="fr-control-label" style="width:auto">5. 已核实申请人及担保人提供的所有联系方式：</label>
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">借款人联系方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:jkrlxfs" value="${zhuDCRYJ.jkrlxfs}" validate="{required:false" />
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" >借款人配偶联系方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:jkrpolxfs" value="${zhuDCRYJ.jkrpolxfs}" validate="{required:false" />
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">担保人联系方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:dbrlxfs" value="${zhuDCRYJ.dbrlxfs}" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" >担保人配偶联系方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:dbrpolxfs" value="${zhuDCRYJ.dbrpolxfs}" validate="{required:false" />
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">共有人联系方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:gyrlxfs" value="${zhuDCRYJ.gyrlxfs}" validate="{required:false" />
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">6. 采取以下方式核实申请人所提供担保物的情况：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="heshidanbaowu" class="ibps" value="实地考察"  validate="{required:false}"/>
					   	<span class="lbl">实地考察</span>
				  </label>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="heshidanbaowu" class="ibps" value="查询产权登记部门"  validate="{required:false}"/>
					   	<span class="lbl">查询产权登记部门</span>
				  </label>
				  <label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="heshidanbaowu" class="ibps" value="查询评估机构"  validate="{required:false}"/>
					   	<span class="lbl">查询评估机构</span>
				  </label>
				  <label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="heshidanbaowu" class="ibps" value=""  validate="{required:false}"/>
					   	<span class="lbl">其他</span>
				  </label>
				    <label class="fr-control-option checkbox-inline">
				  <input type="text" id="qita2" class="fr-form-control" name="m:zhuDCRYJ:hsdbwfs"  value="${zhuDCRYJ.hsdbwfs}" validate="{required:false" style="width:auto"/>
				 </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label" style="width:auto">7. 借款申请人、担保人是否面签：</label>
				  	<div class="fr-form-block">
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:dbrsfmq" class="ibps" value="是"   <c:if test="${zhuDCRYJ.dbrsfmq=='是'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">是</span>
				  </label>
					<label class="fr-control-option radio-inline">
					    <input type="radio" name="m:zhuDCRYJ:dbrsfmq" class="ibps" value="否"   <c:if test="${zhuDCRYJ.dbrsfmq=='否'}">checked="checked"</c:if>  validate="{required:false}"/>
					   	<span class="lbl">否</span>
				  </label>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">贷款相关情况说明</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:zhuDCRYJ:dkxgqksm"  validate="{required:false}">${zhuDCRYJ.dkxgqksm}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">风险预测</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:zhuDCRYJ:fxyc"  validate="{required:false}">${zhuDCRYJ.fxyc}</textarea>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">拟采取的风险控制措施</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea"  name="m:zhuDCRYJ:ncqdfxkzcs"  validate="{required:false}">${zhuDCRYJ.ncqdfxkzcs}</textarea>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
				 <div class ="panel panel-default">
				 	 <div class="panel-body">
				 	 	 <div class="fr_response_field col-sm-12" >
				 	 	 	 <p>
				 	 	 	       同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.jkrmc}</label> &nbsp&nbsp&nbsp&nbsp  
				                	授信  <input type="number"  class="fr-form-control"  name="m:zhuDCRYJ:sxje"  value="${zhuDCRYJ.sxje}" validate="{required:false}"/ style="width:auto;display:inline" >       元，
				                	授信期限 <input type="text" class="fr-form-control" name="m:zhuDCRYJ:sxqx" value="${zhuDCRYJ.sxqx}" validate="{required:false"/  style="width:auto;display:inline">  月。  </p>
				             <p>
 		  		 	 	 	  	 	同意向借款申请人&nbsp&nbsp&nbsp&nbsp<label class="form-control-static">${zhuDCRYJ.jkrmc}</label>&nbsp&nbsp&nbsp&nbsp
				                	发放  <input type="text" class="fr-form-control" name="m:zhuDCRYJ:dbfs" value="${zhuDCRYJ.dbfs}" style="width:auto;display:inline" /> 担保方式
				                	 <input type="text" class="fr-form-control" name="m:zhuDCRYJ:dkfs" value="${zhuDCRYJ.dkfs}" style="width:auto;display:inline" /> 贷款人民币   
				                	 <input type="number"  class="fr-form-control"  name="m:zhuDCRYJ:dkje"  value="${zhuDCRYJ.dkje}" validate="{required:false}" style="width:auto;display:inline" />元，
				                	 期限 <input type="text" class="fr-form-control" name="m:zhuDCRYJ:dkqx" value="${zhuDCRYJ.dkqx}" validate="{required:false" style="width:auto;display:inline" />  个月，
				                	 月利率  <input type="number"  class="fr-form-control"  name="m:zhuDCRYJ:yll"  value="${zhuDCRYJ.yll}" validate="{required:false}" style="width:auto;display:inline" />  ‰，
				                	 以  <input type="text" class="fr-form-control" name="m:zhuDCRYJ:ghfs" value="${zhuDCRYJ.ghfs}" validate="{required:false" style="width:auto;display:inline"  /> 方式归还。
				 	 	 	</p>
				 	 	 </div>
				 </div>
			</div>
			 	
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主调查人签名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:zhuDCRYJ:zdcrqm" value="${zhuDCRYJ.zdcrqm}" validate="{required:false"  readonly="true" />
				 	</div>
			  	</div>
			</div>
		
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主调查人签字时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:zhuDCRYJ:zdcrqzsj"   value="<fmt:formatDate value="${zhuDCRYJ.zdcrqzsj}"  pattern="yyyy-MM-dd" />" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
