<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<%@include file="/commons/include/get.jsp"%>
	<script type="text/javascript" src="${ctx}/js/lc/platform/form/formDefLinkdataConfig.js"></script>
	<body>
			<div class="wrapper wrapper-content  col-sm-12">
					<div class="panel-form">
						
						<form class="form-horizontal" >
								<div class="form-group">
                                	   <label class="col-sm-2 control-label">关联数据唯一标识（主键）:</label>
                                  	   <div class="col-sm-10">
                                  	   		<select class="form-control"  id="linkDataId" ></select>
                                  		</div>
                            	</div>
                            	<div class="form-group">
                                	   <label class="col-sm-2 control-label">关联数据展示值:</label>
                                  	   <div class="col-sm-10">
                                  	   		<select class="form-control"  id="linkDataText" ></select>
                                  		</div>
                            	</div>
                            
				          </form>
                    </div> 
             </div>
	</body>
</html>