package com.lc.ibps.platform.rights.controller;


import java.util.Collections;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.common.rights.constants.RightsType;
import com.lc.ibps.api.common.rights.service.IRightsConfigService;
import com.lc.ibps.api.common.rights.service.IRightsDefMgrService;
import com.lc.ibps.api.common.rights.service.IRightsDefService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.rights.helper.RightsDefBuilder;
import com.lc.ibps.common.rights.persistence.entity.RightsDefPo;
import com.lc.ibps.common.rights.vo.RightsVo;

/**
* 权限定义  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-01-19 16:42:08
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/rights/rightsDef/")
public class RightsDefController extends GenericController{
	@Resource
	private IRightsDefService rightsDefService;
	@Resource
	private IRightsDefMgrService rightsDefMgrService;
	@Resource
	private IRightsConfigService rightsConfigService;
	/**
	 * 权限定义列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		
		String listData = rightsDefService.query(queryFilter);
		PageList<RightsDefPo> rightsDefList=null;
		if(JacksonUtil.isJsonObject(listData)){
			List<RightsDefPo> result = RightsDefPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			rightsDefList = new PageList<RightsDefPo>(result, pageResult);
		}
		
		return new PageJson(rightsDefList);
	}
	
	/**
	 * 编辑权限定义信息页面
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
		RightsDefPo rightsDef=null;
		if(StringUtil.isNotEmpty(id)){
			rightsDef = RightsDefPo.fromJsonString(rightsDefService.get(id));
		}
		return getAutoView().addObject("rightsDef", rightsDef).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 权限定义明细页面
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
		RightsDefPo rightsDef=null;
		if(StringUtil.isNotEmpty(id)){
			rightsDef = RightsDefPo.fromJsonString(rightsDefService.get(id));
		}
		return getAutoView().addObject("rightsDef", rightsDef).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存权限定义信息
	 *
	 * @param request
	 * @param response
	 * @param  rightsDef
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String resultMsg=null;
		String entityType = RequestUtil.getString(request, "entityType");
		String entityId = RequestUtil.getString(request, "entityId");
		String rights=RequestUtil.getString(request, "rights");

		try {
			rightsDefMgrService.save(entityType, entityId, rights);
			resultMsg="保存权限定义成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			resultMsg="对权限定义操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/** 
	 * 删除权限定义信息
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("removeRights")
	public void removeRights(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String resultMsg=null;
		String entityId = RequestUtil.getString(request, "entityId");
		String entityType = RequestUtil.getString(request, "entityType");
		String[] rightsIds = RequestUtil.getStringAryByStr(request, "rightsIds");
		String rightsType = RequestUtil.getString(request, "rightsType");
		logger.info(entityId+":"+entityType+":"+rightsIds+":"+rightsType);
		try {
			ResultMessage resultMessage = null;
			if(BeanUtils.isEmpty(entityId)
					|| BeanUtils.isEmpty(entityType)
					|| BeanUtils.isEmpty(rightsIds)
					|| BeanUtils.isEmpty(rightsType)){
		
				resultMessage = new ResultMessage(ResultMessage.FAIL, "权限重置失败,参数不足！");
			}else{
				RightsVo vo = new RightsVo(entityId, entityType, rightsIds, rightsType);
				rightsDefMgrService.removeRights(JacksonUtil.toJsonString(vo));
				resultMessage = new ResultMessage(ResultMessage.SUCCESS, "权限重置成功！");
			}
			writeResultMessage(response.getWriter(), resultMessage);
		} catch (Exception e) {
			resultMsg = "权限定义操作失败，"+e.getMessage();
			logger.error(resultMsg, e);
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除权限定义记录
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
			rightsDefMgrService.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除权限定义成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除权限定义失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	/**
	 *  对话框
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("dialog")
	public ModelAndView dialog(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String entityType = RequestUtil.getString(request, "key");
		String entityId = RequestUtil.getString(request, "entityId");
		String rightsDefJson =  "";
		if(StringUtil.isNotEmpty(entityId)){
			List<RightsDefPo> rightsDefList = 
					RightsDefPo.fromJsonArrayString(rightsDefService.getByTypeId(entityType,entityId));
			rightsDefJson =RightsDefBuilder.build(rightsDefList);
		}

		List <RightsType> rightsTypeList = null;
		
		String listData = rightsConfigService.findRightsTypeByKey(entityType);
		if (!JacksonUtil.isJsonArray(listData)) {
			rightsTypeList = Collections.emptyList();
		}
		rightsTypeList = JacksonUtil.getDTOList(listData, RightsType.class);
		
		return getAutoView()
				.addObject("entityId",entityId)
				.addObject("entityType",entityType)
				.addObject("rightsDefJson",rightsDefJson)
				.addObject("rightsTypeList", rightsTypeList);
	}
	
}
