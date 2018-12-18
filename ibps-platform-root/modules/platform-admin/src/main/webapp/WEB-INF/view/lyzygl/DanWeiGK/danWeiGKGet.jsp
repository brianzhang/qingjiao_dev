<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/lyzygl/DanWeiGK/danWeiGK.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
					<form  class="fr-form"  id="danWeiGKFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${danWeiGK.createTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.mingChen}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">土地总面积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.mianJi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.jingDu}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">纬度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.weiDuo}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地处山系</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.shanXi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地处水系</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.shuiXi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地处平原</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.pingYuan}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">平均海拔</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.haiBa}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">平均气温</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.qiWen}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">年积温</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.nianJiWen}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">日照时数</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.riZhaoShiShuo}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要土壤</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.zhuYaoTuRang}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">植物种类</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.zhiWuChongLei}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">二类调查年度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.tiaoZhaNianDuo}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">录入年度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.luRuNianDu}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">自然枯损率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.kuSunShuai}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">综合生长率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.shengChangLu}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林分类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.linFenLeiXing}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">龄组</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.lingZu}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">生长率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.shengZhangLu}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林地</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.linDe}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林木</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.linMu}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">面积1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.mianJi1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">蓄积1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.xuJi1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">面积2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.mianJi2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">蓄积2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.xuJi2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">平均降水量</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.pingJun}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">无霜期</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${danWeiGK.wuShuangQi}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
