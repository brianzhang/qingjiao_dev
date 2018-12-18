<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/system/identity.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/commons/utils/ChineseToPinyin.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="javascript:void(0);" class="btn btn-primary fa fa-bug fa-test" ><span>预览</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="panel-form">
					<form class="form-horizontal" id="identityForm"  action="save.htm"   method="post"  >
							<div class="form-group">
                                <label class="col-sm-2 control-label">名称<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="name" name="name" value="${identity.name}"  data-pinyin="#alias"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">别名<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="alias" name="alias" value="${identity.alias}"  validate="{required:true,maxlength:192}"/>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">规则<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                <c:if test="${empty identity.regulation}">
                                    <input type="text" class="form-control"  id="regulation" name="regulation" value="{yyyy}{MM}{dd}{NO}"  validate="{required:true,maxlength:192}"/>
                                </c:if>
                                <c:if test="${not empty identity.regulation}">
                                    <input type="text" class="form-control"  id="regulation" name="regulation" value="${identity.regulation}"  validate="{required:true,maxlength:192}"/>
                                </c:if>
                                    <span class="help-block m-b-none">
                                    		{yyyy}表示年份，如2015年表示为2015。</br>
    										{yy}表示年份，如2015年表示为15。</br>
										    {MM}表示月份，如果月份小于10，则加零补齐，如1月份表示为01。</br>
										    {M}表示月份，月份不补齐，如1月份表示为1。</br>
										    {dd}表示日，如果小于10号，则加零补齐，如1号表示为01。</br>
										    {d}表示日，日期不补齐，如1号表示为1。</br>
										    {NO}表示流水号，前面补零。</br>
										    {no}表示流水号，不补零。</br>
                                    </span>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">生成类型<span class="required">*</span>:</label>
                                <div class="col-sm-10">
                                    <label class="radio-inline">
                                       	 	<input type="radio" class="ibps" value="0" name="genType"  <c:if test="${empty identity || identity.genType==0}">checked="checked"</c:if>>
                                       	 	<span class="lbl">每天生成</span>
                                     </label>
                                     <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="1" name="genType"  <c:if test="${identity.genType==1}">checked="checked"</c:if>>
											<span class="lbl">每月生成</span>                                       
									 </label>
									 <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="2" name="genType"  <c:if test="${identity.genType==2}">checked="checked"</c:if>>
											<span class="lbl">每年生成</span>                                       
									 </label>
									 <label class="radio-inline">
                                       	 	<input type="radio" class="ibps"  value="3" name="genType"  <c:if test="${identity.genType==3}">checked="checked"</c:if>>
											<span class="lbl">递增</span>                                       
									 </label>
									 <span class="help-block m-b-none">
                                    		流水号生成规则： </br>
    										1.每天生成。每天从初始值开始计数。</br>
										    2.递增，流水号一直增加。</br>
                                    </span>
                                </div>
                            </div>
							<div class="form-group">
                                <label class="col-sm-2 control-label">流水号长度:</label>
                                <div class="col-sm-10">
                                <c:if test="${empty identity.noLength}">
                                    <input type="text" class="form-control"  id="noLength" name="noLength" value="5"  validate="{required:true,number:true,maxIntLen:10}"/>
                                 </c:if>
                                 <c:if test="${not empty identity.noLength}">
                                    <input type="text" class="form-control"  id="noLength" name="noLength" value="${identity.noLength}"  validate="{required:true,number:true,maxIntLen:10}"/>
                                 </c:if>
                                    <span class="help-block m-b-none">
                                    		这个长度表示当前流水号的长度数，只包括流水号部分{NO},如果长度为5，当前流水号为5，则在流水号前补4个0，表示为00005。</br>
    										则流水号一直递增。</br>
                                    </span>
                                </div>
                            </div>
<!-- 							<div class="form-group"> -->
<!--                                 <label class="col-sm-2 control-label">当前日期:</label> -->
<!--                                 <div class="col-sm-10"> -->
<%--                                     <input type="text" class="form-control"  id="curData" name="curData" value="${identity.curData}"  validate="{required:false}"/> --%>
<!--                                 </div> -->
<!--                             </div> -->
							<div class="form-group">
                                <label class="col-sm-2 control-label">初始值:</label>
                                <div class="col-sm-10">
                                <c:if test="${empty identity.initValue}">
                                    <input type="text" class="form-control"  id="initValue" name="initValue" value="1"  validate="{required:true,number:true,maxIntLen:10}"/>
                                 </c:if>
                                 <c:if test="${not empty identity.initValue}">
                                    <input type="text" class="form-control"  id="initValue" name="initValue" value="${identity.initValue}"  validate="{required:true,number:true,maxIntLen:10}"/>
                                 </c:if>
                                </div>
                            </div>
<%-- 							<div class="form-group">
                                <label class="col-sm-2 control-label">当前值:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  id="curValue" name="curValue" value="${identity.curValue}"  validate="{required:false,number:true,maxIntLen:10}"/>
                                </div>
                            </div> --%>
							<div class="form-group">
                                <label class="col-sm-2 control-label">步长:</label>
                                <div class="col-sm-10">
                                <c:if test="${empty identity.step}">
                                    <input type="text" class="form-control"  id="step" name="step" value="1"  validate="{required:true,number:true,maxIntLen:2}"/>
                                 </c:if>
                                 <c:if test="${not empty identity.step}">
                                    <input type="text" class="form-control"  id="step" name="step" value="${identity.step}"  validate="{required:true,number:true,maxIntLen:2}"/>
                                 </c:if>
                                </div>
                            </div>
					<input type="hidden" name="id" value="${identity.id}" />
					</form>
				</div>
		</div>
	</body>
</html>