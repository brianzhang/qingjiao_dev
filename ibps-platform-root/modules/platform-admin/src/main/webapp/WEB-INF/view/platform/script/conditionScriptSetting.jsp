<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<%@include file="/commons/include/get.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/platform/script/scriptEdit.js"></script>
<script type="text/javascript" src="${ctx}/js/lc/platform/script/conditionScriptSetting.js"></script>
</head>

<body>
	<!-- 顶部按钮 -->
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="panel-form" id="conditionScriptSettingForm">
			<div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="input-group">
                                    <input type="text" placeholder="请选择条件脚本" class="input-sm form-control" id="alias"disabled>
                                    <input type="hidden"  id="id"> <span class="input-group-btn">
                                        <button type="button" class="btn btn-sm btn-primary" id="condScript"> 条件脚本</button> </span>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped" id="settingTable">
                                <thead>
                                    <tr>
										<th>参数名称</th>
										<th>参数类型</th>
										<th>参数说明</th>
										<th>参数值</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="form-inline p-xxs">
                                <div class="form-group">
                                    <label class="search-label">返回值</label>: <input type="text" class="input-sm form-control"  id="scriptResult" disabled> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: none;">
				<div id="para-txt">
					<table class="table-detail para-info-table" cellpadding="0"
						cellspacing="0" border="0">
						<thead>
							<tr>
								<th width="10%" align="center">参数信息</th>
								<th width="25%" align="center">参数类型</th>
								<th width="25%" align="center">参数说明</th>
								<th width="35%" align="center">控件类型</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><span name="paraName"></span></td>
								<td><span name="paraType"></span></td>
								<td><input type="text" name="paraDesc" class="inputText" /></td>
								<td>
									<input type="text" name="paraValue" id="paraValue"class="inputText" />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
        </div>
		</div>
	</div>
</body>
</html>