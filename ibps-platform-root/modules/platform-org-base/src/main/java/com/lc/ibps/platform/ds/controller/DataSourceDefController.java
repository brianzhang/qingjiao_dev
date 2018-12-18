package com.lc.ibps.platform.ds.controller;


import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.ds.persistence.entity.DataSourceDefPo;
import com.lc.ibps.common.ds.persistence.entity.VariableDefPo;
import com.lc.ibps.common.ds.persistence.service.DataSourceDefSetService;

/**
* 【数据源定义】  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2015-11-06 11:38:43
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/ds/dataSourceDef/")
public class DataSourceDefController extends GenericController{
	@Resource
	private DataSourceDefSetService dataSourceDefSetService;
	
	/**
	 * 【数据源定义】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	@ResponseBody
	public  PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DataSourceDefPo> dataSourceDefList=(PageList<DataSourceDefPo>)dataSourceDefSetService.query(queryFilter);
		return new PageJson(dataSourceDefList);
	}
	
	/**
	 * 编辑ibps_DS_DATASOURCE_DEF【数据源定义】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String name=RequestUtil.getString(request, "name");
		DataSourceDefPo dataSourceDef=null;
		if(StringUtil.isNotEmpty(name)){
			dataSourceDef=dataSourceDefSetService.get(name);
		}
		List<String>nameList = dataSourceDefSetService.getAllName();
		String nameJson = JsonUtil.getJSONString(nameList);
//		List<String> allDefConfig =dataSourceDefService.getAllDefConfig();
		return getAutoView()
				.addObject("dataSourceDef", dataSourceDef)
				.addObject("nameJson", nameJson)
//				.addObject("allDefConfig", allDefConfig)
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * ibps_DS_DATASOURCE_DEF【数据源定义】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String name=RequestUtil.getString(request, "name");
		DataSourceDefPo dataSourceDef=null;
		if(StringUtil.isNotEmpty(name)){
			dataSourceDef=dataSourceDefSetService.get(name);
		}
	
		return getAutoView()
				.addObject("dataSourceDef", dataSourceDef)
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存ibps_DS_DATASOURCE_DEF【数据源定义】信息
	 *
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,DataSourceDefPo dataSourceDef) throws Exception{
		String resultMsg=null;
		String oldName = RequestUtil.getString(request, "oldName");
		String variables = RequestUtil.getString(request, "variables");
		List<VariableDefPo> variableDefList = JsonUtil.getDTOList(variables, VariableDefPo.class);
		try {
			dataSourceDef.setVariableDefs(variableDefList);
			dataSourceDefSetService.save(dataSourceDef,oldName);
			if(StringUtil.isNotEmpty(oldName)){
				resultMsg="数据源模板更新操作成功";
			}else {
				resultMsg="数据源模板新增操作成功";
			}
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="数据源模板操作失败";
			e.printStackTrace();
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除ibps_DS_DATASOURCE_DEF【数据源定义】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] names=RequestUtil.getStringAryByStr(request, "name");
			dataSourceDefSetService.removeByName(names);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除ibps_DS_DATASOURCE_DEF【数据源定义】成功");
		} catch (Exception e) {
			e.printStackTrace();
			message=new ResultMessage(ResultMessage.FAIL, "删除ibps_DS_DATASOURCE_DEF【数据源定义】失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("getParam")
	@ResponseBody
	public List<VariableDefPo> getParam(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return dataSourceDefSetService.getParam();
	}
	
	@RequestMapping("reload")
	@ResponseBody
	public void reload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg=null;
		try {
			dataSourceDefSetService.reload();
			writeResultMessage(response.getWriter(),resultMsg,"重新加载成功",ResultMessage.SUCCESS);
		} catch (Exception e) {
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	
}
