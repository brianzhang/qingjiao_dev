<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/pg/Crsoutline/crsoutline.js"></script>
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
					<form  class="fr-form"  id="crsoutlineFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
							<p class="form-control-static"><fmt:formatDate value="${crsoutline.createTime}" /></p>		
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.num}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">中文名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.name}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">英文名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.crs_en_name}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程性质</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.crs_properties}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开课专业</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.crs_major}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开课学期</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.crs_term}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程目标</label>
				  	<div class="fr-form-block">
			${crsoutline.crs_aim}
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学基本要求</label>
				  	<div class="fr-form-block">
			${crsoutline.tch_claim}
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学内容与学时分配</label>
				  	<div class="fr-form-block">
			${crsoutline.tch_con_hours}
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学方法及手段</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.tch_method}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">实验或上机内容</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.exp_con}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">前续课程</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.pre_crs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">后续课程</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.fliow_crs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参考教材及学习资源</label>
				  	<div class="fr-form-block">
			${crsoutline.crs_refer}
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核方式</label>
				  	<div class="fr-form-block">
			${crsoutline.assess_way}
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学基本要求项</label>
				  	<div class="fr-form-block">
			${crsoutline.tch_base_demand}
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核形式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.exam_type}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">占总成绩的比例</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.power_ratio}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学基本要求项_1</label>
				  	<div class="fr-form-block">
			${crsoutline.tch_base_demand_1}
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学基本要求项_2</label>
				  	<div class="fr-form-block">
			${crsoutline.tch_base_demand_2}
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核方式_1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.exam_type_1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核方式_2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.exam_type_2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">占总成绩的比例_1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.power_ratio_1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">占总成绩的比例_2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.power_ratio_2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">总学时</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.period}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">总学分</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.credit}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">理论学时</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.theory_hours}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">实验学时</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.exp_hour}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">上机学时</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.up_hour}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">其他学时</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.other_hour}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.beiZhu}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第一学年_1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.first_year_1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第一学年_2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.first_year_2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第二学年_3</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.second_year_3}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第二学年_4</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.second_year_4}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第三学年_5</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.third_year_5}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第三学年_6</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.third_year_6}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第四学年_7</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.four_year_7}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第四学年_8</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.four_year_8}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">序号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.number}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程性质_EN</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${crsoutline.crs_proper_EN}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
