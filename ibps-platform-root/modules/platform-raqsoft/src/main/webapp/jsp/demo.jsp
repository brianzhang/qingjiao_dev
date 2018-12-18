<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>raqsoft demo</title>
</head>
<body>
	<div style="width: 100%;">
		<div style="width: 80%;">
			<form id="form1">
				<label>标题：</label> <input name="arg1"> 
				<label>状态：</label> <input name="arg2"> 
				<label>创建时间：</label> <input name="arg3"> 
				<input id="submit" type="button" value="submit">
			</form>
		</div>
	</div>
	<br />
	<iframe style="width: 700px; height: 500px;" id="report1"
		src="<%=request.getContextPath() %>/showReport?raq=/demo_withParams.raq"></iframe>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/jquery/jquery.min.js"></script>
	<script type="text/javascript">
		$(function() {
			demo3 = new Demo3();
			demo3.init();
		});

		
		(function() {
			// 定义常量
			var _consts = {
				FORM : "#form1",
				REPORT : "#report1",
				URL : "<%=request.getContextPath() %>/showReport?raq=/demo_withParams.raq"
			};

			Demo3 = function() {
				// 定义属性
			};

			Demo3.prototype = {
				consts : _consts,
				init : function() {
					if (this.hasInit) // 是否已初始化
						return false;
					this.hasInit = true;
					this._initEvent();

				},
				_initEvent : function() {
					var _this = this,params,path;
					$("#submit").on("click",function(){
						var temp='';
						//获取表单内容，并遍历表单拼接到url中
						params = $(_this.consts.FORM).serialize();
						path= _this.consts.URL+"&"+params;
						//更新iframe报表内容
						$(_this.consts.REPORT).attr("src", path);

					});
				}
			}
		})();
	</script>
</body>
</html>