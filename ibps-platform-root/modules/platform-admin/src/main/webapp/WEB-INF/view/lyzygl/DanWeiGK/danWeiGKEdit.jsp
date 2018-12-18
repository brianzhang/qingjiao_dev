<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/lyzygl/DanWeiGK/danWeiGK.js"></script>

		<script type="text/javascript">
	function setValue(obj) {
		document.getElementById("inputId").val(obj.value);
	}
	function setValue1(obj) {
		document.getElementById("inputId1").val(obj.value);
	}
	function setValue2(obj) {
		document.getElementById("inputId2").val(obj.value);
	}
	function setValue0(obj) {
		document.getElementById("inputId0").val(obj.value);
	}
</script>
<script type="text/javascript">
	//弹出隐藏层  修改修正值
	function ShowDiv(show_div, bg_div) {
		document.getElementById(show_div).style.display = 'block';
		document.getElementById(bg_div).style.display = 'block';
		var bgdiv = document.getElementById(bg_div);
		bgdiv.style.width = document.body.scrollWidth;
		// bgdiv.style.height = $(document).height();
		$("#" + bg_div).height($(document).height());
	};
	//关闭弹出层
	function CloseDiv(show_div, bg_div) {
		document.getElementById(show_div).style.display = 'none';
		document.getElementById(bg_div).style.display = 'none';
	};

	//弹出隐藏层   修改生长率
	function ShowDiv1(show_div, bg_div) {
		document.getElementById(show_div).style.display = 'block';
		document.getElementById(bg_div).style.display = 'block';
		var bgdiv = document.getElementById(bg_div);
		bgdiv.style.width = document.body.scrollWidth;
		// bgdiv.style.height = $(document).height();
		$("#" + bg_div).height($(document).height());
	};
	//关闭弹出层
	function CloseDiv1(show_div, bg_div) {
		document.getElementById(show_div).style.display = 'none';
		document.getElementById(bg_div).style.display = 'none';
	};
	/*修正值 */
	function checktr(obj) {

	    var ld = $(obj).find("td").eq(0).text();
	    var lm = $(obj).find("td").eq(1).text();
	    var mj = $(obj).find("td").eq(2).text();
	    var xj = $(obj).find("td").eq(3).text();
	    var mj2 = $(obj).find("td").eq(4).text();
	    var xj2 = $(obj).find("td").eq(5).text();
	    if(obj != null){
		    document.getElementById("input4").value=ld;
		    document.getElementById("input5").value=lm;
		    document.getElementById("input6").value=mj;
		    document.getElementById("input7").value=xj;
		    document.getElementById("input8").value=mj2;
		    document.getElementById("input9").value=xj2;
		    alert("............修改成功............");
		    CloseDiv('MyDiv','fade');
	    }else{
	    	alert("............修改失败............");
	    }

	};
	
	/*生长率  */
	function checktr1(obj) {
	    var bh = $(obj).find("td").eq(0).text();
	    var lflx = $(obj).find("td").eq(1).text();
	    var lz = $(obj).find("td").eq(2).text();
	    var szl = $(obj).find("td").eq(3).text();
	    if(obj != null){
		    document.getElementById("input1").value=lflx;
		    document.getElementById("input2").value=lz;
		    document.getElementById("input3").value=szl;
		    alert("............修改成功............");
		    CloseDiv1('MyDiv1','fade1');
	    }else{
	    	alert("............修改失败............");
	    }

	};
</script>
<style>
.black_overlay {
	display: none;
	position: absolute;
	top: 0%;
	left: 0%;
	width: 100%;
	height: 100%;
	background-color: black;
	z-index: 1001;
	-moz-opacity: 0.8;
	opacity: .80;
	filter: alpha(opacity = 80);
}

