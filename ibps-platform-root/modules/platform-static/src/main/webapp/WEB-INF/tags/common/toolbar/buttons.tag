<%@tag pageEncoding="UTF-8"%>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div class="toolbar-head clearfix">
	<!-- 顶部按钮 -->
	<div class="buttons">
		<jsp:doBody/>  
	</div>
	<!-- 收缩 -->
	<div class="tools">
		<a href="javascript:void(0);" class="collapse"> <i
			class="bigger-180 fa  fa-angle-double-up"></i>
		</a>
	</div>
</div>