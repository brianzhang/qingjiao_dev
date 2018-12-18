<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<f:link href="iconpicker/fontawesome-iconpicker.min.css" />
<script type="text/javascript" src="${ctx}/js/plugins/iconpicker/fontawesome-iconpicker.min.js"></script>
<script type="text/javascript"	src="${ctx}/js/lc/platform/dialog/common/LogoDialog.js"></script>
<script type="text/javascript" 	src="${ctx}/js/lc/platform/auth/subsystem.js"></script>

</head>
<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-toolbar ">
			<div class="buttons">
				<a href="javascript:void(0);" class="btn btn-primary fa fa-save " ><span>保存</span></a>
				<c:if test="${!tree }">
				<a href="list.htm" class="btn btn-primary fa fa-back"><span>返回</span></a>
				</c:if>
			</div>
		</div>
		<input type="hidden" id="tree" value="${tree }">
		<div class="panel-form">
			<form class="form-horizontal" id="subsystemForm" action="save.htm" method="post">
				<c:if test="${tree }">
				<div class="form-group">
					<label class="col-sm-2 control-label">父系统<span class="required">*</span>:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" readonly id="parentName" name="parentName" value="${subsystem.parentName}" validate="{required:true,maxlength:64}"/>
					</div>
				</div>
				</c:if>
				<div class="form-group">
					<label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="name" name="name" value="${subsystem.name}" validate="{required:true,maxlength:192}"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">别名<span class="required">*</span>:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="alias" name="alias"  value="${subsystem.alias}" validate="{required:true,maxlength:192}"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">LOGO类型<span class="required">*</span>:</label>
					<div class="col-sm-10">
						<label class="radio-inline">
									 <input type="radio" class="ibps" value="font" name="logoType"  validate="{required:true}" <c:if test="${empty subsystem || subsystem.logoType =='font' }">checked="checked"</c:if>/>
									 <span class="lbl">字体图标</span>
							</label>
							<label class="radio-inline"> 
									<input type="radio" class="ibps" value="image" name="logoType" validate="{required:true}"   <c:if test="${ subsystem.logoType =='image' }">checked="checked"</c:if>/>
									<span class="lbl">图片</span>
							</label>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">LOGO<span class="required">*</span>:</label>
					<div class="col-sm-10">
						<input type="hidden" id="logo" name="logo" value="<c:choose><c:when test="${empty subsystem }">fa fa-cogs</c:when><c:otherwise>${subsystem.logo}</c:otherwise></c:choose>" />
                            <div id ="imageLogo" class="btn-group hidden" >
                            	<img id="logoImage" src="<c:if test="${ subsystem.logoType =='image' }">${ctx }/styles/commons/images/logo/${subsystem.logo}</c:if>" width="30px" height="30px" style="background-color: #c3dcfc;"/>
								<a class="btn btn-info fa fa-search-plus" id="selectImageLogo" href="javascript:void(0);">选择</a>		  
                            </div>
                        <div  id ="fontLogo" class="btn-group hidden" >
                           <button data-selected="graduation-cap" type="button" class="icp icp-dd btn btn-default dropdown-toggle iconpicker-component" data-toggle="dropdown">
                                <i class="	<c:choose><c:when test="${empty subsystem }">fa fa-cogs</c:when><c:otherwise>${subsystem.logo}</c:otherwise></c:choose>  fa-fw"></i>
                               <span class="caret"></span>
                           </button>
                           <div class="dropdown-menu"></div>
                        </div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">基准URL:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="baseUrl" name="baseUrl" value="${subsystem.baseUrl}" validate="{required:false,maxlength:192}">
						<span class="help-block m-b-none">如果不填写，则默认当前系统的web访问地址根路径。例：http://web.bpmhome.cn/</span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">子系统主页<span class="required">*</span>:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="homePage" name="homePage" value="${subsystem.homePage}" validate="{required:true,maxlength:300}">	
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">本地系统:</label>
					<div class="col-sm-10">
						<label class="radio-inline">
									 <input type="radio" class="ibps" value="1" name="isLocal"  <c:if test="${empty subsystem || subsystem.isLocal ==true }">checked="checked"</c:if>/>
									 <span class="lbl">是</span>
							</label>
							<label class="radio-inline"> 
									<input type="radio" class="ibps" value="0" name="isLocal"  <c:if test="${ subsystem.isLocal ==false }">checked="checked"</c:if>/>
									<span class="lbl">否</span>
							</label>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">备注:
					</label>
					<div class="col-sm-10">
						<textarea class="form-control" id="memo" name="memo" rows="5" cols="40">${subsystem.memo}</textarea>
					</div>
				</div>
				<input type="hidden" name="id" value="${subsystem.id}">
				<input type="hidden" name="parentId" value="${subsystem.parentId }">
			</form>
		</div>
	</div>
</body>
</html>