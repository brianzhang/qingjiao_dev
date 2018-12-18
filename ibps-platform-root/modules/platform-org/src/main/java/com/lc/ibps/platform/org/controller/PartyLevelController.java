package com.lc.ibps.platform.org.controller;


import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.service.IPartyLevelQueryService;
import com.lc.ibps.api.org.service.IPartyLevelService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.api.org.exception.OrgException;
import com.lc.ibps.org.party.persistence.entity.PartyLevelPo;

/**
* 参与者等级  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：huangchunyan
* 邮箱：3378340995@qq.com
* 日期：2016-08-04 10:02:33
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/org/partyLevel/")
public class PartyLevelController extends GenericController{
	
	@Resource
	private IPartyLevelQueryService partyLevelQueryService;
	@Resource
	private IPartyLevelService partyLevelService;
	
	/**
	 * 参与者等级列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyLevelController.listJson()--->params"+queryFilter.getParams());
		
		String listData = partyLevelQueryService.query(queryFilter);
		PageList<PartyLevelPo> partyLevelList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyLevelPo> result = PartyLevelPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyLevelList = new PageList<PartyLevelPo>(result, pageResult);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyLevelController.listJson()--->partyLevelList"
				+(partyLevelList!=null?Arrays.toString(partyLevelList.toArray()):"")
				);
		
		return new PageJson(partyLevelList);
	}
	
	/**
	 * 编辑参与者等级信息页面
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
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyLevelController.edit()--->preUrl="+preUrl+",id="+id);
		
		PartyLevelPo partyLevel=null;
		if(StringUtil.isNotEmpty(id)){
			String data = partyLevelQueryService.get(id);
			partyLevel = PartyLevelPo.fromJsonString(data);
		}
		
		PartyType[] types = new PartyType[]{PartyType.ORG, PartyType.POSITION};
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyLevelController.edit()--->partyLevel="+(partyLevel!=null?partyLevel.toString():""));
		
		return getAutoView()
				.addObject("partyLevel", partyLevel)
				.addObject("types", types)
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 参与者等级明细页面
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
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyLevelController.get()--->preUrl="+preUrl+",id="+id);
		
		PartyLevelPo partyLevel=null;
		if(StringUtil.isNotEmpty(id)){
			String data = partyLevelQueryService.get(id);
			partyLevel = PartyLevelPo.fromJsonString(data);
		}
		
		PartyType[] types = new PartyType[]{PartyType.ORG, PartyType.POSITION};
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyLevelController.get()--->partyLevel="+(partyLevel!=null?partyLevel.toString():""));
		
		return getAutoView()
				.addObject("partyLevel", partyLevel)
				.addObject("types", types)
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存参与者等级信息
	 *
	 * @param request
	 * @param response
	 * @param  partyLevel
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,PartyLevelPo po) throws Exception{
		logger.debug("com.lc.ibps.platform.org.controller.PartyLevelController.save()--->partyLevel="+(po!=null?po.toString():""));
		
		String resultMsg=null;
		try {
			partyLevelService.save(po.toJsonString());
			resultMsg="操作参与者等级成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对参与者等级操作失败,";
			writeResultMessage(response.getWriter(),resultMsg+e.getMessage(),ResultMessage.FAIL);
			logger.error(resultMsg+e.getMessage(), e);
		}
	}
	
	/**
	 *  批量删除参与者等级记录
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
			
			logger.debug("com.lc.ibps.platform.org.controller.PartyLevelController.remove()-->aryIds="
						+(aryIds!=null?Arrays.toString(aryIds):"")
						);
			
			if(BeanUtils.isEmpty(aryIds)) throw new OrgException("没有删除的记录");
			partyLevelService.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除参与者等级成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除参与者等级失败,"+e.getMessage());
			logger.error("删除参与者等级失败,"+e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
