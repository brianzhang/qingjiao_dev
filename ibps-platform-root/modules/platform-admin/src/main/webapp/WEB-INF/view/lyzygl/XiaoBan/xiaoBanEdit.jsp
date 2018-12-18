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
					<a href="javascript:void(0);" class="btn btn-primary fa fa-save" ><span>保存</span></a>
					<a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a>
				</div>
			</div>
			<div class="">
				<form  class="fr-form"  id="xiaoBanForm" action="save.htm" >
					<input type="hidden" name="m:xiaoBan:id"  value="${xiaoBan.id}"/>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">idd</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:idd" value="${xiaoBan.idd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林班号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:lbh" value="${xiaoBan.lbh}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">小班号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:xbh" value="${xiaoBan.xbh}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">二级林种</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ejlz" value="${xiaoBan.ejlz}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">二级林种1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ejlz1" value="${xiaoBan.ejlz1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">二级林种2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ejlz2" value="${xiaoBan.ejlz2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地类</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:dl" value="${xiaoBan.dl}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地类1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:dl1" value="${xiaoBan.dl1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地权</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:dq" value="${xiaoBan.dq}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林权</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:lq" value="${xiaoBan.lq}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">起源</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:qy" value="${xiaoBan.qy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">面积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:mj" value="${xiaoBan.mj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">株数</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:zs" value="${xiaoBan.zs}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">蓄积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:xj" value="${xiaoBan.xj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">龄组</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:lz" value="${xiaoBan.lz}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林分类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:lflx" value="${xiaoBan.lflx}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">树种组成</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:szzc" value="${xiaoBan.szzc}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">郁闭度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ybd" value="${xiaoBan.ybd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">经营措施</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:jycs" value="${xiaoBan.jycs}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">龄级</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:lj" value="${xiaoBan.lj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林龄</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ll" value="${xiaoBan.ll}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">胸径</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:xiongjing" value="${xiaoBan.xiongjing}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">树高</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:sg" value="${xiaoBan.sg}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地权使用权</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:dqsyq" value="${xiaoBan.dqsyq}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林权使用权</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:lqsyq" value="${xiaoBan.lqsyq}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工程类别</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:gclb" value="${xiaoBan.gclb}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">土壤</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:tr" value="${xiaoBan.tr}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">自然度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:zrd" value="${xiaoBan.zrd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:bz" value="${xiaoBan.bz}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">群落结构</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:qljg" value="${xiaoBan.qljg}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">立地类型</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ldlx" value="${xiaoBan.ldlx}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">优势木平均高</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ysspjg" value="${xiaoBan.ysspjg}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地貌</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:dm" value="${xiaoBan.dm}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">枯倒木蓄积量</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:kdmxjl" value="${xiaoBan.kdmxjl}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要下木</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:zyxm" value="${xiaoBan.zyxm}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">下木盖度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:xmgd" value="${xiaoBan.xmgd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">主要地被物</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:zydbw" value="${xiaoBan.zydbw}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地被物盖度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:dbwgd" value="${xiaoBan.dbwgd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">坡向</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:px" value="${xiaoBan.px}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">坡位</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:pw" value="${xiaoBan.pw}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">坡度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:pd" value="${xiaoBan.pd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">A1层厚度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:a1chd" value="${xiaoBan.a1chd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">海拔</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:hb" value="${xiaoBan.hb}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">疏密度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:smd" value="${xiaoBan.smd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">抚育采伐年度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:fycfnd" value="${xiaoBan.fycfnd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">造林更新年度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:zlgxnd" value="${xiaoBan.zlgxnd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公顷株数</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:gqzs" value="${xiaoBan.gqzs}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公顷蓄积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:gqxj" value="${xiaoBan.gqxj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">公顷初植密度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:gqczmd" value="${xiaoBan.gqczmd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">人工林保存率</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:rglbcl" value="${xiaoBan.rglbcl}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">平均木单株材积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:pjmdzcj" value="${xiaoBan.pjmdzcj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">散生木株数</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ssmzs" value="${xiaoBan.ssmzs}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">散生木蓄积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ssmxj" value="${xiaoBan.ssmxj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">散生木平均胸径</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ssmpjxj" value="${xiaoBan.ssmpjxj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">导入校验</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:drjy" value="${xiaoBan.drjy}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">导入校验提示1</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:drjyts1" value="${xiaoBan.drjyts1}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">导入校验提示2</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:drjyts2" value="${xiaoBan.drjyts2}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">导入校验提示3</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:drjyts3" value="${xiaoBan.drjyts3}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">树种组成排序</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:szzcpx" value="${xiaoBan.szzcpx}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">GPS横坐标</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:gpshzb" value="${xiaoBan.gpshzb}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">GPS纵坐标</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:gpszzb" value="${xiaoBan.gpszzb}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">土壤Ab层厚度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:trabchd" value="${xiaoBan.trabchd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">生长率</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:szl" value="${xiaoBan.szl}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">枯损量</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ksl" value="${xiaoBan.ksl}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">生长量</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:szliang" value="${xiaoBan.szliang}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">非正常消耗量</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:fzcxhl" value="${xiaoBan.fzcxhl}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">单位编号</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:dwbh" value="${xiaoBan.dwbh}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">散生木生长率</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ssmszl" value="${xiaoBan.ssmszl}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">管护费亩标准</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ghfmbz" value="${xiaoBan.ghfmbz}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">林下收入分成亩标准</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:lxsrfcmbz" value="${xiaoBan.lxsrfcmbz}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">性质年度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:xznd" value="${xiaoBan.xznd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">管护造林面积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ghzlmj" value="${xiaoBan.ghzlmj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">管护抚育面积</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:ghfymj" value="${xiaoBan.ghfymj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">可及度</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:kjd" value="${xiaoBan.kjd}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">地位级</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:dwj" value="${xiaoBan.dwj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">事权</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:sq" value="${xiaoBan.sq}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">工程性质</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:gcxz" value="${xiaoBan.gcxz}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">保护等级</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:xiaoBan:bhdj" value="${xiaoBan.bhdj}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
</form>

			</div>
		</div>
	</body>
</html>
