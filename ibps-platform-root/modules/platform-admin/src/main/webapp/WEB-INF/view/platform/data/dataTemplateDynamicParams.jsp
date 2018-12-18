<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<%@include file="/commons/include/get.jsp"%>
	<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
<script type="text/javascript">
		$(function(){
			var params = frameElement.dialog.params,
				dynamicParams = params.dynamicParams,
				fields = params.fields;
				fieldMap = {};
				paramArr = [] ;
			for (var _i = 0, _len = fields.length; _i < _len; _i++) {
				var field = fields[_i];
				fieldMap[field.name] = field.label;
			}	
			
			for(var i in dynamicParams){
				var	dynamicParam = dynamicParams[i];
				dynamicParam["label"] = fieldMap[dynamicParam.field];
				paramArr.push(dynamicParam);
			}
			
			var htmlContent = template('paramTemp', {data:paramArr});
			
			$('#contentBody').html(htmlContent) ;
		});
		function getData(){
			var result= {},
				paramNames = $('[name="paramName"]') ;
	    	for(var i=0;i<paramNames.length;i++){
	    		var paramName = $(paramNames[i]),
	    			 name=paramName.data("name");
				if($.isNotEmpty(name)){
					result[name] = paramName.closest('td').next('td').find('[name="paramValue"]').val();
				}
			}
			return result;
	    };
	    
	</script>
</head>
<body>

	<div class="panel">
					<div class=" alert alert-warning m-b-0" role="alert" >该为预览传入参数值的设置，实际是表单的数据传入。</div>
		<div class="panel-body">
				<div class='panel-table'>
				<table id="customDialogTable" cellpadding="1" class="table-grid table-list" cellspacing="1" >
					<tr>
						<th>参数名</th>
						<th>参数值</th>
		 	            <th style="display:none" id="listManager">操作</th>
					</tr>
					<tbody id="contentBody">
					</tbody>
				</table>
				
				</div>
			
		</div><!-- end of panel-body -->
	</div> <!-- end of panel -->
       	 
       	 <script type="text/html"  id="paramTemp">
				{{if (data.length>0)}}
						 {{each data as item i}}
		         			 <tr>
			         			 <td><input style="background:transparent;border:0px;" name="paramName" data-name="{{item.field}}" value="{{item.label}}" readOnly="true" /></td>
			         		 	<td><input type="text" name="paramValue"   /></td>
		         			</tr>
						{{/each}}
				{{else}}
				  <tr>
		          <td><input type="text" name="paramName" /></td>
		          <td><input type="text" name="paramValue" /></td>
				  <td>
			          <a class="link add" href="javascript:;">添加</a>
			          <a class="link del" href="javascript:;">删除</a>
		          </td>
				{{/if}}
		 </script>
	</body>
</html>