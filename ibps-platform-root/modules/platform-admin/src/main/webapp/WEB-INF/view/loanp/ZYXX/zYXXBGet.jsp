<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/ZYXX/zYXXB.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
<%-- 			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div> --%>
			<div class="">
					<form  class="fr-form"  id="zYXXBForm" >
				 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">职业</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zYXXB.zynsr=='1'}">国家机关，党群组织，企业，事业单位负责人</c:if><c:if test="${zYXXB.zynsr=='2'}">专业技术人员</c:if><c:if test="${zYXXB.zynsr=='3'}">办事人员和有关人员</c:if><c:if test="${zYXXB.zynsr=='4'}">商业，服务业人员</c:if><c:if test="${zYXXB.zynsr=='5'}">农林牧渔水利业生产人员</c:if><c:if test="${zYXXB.zynsr=='6'}">生产，运输设备操作人员及有关人员</c:if><c:if test="${zYXXB.zynsr=='7'}">军人</c:if><c:if test="${zYXXB.zynsr=='8'}">不便分类的其他从业人员</c:if><c:if test="${zYXXB.zynsr=='9'}">未知</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">年收入</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.nsr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否本行员工</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zYXXB.sfbxyg=='1'}">是</c:if><c:if test="${zYXXB.sfbxyg=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">首次合作时间</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.schzsj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">首次合作金额</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.schzje}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工作单位名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.gzdwmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.dwdz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位邮编</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.dwyb}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位所属行业</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zYXXB.dwssxy=='1'}">农林牧渔</c:if><c:if test="${zYXXB.dwssxy=='2'}">采掘业</c:if><c:if test="${zYXXB.dwssxy=='3'}">制造业</c:if><c:if test="${zYXXB.dwssxy=='4'}">电力，燃气，水的生产和供应业</c:if><c:if test="${zYXXB.dwssxy=='5'}">建筑业</c:if><c:if test="${zYXXB.dwssxy=='6'}">交通运输，仓储，邮政业</c:if><c:if test="${zYXXB.dwssxy=='7'}">信息传输，计算机服务，软件业</c:if><c:if test="${zYXXB.dwssxy=='8'}">批发零售业</c:if><c:if test="${zYXXB.dwssxy=='9'}">住宿，餐饮业</c:if><c:if test="${zYXXB.dwssxy=='10'}">金融业</c:if><c:if test="${zYXXB.dwssxy=='11'}">房地产业</c:if><c:if test="${zYXXB.dwssxy=='12'}">租赁，商务服务业</c:if><c:if test="${zYXXB.dwssxy=='13'}">科学研究，技术服务和地质勘察业</c:if><c:if test="${zYXXB.dwssxy=='14'}">水利，环境，公共设施管理业</c:if><c:if test="${zYXXB.dwssxy=='15'}">居民服务和其他服务业</c:if><c:if test="${zYXXB.dwssxy=='16'}">教育</c:if><c:if test="${zYXXB.dwssxy=='17'}">卫生，社会保障和社会福利业</c:if><c:if test="${zYXXB.dwssxy=='18'}">文化，体育，娱乐业</c:if><c:if test="${zYXXB.dwssxy=='19'}">公共管理和社会组织</c:if><c:if test="${zYXXB.dwssxy=='20'}">国际组织</c:if><c:if test="${zYXXB.dwssxy=='21'}">其他</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位性质</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zYXXB.dwxz=='1'}">机关事业</c:if><c:if test="${zYXXB.dwxz=='2'}">国营企业</c:if><c:if test="${zYXXB.dwxz=='3'}">军队</c:if><c:if test="${zYXXB.dwxz=='4'}">金融企业</c:if><c:if test="${zYXXB.dwxz=='5'}">私营企业</c:if><c:if test="${zYXXB.dwxz=='6'}">个体经营户</c:if><c:if test="${zYXXB.dwxz=='7'}">三资企业</c:if><c:if test="${zYXXB.dwxz=='8'}">邮电通讯</c:if><c:if test="${zYXXB.dwxz=='9'}">其他</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">职务</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zYXXB.zw=='1'}">高级领导</c:if><c:if test="${zYXXB.zw=='2'}">中级领导</c:if><c:if test="${zYXXB.zw=='3'}">一般员工</c:if><c:if test="${zYXXB.zw=='4'}">其他</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">职称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zYXXB.zc=='1'}">无</c:if><c:if test="${zYXXB.zc=='2'}">高级</c:if><c:if test="${zYXXB.zc=='3'}">中级</c:if><c:if test="${zYXXB.zc=='4'}">初级</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">月收入</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.ysr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">岗位性质</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${zYXXB.gwxz=='1'}">厅局级以上</c:if><c:if test="${zYXXB.gwxz=='2'}">副处级以上</c:if><c:if test="${zYXXB.gwxz=='3'}">副科级以上</c:if><c:if test="${zYXXB.gwxz=='4'}">一般职务</c:if><c:if test="${zYXXB.gwxz=='5'}">其他</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位电话</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.dwdh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">本单位工作起始年月</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.bdwgzqsny}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工资账号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.gzzh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工资账号开户行</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${zYXXB.gzzhkhx}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
		
			<input type="hidden"  id="sfid" value="${sfid}">
		
			<input type="hidden"  id="id" value="${id}">
	</body>
</html>
