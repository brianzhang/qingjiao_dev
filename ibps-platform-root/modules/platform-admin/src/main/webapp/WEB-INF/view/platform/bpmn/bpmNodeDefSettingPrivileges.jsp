<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
<head>
  <%@include file="/commons/include/get.jsp" %>
  <%@include file="/commons/page/grid.jsp" %>
  <script type="text/javascript" src="${ctx}/js/lc/platform/bpmn/taskSignSettingPrivileges.js"></script>
  <title>会签特权设置</title>
 </head>
 <body>
  <table class="table table-bordered table-striped" style="width: 100%">
		<thead>
	    	<tr style="text-align: center;">
		    	<td><label>权限类型</label></td>
		    	<td><label>人员配置</label></td>
	    	</tr>
		</thead>
		<tr>
			<th width="20%"><span>所有特权:</span></th>
			<td>
			<div style="min-height:120px">
					<table style="text-align:left;" class="table-grid">
						<thead>
						<tr>
							<th width="60px">序号</th>
							<th>条件</th>
							<th width="60px">批次</th>
							<th width="100px">操作</th>
						</tr>
						</thead>
						<tbody id="all"></tbody>
						<tfoot>
							<tr><td style="text-align: left;" colspan="4"> 
							<a class="btn btn-default fa fa-add btn-sm" href="javascript:void(0)" onclick="privilegesDialog.addUserCondition('all',true)" >新增人员规则</a>
							</td></tr>
						</tfoot>
					</table>
				</div>
			</td>
		</tr>
		<tr>
			<th width="20%"><span>直接处理:</span></th>
			<td>
			<div style="min-height:120px">
					<table style="text-align:left;" class="table-grid">
						<thead>
						<tr>
							<th width="60px">序号</th>
							<th>条件</th>
							<th width="60px">批次</th>
							<th width="100px">操作</th>
						</tr>
						</thead>
						<tbody id="direct"></tbody>
						<tfoot>
							<tr><td style="text-align: left;" colspan="4"> 
							<a class="btn btn-default fa fa-add btn-sm" href="javascript:void(0)" onclick="privilegesDialog.addUserCondition('direct',true)" >新增人员规则</a>
							</td></tr>
						</tfoot>
					</table>
				</div>
			</td>
		</tr>
		<tr>
			<th width="20%"><span>一票制:</span></th>
			<td>
			<div style="min-height:120px">
					<table style="text-align:left;" class="table-grid">
						<thead>
						<tr>
							<th width="60px">序号</th>
							<th>条件</th>
							<th width="60px">批次</th>
							<th width="100px">操作</th>
						</tr>
						</thead>
						<tbody id="oneticket"></tbody>
						<tfoot>
							<tr><td style="text-align: left;" colspan="4"> 
							<a class="btn btn-default fa fa-add btn-sm" href="javascript:void(0)" onclick="privilegesDialog.addUserCondition('oneticket',true)" >新增人员规则</a>
							</td></tr>
						</tfoot>
					</table>
				</div>
			</td>
		</tr>
		<tr>
			<th width="20%"><span>允许补签:</span></th>
			<td>
			<div style="min-height:120px">
					<table style="text-align:left;" class="table-grid">
						<thead>
						<tr>
							<th width="60px">序号</th>
							<th>条件</th>
							<th width="60px">批次</th>
							<th width="100px">操作</th>
						</tr>
						</thead>
						<tbody id="allowAddSign"></tbody>
						<tfoot>
							<tr><td style="text-align: left;" colspan="4">
							<a class="btn btn-default fa fa-add btn-sm" href="javascript:void(0)" onclick="privilegesDialog.addUserCondition('allowAddSign',true)" >新增人员规则</a>
							</td></tr>
						</tfoot>
					</table>
				</div>
			</td>
		</tr>
    </table>
</body>
</html>