<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuanCg.js"></script>
</head>
<body>
<script type="text/javascript" src="${ctx}/pageoffice.js" id="po_js_main"></script>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
	    <div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class ="btn btn-primary fa fa-save" ><span>保存草稿</span></a>
					<a href="javascript:void(0)" class ="btn btn-primary fa fa-detail"  id="anchor"  onclick="javascript:officeOnline()" ><span>查看审批内容（旧）</span></a>
					<a class="btn btn-primary fa fa-detail " id="anchor2" onclick="pageOffice()"><span>查看审批内容（建议使用）</span></a>
					<a style="color: red; font-size:15px;" id ="anchor3">请在下面的页面更改立题书，不要修改word！</a>
				</div>
			</div>
		<div class="">
			<form class="fr-form" id="urlZhiYuanForm" action="saveCg.htm">
			<div id="anchor4" class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label"  style="color: red">审核人综合意见</label>
				  	<div class="fr-form-block">
				<textarea disabled="disabled" class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:td3"  validate="{required:false}">${urlZhiYuan.td3}</textarea>
				 	</div>
			  	</div>
			</div>
				<h1 style="text-align: center">
					哈尔滨工程大学2019届学士学位论文立题论证书
				</h1>
				</br> </br>
				<div class="fr_response_field col-sm-12">
				      <div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">做该课题学生姓名</label>
							<div class="fr-form-block">
								<input  type="text" class="fr-form-control"
									name="m:urlZhiYuan:name"  value="${urlZhiYuan.name}"  disabled="true"validate="{required:true}" />
							</div>
						</div>
					</div>
					<div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">班级</label>
							<div class="fr-form-block">
								<input  type="text" class="fr-form-control"
									name="m:urlZhiYuan:classr"  value="${urlZhiYuan.classr}"  disabled="true"validate="{required:true}" />
							</div>
						</div>
					</div>
					<div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">学号</label>
							<div class="fr-form-block">
								<input  type="text" class="fr-form-control"
									name="m:urlZhiYuan:xh"  value="${urlZhiYuan.xh}"  disabled="true"validate="{required:true}" />
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr_response_field col-sm-6">
						<div class="fr-form-group">
							<label class="fr-control-label">院（系）</label>
							<div class="fr-form-block">
								<input style="width: 300px;" type="text" class="fr-form-control"
									name="m:urlZhiYuan:yx" value="${urlZhiYuan.yx}"
									validate="{required:true}" />
							</div>
						</div>
					</div>
					<div class="fr_response_field col-sm-6">
						<div class="fr-form-group">
							<label class="fr-control-label">题目对应专业</label>
							<div class="fr-form-block">
								<input style="width: 300px;" type="text" class="fr-form-control"
									name="m:urlZhiYuan:tmdyzy" value="${urlZhiYuan.tmdyzy}"
									validate="{required:true}" />
							</div>
						</div>
					</div>
				</div>
				</br>
				<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<p >复杂工程问题必须具备下述特征（1），同时具备下述特征（2）-（7）的部分或全部特征。针对毕业设计选题及研究内容，可以多选。</p>
				  	<div class="fr-form-block">
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:urlZhiYuan:fzx" class="ibps" value="必须运用深入的工程原理，经过分析才可能得到解决。" <c:if test="${fn:contains(urlZhiYuan.fzx, '必须运用深入的工程原理，经过分析才可能得到解决。')}">checked="checked"</c:if> validate="{required:true}"/>
					   	<span class="lbl">1.必须运用深入的工程原理，经过分析才可能得到解决。</span>
				  </label></br>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:urlZhiYuan:fzx" class="ibps" value="涉及多方面的技术、工程和其它因素，并可能相互有一定冲突。" <c:if test="${fn:contains(urlZhiYuan.fzx, '涉及多方面的技术、工程和其它因素，并可能相互有一定冲突。')}">checked="checked"</c:if> validate="{required:true}"/>
					   	<span class="lbl">2.涉及多方面的技术、工程和其它因素，并可能相互有一定冲突。</span>
				  </label></br>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:urlZhiYuan:fzx" class="ibps" value="需要通过建立合适的抽象模型才能解决，在建模过程中需要体现出创造性。" <c:if test="${fn:contains(urlZhiYuan.fzx, '需要通过建立合适的抽象模型才能解决，在建模过程中需要体现出创造性。')}">checked="checked"</c:if> validate="{required:true}"/>
					   	<span class="lbl">3.需要通过建立合适的抽象模型才能解决，在建模过程中需要体现出创造性。</span>
				  </label></br>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:urlZhiYuan:fzx" class="ibps" value="不是仅靠常用方法就可以完全解决的。" <c:if test="${fn:contains(urlZhiYuan.fzx, '不是仅靠常用方法就可以完全解决的。')}">checked="checked"</c:if> validate="{required:true}"/>
					   	<span class="lbl">4.不是仅靠常用方法就可以完全解决的。</span>
				  </label></br>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:urlZhiYuan:fzx" class="ibps" value="问题中涉及的因素可能没有完全包含在专业工程实践的标准和规范中。" <c:if test="${fn:contains(urlZhiYuan.fzx, '问题中涉及的因素可能没有完全包含在专业工程实践的标准和规范中。')}">checked="checked"</c:if> validate="{required:true}"/>
					   	<span class="lbl">5.问题中涉及的因素可能没有完全包含在专业工程实践的标准和规范中。</span>
				  </label></br>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:urlZhiYuan:fzx" class="ibps" value="问题相关各方利益不完全一致。" <c:if test="${fn:contains(urlZhiYuan.fzx, '问题相关各方利益不完全一致。')}">checked="checked"</c:if> validate="{required:true}"/>
					   	<span class="lbl">6.问题相关各方利益不完全一致。</span>
				  </label></br>
					<label class="fr-control-option checkbox-inline">
					    <input type="checkbox" name="m:urlZhiYuan:fzx" class="ibps" value="具有较高的综合性，包含多个相互关联的子问题。" <c:if test="${fn:contains(urlZhiYuan.fzx, '具有较高的综合性，包含多个相互关联的子问题。')}">checked="checked"</c:if> validate="{required:true}"/>
					   	<span class="lbl">7.具有较高的综合性，包含多个相互关联的子问题。</span>
				  </label>
				 	</div>
			  	</div>
			</div>

				<input type="hidden" name="m:urlZhiYuan:id" value="${urlZhiYuan.id}" />

				<div class="fr_response_field col-sm-12">
					<div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">题目申报人</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="m:urlZhiYuan:finalteacher"
									value="${urlZhiYuan.finalteacher}" validate="{required:true}" />
							</div>
						</div>
					</div>
					<div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">职称</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="m:urlZhiYuan:zc"
									value="${urlZhiYuan.zc}" validate="{required:true}" />
							</div>
						</div>
					</div>
					<div class="fr_response_field col-sm-4">
						<div class="fr-form-group">
							<label class="fr-control-label">申报时间</label>
							<div class="fr-form-block">
								<div class="input-icon">
									<i class="fa fa-calendar"></i> <input type="text"
										readonly="readonly" class="fr-form-control datepicker"
										datefmt="yyyy-MM-dd" name="m:urlZhiYuan:sbsj"
										value="<fmt:formatDate value="${urlZhiYuan.sbsj}"  pattern="yyyy-MM-dd"/>"
										validate="{required:true}}" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr_response_field col-sm-6">
						<div class="fr-form-group">
							<label class="fr-control-label">题目名称</label>
							<div class="fr-form-block">
								<input type="text" class="fr-form-control" name="m:urlZhiYuan:tmmc"
									value="${urlZhiYuan.tmmc}" validate="{required:true}" />
								（不超过20字，每个外文单词按两个汉字计算）
							</div>
						</div>
					</div>
				</div>
				<!-- 改成的单项选择 -->
				<div class="fr_response_field col-sm-12">
					<div class="fr_response_field col-sm-6">
						<div class="fr-form-group">
							<label class="fr-control-label">题目来源</label>
							<div class="fr-form-block">
								<label class="fr-control-option radio-inline"> 
								<input type="radio" name="m:urlZhiYuan:tmly" class="ibps" value="在研科研项目"<c:if test="${urlZhiYuan.tmly=='在研科研项目'}"> checked="checked" </c:if>validate="{required:true}" />
								 <span class="lbl">在研科研项目</span>
								</label> 
								<label class="fr-control-option radio-inline"> 
								<input type="radio" name="m:urlZhiYuan:tmly" class="ibps" value="生产实践"<c:if test="${urlZhiYuan.tmly=='生产实践'}">checked="checked"</c:if>validate="{required:true}"/>
								<span class="lbl">生产实践</span>
								</label> 
								<label class="fr-control-option radio-inline"> 
								<input type="radio" name="m:urlZhiYuan:tmly" class="ibps" value="自拟题目" <c:if test="${urlZhiYuan.tmly=='自拟题目'}"> checked="checked"</c:if>validate="{required:true}" />
								 <span class="lbl">自拟题目</span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-12">
					<div class="fr_response_field col-sm-6">
						<div class="fr-form-group">
							<label class="fr-control-label">题目类型:</label>
							<div class="fr-form-block">
								<label class="fr-control-label">理工类: </label> 
								<label class="fr-control-option radio-inline">
								<input type="radio" name="m:urlZhiYuan:tmlx" class="ibps" value="理论研究类"   <c:if test="${urlZhiYuan.tmlx=='理论研究类'}">checked="checked"</c:if>  validate="{required:true}"/>
					   	         <span class="lbl">理论研究类</span>
					   	         </label>
					   	         <label class="fr-control-option radio-inline">
								<input type="radio" name="m:urlZhiYuan:tmlx" class="ibps" value="工程设计类"   <c:if test="${urlZhiYuan.tmlx=='工程设计类'}">checked="checked"</c:if>  validate="{required:true}"/>
					   	         <span class="lbl">工程设计类</span>
					   	         </label>
					   	         <label class="fr-control-option radio-inline">
								<input type="radio" name="m:urlZhiYuan:tmlx" class="ibps" value="软件开发类"   <c:if test="${urlZhiYuan.tmlx=='软件开发类'}">checked="checked"</c:if>  validate="{required:true}"/>
					   	         <span class="lbl">软件开发类</span>
					   	         </label>
					   	         <label class="fr-control-option radio-inline">
								<input type="radio" name="m:urlZhiYuan:tmlx" class="ibps" value="科学实验类"   <c:if test="${urlZhiYuan.tmlx=='科学实验类'}">checked="checked"</c:if>  validate="{required:true}"/>
					   	         <span class="lbl">科学实验类</span>
					   	         </label>
					   	         <label class="fr-control-option radio-inline">
								<input type="radio" name="m:urlZhiYuan:tmlx" class="ibps" value="综合类"   <c:if test="${urlZhiYuan.tmlx=='综合类'}">checked="checked"</c:if>  validate="{required:true}"/>
					   	         <span class="lbl">综合类</span>
					   	         </label></br> 
					   	         <label class="fr-control-label">文管类: </label> 
					   	         <label class="fr-control-option radio-inline">
								<input type="radio" name="m:urlZhiYuan:tmlx" class="ibps" value="理论型"   <c:if test="${urlZhiYuan.tmlx=='理论型'}">checked="checked"</c:if>  validate="{required:true}"/>
					   	         <span class="lbl">理论型</span>
					   	         </label>
					   	         <label class="fr-control-option radio-inline">
								<input type="radio" name="m:urlZhiYuan:tmlx" class="ibps" value="应用型"   <c:if test="${urlZhiYuan.tmlx=='应用型'}">checked="checked"</c:if>  validate="{required:true}"/>
					   	         <span class="lbl">应用型</span>
					   	         </label>
					   	          <label class="fr-control-option radio-inline">
								<input type="radio" name="m:urlZhiYuan:tmlx" class="ibps" value="文献综述型"   <c:if test="${urlZhiYuan.tmlx=='文献综述型'}">checked="checked"</c:if>  validate="{required:true}"/>
					   	         <span class="lbl">文献综述型</span>
					   	         </label>
								
							</div>
						</div>
					</div>
				</div>
				<!-- <label class="fr-control-label">课题简述：</label> -->
				<!--在此处加了个table  -->
				 <table class="fr_table table-bordered">
					<tbody>
						<tr>
							<td class="fr-s"  rowspan="16" width="150px">课题简述：</td>
							<td class="fr-s">
								<table class="fr_table table-bordered">
									<tbody>
										<tr>
											<td width="150px">课题的背景和目的：</td>
											<td class="fr-s" width="750px"><textarea  style="width: 1500px; height: 100px; resize: none;"class="fr-form-control fr-control-textarea"
													name="m:urlZhiYuan:ktdbjhmd" 
													validate="{required:true}" />${urlZhiYuan.ktdbjhmd}</textarea></td>
										</tr>
										<tr>
											<td width="150px">课题拟解决的问题：</td>
											<td class="fr-s" width="750px"><textarea class="fr-form-control fr-control-textarea"
													style="width: 1500px; height: 100px; resize: none;"
													name="m:urlZhiYuan:ktnjjdwt" 
													validate="{required:true}" />${urlZhiYuan.ktnjjdwt}</textarea></td>
										</tr>
										<tr>
											<td width="150px">软件环境：</td>
											<td class="fr-s" width="750px"><textarea class="fr-form-control fr-control-textarea"
													style="width: 1500px; height: 100px; resize: none;"
													name="m:urlZhiYuan:rjhj" 
													validate="{required:true}" />${urlZhiYuan.rjhj}</textarea></td>
										</tr>
										<tr>
											<td width="150px">硬件环境 :</td>
											<td  class="fr-s" width="750px"><textarea class="fr-form-control fr-control-textarea"
													style="width: 1500px; height: 100px; resize: none;"
													name="m:urlZhiYuan:yjhj" 
													validate="{required:true}" />${urlZhiYuan.yjhj}</textarea></td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>

					</tbody>
				</table>

				<table class="table table-bordered">
					<tbody>
						<tr>
							<td class="fr-s" rowspan="16" width="150px">本课题预期目标：</td>
							<td>
								<table class="table table-bordered">
									<tbody>
										<tr>
											<td width="150px">课题预期目标和成果：</td>
											<td class="fr-s" width="750px"><textarea class="fr-form-control fr-control-textarea"
													style="width: 1500px; height: 100px; resize: none;"
													name="m:urlZhiYuan:ktyqmbhcg" 
													validate="{required:true}" />${urlZhiYuan.ktyqmbhcg}</textarea></td>
										</tr>
										<tr>
											<td width="150px">课题成果将主要完成的工作任务：</td>
											<td class="fr-s" width="750px"><textarea class="fr-form-control fr-control-textarea"
													style="width: 1500px; height: 100px; resize: none;"
													name="m:urlZhiYuan:ktcgjzywcdgzrw"
													validate="{required:true}" />${urlZhiYuan.ktcgjzywcdgzrw}</textarea></td>
										</tr>
										<tr>
											<td width="150px">本课题的成果形式：</td>
											<td class="fr-s" width="750px"><textarea class="fr-form-control fr-control-textarea"
													style="width: 1500px; height: 100px; resize: none;"
													name="m:urlZhiYuan:bktdcgxs" 
													validate="{required:true}" />${urlZhiYuan.bktdcgxs}</textarea></td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<label class="fr-control-label">技术要求：</label>
				<table class="table table-bordered">
					<tbody>
						<tr>
								<table class="table table-bordered">
									<tbody>
										<tr>
											<td width="150px">上机机时：</td>
											<td class="fr-s" width="750px"><input type="text"
												class="fr-form-control"  name="m:urlZhiYuan:sjjs" value="500"
												validate="{required:false}" /></td>
											<td width="150px">图纸张数：</td>	
											<td class="fr-s" width="750px"><input type="text"
												class="fr-form-control"   name="m:urlZhiYuan:tzzs"  value="${urlZhiYuan.tzzs}"
												validate="{required:false}" /></td>
										</tr>
									</tbody>
								</table>
								<table class="table table-bordered">
									<tbody>
										<tr>
											<td width="150px">电路板块数：</td>
											<td class="fr-s" width="750px"><input type="text"
												class="fr-form-control" name="m:urlZhiYuan:dlbks" value="${urlZhiYuan.dlbks}" validate="{required:false}" /></td>
											<td width="150px">阅读文献：</td>
											<td class="fr-s" width="750px"><input type="text"
												class="fr-form-control" name="m:urlZhiYuan:ydwx"
												value="15" validate="{required:false}" /></td>
											<td width="150px">读书笔记字数：</td>
											<td class="fr-s" width="750px"><input type="text"
												class="fr-form-control" name="m:urlZhiYuan:dsbjzs"
												value="${urlZhiYuan.dsbjzs}" validate="{required:false}" /></td>
										</tr>
									</tbody>
								</table>
								<p align="center">基本要求：</p>
								<%-- <table class="fr-table table-bordered">
									<tbody>
										<tr>
											<td width="150px">基本要求：</td>
											<td class="fr-s" width="750px">
											<textarea class="fr-form-control fr-control-textarea"
													style="width: 1500px; height: 100px; resize: none;"
													name="m:urlZhiYuan:jbyq" 
													validate="{required:true}" />${urlZhiYuan.jbyq}</textarea></td>
										</tr>
									</tbody>
								</table> --%>
								<table class="fr-table table-bordered" >
									<tbody>
										<tr>
											<td width="150px">主要参考资料</td>
											<td class="fr-s" width="750px"><textarea class="fr-form-control fr-control-textarea"
													style="width: 1500px; height: 100px; resize: none;"
													name="m:urlZhiYuan:zyckzl" 
													validate="{required:true}" />${urlZhiYuan.zyckzl}</textarea></td>
											<pre>
											1.参考文献 5篇以上，至少含3篇英文文献。
											2.参考文献原则上应以近五年的高水平期刊论文为主，外文文献至少要占参考文献总量的10%，研究生学位论文占参考文献总量不得超过10%。
											3.尽量不写超过五年的旧文献
											4.文献格式应为标准格式，示例：
											[1] 蔡自兴，徐光祐. 人工智能及其应用[M].北京：清华大学出版社, 2016.
											[2] 武玉英，吕尽轩. 基于模糊的电子商务谈判模型及其仿真[J].计算机工程与应用, 2015,3(2)：90-102.
											[3] Ian Foster, Carl Kesselman, Gene Tsudik. A security architecture for computational grids[Z]. ACM Conf. on Computer and Communications Security,2016.
											</pre>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
					</table> 
					<input type="hidden" name="m:urlZhiYuan:td2id"  value="${urlZhiYuan.td2id}"/>
					<input type="hidden" name="m:urlZhiYuan:td2"  value="${urlZhiYuan.td2}"/>
					<input type="hidden" name="m:urlZhiYuan:td1id"  value="${urlZhiYuan.td1id}"/>
					<input type="hidden" name="m:urlZhiYuan:td1"  value="${urlZhiYuan.td1}"/>
					<input type="hidden" name="m:urlZhiYuan:classr"  value="${urlZhiYuan.classr}"/>
					<input type="hidden" name="m:urlZhiYuan:finalteacherId"  value="${urlZhiYuan.finalteacherId}"/>
					<input type="hidden" name="m:urlZhiYuan:finaltd"  value="${urlZhiYuan.finaltd}"/>
					<input type="hidden" name="m:urlZhiYuan:finaltdId"  value="${urlZhiYuan.finaltdId}"/>
					<input type="hidden" name="m:urlZhiYuan:xh"  value="${urlZhiYuan.xh}"/>
					<input type="hidden" name="m:urlZhiYuan:name"  value="${urlZhiYuan.name}"/>
					<input type="hidden" name="m:urlZhiYuan:js3"  value="${urlZhiYuan.js3}"/>
					<input type="hidden" name="m:urlZhiYuan:js3id"  value="${urlZhiYuan.js3id}"/>
					<input type="hidden" name="m:urlZhiYuan:td3id"  value="${urlZhiYuan.td3id}"/>
					<input type="hidden" name="m:urlZhiYuan:js1"  value="${urlZhiYuan.js1}"/>
					<input type="hidden" name="m:urlZhiYuan:js1id"  value="${urlZhiYuan.js1id}"/>
					<input type="hidden" name="m:urlZhiYuan:litishufile"  value="${urlZhiYuan.litishufile}"/>
					<input type="hidden" name="m:urlZhiYuan:renwushufile"  value="${urlZhiYuan.renwushufile}"/>
					<input type="hidden" name="m:urlZhiYuan:gzmd"  value="${urlZhiYuan.gzmd}"/>
					<input type="hidden" name="m:urlZhiYuan:gzjdfp"  value="${urlZhiYuan.gzjdfp}"/>
					<input type="hidden" name="m:urlZhiYuan:gznrjjtyq"  value="${urlZhiYuan.gznrjjtyq}"/>
					<input type="hidden" name="m:urlZhiYuan:zddyfs"  value="${urlZhiYuan.zddyfs}"/>
					
			</form>
                     <input type="hidden" value="${filedownload}"/>
		</div>
	</div>
