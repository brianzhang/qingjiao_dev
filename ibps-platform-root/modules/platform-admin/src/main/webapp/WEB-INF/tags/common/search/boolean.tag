<%@tag pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ attribute name="label" required="true" type="java.lang.String"%>
<%@ attribute name="name" required="true" type="java.lang.String"%>
<div class="form-group  ">
	<label class="search-label">${label}</label>: <select name="${name}"
		class="form-control search-select">
		<option value="">全部</option>
		<option value="Y">是</option>
		<option value="N">否</option>
	</select>
</div>