package com.lc.ibps.platform.ds.controller;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.ds.persistence.entity.DataSourceDefPo;
import com.lc.ibps.common.ds.persistence.entity.DataSourcePo;
import com.lc.ibps.common.ds.persistence.service.DataSourceDefSetService;
import com.lc.ibps.common.ds.persistence.service.DataSourceSetService;

/**
*【系统数据源管理】  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2015-11-06 11:38:42
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/ds/dataSource/")
public class DataSourceController extends GenericController{
	@Resource
	private DataSourceSetService dataSourceSetService;
	@Resource
	private DataSourceDefSetService dataSourceDefService;
	
	/**
	 *【系统数据源管理】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DataSourcePo> dataSourceList=(PageList<DataSourcePo>)dataSourceSetService.query(queryFilter);
		return new PageJson(dataSourceList);
	}
	
	/**
	 * 编辑【系统数据源管理】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String alias=RequestUtil.getString(request, "alias");
		DataSourcePo dataSource = null;
		String variableJson = null;
		
		if (StringUtil.isNotEmpty(alias)) {
			dataSource=dataSourceSetService.getByAlias(alias);
			if(BeanUtils.isNotEmpty(dataSource)){
				Map<String, Object> param = dataSource.getParam();
				if(BeanUtils.isNotEmpty(param)){
					String variableDefJson = (String) param.get("variableDefJson");
					param.put("variableDefJson", StringEscapeUtils.escapeHtml(variableDefJson));
				}
				variableJson = JsonUtil.getJSONString(dataSource.getVariables());
			}
		}
		DataSourceDefPo dataSourceDef = dataSourceDefService.getActivate();
		List<String>aliasList = dataSourceSetService.getAllAlias();
		String aliasJson = JsonUtil.getJSONString(aliasList);
		
		return getAutoView()
					.addObject("dataSource", dataSource)
					.addObject("dataSourceDef", dataSourceDef)
					.addObject("aliasJson", aliasJson)
					.addObject("variableJson", variableJson)
					.addObject("returnUrl", preUrl);
	}
	
	
	/**
	 *【系统数据源管理】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String alias = RequestUtil.getString(request, "alias");
		DataSourcePo dataSource=null;
		String paramJson ="";
		if(StringUtil.isNotEmpty(alias)){
			dataSource = dataSourceSetService.getByAlias(alias);
			if(BeanUtils.isNotEmpty(dataSource)){
				Map<String, Object> param = dataSource.getParam();
				if(BeanUtils.isNotEmpty(param)){
					String variableDefJson = (String) param.get("variableDefJson");
					String variableDefStr = StringEscapeUtils.unescapeHtml(variableDefJson);
					param.put("variableDefJson", variableDefStr);
					paramJson = JsonUtil.getJSONString(dataSource.getParam());
				}
			}
		}
		
		return getAutoView()
				.addObject("dataSource", dataSource)
				.addObject("paramJson", paramJson)
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【系统数据源管理】信息
	 *
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,DataSourcePo dataSource) throws Exception{
		String resultMsg=null;
		String oldAlias = RequestUtil.getString(request, "oldAlias");
		String variableJson = RequestUtil.getString(request, "variableJson");
		String paramJson = RequestUtil.getString(request, "paramJson");
		Map<String, Object> variableMap = JsonUtil.getMapFromJson(variableJson);
		Map<String, Object> paramMap = JsonUtil.getMapFromJson( paramJson);
		try {
			dataSource.setVariables(variableMap);
			dataSource.setParam(paramMap);
			dataSourceSetService.save(dataSource,oldAlias);
			if(StringUtil.isEmpty(oldAlias)){
				resultMsg="添加【系统数据源管理】成功";
			}else{
				resultMsg="更新【系统数据源管理】成功";
			}
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对【系统数据源管理】操作失败";
			e.printStackTrace();
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	

	
	/**
	 *  批量删除【系统数据源管理】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] aliases=RequestUtil.getStringAryByStr(request, "alias");
			dataSourceSetService.removeByAliases(aliases);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除数据源成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除数据源失败");
			
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("reload")
	@ResponseBody
	public void reload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message=null;
		try {
			dataSourceSetService.reload();
			message=new ResultMessage(ResultMessage.SUCCESS, "重新加载成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "重新加载失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("checkConnection")
	@ResponseBody
	public void checkConnection(HttpServletRequest request,HttpServletResponse response,DataSourcePo dataSource) throws Exception{
		ResultMessage message=null;
		
		String alias=RequestUtil.getString(request, "alias");
 		String driver=RequestUtil.getString(request, "driver");
		String driverUrl=RequestUtil.getString(request, "driverUrl");
		String user=RequestUtil.getString(request, "user");
		String password=RequestUtil.getString(request, "password");
		String paramJson=RequestUtil.getString(request, "paramJson");
		String variableJson=RequestUtil.getString(request, "variableJson");
		try {
		
			Map<String, Object> param = JsonUtil.getMapFromJson(paramJson);
			Map<String, Object> variables = JsonUtil.getMapFromJson(variableJson);
			
			dataSource.setAlias(alias);
			dataSource.setDriver(driver);
			dataSource.setDriverUrl(driverUrl);
			dataSource.setUser(user);
			dataSource.setPassword(password);
			dataSource.setVariables(variables);
			dataSource.setParam(param);
			boolean check = dataSourceSetService.checkConnection(dataSource);
			if (check) {
				message=new ResultMessage(ResultMessage.SUCCESS, "测试链接成功");
			}else{
				message=new ResultMessage(ResultMessage.FAIL, "测试链接失败");
			}
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("setDefault")
	@ResponseBody
	public void setDefault(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String alias=RequestUtil.getString(request, "alias");
		try {
			dataSourceSetService.setDefault(alias);
			message=new ResultMessage(ResultMessage.SUCCESS, "设置为默认数据源成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "设置为默认数据源失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
