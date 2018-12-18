<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/codegen/sjfx.js"></script>
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
					<form  class="fr-form"  id="sjfxFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.keChengMingChen}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程代码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.keChengDaiMa}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程性质</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.keChengXingZhi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学分</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.xueFen}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">任课教师</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.renKeJiaoShi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">班级名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.banJiMingCheng}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核形式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.kaoHuXingShi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考试日期</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.kaoShiRiQi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.renShu}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.renShuo1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.renShu2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数3</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.renShuoSan}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数4</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.renShuSi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数5</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.renShuoWu}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">比例1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.biLi1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">比例2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.biLi2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">比例3</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.biLi3}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"> 比例4</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.biLi4}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">比例5</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.biLi5}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">平均成绩</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.pingYunChengJi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">标准差</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.biaoZhunChai}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.nanDuo1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.nanDuo2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度3</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.nanDuo3}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度4</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.nanDu4}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度5</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.nanDu5}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">区分度1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.ouFenDuo1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">区分度2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.ouFenDuo2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">区分度3</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.ouFenDuo3}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">区分度4</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.ouFenDuo4}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">效果分析</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.xiaoGuoFenXi}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">改进措施</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${sjfx.gaiJinCuoShi}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
