package com.lc.ibps.platform.org.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.org.constant.PartyAttrDataType;
import com.lc.ibps.api.org.constant.PartyAttrType;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.service.IPartyAttrOptQueryService;
import com.lc.ibps.api.org.service.IPartyAttrQueryService;
import com.lc.ibps.api.org.service.IPartyAttrService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.api.org.exception.OrgException;
import com.lc.ibps.org.party.persistence.entity.PartyAttrOptPo;
import com.lc.ibps.org.party.persistence.entity.PartyAttrPo;

/** 参与者属性扩展 控制器
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年8月18日-下午4:06:07
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/org/partyAttr/")
public class PartyAttrController extends GenericController{

	@Resource
	private IPartyAttrQueryService partyAttrQueryService;
	@Resource
	private IPartyAttrOptQueryService partyAttrOptQueryService;
	
	@Resource
	private IPartyAttrService partyAttrService;
	
	/**
	 * list页面跳转
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		return getAutoView().addObject("partyTypes", PartyType.listWithoutRole())
							.addObject("partyAttrTypes", PartyAttrType.list())
							.addObject("partyAttrDataTypes", PartyAttrDataType.list());
	}
	
	/**
	 * 
	 * 参与者属性扩展信息编辑页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl= RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyAttrController.edit()"
				+"--->preUrl="+preUrl
				+",id="+id
				);
		
		PartyAttrPo attribute = null;
		List<PartyAttrOptPo> options = null;
		if(StringUtil.isNotEmpty(id)) {
			String data = partyAttrQueryService.get(id);
			attribute = JacksonUtil.getDTO(data, PartyAttrPo.class);
			
			String optdata = partyAttrOptQueryService.findByAttrId(id);
			options = PartyAttrOptPo.fromJsonArrayString(optdata);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyAttrController.edit()"
				+"--->preUrl="+preUrl
				+",id="+id
				+",attribute="+(attribute!=null?attribute.toString():"")
				+",options="+(options!=null?Arrays.toString(options.toArray()):"")
				);
		
		return getAutoView().addObject("partyAttr", attribute)
							.addObject("returnUrl", preUrl)
							.addObject("options", options)
							.addObject("partyTypes", PartyType.listWithoutRole())
							.addObject("partyAttrTypes", PartyAttrType.list())
							.addObject("partyAttrDataTypes", PartyAttrDataType.list());
	}
	
	/**
	 * 
	 * 参与者属性扩展信息明细页面
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyAttrController.edit()"
				+"--->preUrl="+preUrl
				+",id="+id
				);
		
		PartyAttrPo attribute = null;
		List<PartyAttrOptPo> options = null;
		if(StringUtil.isNotEmpty(id)) {
			String data = partyAttrQueryService.get(id);
			attribute = JacksonUtil.getDTO(data, PartyAttrPo.class);
			
			String optdata = partyAttrOptQueryService.findByAttrId(id);
			options = PartyAttrOptPo.fromJsonArrayString(optdata);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyAttrController.get()"
				+"--->preUrl="+preUrl
				+",id="+id
				+",attribute="+(attribute!=null?attribute.toString():"")
				+",options="+(options!=null?Arrays.toString(options.toArray()):"")
				);
		
		return getAutoView().addObject("partyAttr", attribute)
							.addObject("returnUrl", preUrl)
							.addObject("options", options);
	}
	
	/**
	 * 
	 * 保存参与者属性扩展信息
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String json = RequestUtil.getString(request, "json");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyAttrController.save()--->json="+json);
		
		try {
			partyAttrService.save(json);
			resultMsg = "操作参与者属性扩展成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "参与者属性操作失败!";
			writeResultMessage(response.getWriter(), resultMsg+ e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg+e.getMessage(), e);
		}
	}
	
	/**
	 * 
	 * 批量删除参与者属性扩展信息记录(逻辑删除)
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String[] aryIds = RequestUtil.getStringAryByStr(request, "id");
			
			logger.debug("com.lc.ibps.platform.org.controller.PartyAttrController.remove()"
					+"--->aryIds="+Arrays.toString(aryIds)
					);
			
			if(BeanUtils.isEmpty(aryIds)) throw new OrgException("没有要删除的记录");
			partyAttrService.deleteByIds(aryIds);
			
			message = new ResultMessage(ResultMessage.SUCCESS, "删除参与者属性扩展成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除参与者属性扩展失败,"+e.getMessage());
			logger.error("删除参与者属性扩展失败,"+e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
}
