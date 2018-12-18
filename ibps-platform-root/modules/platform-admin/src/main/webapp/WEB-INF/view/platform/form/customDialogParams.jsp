<%@page language="java" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
	<%@include file="/commons/include/get.jsp" %>
	<script type="text/javascript" src="${ctx}/js/plugins/artTemplate/artTemplate.js"></script>
	<title>对话框参数传入</title>
	<script type="text/javascript">
		$(function(){
			var params = frameElement.dialog.params,
				 isPreviewCallCode =params.isPreviewCallCode,
				 paramArr =params.paramArr,
				 resultfield = params.resultfield;
// 			var resultfield = {} ;
			if(!isPreviewCallCode){
				$("#callCode").show();
				resultfield = eval("("+resultfield+")") ;
				paramArr = eval("("+paramArr+")") ;
				var paramString = "" ;
				var paramReturnString = "" ;
				for(var i=0;i<resultfield.length;i++){
					if(i>0){
						paramReturnString+=", ";
					}
					paramReturnString+=resultfield[i].field+" = \"参数值\""
				}
				for(var i=0;i<paramArr.length;i++){
					if(i>0){
						paramString+="&";
					}
					paramString+=paramArr[i]+"=参数值"
				}
				$("[id='paramString']").text(paramString);
				$("#paramReturnString").text(paramReturnString);
			}else{
				$("#customDialogTable").show();
			//	paramArr = $.parseJSON(paramArr) ;
				if(paramArr.length<=0){
					$('#listManager').show() ;
				}
				var htmlContent = template('paramTemp', {data:paramArr});
				
				$('#contentBody').html(htmlContent) ;
				$('.add').on('click',function(){
					var tr = $(this).parent().parent() ;
					tr.clone(true).appendTo(tr.parent()) ;
				});
				$('.del').on('click',function(){
					var tr = $(this).parent().parent() ;
					tr.remove() ;
				});
			}
		})
		function getData(){
			var result= {}; 
			var paramNames = $('[name="paramName"]') ;
	    	for(var i=0;i<paramNames.length;i++){
	    		var paramName = $(paramNames[i]),
	    			 val=paramName.val();
				if($.trim(val)!=''){
					result[val] = paramName.closest('td').next('td').find('[name="paramValue"]').val();
				}
			}
			return result;
	    };
	    
	</script>
</head>
<body>

	<div class="panel">
		<div class="panel-top">
		</div>
		<div class="panel-body">
				<div class='panel-table'>
				<span id="callCode" style="display:none;">
					<table id="callCodeTable" class="table-grid table-list">
					<tr>
						<td>步骤一：</td><td style="text-align: left;">引入CommonDialog.js：<br>
						&lt;script type="text/javascript" src="\${ctx}/js/lc/platform/form/CommonDialog.js"&gt;&lt;/script&gt;；</td>
					</tr>
					<tr>
						<td>步骤二：</td><td style="text-align: left;">构造需要向自定义对话框传递的参数键值对字符串：<br>
						var paramValueString = "参数名=参数值";</td>
					</tr>
					<tr>
						<td>步骤三：</td><td style="text-align: left;">调用CommonDialog，传入对话框别名，编写回调函数，根据需要传入paramValueString参数；</td>
					</tr>
					<tr>
						<td style="width:60px;">调用代码：</td><td style="text-align: left;">
						&lt;script type="text/javascript" src="\${ctx}/js/lc/platform/form/CommonDialog.js"&gt;&lt;/script&gt;<br>
						&lt;script type="text/javascript"&gt;<br>
						var paramValueString = "<span id='paramString'></span>";<br>
						CommonDialog("${param.alias}",function(data){<br>
							&nbsp;&nbsp;//data返回 Object { <span id="paramReturnString"></span>}，多个则返回 Object 数组<br>
						},paramValueString);<br>
						&lt;/script&gt;
						</td>
					</tr>
					</table>
				</span>
				<table id="customDialogTable" cellpadding="1" class="table-grid table-list" cellspacing="1" style="display:none;">
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
		<textarea id="paramJson"  style="display: none;">${fn:escapeXml(paramJson)}</textarea>
       	 
       	 
       	 <script type="text/html"  id="paramTemp">
				{{if (data.length>0)}}
						 {{each data as item i}}
		         			 <tr>
			         			 <td><input style="background:transparent;border:0px;" name="paramName" value="{{item}}" readOnly="true" /></td>
			         		 	<td><input type="text" name="paramValue" /></td>
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
