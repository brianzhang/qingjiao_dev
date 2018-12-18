<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/loanp/GRJKSQSP/gRJKSQ.js"></script>

	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					
					<c:if test = "${gRJKSQ.khmc != 无 }">
					    <a class="btn btn-primary fa fa-add" href="${ctx}/loanp/GRJKSQSP/gRJKSQ/edit.htm?sfid=${sfid}" ><span>修改个人信息</span></a>
                        </c:if>
                        
                        <a class="btn btn-primary fa fa-back" href="${ctx}/loanp/apply/applyMoney/list.htm?tx=0" ><span>返回</span></a>
				</div>
			</div>
			<c:if test = "${gRJKSQ.khmc != 无 }">
							        			<br><hr>
			<center><p style="font-size:24px;"><stronger>个人基本信息</stronger></p></center>	<hr>
			<div class="">
					<form  class="fr-form"  id="gRJKSQForm" >
				 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户类型 </label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.khlx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户英文名</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.khywm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否有户籍证明</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.sfyhjzm=='1'}">是</c:if><c:if test="${gRJKSQ.sfyhjzm=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">民族</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.mz=='1'}">阿昌族</c:if><c:if test="${gRJKSQ.mz=='2'}">白族</c:if><c:if test="${gRJKSQ.mz=='3'}">保安族</c:if><c:if test="${gRJKSQ.mz=='4'}">布朗族</c:if><c:if test="${gRJKSQ.mz=='5'}">布依族</c:if><c:if test="${gRJKSQ.mz=='6'}">朝鲜族</c:if><c:if test="${gRJKSQ.mz=='7'}">达斡尔族</c:if><c:if test="${gRJKSQ.mz=='8'}">傣族</c:if><c:if test="${gRJKSQ.mz=='9'}">德昂族</c:if><c:if test="${gRJKSQ.mz=='10'}">东乡族</c:if><c:if test="${gRJKSQ.mz=='11'}">侗族</c:if><c:if test="${gRJKSQ.mz=='12'}">独龙族</c:if><c:if test="${gRJKSQ.mz=='13'}">俄罗斯族</c:if><c:if test="${gRJKSQ.mz=='14'}">鄂伦春族</c:if><c:if test="${gRJKSQ.mz=='15'}">鄂伦春族</c:if><c:if test="${gRJKSQ.mz=='16'}">高山族</c:if><c:if test="${gRJKSQ.mz=='17'}">仡佬族</c:if><c:if test="${gRJKSQ.mz=='18'}">哈尼族</c:if><c:if test="${gRJKSQ.mz=='19'}">哈萨克族</c:if><c:if test="${gRJKSQ.mz=='20'}">汉族</c:if><c:if test="${gRJKSQ.mz=='21'}">赫哲族</c:if><c:if test="${gRJKSQ.mz=='22'}">回族</c:if><c:if test="${gRJKSQ.mz=='23'}">基诺族</c:if><c:if test="${gRJKSQ.mz=='24'}">京族</c:if><c:if test="${gRJKSQ.mz=='25'}">景颇族</c:if><c:if test="${gRJKSQ.mz=='26'}">柯尔克孜族</c:if><c:if test="${gRJKSQ.mz=='27'}">拉祜族</c:if><c:if test="${gRJKSQ.mz=='28'}">黎族</c:if><c:if test="${gRJKSQ.mz=='29'}">傈僳族</c:if><c:if test="${gRJKSQ.mz=='30'}">珞巴族</c:if><c:if test="${gRJKSQ.mz=='31'}">满族</c:if><c:if test="${gRJKSQ.mz=='32'}">毛南族</c:if><c:if test="${gRJKSQ.mz=='33'}">门巴族</c:if><c:if test="${gRJKSQ.mz=='34'}">蒙古族</c:if><c:if test="${gRJKSQ.mz=='35'}">苗族</c:if><c:if test="${gRJKSQ.mz=='36'}">仫佬族</c:if><c:if test="${gRJKSQ.mz=='37'}">纳西族</c:if><c:if test="${gRJKSQ.mz=='38'}">怒族</c:if><c:if test="${gRJKSQ.mz=='39'}">普米族</c:if><c:if test="${gRJKSQ.mz=='40'}">羌族</c:if><c:if test="${gRJKSQ.mz=='41'}">撒拉族</c:if><c:if test="${gRJKSQ.mz=='42'}">畲族</c:if><c:if test="${gRJKSQ.mz=='43'}">水族</c:if><c:if test="${gRJKSQ.mz=='44'}">塔吉克族</c:if><c:if test="${gRJKSQ.mz=='45'}">塔塔尔族</c:if><c:if test="${gRJKSQ.mz=='46'}">土家族</c:if><c:if test="${gRJKSQ.mz=='47'}">土族</c:if><c:if test="${gRJKSQ.mz=='48'}">佤族</c:if><c:if test="${gRJKSQ.mz=='49'}">维吾尔族</c:if><c:if test="${gRJKSQ.mz=='50'}">乌孜别克族</c:if><c:if test="${gRJKSQ.mz=='51'}">锡伯族</c:if><c:if test="${gRJKSQ.mz=='52'}">瑶族</c:if><c:if test="${gRJKSQ.mz=='53'}">彝族</c:if><c:if test="${gRJKSQ.mz=='54'}">裕固族</c:if><c:if test="${gRJKSQ.mz=='55'}">藏族</c:if><c:if test="${gRJKSQ.mz=='56'}">壮族</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户名称</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.khmc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户曾用名</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.khcym}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件有效期限</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.zjyxqx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">客户性别</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.khxb=='1'}">男</c:if><c:if test="${gRJKSQ.khxb=='2'}">女</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件类别</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.zjlb=='1'}">身份证</c:if><c:if test="${gRJKSQ.zjlb=='2'}">军官证</c:if><c:if test="${gRJKSQ.zjlb=='3'}">护照</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">证件号码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.zjhm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">婚姻状况</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.hyzk=='1'}">未婚</c:if><c:if test="${gRJKSQ.hyzk=='2'}">已婚</c:if><c:if test="${gRJKSQ.hyzk=='3'}">丧偶</c:if><c:if test="${gRJKSQ.hyzk=='4'}">离婚</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">最高学历</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.zgxl=='1'}">研究生</c:if><c:if test="${gRJKSQ.zgxl=='2'}">大学本科</c:if><c:if test="${gRJKSQ.zgxl=='3'}">大学专科或专科学校</c:if><c:if test="${gRJKSQ.zgxl=='4'}">中等专业学校或者中等技术学校</c:if><c:if test="${gRJKSQ.zgxl=='5'}">技术学校</c:if><c:if test="${gRJKSQ.zgxl=='6'}">高中</c:if><c:if test="${gRJKSQ.zgxl=='7'}">初中</c:if><c:if test="${gRJKSQ.zgxl=='8'}">小学</c:if><c:if test="${gRJKSQ.zgxl=='9'}">文盲或者半文盲</c:if><c:if test="${gRJKSQ.zgxl=='10'}">未知</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">最高学位</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.zgxw=='1'}">其它</c:if><c:if test="${gRJKSQ.zgxw=='2'}">名誉博士</c:if><c:if test="${gRJKSQ.zgxw=='3'}">博士</c:if><c:if test="${gRJKSQ.zgxw=='4'}">硕士</c:if><c:if test="${gRJKSQ.zgxw=='5'}">学士</c:if><c:if test="${gRJKSQ.zgxw=='6'}">未知</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人健康状况</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.grjkzk=='1'}">良好</c:if><c:if test="${gRJKSQ.grjkzk=='2'}">一般</c:if><c:if test="${gRJKSQ.grjkzk=='3'}">较差</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">政治面貌</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.zzmm=='1'}">群众</c:if><c:if test="${gRJKSQ.zzmm=='2'}">中共党员</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">出生日期</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.csrq}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">行政区划（客户所属地区）</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.xzqh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">户口性质</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.hkxz=='1'}">本省</c:if><c:if test="${gRJKSQ.hkxz=='2'}">外省</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">户籍地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.hjdz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否户主</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.sfhz=='1'}">是</c:if><c:if test="${gRJKSQ.sfhz=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通信地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.txdz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否本行股东</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.sfbxgd=='1'}">是</c:if><c:if test="${gRJKSQ.sfbxgd=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">通信地址邮政编码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.txdzyzbm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">手机号码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.sjhm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">其他联系方式</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.qtlxfs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">电子邮箱</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.dzyx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">专业特长</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.zytz=='1'}">无</c:if><c:if test="${gRJKSQ.zytz=='2'}">种粮</c:if><c:if test="${gRJKSQ.zytz=='3'}">养殖</c:if><c:if test="${gRJKSQ.zytz=='4'}">木工</c:if><c:if test="${gRJKSQ.zytz=='5'}">瓦工</c:if><c:if test="${gRJKSQ.zytz=='6'}">电器维修</c:if><c:if test="${gRJKSQ.zytz=='7'}">汽车维修</c:if><c:if test="${gRJKSQ.zytz=='8'}">经商</c:if><c:if test="${gRJKSQ.zytz=='9'}">运输</c:if><c:if test="${gRJKSQ.zytz=='10'}">其它</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-9" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">居住地址</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.jzdz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">居住状况</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.jzzk=='1'}">自置</c:if><c:if test="${gRJKSQ.jzzk=='2'}">按揭</c:if><c:if test="${gRJKSQ.jzzk=='3'}">亲属楼宇</c:if><c:if test="${gRJKSQ.jzzk=='4'}">集体宿舍</c:if><c:if test="${gRJKSQ.jzzk=='5'}">租房</c:if><c:if test="${gRJKSQ.jzzk=='6'}">共有住宅</c:if><c:if test="${gRJKSQ.jzzk=='7'}">其它</c:if><c:if test="${gRJKSQ.jzzk=='8'}">未知</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">居住状态</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.jzzt=='1'}">长住</c:if><c:if test="${gRJKSQ.jzzt=='2'}">选临时</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">居住地邮政编码</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.jzdyzbm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要经营项目</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.zyjyxm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要经济来源</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.zyjjly}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">其他经济来源</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.qtjjly}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">个人综合年收入</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.grzhnsr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">家庭人均年收入</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.jtrjnsr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">家庭年均支出</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${gRJKSQ.jtnjzc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-3" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要供养人口</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.zygyrk=='1'}">0人</c:if><c:if test="${gRJKSQ.zygyrk=='2'}">1人</c:if><c:if test="${gRJKSQ.zygyrk=='3'}">2人</c:if><c:if test="${gRJKSQ.zygyrk=='4'}">3人</c:if><c:if test="${gRJKSQ.zygyrk=='5'}">4人以上</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">与我社关系</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.ywsgx=='1'}">密切</c:if><c:if test="${gRJKSQ.ywsgx=='2'}">一般</c:if><c:if test="${gRJKSQ.ywsgx=='3'}">较少</c:if></p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-6" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">是否个体工商户</label>
				  	<div class="fr-form-block">
			<p class="form-control-static"><c:if test="${gRJKSQ.sfgtgsh=='1'}">是</c:if><c:if test="${gRJKSQ.sfgtgsh=='2'}">否</c:if></p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>	
			<hr>
			<c:if test = "${gRJKSQ.sfgtgsh=='1'}">
			<hr>
			<center><p style="font-size:24px;"><stronger>个体工商户信息</stronger></p></center>	<hr>
			<iframe id="iframe1"  name="iframe1"  width="100%" height="330px" frameborder=no  border=0  marginwidth=0  marginheight=0  scrolling=no  src="${ctx}/loanp/GTGSHXX/gTGSHXX/get.htm?sfid=${sfid}"></iframe></c:if>
			<hr>
			<c:if test = "${gRJKSQ.sfgtgsh=='2'}">
					<hr>
			<center><p style="font-size:24px;"><stronger>职业信息</stronger></p></center>	<hr>
			<iframe id="iframe1"  name="iframe1"  width="100%" height="320px" frameborder=no  border=0  marginwidth=0  marginheight=0  scrolling=no  src="${ctx}/loanp/ZYXX/zYXXB/get.htm?sfid=${sfid}"></iframe></c:if>
					<hr>
			<center><p style="font-size:24px;"><stronger>个人工作履历信息</stronger></p></center>
				<hr>
		<iframe id="iframe2"  name="iframe2"  width="100%" height="200px" frameborder=no  border=0  marginwidth=0  marginheight=0  scrolling=no src="${ctx}/loanp/GRGZLL/gRGZLL/get.htm?sfid=${sfid}"></iframe>	
			<hr><c:if test="${gRJKSQ.hyzk=='2'}">
			<hr>
			<center><p style="font-size:24px;"><stronger>配偶的个人工作履历信息</stronger></p></center>	<hr>
		<iframe id="iframe3"  name="iframe2"  width="100%" height="400px" frameborder=no  border=0  marginwidth=0  marginheight=0  scrolling=no src="${ctx}/loanp/POXX/pOXX/get.htm?sfid=${sfid}"></iframe></c:if>	
			
			</c:if>
			
					<c:if test = "${gRJKSQ.khmc==无 }">
					<center>
					<p><strong>未有该客户个人信息，请点击添加.....</strong></p>
					<a class="btn btn-primary fa fa-add"   href="${ctx}/loanp/GRJKSQSP/gRJKSQ/edit.htm?sfid=${sfid}" ><span>添加</span></a>
					</center>				
					</c:if>


		</div>


			<input type="hidden"  id="sfid" value="${sfid}">
		
			<input type="hidden"  id="id" value="${id}">
	</body>
</html>