.white_content {
	display: none;
	position: absolute;
	top: 10%;
	left: 10%;
	width: 80%;
	height: 80%;
	background-color: white;
	z-index: 1002;
	overflow: auto;
}
</style>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form class="fr-form" id="danWeiGKForm" action="save.htm">
				<input type="hidden" name="m:danWeiGK:id" value="${danWeiGK.id}" />
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">单位名称</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:mingChen" value="${danWeiGK.mingChen}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">土地总面积</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:mianJi" value="${danWeiGK.mianJi}"
								validate="{required:false}" />
						</div>
					</div>
				</div>

				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">植物种类</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:zhiWuChongLei"
								value="${danWeiGK.zhiWuChongLei}" validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">经度</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:jingDu" value="${danWeiGK.jingDu}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-6">
					<div class="fr-form-group">
						<label class="fr-control-label">纬度</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:weiDuo" value="${danWeiGK.weiDuo}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">地处山系</label>
						<div class="fr-form-block">
							<input type="hidden" id="inputId" class="fr-form-control"
								name="m:danWeiGK:shanXi" value="${danWeiGK.shanXi}"
								validate="{required:false}" /> <select class="fr-form-control"
								name="m:danWeiGK:shanXi" value="${danWeiGK.shanXi}"
								validate="{required:false}" id="selectId"
								onchange="setValue(this)">
								<option value="${danWeiGK.shanXi}" selected>${danWeiGK.shanXi}</option>
								<c:forEach items="${diChuSXData}" var="list1" varStatus="status">
									<option value="${list1.deChuShanXi}">${list1.deChuShanXi}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">地处水系</label>
						<div class="fr-form-block">
							<input type="hidden" id="inputId1" class="fr-form-control"
								name="m:danWeiGK:shuiXi" value="${danWeiGK.shuiXi}"
								validate="{required:false}" /> <select class="fr-form-control"
								name="m:danWeiGK:shuiXi" value="${danWeiGK.shuiXi}"
								validate="{required:false}" id="selectId1"
								onchange="setValue1(this)">
								<option value="${danWeiGK.shuiXi}" selected>${danWeiGK.shuiXi}</option>
								<c:forEach items="${dDiChuSXData}" var="list2">
									<option value="${list2.diChuShuiXi}">${list2.diChuShuiXi}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">地处平原</label>
						<div class="fr-form-block">
							<input type="hidden" id="inputId2" class="fr-form-control"
								name="m:danWeiGK:pingYuan" value="${danWeiGK.pingYuan}"
								validate="{required:false}" /> <select class="fr-form-control"
								name="m:danWeiGK:pingYuan" value="${danWeiGK.pingYuan}"
								validate="{required:false}" id="selectId2"
								onchange="setValue2(this)">
								<option value="${danWeiGK.pingYuan}" selected>${danWeiGK.pingYuan}</option>
								<c:forEach items="${diChuPYData}" var="list3">
									<option value="${list3.deChuPingYuan}">${list3.deChuPingYuan}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">主要土壤</label>
						<div class="fr-form-block">
							<input type="hidden" id="inputId0" class="fr-form-control"
								name="m:danWeiGK:zhuYaoTuRang" value="${danWeiGK.zhuYaoTuRang}"
								validate="{required:false}" /><select class="fr-form-control"
								name="m:danWeiGK:zhuYaoTuRang" value="${danWeiGK.zhuYaoTuRang}"
								validate="{required:false}" id="selectId0"
								onchange="setValue0(this)">
								<option value="${danWeiGK.zhuYaoTuRang}" selected>${danWeiGK.zhuYaoTuRang}</option>
								<c:forEach items="${zhuyaoturangData}" var="list0">
									<option value="${list0.tuRangMingCheng}">${list0.tuRangMingCheng}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">平均海拔</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:haiBa" value="${danWeiGK.haiBa}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">平均气温</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:qiWen" value="${danWeiGK.qiWen}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">年积温</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:nianJiWen" value="${danWeiGK.nianJiWen}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">平均降水量</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:pingJun" value="${danWeiGK.pingJun}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">无霜期</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:wuShuangQi" value="${danWeiGK.wuShuangQi}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">日照时数</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:riZhaoShiShuo"
								value="${danWeiGK.riZhaoShiShuo}" validate="{required:false}" />
						</div>
					</div>
				</div>

				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">二类调查年度</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:tiaoZhaNianDuo"
								value="${danWeiGK.tiaoZhaNianDuo}" validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-3">
					<div class="fr-form-group">
						<label class="fr-control-label">录入年度</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:luRuNianDu" value="${danWeiGK.luRuNianDu}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-4">
					<div class="fr-form-group">
						<label class="fr-control-label">自然枯损率</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:kuSunShuai" value="${danWeiGK.kuSunShuai}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-4">
					<div class="fr-form-group">
						<label class="fr-control-label">综合生长率</label>
						<div class="fr-form-block">
							<input type="text" class="fr-form-control"
								name="m:danWeiGK:shengChangLu" value="${danWeiGK.shengChangLu}"
								validate="{required:false}" />
						</div>
					</div>
				</div>
				<div class="fr_response_field col-sm-4">
					<div class="fr-form-group">
						<label class="fr-control-label">创建时间</label>
						<div class="fr-form-block">
							<div class="input-icon">
								<i class="fa fa-calendar"></i> <input type="text"
									readonly="readonly" class="fr-form-control datepicker"
									datefmt="yyyy-MM-dd" name="m:danWeiGK:createTime"
									value="<fmt:formatDate value="${danWeiGK.createTime}"  pattern="yyyy-MM-dd"/>"
									validate="{required:false}" />
							</div>
						</div>
					</div>
				</div>
			 	<ul id="myTab" class="nav nav-tabs">
					<li class="active"><a href="#home" data-toggle="tab">生長率</a></li>
					<li><a href="#ios" data-toggle="tab">修正值</a></li>

				</ul>
				<div id="myTabContent" class="tab-content">
					<div class="tab-pane fade in active" id="home">
						<div class="row clearfix">
							<div class="col-md-4 column">
								<div class="fr_response_field col-sm-12">
									<div class="fr-form-group">
										<label class="fr-control-label">林分类型</label>
										<div class="fr-form-block">
											<input type="text" class="fr-form-control" id="input1"
												name="m:danWeiGK:linFenLeiXing"
												value="${danWeiGK.linFenLeiXing}"
												validate="{required:false}" />
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-4 column">
								<div class="fr_response_field col-sm-12">
									<div class="fr-form-group">
										<label class="fr-control-label">龄组</label>
										<div class="fr-form-block">
											<input type="text" class="fr-form-control" id="input2"
												name="m:danWeiGK:lingZu" value="${danWeiGK.lingZu}"
												validate="{required:false}" />
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-4 column">

								<div class="fr_response_field col-sm-12">
									<div class="fr-form-group">
										<label class="fr-control-label">生长率</label>
										<div class="fr-form-block">
											<input type="text" class="fr-form-control" id="input3"
												name="m:danWeiGK:shengZhangLu"
												value="${danWeiGK.shengZhangLu}" validate="{required:false}" />
										</div>
									</div>
								</div>
							</div>
							<div class="buttons" style="float: right;">
								<a class="btn btn-primary fa fa-edit"
									onclick="ShowDiv1('MyDiv1','fade1')"><span>修改生长率</span></a>
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="ios">
						<div class="row clearfix">
							<div class="col-md-4 column">
								<div class="fr_response_field col-sm-12">
									<div class="fr-form-group">
										<label class="fr-control-label">林地</label>
										<div class="fr-form-block">
											<input type="text" class="fr-form-control" id="input4"
												name="m:danWeiGK:linDe" value="${danWeiGK.linDe}"
												validate="{required:false}" />
										</div>
									</div>
								</div>
								<div class="fr_response_field col-sm-12">
									<div class="fr-form-group">
										<label class="fr-control-label">林木</label>
										<div class="fr-form-block">
											<input type="text" class="fr-form-control" id="input5"
												name="m:danWeiGK:linMu" value="${danWeiGK.linMu}"
												validate="{required:false}" />
										</div>
									</div>
								</div>


							</div>
							<div class="col-md-4 column">
								<div class="fr_response_field col-sm-12">
									<div class="fr-form-group">
										<label class="fr-control-label">面积1</label>
										<div class="fr-form-block">
											<input type="text" class="fr-form-control" id="input6"
												name="m:danWeiGK:mianJi1" value="${danWeiGK.mianJi1}"
												validate="{required:false}" />
										</div>
									</div>
								</div>
								<div class="fr_response_field col-sm-12">
									<div class="fr-form-group">
										<label class="fr-control-label">蓄积1</label>
										<div class="fr-form-block">
											<input type="text" class="fr-form-control" id="input7"
												name="m:danWeiGK:xuJi1" value="${danWeiGK.xuJi1}"
												validate="{required:false}" />
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-4 column">
								<div class="fr_response_field col-sm-12">
									<div class="fr-form-group">
										<label class="fr-control-label">面积2</label>
										<div class="fr-form-block">
											<input type="text" class="fr-form-control" id="input8"
												name="m:danWeiGK:mianJi2" value="${danWeiGK.mianJi2}"
												validate="{required:false}" />
										</div>
									</div>
								</div>
								<div class="fr_response_field col-sm-12">
									<div class="fr-form-group">
										<label class="fr-control-label">蓄积2</label>
										<div class="fr-form-block">
											<input type="text" class="fr-form-control" id="input9"
												name="m:danWeiGK:xuJi2" value="${danWeiGK.xuJi2}"
												validate="{required:false}" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="buttons" style="float: right;">
							<a class="btn btn-primary fa fa-edit"
								onclick="ShowDiv('MyDiv','fade')"><span>修改修正值</span></a>
						</div>
					</div>

				</div>

