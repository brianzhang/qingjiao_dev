<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html" %>
<html>
	<head>
		
	
		<style type="text/css">
			.panel-toolbar{
				text-align:center;
			}
			.importantToolbox{
			display:none;
			}	
			
/* 	.left{  
        width:200px;height:100%;  
        display:inline-block;
          
    }
    .center{  
        width:400px;height:100%;  
         
        display:inline-block;
    }
    .right{  
       display:inline-block; 
         
    } */
    


    
    											
		</style>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/commons/page/codegen.jsp" %>
		<link rel=stylesheet href="${ctx}/js/lc/repairp/data/star/star-rating.min.css" />
		<script type="text/javascript" src="${ctx}/js/lc/repairp/repair/bxd.js"></script>
		<script type="text/javascript" src="${ctx}/js/lc/repairp/data/star/star-rating.min.js"></script>
		<script type="text/javascript">
			$(function(){
				
				
			})
			
			
			/* function getWorkType(){
				alert("getWorkType");
			} */
			
			function save(){
				alert("save");
				var pg = $("select.form-control.col-sm-12.selectOpt").val();
				if(pg=="已派工"){
					var wxgList = $("div.fr-selector");
					if(wxgList.attr("data-bind-id") =="m:bxd:"){
						var wxg = $("div.fr-selector").find("span").text();
					}
					
					
				}else if(pg=="多人派工"){
					var len = $("ul.selector-list").children("li").length;
					var wxg = '';
					for(var i=0;i<len;i++){
						var  wxgName = $("ul.selector-list").find("li").eq(i).find("span").text();
						wxg +=wxgName+" ";
					}
				}else if(pg == "已转单"){
					var shy = $("div.fr-selector").find("span").text();
					
				}
				
				alert("wxg:"+wxg);
				var form = $("#bxdForm");
				var bxdData = form.serialize();
				$.ajax({
					type:"POST",
					url:  wxg? "${ctx}/repairp/repair/bxd/save.htm?wxg="+wxg:"${ctx}/repairp/repair/bxd/save.htm?shy="+shy,
					data: bxdData,
					success:function(data){
						if(data == "success"){
							alert("success");
							var layer = window.parent.DialogUtil.closeAll();
							window.location.href = "${ctx}/repairp/repair/bxd/list.htm";
							//var url = '${ctx}/repairp/repair/bxd/list.htm?';
							//window.parent.$("#listFrame").attr("src",url);
						}
					}
				});
			}
			
			
			
		</script>
	</head>
	<body>
		<!-- 顶部按钮 -->
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-4">			
				<h3>工单流程</h3>
			 	<c:forEach var="bxzt"   items="${bxztList}"   varStatus="status" >
				<dl class="finsh">
				<dt>
					<i></i>
					<h4>${bxzt.bxdState} </h4>
					<em>${bxzt.createTime}</em>
				</dt>
				<dd>
					<p>
						<i></i>
						处理人：${bxzt.clr}
					</p>
					<p>
						<i></i>
						派工对象：${bxzt.pgdx}
					</p>
					<p>
						<i></i>
						备注：${bxzt.beiZhu}
					</p>
				</dd>   				      
				</dl>                    
            	</c:forEach>           
		</div>
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-4">			
			<div class="">
				<h3>基本信息</h3>
				<form  class="fr-form"  id="bxdForm" action="save.htm" >
					<input type="hidden" name="m:bxd:id"  value="${bxd.id}"/>
					<input type="hidden" name="gdzt" value="${gdzt}" id="gdzt"/>
					<input type="text" name="roleName" value="${roleName}" id="roleName"/>	
					<input type="text" name="isFinish" value="${isFinish}" id="isFinish"/>
										
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">报修区域</label>
				  	<div class="fr-form-block">
				 <input type="hidden" id="bxqy" name="m:bxd:bxqy"  value="${bxd.bxqy}"/>
				<input type="text" readonly="readonly" name="bxqy"  class="fr-form-control comboTree"
						 data-toggle="dictionary"   data-dic="bxqy" data-key="#bxqy"
		                 value="${f:getDictLabel(bxd.bxqy,'bxqy', 'key', '')}"  validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			
			
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">详细地址</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bxd:xxdz" value="${bxd.xxdz}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">报修项目</label>
				  	<div class="fr-form-block">
				 <input type="hidden" id="bxxm" name="m:bxd:bxxm"  value="${bxd.bxxm}"/>
				<input type="text" readonly="readonly" name="bxxm"  class="fr-form-control comboTree"
						 data-toggle="dictionary"   data-dic="bxxm" data-key="#bxxm"
		                 value="${f:getDictLabel(bxd.bxxm,'bxxm', 'key', '')}"  validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">报修详细</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bxd:bxxx" value="${bxd.bxxx}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">预约时间</label>
				  	<div class="fr-form-block">
				 <input type="hidden" id="yysj"  name="m:bxd:yysj"   value="${bxd.yysj}" />
				 <input type="text" readonly="readonly" name="yysj"  class="fr-form-control comboTree"
						 data-toggle="dictionary"   data-dic="bxsj" data-key="#yysj"
		                 value="${f:getDictLabel(bxd.yysj,'bxsj', 'key', '')}" validate="{required:false}" /> 
				 	</div>
			  	</div>
			</div>
			 	<%-- <div class="fr_response_field col-sm-12" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">报修人</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bxd:bxr" value="${bxd.bxr}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div> --%>
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">联系方式</label>
				  	<div class="fr-form-block">
				<input type="text" class="fr-form-control" name="m:bxd:lxfs" value="${bxd.lxfs}" validate="{required:false}"/>
				 	</div>
			  	</div>
			</div>
			 	<div class="fr_response_field col-sm-4" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">上传图片</label>
				  	<div class="fr-form-block">
				<div name="div_attachment_container" data-media=""   data-media_type=""  data-max_file_size=""   data-max_file_quantity="-1">
					<div class="fr-files" ></div>
					<textarea style="display: none"   data-control="attachment"  name="m:bxd:sctp"  validate="{required:false}">${bxd.sctp}</textarea>
				</div>
				 	</div>
			  	</div>
			</div>
					<input type="hidden" class="fr-form-control" name="m:bxd:gdlx" value="${bxd.gdlx}" validate="{required:false}"/>
					<input type="hidden" class="fr-form-control" name="m:bxd:gdzt" value="${bxd.gdzt}" validate="{required:false}"/>
					<%-- <input type="hidden" class="fr-form-control" name="m:bxd:slr" value="${bxd.slr}" validate="{required:false}"/> --%>
					<input type="hidden" class="fr-form-control" name="m:bxd:zxr" value="${bxd.zxr}" validate="{required:false}"/>
					<%-- <input type="hidden" class="fr-form-control" name="m:bxd:wxg" value="${bxd.wxg}" validate="{required:false}"/> --%>
					<input type="hidden" class="fr-form-control" name="m:bxd:mbid" value="${bxd.mbid}" validate="{required:false}"/>
					
			<HR>
			<br>
			<div class="gdcz">
			<div class="fr_response_field col-sm-4 gdcz" id="gdczDiv" >
			<div class="fr-form-group"> 
				<label class="fr-control-label">工单操作</label>
				<div class="fr-form-block">
				<select class="form-control col-sm-4 selectOpt" name="gdcz" id="gdcz">
					<option value="0">请选择</option>
  					<option value="已受理">受理</option>
  					<option value="已派工">派工</option>
  					<option value="已接单">接单</option>
  					<option value="已完工">完工</option>
  					<option value="已退回">退回</option>
  					<option value="已暂停">暂停</option>
  					<option value="已转单">转单</option>
  					<option value="多人派工">多人派工</option>
				</select>
				</div>
				<hr>
			</div>
		</div>	
				
		<div class="fr_response_field col-sm-4 wxg" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">维修工</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bxd:"  data-single="true">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:bxd:wxg" >${bxd.wxg}</textarea>
				 </div>
				 	</div>
			  	</div>
		</div> 
		
		<div class="fr_response_field col-sm-4 wxgs" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">维修工</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bxd:"  data-single="false">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:bxd:wxgs" >${bxd.wxg}</textarea>
				 </div>
				 	</div>
			  	</div>
			</div>	
			
			
			<div class="fr_response_field col-sm-4 shy" >
			 	<div class="fr-form-group"> 
				 	<label class="fr-control-label">审核员</label>
				  	<div class="fr-form-block">
				<div class="fr-selector" data-toggle="selector" data-type="user" data-bind-id="m:bxd:"  data-single="">
					<ul class="selector-list"></ul>
					<textarea style="display: none"   data-control="selector"  name="m:bxd:slr" ></textarea>
				 </div>
				 	</div>
			  	</div>
			</div>	
			  	
			 <div class="fr_response_field col-sm-4 bz" >
			  	<div class="fr-form-group"> 
				 	<label class="fr-control-label">备注</label>
				  		<div class="fr-form-block">							
							<textarea class="fr-form-control" name="bz" rows="" cols=""></textarea>	
				 		</div>
			  	</div>
			</div> 
			
			
			
			
		</div>
		
				
			
