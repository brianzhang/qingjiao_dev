<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/bishe/urlZhiYuant/urlZhiYuan.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="">
				<form  class="fr-form"  id="urlZhiYuanForm" action="save.htm" >
					<input type="hidden" name="m:urlZhiYuan:id"  value="${urlZhiYuan.id}"/>
				<div class="fr_response_field col-sm-12" >
				       <h2>论文审核评阅意见</h2>
				</div>	
                 <br /><br /><br />
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">学号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:xh" value="${urlZhiYuan.xh}" disabled="true" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">姓名</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:urlZhiYuan:name" value="${urlZhiYuan.name}" disabled="true" validate="{required:false"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">最终团队</label>
				  	<div class="fr-form-block">
				   <input type="text"   class="fr-form-control"  name="m:urlZhiYuan:finaltd"  disabled="true"  validate="{required:false}" value="${urlZhiYuan.finaltd}"/>
				 </div>
				 	</div>
			  	</div>

                    <div class="fr_response_field col-sm-3"  id="normalDownView">
                        <div class="fr-form-group">
                            <label class="fr-control-label">
                                正常论文下载:
                            </label>
                            <div class="fr-form-block">
                                <div name="div_attachment_container" data-rights="r"
                                     data-media="" data-media_type="" data-max_file_size=""
                                     data-max_file_quantity="1">
                                    <div class="fr-files"></div>
                                    <textarea style="display: none" data-control="attachment"
                                              validate="{required:false}">${normalFileDownload}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

					<div class="fr_response_field col-sm-12" >
						<div class="fr-form-group">
							<label class="fr-control-label">指导教师评语</label>
							<div class="fr-form-block">
								<textarea style="font-size:15px; width:800px; height:200px" class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:finalTchComment"  readonly="true"  validate="{required:false}">${urlZhiYuan.finalTchComment}</textarea>
							</div>
						</div>
					</div>

					<div class="fr_response_field col-sm-12" >
						<div class="fr-form-group">
							<label class="fr-control-label">指导教师意见:</label>
							<div class="fr-form-block">
								<input type="text"   class="fr-form-control"  name="m:urlZhiYuan:finalTchOpinion"  disabled="true"  validate="{required:false}" value="${urlZhiYuan.finalTchOpinion}"/>
							</div>
						</div>
					</div>

                    <div class="fr_response_field col-sm-3"  id="anonymouslDownView">
                        <div class="fr-form-group">
                            <label class="fr-control-label">
                                匿名论文下载:
                            </label>
                            <div class="fr-form-block">
                                <div name="div_attachment_container" data-rights="r"
                                     data-media="" data-media_type="" data-max_file_size=""
                                     data-max_file_quantity="1">
                                    <div class="fr-files"></div>
                                    <textarea style="display: none" data-control="attachment"
                                              validate="{required:false}">${anonymousFileDownload}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

					<div class="fr_response_field col-sm-12" >
						<div class="fr-form-group">
							<label class="fr-control-label">评审教师评语</label>
							<div class="fr-form-block">
								<textarea style="font-size:15px; width:800px; height:200px" class="fr-form-control fr-control-textarea"  name="m:urlZhiYuan:judgeTchComment"   readonly="true" validate="{required:false}">${urlZhiYuan.judgeTchComment}</textarea>
							</div>
						</div>
					</div>

					<div class="fr_response_field col-sm-12" >
						<div class="fr-form-group">
							<label class="fr-control-label">评审教师意见:</label>
							<div class="fr-form-block">
								<input type="text"   class="fr-form-control"  name="m:urlZhiYuan:judgeTchOpinion"  disabled="true"  validate="{required:false}" value="${urlZhiYuan.judgeTchOpinion}"/>
							</div>
						</div>
					</div>

					<div class="fr_response_field col-sm-12" >
						<div class="fr-form-group">
							<label class="fr-control-label">是否同意答辩</label>
							<div class="fr-form-block">
								<input type="text"   class="fr-form-control"  name="m:urlZhiYuan:isDb"  disabled="true"  validate="{required:false}" value="${urlZhiYuan.isDb}"/>
							</div>
						</div>
					</div>

</form>

			</div>
		</div>
	</body>

	<script type="text/javascript">
        $(function(){
            debugger
            var normalFlge="${normalFlge}";
            var anonymousFlge="${anonymousFlge}";
            if(normalFlge=="0"){
                document.getElementById("normalDownView").style.display = "none";
            }
            if(anonymousFlge=="0"){
                document.getElementById("anonymouslDownView").style.display = "none";
            }
        });
	</script>
</html>