</form>

			</div>
					<!--弹出层时背景层DIV  修改修正值-->
		<div id="fade" class="black_overlay"></div>
		<div id="MyDiv" class="white_content">
			<div style="text-align: right; cursor: default; height: 40px;"
				id="move">
				<h3 style="float: left;">修改修正值</h3>
				<button
					style="font-size: 16px; color: red; float: right; background-color: white; border: none;"
					onclick="CloseDiv('MyDiv','fade')">关闭</button>
			</div>
			<hr>
				<table class="table table-hover table-bordered table-striped" 
					border="1" id="xiuzhengData">
					<!-- zhengchongshan -->

					<thead style="background: #BEBEBE" border="1">
						<tr style="font-size: 15px">
							<th style="width: 10%">林地</th>
							<th style="width: 10%">林木</th>
							<th style="width: 20%">面积</th>
							<th style="width: 20%">蓄积</th>
							<th style="width: 20%">面积</th>
							<th style="width: 20%">蓄积</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${xiuzhengData}" var="list5">
							<tr style="font-size: 15px;" onclick="checktr(this);">
								<td>${list5.linDi}</td>
								<td>${list5.linMu}</td>
								<td>${list5.quNianMianJi}</td>
								<td>${list5.quNianXuJi}</td>
								<td>${list5.xiuZhengMianJi}</td>
								<td>${list5.xiuZhengXuJi}</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>

		</div>
				<!--弹出层时背景层DIV  修改生长率-->
		<div id="fade1" class="black_overlay"></div>
		<div id="MyDiv1" class="white_content">
			<div style="text-align: right; cursor: default; height: 40px;"
				id="move1">
				<h3 style="float: left;">修改生长率</h3>
				<button
					style="font-size: 16px; color: red; float: right; background-color: white; border: none;"
					onclick="CloseDiv1('MyDiv1','fade1')">关闭</button>
			</div>
			<hr>
				<table class="table table-hover table-bordered table-striped" 
					border="1" id="shangzhanglvData">
					<!-- zhengchongshan -->
					<thead style="background: #BEBEBE">
						<tr style="font-size: 15px">
							<th style="width: 25%">编号</th>
							<th style="width: 25%">林分类型</th>
							<th style="width: 25%">龄组</th>
							<th style="width: 25%">生长率%</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${shangzhanglvData}" var="list4">

							<tr style="font-size: 15px; height: 20px; width: 20%" onclick="checktr1(this)">
								<td>${list4.bianHao}</td>
								<td>${list4.linFenLeiXing}</td>
								<td>${list4.lingZu}</td>
								<td>${list4.shengZhangLu}</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			
		</div>
		</div>
	</body>
</html>
