<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<script type="text/javascript" src="${ctx}/js/lc/lyzygl/XiaoBan/xiaoBan.js"></script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
			<div class="panel-toolbar ">
				<div class="buttons">
					<a class="btn btn-primary fa fa-back" href="${returnUrl}" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
					<form  class="fr-form"  id="xiaoBanFormGet" >
				 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">idd</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.idd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林班号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.lbh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">小班号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.xbh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">二级林种</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ejlz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">二级林种1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ejlz1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">二级林种2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ejlz2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地类</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.dl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地类1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.dl1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地权</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.dq}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林权</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.lq}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">起源</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.qy}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">面积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.mj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">株数</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.zs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">蓄积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.xj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">龄组</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.lz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林分类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.lflx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">树种组成</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.szzc}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">郁闭度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ybd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经营措施</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.jycs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">龄级</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.lj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林龄</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ll}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">胸径</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.xiongjing}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">树高</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.sg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地权使用权</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.dqsyq}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林权使用权</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.lqsyq}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工程类别</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.gclb}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">土壤</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.tr}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">自然度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.zrd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.bz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">群落结构</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.qljg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">立地类型</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ldlx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">优势木平均高</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ysspjg}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地貌</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.dm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">枯倒木蓄积量</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.kdmxjl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要下木</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.zyxm}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">下木盖度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.xmgd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要地被物</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.zydbw}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地被物盖度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.dbwgd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">坡向</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.px}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">坡位</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.pw}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">坡度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.pd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">A1层厚度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.a1chd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">海拔</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.hb}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">疏密度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.smd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抚育采伐年度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.fycfnd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">造林更新年度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.zlgxnd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公顷株数</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.gqzs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公顷蓄积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.gqxj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公顷初植密度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.gqczmd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人工林保存率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.rglbcl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">平均木单株材积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.pjmdzcj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">散生木株数</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ssmzs}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">散生木蓄积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ssmxj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">散生木平均胸径</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ssmpjxj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">导入校验</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.drjy}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">导入校验提示1</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.drjyts1}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">导入校验提示2</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.drjyts2}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">导入校验提示3</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.drjyts3}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">树种组成排序</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.szzcpx}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">GPS横坐标</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.gpshzb}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">GPS纵坐标</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.gpszzb}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">土壤Ab层厚度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.trabchd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">生长率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.szl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">枯损量</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ksl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">生长量</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.szliang}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">非正常消耗量</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.fzcxhl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位编号</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.dwbh}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">散生木生长率</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ssmszl}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">管护费亩标准</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ghfmbz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林下收入分成亩标准</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.lxsrfcmbz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">性质年度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.xznd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">管护造林面积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ghzlmj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">管护抚育面积</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.ghfymj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">可及度</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.kjd}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地位级</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.dwj}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">事权</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.sq}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工程性质</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.gcxz}</p>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保护等级</label>
				  	<div class="fr-form-block">
			<p class="form-control-static">${xiaoBan.bhdj}</p>
				 	</div>
			  	</div>
			</div>
	</form>

			</div>
		</div>
	</body>
</html>
