<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<head>
<title>选择子系统-IBPS</title>
<%@include file="/commons/include/login.jsp"%>
<f:link href="login.css"  isCommon="false"></f:link>

</head>

<body class=" login scroll-animations-activated">
        <!-- BEGIN LOGO -->
        <div class="logo">
            <div >IBPS 平台 </div>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content  animated bounceIn" data-animation="bounceIn">
            <!-- BEGIN LOGIN FORM -->
                <h3 class="form-title">选择子系统</h3>
                 <div class="subsystem-container">
	               		 <c:choose>
							<c:when test="${fn:length(subsystemList) > 0}">
								<c:forEach var="subSystemItem" items="${subsystemList}" varStatus="status">
								<div  class="subsystem
								<c:if test="${status.index %6 ==0 }">subsystem-green2</c:if>
								<c:if test="${status.index %6 ==1 }">subsystem-red</c:if>
								<c:if test="${status.index %6 ==2 }">subsystem-brown</c:if>
								<c:if test="${status.index %6 ==3 }">subsystem-green</c:if>
								<c:if test="${status.index %6 ==4 }">subsystem-black</c:if>
								<c:if test="${status.index %6 ==5 }">subsystem-light</c:if>" 
									onClick="javascript:seletSystem('${subSystemItem.id}')"  title="${subSystemItem.name}">
										<div class="subsystem-icon">
											<c:choose>
												<c:when test="${subSystemItem.logoType == 'image'}"><img alt="子系统图标" src="${ctx }/styles/commons/images/logo/${subSystemItem.logo}" class="ibps-image" width="40px" height="40px"/></c:when>
												<c:otherwise> <i class="ibps-icon fa ${subSystemItem.logo}"></i></c:otherwise>
											</c:choose>
										</div>
										<div class="subsystem-data">${subSystemItem.name}</div>
								</div>	
								
									</c:forEach>
							</c:when>
							<c:otherwise>
								<h2>您当前没有访问任何系统的权限,请联系系统管理员！</h2>
							</c:otherwise>
						</c:choose>
                </div>
                     <div class="form-actions">
                 <c:if test="${cookie.origSwitch!=null}">
			                  <button type="button" class="btn  btn-info   switch">
			                    <i class="fa fa-share-square-o"></i> <span class="bigger-110">
			                      退出切换</span>
			                  </button> 
		          </c:if>
	         		 <button type="button" class="btn  btn-primary pull-right logout">
		                    <i class="fa  fa-sign-out"></i>&nbsp;注&nbsp;&nbsp;&nbsp;&nbsp;销
	                  </button>
	           </div>
             </div>
              
         </div>
     <div class="copyright"> 2015-2018&copy; <a herf="http://t.cn/REYNcgu" target="_blank">哈尔滨工程大学</a> - All Rights Reserved. </div>


</body>
<script type="text/javascript">
	function seletSystem(systemId) {
		window.location.href = "${ctx}/platform/console/saveCurrSys.htm?systemId="
				+ systemId;
	};

	jQuery(function($) {
		var num = Math.random()*10 + 1,
			 images=[],path ="${ctx}/styles/commons/images/login/";
			 num = parseInt(num, 10);
		for (var i = 0; i < 10; i++) {
			images.push(path+num+".jpg");
			num++
			if(num >10) num =1;
		}
	    $.backstretch(images, {
   		          fade: 1000,
    		      duration: 1000
   		    	}
           	);
		$(document).on('click', '.logout', function(e) {
			window.location.href = "${ctx}/logout.htm";
		});
		$(document).on('click','.switch',
						function(e) {
							window.location.href = "${ctx}/j_spring_security_exit_user?j_username=${cookie.origSwitch.value}";
						});
	});
</script>
</html>
