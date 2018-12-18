package com.lc.ibps.platform.rights.controller;


import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.common.rights.constants.RightsType;
import com.lc.ibps.api.common.rights.service.IRightsConfigMgrService;
import com.lc.ibps.api.common.rights.service.IRightsConfigService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.rights.helper.RightsUtil;
import com.lc.ibps.common.rights.persistence.entity.RightsConfigPo;

/**
* 权限配置  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-01-20 10:20:31
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/rights/rightsConfig/")
public class RightsConfigController extends GenericController{
	@Resource
	private IRightsConfigService rightsConfigService;
	@Resource
	private IRightsConfigMgrService rightsConfigMgrService;
	
	
	/**
	 * 权限配置列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		
		return this.getAutoView().addObject("rightsTypes",RightsUtil.getRightsTypeJSON()).addObject("rightsTypeList", RightsUtil.getRightsTypeList());
	}
	
	/**
	 * 权限配置列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String ownRights = RequestUtil.getString(request, "ownRights","");
		if(StringUtil.isNotEmpty(ownRights))
			queryFilter.addFilter("own_Rights_", "%"+ownRights+"%",QueryOP.LIKE);
		String listData = rightsConfigService.query(queryFilter);
		PageList<RightsConfigPo> rightsConfigList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<RightsConfigPo> list = RightsConfigPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			rightsConfigList = new PageList<RightsConfigPo>(list, pageResult);
		}
		return new PageJson(rightsConfigList);
	}
	
	/**
	 * 编辑权限配置信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		List<RightsType> 	 rightsTypeList = RightsUtil.getRightsTypeList();
		RightsConfigPo rightsConfig=null;
		if(StringUtil.isNotEmpty(id)){
			rightsConfig = RightsConfigPo.fromJsonString(rightsConfigService.get(id));
		}
		return getAutoView().addObject("rightsConfig", rightsConfig)
				.addObject("rightsTypeList",rightsTypeList)
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 权限配置明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		RightsConfigPo rightsConfig=null;
		if(StringUtil.isNotEmpty(id)){
			rightsConfig = RightsConfigPo.fromJsonString(rightsConfigService.get(id));
		}
		return getAutoView().addObject("rightsConfig", rightsConfig).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存权限配置信息
	 *
	 * @param request
	 * @param response
	 * @param  rightsConfig
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,RightsConfigPo po) throws Exception{
		String resultMsg=null;
		
		try {
			rightsConfigMgrService.save(po.toJsonString());
			resultMsg="保存权限配置成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			resultMsg="对权限配置操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除权限配置记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] aryIds=RequestUtil.getStringAryByStr(request, "id");
			rightsConfigMgrService.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除权限配置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除权限配置失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