</body>
<script type="text/javascript">

$(function(){
	var type = ${type};
	showbutton(type);
	});

	var fo = eval( '(${filedownload})' )[0], fileName = fo.fileName , fileId = fo.id;
	function officeOnline() {
		var rights, btns, b = [ {
			'alias' : 'file',
			'css' : 'fa-file',
			'text' : '文件',
			'parentAlias' : '-1'
		}, {
			'alias' : 'save',
			'css' : 'fa-floppy-o ',
			'text' : '保存',
			'parentAlias' : 'file'
		}, {
			'alias' : 'print',
			'css' : 'fa-print',
			'text' : '打印',
			'parentAlias' : 'file'
		}, {
			'alias' : 'review',
			'css' : 'fa-file',
			'text' : '审阅',
			'parentAlias' : '-1'
		}, {
			'alias' : 'addComment',
			'css' : 'fa-file',
			'text' : '新建批注',
			'parentAlias' : 'review'
		}, {
			'alias' : 'delAllComment',
			'css' : 'fa-file',
			'text' : '删除所有批注',
			'parentAlias' : 'review'
		} ];
		if (status == '1' && role == 'std')//已经结束,教师可以编辑
			btn = [ b[0], b[2] ];
		else
			//进行中全部开放
			btn = b;
		new OfficeDialog({
		 	fileName : fileName,
			fileId : fileId,
			rights : "e",
			btns : btn,
			title : "附件预览"
		}).show();
	}	
	function showbutton(type){
		if(type==0){
			document.getElementById("anchor").style.display = "none";
			document.getElementById("anchor2").style.display = "none";
			document.getElementById("anchor3").style.display = "none";
			document.getElementById("anchor4").style.display = "none";
		}
	 }
		function pageOffice(){
			POBrowser.openWindowModeless('/platform/office/pageOffice/dialog.htm?fileId='+fileId +'&readOnly=1','fullscreen=yes','123');
		}
</script>
<script type="text/javascript"
	src="${ctx}/js/lc/commons/control/OfficeControl.js"></script>
<script type="text/javascript"
	src="${ctx}/js/lc/platform/dialog/office/officeDialog.js"></script>
</html>
