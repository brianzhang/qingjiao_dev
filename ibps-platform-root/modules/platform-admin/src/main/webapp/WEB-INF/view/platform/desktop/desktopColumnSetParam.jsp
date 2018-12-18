<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<%@include file="/commons/include/get.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/platform/desktop/desktopColumn.js"></script>
		<script type="text/javascript">
			var params = frameElement.dialog.params;
			$(function(){
				initDataParam(params);
			});
			
			function getData(){
					var json = [];
					if(nameValid()){
						$.topCall.error("重复的参数值，请检查！");
						return;
					}
					$("#trContainer tr[var='paramTr']").each(function(){
						var me = $(this),obj={};
						obj.name =$("[var='name']",me).val();
						obj.type =$("[var='type']",me).val();
						obj.mode =$("[var='mode']",me).val();
						obj.value =$("[var='value']",me).val();
						json.push(obj);
					});
					
					return JSON2.stringify(json);
			}
			
			function nameValid(){
				var name =new Array();
				$("#trContainer").find("[var='name']").each(function() {
					name.push( $(this).val());
				});
				return isRepeat(name);		
			}
			function isRepeat(arr) {
			    var hash = {};
			    for(var i in arr) {
			        if(hash[arr[i]]) {
			            return true;
			        }
			        // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
			        hash[arr[i]] = true;
			    }
			    return false;
			}
			
			function initDataParam (dataParam) {
				if ($.isEmpty(dataParam))
					return;
				var tr = $($("#paramTemplate .table tr")[0]).clone(true, true);
				var params = $.parseJSON(dataParam);
				for (var i = 0, c; c = params[i++];) {
					$("input[var='name']", tr).val(c.name);
					$("select[var='type']", tr).val(c.type);
					$("select[var='mode']", tr).val(c.mode);
					$("textarea[var='value']", tr).val(c.value);
					var tr1 = tr.clone(true, true);
					$("#trContainer").append(tr1);
				}
			}
			
			function addDataParam(){
	
				var tr = $($("#paramTemplate .table tr")[0]).clone(true, true);
				$("#trContainer").append(tr);
			}
			
			function	moveTr (obj, isUp) {
				var thisTr = $(obj).parents("tr");
				if (isUp) {
					var prevTr = $(thisTr).prev();
					if (prevTr) {
						thisTr.insertBefore(prevTr);
					}
				} else {
					var nextTr = $(thisTr).next();
					if (nextTr) {
						thisTr.insertAfter(nextTr);
					}
				}
			}
			function delTr(obj) {
				$(obj).closest("tr").remove();
			}

	</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-add" onclick="addDataParam()"><span>新增</span></a>
				</div>
			</div>
			<div class="panel-form">
				<table cellpadding="1" cellspacing="1"  class="table table-striped">
					<tr>
						<th align="center"><input class="pk" type="checkbox"/></th>
					  <th align="center">参数名</th>
					  <th align="center">参数类型</th>
					  <th align="center">值来源</th>
					  <th align="center">参数值</th>
					  <th align="center" style="width: 120px;">操作</th>
					</tr>
					<tbody id="trContainer">
				    </tbody>
				</table>
				</div>
		</div>
		
		<div  id="paramTemplate"  style="display: none;">
			<table cellpadding="1" cellspacing="1"  class="table table-striped">
				<tbody>
				<tr var="paramTr">
					<td ><input class="pk" type="checkbox" name="select"/>
					<td><input type="text" var="name" value="" class="form-control"/> </td>
					<td><select var="type" class="form-control" style="width: 100px;"/>
							<option value="string">String</option>
							<option value="int">int</option>
							<option value="float">float</option>
							<option value="double">double</option>
							<option value="byte">byte</option>
							<option value="short">short</option>
							<option value="long">long</option>
							<option value="boolean">boolean</option>
							<option value="date">date</option>
						</select>
					</td>
					<td>
						<select var="mode" class="form-control" style="width: 100px;"/>
							<option value="0">固定值</option>
							<option value="1">动态传入</option>
							<option value="2">脚本</option>
						</select>
					</td>
					<td>
						<textarea rows="3" cols="20" var="value" class="form-control"/></textarea>
					</td>
					<td>
						<a class="btn btn-sm btn-info fa fa-arrow-up" href="javascript:;" title="上移" onclick="moveTr(this,true)"></a>
						<a class="btn btn-min btn-info fa fa-arrow-down" href="javascript:;" title="下移"  onclick="moveTr(this,false)"></a>
						<a class="btn btn-sm btn-info fa fa-remove" href="javascript:;"  title="删除" onclick="delTr(this)"></a>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</body>
</html>