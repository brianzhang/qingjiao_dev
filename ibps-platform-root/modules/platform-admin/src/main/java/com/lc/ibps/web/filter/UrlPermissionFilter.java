package com.lc.ibps.web.filter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.servlet.HandlerMapping;

import com.lc.ibps.base.core.engine.script.GroovyScriptEngine;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.context.RequestContext;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.system.persistence.entity.UrlPermissionPo;
import com.lc.ibps.common.system.persistence.entity.UrlRulesPo;
import com.lc.ibps.common.system.repository.UrlPermissionRepository;
import com.lc.ibps.common.system.repository.UrlRulesRepository;

/**
 * URL访问拦截操作。
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015年12月23日-上午11:16:39
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class UrlPermissionFilter {
	@Resource
	private UrlPermissionRepository urlPermissionRepository;
	@Resource
	private UrlRulesRepository urlRulesRepository;
	@Resource
	private GroovyScriptEngine groovyScriptEngine;

	private static Map<UrlPermissionPo, List<UrlRulesPo>> permissionMap ;
	
	/**
	 * URL访问拦截操作
	 */
	public void doHandler() {
		if(permissionMap == null) initMap();
		if(BeanUtils.isEmpty(permissionMap)) return;
		HttpServletRequest request = RequestContext.getHttpServletRequest();
		String currentURI = request.getRequestURI();
		String ptht=request.getContextPath();
		String currURI = currentURI.replaceFirst(ptht, "");
		//获取当前请求的所有参数
		Map<String, Object> paramMap = RequestUtil.getParameterValueMap(request, true, true);
		// 获取@PathVariables参数，并加入到paramMap中
		@SuppressWarnings("unchecked")
		Map<String, Object> PathVariables = (Map<String, Object>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		if(BeanUtils.isNotEmpty(PathVariables)) paramMap.putAll(PathVariables);
		Map<String, Object> matchParams;
		Map<String, Object> map = new HashMap<String, Object>();
		for(UrlPermissionPo permission : permissionMap.keySet()){
			List<UrlRulesPo> rules = permissionMap.get(permission);
			PathMatchingResourcePatternResolver resourceLoader = new PathMatchingResourcePatternResolver();
			// 当前请求不匹配拦截的URL或者当前拦截规则脚本为空，则跳过
			if (!resourceLoader.getPathMatcher().match(permission.getUrl(),currURI)  || BeanUtils.isEmpty(rules)) continue;
			String paramString = permission.getParams();
			if (StringUtil.isEmpty(paramString)) {
				matchParams = paramMap;
			}else{
				matchParams = new HashMap<String, Object>();
				String[] params = paramString.split(",");
				// 配置了具体参数，获取匹配的参数
				for (String key : params) {
					Object value = paramMap.get(key);
					matchParams.put(key, value);
				}
				// 无参数匹配，则不拦截
				if(BeanUtils.isEmpty(matchParams)) continue ;
			}
			map.put("map", matchParams);
			for (UrlRulesPo rule : rules) {
				// 返回false则表示无权限
				if (!groovyScriptEngine.executeBoolean(rule.getScript(), map)) {
					throw new AccessDeniedException("对不起,你没有访问该页面的权限!");
				}
			}
		}
	}
	
	/**
	 * 从数据库中加载所有URL拦截规则
	 */
	private void initMap() {
		permissionMap = new ConcurrentHashMap<UrlPermissionPo, List<UrlRulesPo>>();
		//获取启用的拦截配置
		List<UrlPermissionPo> urlPermissionList = urlPermissionRepository.getAllByEnable("1");
		List<UrlRulesPo> urlRulesList;
		for (UrlPermissionPo urlPermission : urlPermissionList) {
			//获取启用的规则
			urlRulesList = urlRulesRepository.getAllByEnableAndPermId("1",urlPermission.getId());
			permissionMap.put(urlPermission, urlRulesList);
		}
	}
}
