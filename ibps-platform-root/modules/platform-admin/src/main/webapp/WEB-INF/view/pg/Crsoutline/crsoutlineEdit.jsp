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
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="crsoutlineForm" action="save.htm" >
					<input type="hidden" name="m:crsoutline:id"  value="${crsoutline.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">创建时间</label>
				  	<div class="fr-form-block">
				<div class="input-icon" >
					<i class="fa fa-calendar"></i>
					<input type="text" readonly="readonly" class="fr-form-control datepicker" datefmt="yyyy-MM-dd"   name="m:crsoutline:createTime"   value="<fmt:formatDate value="${crsoutline.createTime}"  pattern="yyyy-MM-dd"/>" validate="{required:false}"/>
				</div>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:num" value="${crsoutline.num}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">中文名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:name" value="${crsoutline.name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">英文名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:crs_en_name" value="${crsoutline.crs_en_name}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程性质</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:crs_properties" value="${crsoutline.crs_properties}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开课专业</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:crs_major" value="${crsoutline.crs_major}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">开课学期</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:crs_term" value="${crsoutline.crs_term}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程目标</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:crsoutline:crs_aim" style="display: none;" validate="{required:false}">${fn:escapeXml(crsoutline.crs_aim)}</textarea>
				<script id="m:crsoutline:crs_aimEditor" data-name="m:crsoutline:crs_aim" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学基本要求</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:crsoutline:tch_claim" style="display: none;" validate="{required:false}">${fn:escapeXml(crsoutline.tch_claim)}</textarea>
				<script id="m:crsoutline:tch_claimEditor" data-name="m:crsoutline:tch_claim" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学内容与学时分配</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:crsoutline:tch_con_hours" style="display: none;" validate="{required:false}">${fn:escapeXml(crsoutline.tch_con_hours)}</textarea>
				<script id="m:crsoutline:tch_con_hoursEditor" data-name="m:crsoutline:tch_con_hours" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学方法及手段</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:tch_method" value="${crsoutline.tch_method}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">实验或上机内容</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:exp_con" value="${crsoutline.exp_con}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">前续课程</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:pre_crs" value="${crsoutline.pre_crs}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">后续课程</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:fliow_crs" value="${crsoutline.fliow_crs}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">参考教材及学习资源</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:crsoutline:crs_refer" style="display: none;" validate="{required:false}">${fn:escapeXml(crsoutline.crs_refer)}</textarea>
				<script id="m:crsoutline:crs_referEditor" data-name="m:crsoutline:crs_refer" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核方式</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:crsoutline:assess_way" style="display: none;" validate="{required:false}">${fn:escapeXml(crsoutline.assess_way)}</textarea>
				<script id="m:crsoutline:assess_wayEditor" data-name="m:crsoutline:assess_way" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学基本要求项</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:crsoutline:tch_base_demand" style="display: none;" validate="{required:false}">${fn:escapeXml(crsoutline.tch_base_demand)}</textarea>
				<script id="m:crsoutline:tch_base_demandEditor" data-name="m:crsoutline:tch_base_demand" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核形式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:exam_type" value="${crsoutline.exam_type}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">占总成绩的比例</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:power_ratio" value="${crsoutline.power_ratio}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学基本要求项_1</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:crsoutline:tch_base_demand_1" style="display: none;" validate="{required:false}">${fn:escapeXml(crsoutline.tch_base_demand_1)}</textarea>
				<script id="m:crsoutline:tch_base_demand_1Editor" data-name="m:crsoutline:tch_base_demand_1" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">教学基本要求项_2</label>
				  	<div class="fr-form-block">
				<textarea class="fr-form-control fr-control-textarea" data-control="editor"   name="m:crsoutline:tch_base_demand_2" style="display: none;" validate="{required:false}">${fn:escapeXml(crsoutline.tch_base_demand_2)}</textarea>
				<script id="m:crsoutline:tch_base_demand_2Editor" data-name="m:crsoutline:tch_base_demand_2" data-toggle='editor' type="text/plain"  ></script>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核方式_1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:exam_type_1" value="${crsoutline.exam_type_1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核方式_2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:exam_type_2" value="${crsoutline.exam_type_2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">占总成绩的比例_1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:power_ratio_1" value="${crsoutline.power_ratio_1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">占总成绩的比例_2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:power_ratio_2" value="${crsoutline.power_ratio_2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">总学时</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:period" value="${crsoutline.period}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">总学分</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:credit" value="${crsoutline.credit}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">理论学时</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:theory_hours" value="${crsoutline.theory_hours}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">实验学时</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:exp_hour" value="${crsoutline.exp_hour}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">上机学时</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:up_hour" value="${crsoutline.up_hour}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">其他学时</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:other_hour" value="${crsoutline.other_hour}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:beiZhu" value="${crsoutline.beiZhu}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第一学年_1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:first_year_1" value="${crsoutline.first_year_1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第一学年_2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:first_year_2" value="${crsoutline.first_year_2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第二学年_3</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:second_year_3" value="${crsoutline.second_year_3}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第二学年_4</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:second_year_4" value="${crsoutline.second_year_4}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第三学年_5</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:third_year_5" value="${crsoutline.third_year_5}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第三学年_6</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:third_year_6" value="${crsoutline.third_year_6}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第四学年_7</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:four_year_7" value="${crsoutline.four_year_7}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">第四学年_8</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:four_year_8" value="${crsoutline.four_year_8}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">序号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:crsoutline:number" value="${crsoutline.number}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程性质_EN</label>
				  	<div class="fr-form-block">
				<select type="text" class="fr-form-control" name="m:crsoutline:crs_proper_EN" value="${crsoutline.crs_proper_EN}" validate="{required:false}"/>


							<option value="zrkxyjsjckc">自然科学与技术基础课程</option>
							<option value="rwyshkxjckc">人文与社会科学基础课程</option>
							<option value="zyxxkc">专业选修课程</option>
							<option value="zyhxkc">专业核心课程</option>
						    <option value="jcsjhj">基础实践环节</option>
							</select>



				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
