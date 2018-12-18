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
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="sjfxForm" action="save.htm" >
					<input type="hidden" name="m:sjfx:id"  value="${sjfx.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:keChengMingChen" value="${sjfx.keChengMingChen}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程代码</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:keChengDaiMa" value="${sjfx.keChengDaiMa}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">课程性质</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:keChengXingZhi" value="${sjfx.keChengXingZhi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学分</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:xueFen" value="${sjfx.xueFen}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">任课教师</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:renKeJiaoShi" value="${sjfx.renKeJiaoShi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">班级名称</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:banJiMingCheng" value="${sjfx.banJiMingCheng}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考核形式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:kaoHuXingShi" value="${sjfx.kaoHuXingShi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">考试日期</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:kaoShiRiQi" value="${sjfx.kaoShiRiQi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:renShu" value="${sjfx.renShu}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:renShuo1" value="${sjfx.renShuo1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:renShu2" value="${sjfx.renShu2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数3</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:renShuoSan" value="${sjfx.renShuoSan}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数4</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:renShuSi" value="${sjfx.renShuSi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人数5</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:renShuoWu" value="${sjfx.renShuoWu}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">比例1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:biLi1" value="${sjfx.biLi1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">比例2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:biLi2" value="${sjfx.biLi2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">比例3</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:biLi3" value="${sjfx.biLi3}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"> 比例4</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:biLi4" value="${sjfx.biLi4}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">比例5</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:biLi5" value="${sjfx.biLi5}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">平均成绩</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:pingYunChengJi" value="${sjfx.pingYunChengJi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">标准差</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:biaoZhunChai" value="${sjfx.biaoZhunChai}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:nanDuo1" value="${sjfx.nanDuo1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:nanDuo2" value="${sjfx.nanDuo2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度3</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:nanDuo3" value="${sjfx.nanDuo3}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度4</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:nanDu4" value="${sjfx.nanDu4}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">难度5</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:nanDu5" value="${sjfx.nanDu5}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">区分度1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:ouFenDuo1" value="${sjfx.ouFenDuo1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">区分度2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:ouFenDuo2" value="${sjfx.ouFenDuo2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">区分度3</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:ouFenDuo3" value="${sjfx.ouFenDuo3}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">区分度4</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:ouFenDuo4" value="${sjfx.ouFenDuo4}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">效果分析</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:xiaoGuoFenXi" value="${sjfx.xiaoGuoFenXi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">改进措施</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:sjfx:gaiJinCuoShi" value="${sjfx.gaiJinCuoShi}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
