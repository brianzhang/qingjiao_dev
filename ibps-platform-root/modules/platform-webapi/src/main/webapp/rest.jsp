<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
  <meta charset="UTF-8">
  <title>WEBAPI文档:IBPS平台 -广州流辰信息技术有限公司</title>
<link rel="icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="${ctx}/commons/image/favicon.ico" type="image/x-icon" />
  <link href='${ctx }/styles/css/typography.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='${ctx }/styles/css/reset.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='${ctx }/styles/css/screen.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='${ctx }/styles/css/reset.css' media='print' rel='stylesheet' type='text/css'/>
  <link href='${ctx }/styles/css/print.css' media='print' rel='stylesheet' type='text/css'/>
  <script src="${ctx}/js/dynamic.jsp"  type="text/javascript" ></script>
  <script src='${ctx }/js/lib/jquery-1.8.0.min.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/jquery.slideto.min.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/jquery.wiggle.min.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/jquery.ba-bbq.min.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/handlebars-2.0.0.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/js-yaml.min.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/lodash.min.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/backbone-min.js' type='text/javascript'></script>
  <script src='${ctx }/js/swagger-ui/swagger-ui.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/highlight.7.3.pack.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/jsoneditor.min.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/marked.js' type='text/javascript'></script>
  <script src='${ctx }/js/lib/swagger-oauth.js' type='text/javascript'></script>

  <!-- Some basic translations -->
  <!-- <script src='lang/ru.js' type='text/javascript'></script> -->
  <!-- <script src='lang/en.js' type='text/javascript'></script> -->
  <script src='${ctx }/js/lang/translator.js' type='text/javascript'></script>
  <script src='${ctx }/js/lang/zh-cn.js' type='text/javascript'></script>
  

  <script type="text/javascript">
    $(function () {
      var url = window.location.search.match(/url=([^&]+)/);
      if (url && url.length > 1) {
        url = decodeURIComponent(url[1]);
      } else {
        //url = "${ctx}/api/swagger.json";
        url = "${ctx}/api/api-docs";
      }

      // Pre load translate...
      if(window.SwaggerTranslator) {
        window.SwaggerTranslator.translate();
      }
      window.swaggerUi = new SwaggerUi({
        url: url,
        dom_id: "swagger-ui-container",
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        onComplete: function(swaggerApi, swaggerUi){
          if(typeof initOAuth == "function") {
            initOAuth({
              clientId: "your-client-id",
              clientSecret: "your-client-secret-if-required",
              realm: "your-realms",
              appName: "your-app-name",
              scopeSeparator: ",",
              additionalQueryStringParams: {}
            });
          }

          if(window.SwaggerTranslator) {
            window.SwaggerTranslator.translate();
          }

          addApiKeyAuthorization();
        },
        onFailure: function(data) {
          log("Unable to Load SwaggerUI");
        },
        docExpansion: "none",
        jsonEditor: false,
        apisSorter: "alpha",
        defaultModelRendering: 'schema',
        showRequestHeaders: false
      });

      function addApiKeyAuthorization(){
        var key = encodeURIComponent($('#input_apiKey')[0].value);
        if(key && key.trim() != "") {
            var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization("api_key", key, "query");
            window.swaggerUi.api.clientAuthorizations.add("api_key", apiKeyAuth);
            log("added key " + key);
        }
      }

      $('#input_apiKey').change(addApiKeyAuthorization);

      // if you have an apiKey you would like to pre-populate on the page for demonstration purposes...
      /*
        var apiKey = "myApiKeyXXXX123456789";
        $('#input_apiKey').val(apiKey);
      */

      window.swaggerUi.load();

      function log() {
        if ('console' in window) {
          console.log.apply(console, arguments);
        }
      }
  });
  </script>
</head>

<body class="swagger-section">
<div id='header'>
  <div class="swagger-ui-wrap">
    <a id="logo"  href="http://swagger.io">swagger</a>
   <form id='api_selector'>
      <div class='input'><input placeholder="http://example.com/api" id="input_baseUrl" name="baseUrl" type="text"/></div>
      <div class='input'><input placeholder="api_key" id="input_apiKey" name="apiKey" type="text"/></div>
      <div class='input'><a id="explore" href="#" data-sw-translate>Explore</a></div>
    </form>
  </div>
</div>

<div id="message-bar" class="swagger-ui-wrap" data-sw-translate>&nbsp;</div>
<div id="swagger-ui-container" class="swagger-ui-wrap"></div>
</body>
</html>