</form>

			</div>
			
			
			<div class="panel-toolbar">
				<div class="buttons">
					<a href="javascript:void(0);" class="btn btn-primary fa" onclick="save()"><span>保存</span></a>
					<!-- <a href="list.htm" class="btn btn-primary fa fa-back" ><span>返回</span></a> -->
				</div>
			</div>
			
			
		</div>
		
		<div class="wrapper wrapper-content  animated fadeInRight col-sm-4">
		
			<div class="wrapper wrapper-content  animated fadeInRight col-sm-12 right">
			 <input id="input-21f" value="0" type="text" data-min=0 data-max=5 data-step=0.1 data-size="md" title="" name="star"/>
       		<div class="clearfix"></div>
       		<textarea rows="" cols="" name="pj" id="evaluate"></textarea>			
		</div>
		</div>
		
		</div>
		
		<script type="text/javascript">
		jQuery(document).ready(function () {
            $("#input-21f").rating({
                starCaptions: function (val) {
                    if (val < 3) {
                        return val;
                    } else {
                        return 'high';
                    }
                },
                starCaptionClasses: function (val) {
                    if (val < 3) {
                        return 'label label-danger';
                    } else {
                        return 'label label-success';
                    }
                },
                hoverOnClear: false
            });
            var $inp = $('#rating-input');

            $inp.rating({
                min: 0,
                max: 5,
                step: 1,
                size: 'lg',
                showClear: false
            });

            $('#btn-rating-input').on('click', function () {
                $inp.rating('refresh', {
                    showClear: true,
                    disabled: !$inp.attr('disabled')
                });
            });


            $('.btn-danger').on('click', function () {
                $("#kartik").rating('destroy');
            });

            $('.btn-success').on('click', function () {
                $("#kartik").rating('create');
            });

            $inp.on('rating.change', function () {
                alert($('#rating-input').val());
            });


            $('.rb-rating').rating({
                'showCaption': true,
                'stars': '3',
                'min': '0',
                'max': '3',
                'step': '1',
                'size': 'xs',
                'starCaptions': {0: 'status:nix', 1: 'status:wackelt', 2: 'status:geht', 3: 'status:laeuft'}
            });
            $("#input-21c").rating({
                min: 0, max: 8, step: 0.5, size: "xl", stars: "8"
            });
        });
		</script>
	</body>
</html>
