<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="f"   uri="http://www.bpmhome.cn/functions" %>
<%@taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<meta name="renderer" content="webkit">
<!-- 移动设备 viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
<!-- css -->
<f:link href="bootstrap/bootstrap.min.css" />
<f:link href="font-awesome/font-awesome.min.css" />
<f:link href="animate/animate.css" />
<f:link href="openSans.css" />
<f:link href="jqgrid/ui.jqgrid.css" />
<f:link href="qtip/jquery.qtip.css"/>
<f:link href="style.css" isCommon="false"/>
<!--[if lte IE 9]>
	<f:link href="style-ie.css" isCommon="false"/>
<![endif]-->
<f:link href="dropdown/dropdown.css" />
<!-- js -->
<script type="text/javascript" src="${ctx}/js/dynamic.jsp"></script>

<script type="text/javascript" src="${ctx}/js/plugins/require/require.min.js"></script>

<script type="text/javascript">
	jqPath 	= '${ctx}/js/plugins/jquery/jquery.min';
	IE8		= false;
</script>

<!--[if IE]>
<script type="text/javascript">
	jqPath = '${ctx}/js/plugins/jquery/jquery1x.min';
</script>
<![endif]-->

<!--[if lte IE 8]>
<script type="text/javascript">
	IE8 = true;
</script>
<![endif]-->

<script type="text/javascript">
	require_base_config = {
		/* map: {
			'*': {
			  css: '${ctx}/styles/commons'
			}
		}, */
		shim: {
			'jquery' : {
	            exports: 'jquery'
	        },
	        'laydialog' : {
	            deps: ['jquery'],
	            exports: 'Laydialog'
	        },
	        'bootstrap' : {
	            deps: ['jquery'/* ,'css!../../../styles/commons/css/bootstrap/bootstrap.min' */],
	            exports: 'Bootstrap'
	        },
	        'jquery.form' : {
	        	deps: ['jquery'],
	        	exports: 'jqueryForm'
	        },
	        'jquery.qtip' : {
	        	deps: ['jquery'],
	        	exports: 'jqueryQtip'
	        },
	        'qtip' : {
	            deps: ['jquery'],
	            exports: 'Qtip'
	        },
	        'util' : {
	            deps: ['jquery'],
	            exports: 'Util'
	        },
	        'valid' : {
	            exports: 'Valid'
	        },
	        'const.util' : {
	            deps: ['jquery'],
	            exports: 'ConstUtil'
	        },
	        'form' : {
	            deps: ['jquery'],
	            exports: 'Form'
	        },
	        'dialog.util' : {
	            deps: ['jquery'],
	            exports: 'DialogUtil'
	        },
	        'custom.valid' : {
	            deps: ['jquery'],
	            exports: 'CustomValid'
	        },
	        'custom.valid.ext' : {
	            deps: ['jquery'],
	            exports: 'CustomValidExt'
	        },
	        'json2' : {
	            deps: ['jquery'],
	            exports: 'Json2'
	        },
	        'wdate.picker' : {
	            exports: 'WdatePicker'
	        },
	        'my97.date.picker.util' : {
	            deps: ['jquery'],
	            exports: 'My97DatePickerUtil'
	        },
	        'datetime.picker.util' : {
	            exports: 'DatetimepickerUtil'
	        },
	        'chinese.pinyin' : {
	        	deps: ['jquery'],
	            exports: 'ChineseToPinyin'
	        },
	        'html5shiv' : {
	        	exports: 'Html5shiv'
	        },
	        'respond' : {
	        	exports: 'Respond'
	        }
		},
		paths : {
			'css'					: __ctx + '/js/plugins/require/css.min',
			'jquery' 				: jqPath,
			'laydialog' 			: __ctx + '/js/plugins/layer/laydialog.min',
			'bootstrap' 			: __ctx + '/js/plugins/bootstrap/bootstrap.min',
			'jquery.form' 			: __ctx + '/js/plugins/jquery/plugins/jquery.form',
			'jquery.qtip' 			: __ctx + '/js/plugins/qtip/jquery.qtip',
			'qtip' 					: __ctx + '/js/lc/commons/utils/qtip',
			'util' 					: __ctx + '/js/lc/commons/utils/util',
			'valid' 				: __ctx + '/js/lc/commons/utils/valid',
			'const.util' 			: __ctx + '/js/lc/commons/utils/ConstUtil',
			'form' 					: __ctx + '/js/lc/commons/utils/form',
			'dialog.util' 			: __ctx + '/js/lc/commons/utils/DialogUtil',
			'custom.valid' 			: __ctx + '/js/lc/commons/utils/CustomValid',
			'custom.valid.ext' 		: __ctx + '/js/lc/commons/utils/CustomValidExt',
			'json2' 				: __ctx + '/js/plugins/json/json2.min',
			'wdate.picker' 			: __ctx + '/js/plugins/My97DatePicker/WdatePicker',
			'my97.date.picker.util' : __ctx + '/js/lc/commons/utils/My97DatePickerUtil',
			'datetime.picker.util' 	: __ctx + '/js/lc/commons/utils/DatetimepickerUtil',
			'chinese.pinyin' 		: __ctx + '/js/lc/commons/utils/ChineseToPinyin',
			'html5shiv' 			: __ctx + '/js/plugins/ieonly/html5shiv.min',
			'respond' 				: __ctx + '/js/plugins/ieonly/respond.min'
		}
	}
</script>
